import "./globals.css";

import WalletProvider from "@/providers/WagmiProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import { sharedMetaData } from "@/utils/sharedMetadata";
import { TanstackQueryClientProvider } from "@/providers/TanstackQueryClientProvider";

export const revalidate = 3600;
export async function generateMetadata() {
  const metadata = await sharedMetaData();
  return metadata;
}

export default function RootLayout({
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
