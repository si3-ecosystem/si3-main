import { AnalyticsWrapper } from "@/components/AnalyticsWrapper";
import { PolicyPage } from "@/components/organisms/policy/PolicyPage";
import { useFormo } from "@formo/analytics";

import { Metadata } from "next";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export const metadata: Metadata = {
  title: "Members Policy | SI<3> Ecosystem",
  description:
    "Review our policies including privacy, terms of service, and other important legal information.",
  openGraph: {
    title: "Members Policy | SI<3> Ecosystem",
    description:
      "Review our policies including privacy, terms of service, and other important legal information.",
    images: [
      {
        url: "/policies.png",
        width: 1200,
        height: 630,
        alt: "SI<3> Policies - Legal Information and Guidelines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Members Policies | SI<3> Ecosystem",
    description:
      "Review our policies including privacy, terms of service, and other important legal information.",
    images: ["/policies.png"],
  },
};

const MembersPolicyPage = () => {
  return (
    <>
      <AnalyticsWrapper />
      <PolicyPage initialPolicyType="membersPolicy" />;
    </>
  );
};

export default MembersPolicyPage;
