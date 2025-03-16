import "./globals.css";

import { Toaster } from "sonner";

import ReduxProvider from "@/providers/ReduxProvider";
import WalletProvider from "@/providers/WagmiProvider";
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
      <body
        className={`mx-auto w-screen max-w-[2560px] overflow-x-hidden bg-white antialiased`}
      >
        <WalletProvider>
          <ReduxProvider>
            <TanstackQueryClientProvider>
              {children}
              <Toaster />
            </TanstackQueryClientProvider>
          </ReduxProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
