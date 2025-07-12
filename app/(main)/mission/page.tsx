import { getAboutPageData } from "@/lib/sanity/client";
import { AboutQuery } from "@/types/about";
import { Metadata } from "next";
import { MissionPage } from "@/components/organisms/mission/MissionPage";

export const metadata: Metadata = {
  title: "Our Mission | SI<3> Ecosystem",
  description:
    "Discover our mission to co-activate growth and financial inclusion opportunities for women and non-binary web3 leaders.",
  openGraph: {
    title: "Our Mission | SI<3> Ecosystem",
    description:
      "Discover our mission to co-activate growth and financial inclusion opportunities for women and non-binary web3 leaders.",
    images: [
      {
        url: "/mission.png",
        width: 1200,
        height: 630,
        alt: "SI<3> Mission - Empowering Women and Non-Binary Leaders in Web3",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Mission | SI<3> Ecosystem",
    description:
      "Discover our mission to co-activate growth and financial inclusion opportunities for women and non-binary web3 leaders.",
    images: ["/mission.png"],
  },
};

export default async function Mission() {
  const data: AboutQuery = await getAboutPageData();
  return <MissionPage data={data} />;
}
