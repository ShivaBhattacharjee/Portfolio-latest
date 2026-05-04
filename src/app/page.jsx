import Hero from "@/components/sections/hero";
import Layout from "@/components/layout/layout";
import { fetchGitHubContributions } from "@/lib/github";

export const revalidate = 3600;



export default async function About() {
  const { contributions, lifetimeTotal } = await fetchGitHubContributions();

  return (
    <div className="overflow-x-hidden">
      <Layout>
        <Hero contributionData={contributions} lifetimeTotal={lifetimeTotal} />
      </Layout>
    </div>
  );
}
