import "./globals.css";

import { Toaster } from "sonner";

import ReduxProvider from "@/providers/ReduxProvider";
import WalletProvider from "@/providers/WagmiProvider";
import PlausibleWrapper from "@/providers/PlausibleWrapper";
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
  return (
    <html lang="en">
      <body className={``}>
        <PlausibleWrapper>
          <WalletProvider>
            <ReduxProvider>
              <TanstackQueryClientProvider>
                {children}

                <Toaster />
              </TanstackQueryClientProvider>
            </ReduxProvider>
          </WalletProvider>
        </PlausibleWrapper>
      </body>
    </html>
  );
}
