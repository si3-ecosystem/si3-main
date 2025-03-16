// pages/privacy.tsx
import { PolicyLayout } from "./PolicyLayout";
import { PrivacyContent, PrivacySections } from "./Sections";

export function PrivacyPolicy() {
  return <PolicyLayout sections={PrivacySections} content={PrivacyContent} />;
}
