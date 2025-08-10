import { getSeoData, getSeoSettingsData } from "@/lib/sanity/client";
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
  const baseUrl = "https://www.si3.space";
  // Try to get SEO settings first, fallback to utils
  const seoSettings = await getSeoSettingsData();
  const utilsSettings = await getSeoData();
  const settings = { ...utilsSettings, ...seoSettings };

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

  const title = config.title || settings?.seoTitle;

  const description = config.description || settings?.overview;

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
      template: `%s`,
    },
    description,

    keywords: keywords.join(", "),
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
  const baseUrl = "https://www.si3.space";
  const settings = await getSeoSettingsData();

  const seoLogoUrl = settings?.seoLogo
    ? urlForImage(settings.seoLogo)
    : "/icons/logo.webp";

  const getImageUrl = (
    imageSource: ReturnType<typeof urlForImage> | string | null,
  ): string => {
    if (!imageSource) return "";
    return typeof imageSource === "string" ? imageSource : imageSource.src;
  };

  // Use new structured fields with fallbacks to legacy fields and defaults
  const organizationName =
    settings?.organizationName || settings?.seoTitle || "";

  const alternateName = settings?.alternateName || "";

  const description =
    settings?.organizationDescription || settings?.overview || "";

  const foundingDate = settings?.foundingDate || "";
  const contactEmail = settings?.contactEmail || "kara@si3.space";
  const addressCountry = settings?.addressCountry || "";

  // Build social media links array
  const socialLinks: string[] = [];

  if (settings?.twitter) {
    socialLinks.push(settings.twitter);
  }

  if (settings?.linkedIn) {
    socialLinks.push(settings.linkedIn);
  }

  if (settings?.github) {
    socialLinks.push(settings.github);
  }

  // Add additional social links if they exist
  if (
    settings?.additionalSocialLinks &&
    Array.isArray(settings.additionalSocialLinks)
  ) {
    settings.additionalSocialLinks.forEach((link: any) => {
      if (link.url) {
        socialLinks.push(link.url);
      }
    });
  }

  // Build the schema object conditionally
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Organization",
    url: baseUrl,
    logo: getImageUrl(seoLogoUrl) || `${baseUrl}/icons/logo.webp`,
  };

  // Only add fields if they have values
  if (organizationName) schema.name = organizationName;
  if (alternateName) schema.alternateName = alternateName;
  if (description) schema.description = description;
  if (foundingDate) schema.foundingDate = foundingDate;
  if (socialLinks.length > 0) schema.sameAs = socialLinks;

  // Add contact point if email is available
  if (contactEmail) {
    schema.contactPoint = {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: contactEmail,
    };
  }

  // Add address if country is available
  if (addressCountry) {
    schema.address = {
      "@type": "PostalAddress",
      addressCountry,
    };
  }

  return schema;
}

export async function generateWebsiteSchema() {
  const baseUrl = "https://www.si3.space";
  const settings = await getSeoSettingsData();

  // Use new structured fields from seoSettings
  const websiteName = settings?.websiteName || settings?.seoTitle;
  const description = settings?.websiteDescription || settings?.overview;
  const organizationName =
    settings?.organizationName || settings?.seoTitle || websiteName;

  // Build the base schema
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: baseUrl,
  };

  // Only add fields if they have values
  if (websiteName) schema.name = websiteName;
  if (description) schema.description = description;

  // Add publisher if organization name is available
  if (organizationName) {
    schema.publisher = {
      "@type": "Organization",
      name: organizationName,
    };
  }

  // Add search action if enabled and search URL is provided
  if (settings?.searchEnabled && settings?.searchUrl) {
    schema.potentialAction = {
      "@type": "SearchAction",
      target: `${baseUrl}${settings.searchUrl}`,
      "query-input": "required name=search_term_string",
    };
  }

  return schema;
}
