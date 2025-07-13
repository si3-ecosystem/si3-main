import { getAboutPageData, getSeoData } from "@/lib/sanity/client";
import { AboutQuery } from "@/types/about";
import { Metadata } from "next";
import { MissionPage } from "@/components/organisms/mission/MissionPage";
import { processMetadata } from "@/utils/sharedMetadata";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.si3.space";
  const settings = await getSeoData();

  const title =
    settings?.seoTitle ||
    "SI<3> Ecosystem - Empowering Women & Non-Binary Leaders in Web3";
  const description =
    settings?.overview ||
    "Co-activating growth and financial inclusion opportunities for women and non-binary web3 leaders";

  return await processMetadata({
    title: "Our Mission" + title,
    description:
      description ||
      "Discover our mission to co-activate growth and financial inclusion opportunities for women and non-binary web3 leaders.",
    canonical: `${baseUrl}/mission`,
    ogImage: `${baseUrl}/mission.png`,
    keywords: [
      "si3 mission",
      "web3 mission",
      "women empowerment",
      "financial inclusion",
      "blockchain diversity",
      "web3 education",
      "non-binary leaders",
      "crypto inclusion",
    ],
  });
}

export default async function Mission() {
  const data: AboutQuery = await getAboutPageData();
  return <MissionPage data={data} />;
}
