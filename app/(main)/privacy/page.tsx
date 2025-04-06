"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PolicyLayout } from "@/components/organisms/home/privacy/PolicyLayout";

import {
  getCookiePolicy,
  getMembersPolicy,
  getPrivacyPolicy,
  getTermsAndConditions,
} from "@/lib/sanity/client";
import { Loader } from "@/components/atoms/Loader";

// Type definitions
interface Section {
  id: string;
  title: string;
  content: unknown[];
}

interface PolicyData {
  _id: string;
  sections: Section[];
}

// Fetch function
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
  const [activePolicy, setActivePolicy] = useState("privacyPolicy");

  // Use TanStack Query to fetch data
  const { data: policyData, isLoading } = useQuery({
    queryKey: ["policy", activePolicy],
    queryFn: () => fetchPolicyData(activePolicy),
  });

  // Button labels and corresponding policy types
  const policyButtons = [
    { label: "Privacy Policy", type: "privacyPolicy" },
    { label: "Terms & Conditions", type: "termsAndConditions" },
    { label: "Members Policy", type: "membersPolicy" },
    { label: "Cookie Policy", type: "cookiePolicy" },
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="">
      <PolicyLayout
        sections={policyData?.sections || []}
        activePolicy={activePolicy}
        setActivePolicy={setActivePolicy}
        policyButtons={policyButtons}
      />
    </div>
  );
};

export default PrivacyPage;
