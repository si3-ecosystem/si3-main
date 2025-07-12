import "./globals.css";

import { Toaster } from "sonner";
import { Suspense } from "react";

import ReduxProvider from "@/providers/ReduxProvider";
import WalletProvider from "@/providers/WagmiProvider";
import PlausibleWrapper from "@/providers/PlausibleWrapper";
import { TanstackQueryClientProvider } from "@/providers/TanstackQueryClientProvider";
import { StructuredData } from "@/components/atoms/StructuredData";

import {
  processMetadata,
  generateOrganizationSchema,
  generateWebsiteSchema,
} from "@/utils/sharedMetadata";

export const revalidate = 2500;

export async function generateMetadata() {
  return await processMetadata();
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate structured data
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//cdn.sanity.io" />
        <link rel="dns-prefetch" href="//plausible.io" />

        {/* Structured Data */}
        <StructuredData data={[organizationSchema, websiteSchema]} />
      </head>
      <body className="antialiased">
        <PlausibleWrapper>
          <WalletProvider>
            <ReduxProvider>
              <TanstackQueryClientProvider>
                <Suspense fallback={<div className="min-h-screen bg-white" />}>
                  {children}
                </Suspense>

                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: "#363636",
                      color: "#fff",
                    },
                  }}
                />
              </TanstackQueryClientProvider>
            </ReduxProvider>
          </WalletProvider>
        </PlausibleWrapper>
      </body>
    </html>
  );
}
