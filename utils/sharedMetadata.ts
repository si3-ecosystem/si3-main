import { getSeoData } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";

export async function processMetadata() {
  const url = "https://www.si3.space";
  const settings = await getSeoData();

  const seoLogoUrl = settings?.seoLogo
    ? urlForImage(settings.seoLogo)
    : "/icons/logo.webp";

  const getImageUrl = (
    imageSource: ReturnType<typeof urlForImage> | string | null,
  ) => {
    if (!imageSource) return "";
    return typeof imageSource === "string" ? imageSource : imageSource.src;
  };

  const imageUrl = settings?.favicon && urlForImage(settings.favicon)?.src;

  return {
    metadataBase: "https://www.si3.space",
    title: settings?.seoTitle || "SI<3> Ecosystem",
    description:
      settings?.overview ||
      "Co-activating growth and financial inclusion opportunities for women and non-binary web3 leaders through personal brand development, public speaking, partnerships, and DeFi.",

    icons: {
      icon: [
        {
          rel: "icon",
          url: imageUrl,
        },
      ],
    },
    keywords: ["si3", "si/her", "web3"],
    authors: [{ name: "Asraful" }],
    canonical: "https://www.si3.space",
    openGraph: {
      type: "website",
      url: "https://www.si3.space",
      title: settings?.seoTitle || "SI<3> Ecosystem",
      description:
        settings?.overview ||
        "Creating Pathways For Diverse Voices Of the New Economy",
      images: [
        {
          url: getImageUrl(seoLogoUrl),
          width: 1200,
          height: 170,
          alt: settings?.seoTitle || "SI<3> Ecosystem Banner",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: settings?.seoTitle || "SI<3> Ecosystem",
      description:
        settings?.overview ||
        "Creating Pathways For Diverse Voices Of the New Economy",
      images: [
        {
          url: getImageUrl(seoLogoUrl),
          width: 1200,
          height: 170,
          alt: settings?.seoTitle || "SI<3> Ecosystem Banner",
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: url,
      languages: {
        en: process.env.BASE_URL || "https://www.si3.space",
      },
    },

    // verification: {
    //   google: "your-google-site-verification-code",
    //   bing: "your-bing-site-verification-code",
    // },
    other: {
      rating: "General",
    },
  };
}
