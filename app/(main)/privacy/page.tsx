import { PolicyLayout } from "@/components/organisms/home/privacy/PolicyLayout";
import {
  PrivacyContent,
  PrivacySections,
} from "@/components/organisms/home/privacy/Sections";

export default function PrivacyPage() {
  return <PolicyLayout sections={PrivacySections} content={PrivacyContent} />;
}
