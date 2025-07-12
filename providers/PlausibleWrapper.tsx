import PlausibleProvider from "next-plausible";

function PlausibleWrapper({ children }: { children: React.ReactNode }) {
  return (
    <PlausibleProvider enabled={true} trackLocalhost={true} domain="si3.space">
      {children}
    </PlausibleProvider>
  );
}

export default PlausibleWrapper;
