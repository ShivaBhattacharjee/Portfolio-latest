export const metadata = {
  title: "API Docs",
  description: "Documentation for the public API endpoints exposed by shiva.codes.",
};

const endpoints = [
  {
    method: "GET",
    path: "/api/health",
    description: "Returns a simple health status for automated checks.",
  },
  {
    method: "GET",
    path: "/api/socials",
    description: "Returns public profile and social metadata used across the portfolio.",
  },
  {
    method: "GET",
    path: "/api/location",
    description: "Returns request-derived location information and current weather when available.",
  },
  {
    method: "GET",
    path: "/api/visitors",
    description: "Returns the current visitor count.",
  },
  {
    method: "GET",
    path: "/api/github/contributions/{username}",
    description: "Returns a GitHub contribution calendar for the supplied username.",
  },
];

export default function ApiDocsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">API Documentation</p>
          <h1 className="text-4xl font-bold tracking-tight">Public API reference</h1>
          <p className="max-w-2xl text-muted-foreground">
            Machine-readable API metadata is available at
            {" "}
            <a className="underline underline-offset-4" href="/openapi.json">/openapi.json</a>
            {" "}
            and
            {" "}
            <a className="underline underline-offset-4" href="/.well-known/api-catalog">/.well-known/api-catalog</a>.
          </p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-background/60">
          <ul className="divide-y divide-border/60">
            {endpoints.map((endpoint) => (
              <li key={endpoint.path} className="space-y-2 p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border px-2 py-1 text-xs font-semibold tracking-wide">
                    {endpoint.method}
                  </span>
                  <code className="text-sm">{endpoint.path}</code>
                </div>
                <p className="text-sm text-muted-foreground">{endpoint.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
