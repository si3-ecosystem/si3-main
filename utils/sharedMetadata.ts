import { getSeoData } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";
import type { Metadata } from "next";

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
  structuredData?: Record<string, any>;
}

export async function processMetadata(
  config: SEOConfig = {},
): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.si3.space";
  const settings = await getSeoData();

  const seoLogoUrl = settings?.seoLogo
    ? urlForImage(settings.seoLogo)
    : "/icons/logo.webp";

  const getImageUrl = (
    imageSource: ReturnType<typeof urlForImage> | string | null,
  ): string => {
    if (!imageSource) return "";
    return typeof imageSource === "string" ? imageSource : imageSource.src;
  };

  const faviconUrl = settings?.favicon
    ? urlForImage(settings.favicon)?.src
    : "/favicon.ico";

  // Enhanced title and description with better fallbacks
  const title =
    config.title ||
    settings?.seoTitle ||
    "SI<3> Ecosystem - Empowering Women & Non-Binary Leaders in Web3";
  const description =
    config.description ||
    settings?.overview ||
    "Co-activating growth and financial inclusion opportunities for women and non-binary web3 leaders through personal brand development, public speaking, partnerships, and DeFi.";

  // Enhanced keywords with web3 and diversity focus
  const keywords = config.keywords || [
    "si3",
    "si/her",
    "web3",
    "blockchain",
    "cryptocurrency",
    "women in tech",
    "diversity",
    "inclusion",
    "defi",
    "personal branding",
    "leadership",
    "financial inclusion",
    "web3 education",
    "blockchain education",
    "women empowerment",
    "non-binary",
    "tech diversity",
    "crypto education",
  ];

  const canonicalUrl = config.canonical || baseUrl;
  const ogImageUrl =
    config.ogImage || getImageUrl(seoLogoUrl) || `${baseUrl}/og-image.png`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: `%s | SI<3> Ecosystem`,
    },
    description,

    keywords: keywords.join(", "),
    authors: [
      { name: "SI<3> Team" },
      { name: "Asraful", url: "https://github.com/Asraful-code235" },
    ],
    creator: "SI<3> Ecosystem",
    publisher: "SI<3> Ecosystem",

    icons: {
      icon: [
        {
          url: faviconUrl || "/favicon.ico",
          sizes: "32x32",
          type: "image/x-icon",
        },
        {
          url: faviconUrl || "/icons/icon-192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          url: faviconUrl || "/icons/icon-512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      apple: [
        { url: faviconUrl || "/icons/apple-touch-icon.png", sizes: "180x180" },
      ],
      shortcut: faviconUrl || "/favicon.ico",
    },

    manifest: "/manifest.json",

    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonicalUrl,
      siteName: "SI<3> Ecosystem",
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} - Open Graph Image`,
          type: "image/png",
        },
        {
          url: getImageUrl(seoLogoUrl),
          width: 1200,
          height: 170,
          alt: "SI<3> Ecosystem Logo",
          type: "image/png",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: "@si3_ecosystem",
      creator: "@si3_ecosystem",
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} - Twitter Card Image`,
        },
      ],
    },

    robots: {
      index: !config.noIndex,
      follow: !config.noIndex,
      googleBot: {
        index: !config.noIndex,
        follow: !config.noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": baseUrl,
        "x-default": baseUrl,
      },
    },

    category: "Technology",
    classification: "Web3 Education and Empowerment Platform",

    other: {
      rating: "General",
      distribution: "Global",
      "revisit-after": "7 days",
      "theme-color": "#4C1192",
      "msapplication-TileColor": "#4C1192",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "apple-mobile-web-app-title": "SI<3>",
      "application-name": "SI<3> Ecosystem",
      "mobile-web-app-capable": "yes",
    },
  };
}

export async function generateOrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.si3.space";
  const settings = await getSeoData();

  const seoLogoUrl = settings?.seoLogo
    ? urlForImage(settings.seoLogo)
    : "/icons/logo.webp";

  const getImageUrl = (
    imageSource: ReturnType<typeof urlForImage> | string | null,
  ): string => {
    if (!imageSource) return "";
    return typeof imageSource === "string" ? imageSource : imageSource.src;
  };

  const title =
    settings?.seoTitle ||
    "SI<3> Ecosystem - Empowering Women & Non-Binary Leaders in Web3";
  const description =
    settings?.overview ||
    "Co-activating growth and financial inclusion opportunities for women and non-binary web3 leaders";

  const twitterUrl = settings?.twitter || "http://x.com/si3_ecosystem";
  const linkedInUrl =
    settings?.linkedIn || "https://www.linkedin.com/company/si3ecosystem/";

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: title,
    alternateName: "SI/HER",
    url: baseUrl,
    logo: getImageUrl(seoLogoUrl) || `${baseUrl}/icons/logo.webp`,
    description,
    foundingDate: "2021",
    sameAs: [twitterUrl, linkedInUrl, "https://github.com/si3-ecosystem"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "hello@si3.space",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
  };
}

export async function generateWebsiteSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.si3.space";
  const settings = await getSeoData();

  const title =
    settings?.seoTitle ||
    "SI<3> Ecosystem - Empowering Women & Non-Binary Leaders in Web3";
  const description =
    settings?.overview ||
    "Empowering women and non-binary leaders in Web3 through education, partnerships, and financial inclusion";

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: title,
    url: baseUrl,
    description,
    publisher: {
      "@type": "Organization",
      name: title,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
