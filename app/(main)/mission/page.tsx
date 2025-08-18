import { getAboutPageData, getSeoSettingsData } from "@/lib/sanity/client";
import { AboutQuery } from "@/types/about";
import { Metadata } from "next";
import { MissionPage } from "@/components/organisms/mission/MissionPage";
import { processMetadata } from "@/utils/sharedMetadata";
import { useAccount } from "wagmi";
import { useFormo } from "@formo/analytics";
import { useEffect } from "react";
import { AnalyticsWrapper } from "@/components/AnalyticsWrapper";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = "https://www.si3.space";
  const settings = await getSeoSettingsData();

  const description = settings?.overview;

  return await processMetadata({
    title: "Our Mission",
    ...(description && { description }),
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
  return (
    <>
      <AnalyticsWrapper />
      <MissionPage data={data} />
    </>
  );
}
