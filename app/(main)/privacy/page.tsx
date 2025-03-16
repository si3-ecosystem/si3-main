import React from "react";

import {
  PrivacyContent,
  PrivacySections,
} from "@/components/organisms/home/privacy/Sections";
import { PolicyLayout } from "@/components/organisms/home/privacy/PolicyLayout";

const PrivacyPage: React.FC = () => {
  return <PolicyLayout sections={PrivacySections} content={PrivacyContent} />;
};

export default PrivacyPage;
