import "./globals.css";

import WalletProvider from "@/providers/WagmiProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import { TanstackQueryClientProvider } from "@/providers/TanstackQueryClientProvider";
import { processMetadata } from "@/utils/sharedMetadata";

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
        className={`mx-auto w-full max-w-[2560px] overflow-x-hidden bg-white antialiased`}
      >
        <WalletProvider>
          <ReduxProvider>
            <TanstackQueryClientProvider>
              {children}
            </TanstackQueryClientProvider>
          </ReduxProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
