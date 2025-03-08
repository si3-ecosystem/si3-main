import type { Metadata } from "next";

import "./globals.css";

import WalletProvider from "@/providers/WagmiProvider";
import ReduxProvider from "@/providers/ReduxProvider";

export const metadata: Metadata = {
  title: "Si<3>",
  description:
    "Co-activating growth and financial inclusion opportunities for women and non-binary web3 leaders through personal brand development, public speaking, partnerships, and DeFi.",

  applicationName: "Si<3>",
  referrer: "origin-when-cross-origin",
  keywords: ["Si3", "Si<3>", "Si<3>DAO", "SiHer", "Si/Her"],

  metadataBase: new URL("https://www.si3.space/"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`mx-auto w-full max-w-[2560px] bg-white antialiased`}>
        <WalletProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
