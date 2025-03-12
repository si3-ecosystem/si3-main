import { getSeoData } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";

export async function sharedMetaData() {
  const settings = await getSeoData();

  const seoLogoUrl = settings?.seoLogo
    ? urlForImage(settings.seoLogo)
    : "/icons/logo.webp";

  return {
    // enable this for resolving opengraph image
    metadataBase: new URL("https://www.si3.space/"),
    title: {
      default: settings?.seoTitle || "si3",
      template: "%s",
    },
    description:
      settings?.overview ||
      "Co-activating growth and financial inclusion opportunities for women and non-binary web3 leaders through personal brand development, public speaking, partnerships, and DeFi.",
    icons: {
      icon: [
        {
          rel: "icon",
          url: settings?.favicon || "/icons/fav.png",
          sizes: "16x16",
        },
        {
          rel: "icon",
          url: settings?.favicon || "/icons/fav.png",
          sizes: "16x16",
        },
        {
          rel: "apple-touch-icon",
          url: settings?.favicon || "/icons/fav.png",
          sizes: "16x16",
        },
        {
          rel: "mask-icon",
          url: settings?.favicon || "/icons/fav.png",
          color: "#5bbad5",
        },
        {
          rel: "icon",
          url: settings?.favicon || "/icons/fav.png",
          sizes: "16x16",
        },
      ],
    },

    keywords: ["si3", "si/her", "web3"],
    authors: [{ name: "Asraful" }],
    canonical: "https://www.si3.space",
    openGraph: {
      type: "website",
      url: "https://www.si3.space",
      title: settings?.seoTitle || "si3",
      description:
        settings?.overview ||
        "Creating Pathways For Diverse Voices Of the New Economy",
      images: [
        {
          url: seoLogoUrl,
          width: 1200,
          height: 170,
          alt: settings?.seoTitle || "si3 Banner",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: settings?.seoTitle || "si3",
      description:
        settings?.overview ||
        "Creating Pathways For Diverse Voices Of the New Economy",
      images: [
        {
          url: seoLogoUrl,
          width: 1200,
          height: 170,
          alt: settings?.seoTitle || "si3 Banner",
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
