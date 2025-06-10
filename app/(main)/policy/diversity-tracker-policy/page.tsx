"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
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
    case "privacy":
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
  const pathname = usePathname();
  const [activePolicy, setActivePolicy] = useState("diversity-tracker-policy");

  useEffect(() => {
    setActivePolicy("termsAndConditions");
  }, [pathname]);

  const { data: policyData, isLoading } = useQuery({
    queryKey: ["policy", activePolicy],
    queryFn: () => fetchPolicyData(activePolicy),
  });

  const policyButtons = [
    { label: "Privacy Policy", type: "privacy" },
    // { label: "Web3 Health Policy", type: "termsAndConditions" },
    { label: "Members Policy", type: "membersPolicy" },
    { label: "Cookie Policy", type: "cookiePolicy" },
  ];

  const handleSetActivePolicy = (policyType: string) => {
    setActivePolicy(policyType);
    const tabValue =
      policyType === "termsAndConditions"
        ? "diversity-tracker-policy"
        : policyType;
    if (policyType === "privacy") {
      router.push(`/policy/privacy`, { scroll: false });
    } else {
      router.push(`/policy/${tabValue}`, { scroll: false });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="mt-14 lg:mt-28">
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
