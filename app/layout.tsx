import "./globals.css";

import { Toaster } from "sonner";

import ReduxProvider from "@/providers/ReduxProvider";
import WalletProvider from "@/providers/WagmiProvider";
import PlausibleWrapper from "@/providers/PlausibleWrapper";
// import OCConnectWrapper from "@/providers/OCConnectWrapper";
import { TanstackQueryClientProvider } from "@/providers/TanstackQueryClientProvider";

import { processMetadata } from "@/utils/sharedMetadata";

export const revalidate = 2500;

export async function generateMetadata() {
  return await processMetadata();
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const opts = {
  //   clientId: "<Does_Not_Matter_For_Sandbox_mode>",
  //   redirectUri: "http://localhost:3000/redirect",
  //   referralCode: "PARTNER6",
  // };

  return (
    <html lang="en">
      <body
        className={`mx-auto w-screen max-w-[2560px] overflow-x-hidden bg-white antialiased`}
      >
        <PlausibleWrapper>
          <WalletProvider>
            {/* <OCConnectWrapper opts={opts} sandboxMode={true}> */}
            <ReduxProvider>
              <TanstackQueryClientProvider>
                {children}

                <Toaster />
              </TanstackQueryClientProvider>
            </ReduxProvider>
            {/* </OCConnectWrapper> */}
          </WalletProvider>
        </PlausibleWrapper>
      </body>
    </html>
  );
}
