import PlausibleProvider from "next-plausible";

function PlausibleWrapper({ children }: { children: React.ReactNode }) {
  return (
    <PlausibleProvider
      taggedEvents={true}
      trackOutboundLinks={true}
      // enabled={true}
      // trackLocalhost={true}
      domain="si3.space"
    >
      {children}
    </PlausibleProvider>
  );
}

export default PlausibleWrapper;
