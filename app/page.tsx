import { PortfolioHome } from "@/components/public/PortfolioHome";
import { getPublicPortfolioData } from "@/lib/public-data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getPublicPortfolioData();

  return <PortfolioHome data={data} />;
}
