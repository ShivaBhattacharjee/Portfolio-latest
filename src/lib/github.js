const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
const GITHUB_REST_ENDPOINT = "https://api.github.com";

const LEVEL_MAP = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const GRAPH_QUERY = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

const CREATED_AT_QUERY = `
  query($username: String!) {
    user(login: $username) {
      createdAt
    }
  }
`;

async function githubGraphQL(token, query, variables) {
  const res = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  return res.json();
}

async function fetchLifetimeTotal(token, username, createdAt) {
  const start = new Date(createdAt);
  const now = new Date();
  const years = [];

  for (let y = start.getUTCFullYear(); y <= now.getUTCFullYear(); y++) {
    const from = new Date(Math.max(Date.UTC(y, 0, 1), start.getTime()));
    const to = y === now.getUTCFullYear()
      ? now
      : new Date(Date.UTC(y + 1, 0, 1));
    years.push({ from, to });
  }

  // Build a single batched query with aliases per year
  const fragments = years.map(({ from, to }, i) =>
    `y${i}: contributionsCollection(from: "${from.toISOString()}", to: "${to.toISOString()}") { contributionCalendar { totalContributions } }`
  ).join("\n");

  const query = `query($username: String!) { user(login: $username) { ${fragments} } }`;
  const json = await githubGraphQL(token, query, { username });
  if (!json?.data?.user) return 0;

  return Object.values(json.data.user).reduce(
    (sum, col) => sum + (col?.contributionCalendar?.totalContributions ?? 0),
    0
  );
}

export async function fetchGitHubContributions(username = "shivabhattacharjee") {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return { contributions: [], lifetimeTotal: 0 };

  const now = new Date();
  const from = new Date(
    Date.UTC(now.getUTCFullYear() - 1, now.getUTCMonth(), now.getUTCDate())
  );

  try {
    // Fetch graph data and user creation date in parallel
    const [graphJson, createdAtJson] = await Promise.all([
      githubGraphQL(token, GRAPH_QUERY, {
        username,
        from: from.toISOString(),
        to: now.toISOString(),
      }),
      githubGraphQL(token, CREATED_AT_QUERY, { username }),
    ]);

    const calendar =
      graphJson?.data?.user?.contributionsCollection?.contributionCalendar;
    const createdAt = createdAtJson?.data?.user?.createdAt;

    const contributions = calendar
      ? calendar.weeks.flatMap((week) =>
          week.contributionDays.map((day) => ({
            date: day.date,
            count: day.contributionCount ?? 0,
            level: LEVEL_MAP[day.contributionLevel] ?? 0,
          }))
        )
      : [];

    const lifetimeTotal = createdAt
      ? await fetchLifetimeTotal(token, username, createdAt)
      : contributions.reduce((sum, d) => sum + d.count, 0);

    return { contributions, lifetimeTotal };
  } catch {
    return { contributions: [], lifetimeTotal: 0 };
  }
}

export async function fetchGitHubStars(repoFullName) {
  if (!repoFullName) return null;
  try {
    const res = await fetch(
      `${GITHUB_REST_ENDPOINT}/repos/${repoFullName}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.stargazers_count ?? null;
  } catch {
    return null;
  }
}
