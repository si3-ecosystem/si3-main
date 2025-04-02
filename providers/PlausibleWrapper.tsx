import PlausibleProvider from "next-plausible";

function PlausibleWrapper({ children }: { children: React.ReactNode }) {
  return <PlausibleProvider domain="si3.space">{children}</PlausibleProvider>;
}

export default PlausibleWrapper;
