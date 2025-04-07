"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { PolicyLayout } from "@/components/organisms/home/privacy/PolicyLayout";

import {
  getCookiePolicy,
  getMembersPolicy,
  getPrivacyPolicy,
  getTermsAndConditions,
} from "@/lib/sanity/client";
import { Loader } from "@/components/atoms/Loader";

interface Section {
  id: string;
  title: string;
  content: unknown[];
}

interface PolicyData {
  _id: string;
  sections: Section[];
}

const fetchPolicyData = async (policyType: string): Promise<PolicyData> => {
  switch (policyType) {
    case "privacyPolicy":
      return await getPrivacyPolicy();
    case "termsAndConditions":
      return await getTermsAndConditions();
    case "membersPolicy":
      return await getMembersPolicy();
    case "cookiePolicy":
      return await getCookiePolicy();
    default:
      return { _id: "", sections: [] };
  }
};

const PrivacyPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activePolicy, setActivePolicy] = useState("privacyPolicy");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "diversity-tracker-policy") {
      setActivePolicy("termsAndConditions");
    } else if (tab && policyButtons.some((button) => button.type === tab)) {
      setActivePolicy(tab);
    }
  }, [searchParams]);

  const { data: policyData, isLoading } = useQuery({
    queryKey: ["policy", activePolicy],
    queryFn: () => fetchPolicyData(activePolicy),
  });

  const policyButtons = [
    { label: "Privacy Policy", type: "privacyPolicy" },
    { label: "Diversity Tracker Policy", type: "termsAndConditions" },
    { label: "Members Policy", type: "membersPolicy" },
    { label: "Cookie Policy", type: "cookiePolicy" },
  ];

  const handleSetActivePolicy = (policyType: string) => {
    setActivePolicy(policyType);
    const tabValue =
      policyType === "termsAndConditions"
        ? "diversity-tracker-policy"
        : policyType;
    router.push(`/privacy?tab=${tabValue}`, { scroll: false });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="">
      <PolicyLayout
        sections={policyData?.sections || []}
        activePolicy={activePolicy}
        setActivePolicy={handleSetActivePolicy}
        policyButtons={policyButtons}
      />
    </div>
  );
};

export default PrivacyPage;
