import Script from "next/script";

interface StructuredDataProps {
  data: Record<string, any> | Record<string, any>[];
}

export function StructuredData({ data }: StructuredDataProps) {
  const jsonLd = Array.isArray(data) ? data : [data];

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
      strategy="afterInteractive"
    />
  );
}

// Breadcrumb structured data component
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbStructuredDataProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbStructuredData({
  items,
}: BreadcrumbStructuredDataProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <StructuredData data={breadcrumbSchema} />;
}

// FAQ structured data component
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQStructuredDataProps {
  faqs: FAQItem[];
}

export function FAQStructuredData({ faqs }: FAQStructuredDataProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return <StructuredData data={faqSchema} />;
}

// Article structured data component
interface ArticleStructuredDataProps {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}

export function ArticleStructuredData({
  title,
  description,
  author,
  datePublished,
  dateModified,
  image,
  url,
}: ArticleStructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.si3.space";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "SI<3> Ecosystem",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/icons/logo.webp`,
      },
    },
    datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image,
      },
    }),
  };

  return <StructuredData data={articleSchema} />;
}

// Event structured data component
interface EventStructuredDataProps {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: {
    name: string;
    address?: string;
  };
  organizer: string;
  url: string;
}

export function EventStructuredData({
  name,
  description,
  startDate,
  endDate,
  location,
  organizer,
  url,
}: EventStructuredDataProps) {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    description,
    startDate,
    ...(endDate && { endDate }),
    ...(location && {
      location: {
        "@type": "Place",
        name: location.name,
        ...(location.address && {
          address: {
            "@type": "PostalAddress",
            streetAddress: location.address,
          },
        }),
      },
    }),
    organizer: {
      "@type": "Organization",
      name: organizer,
    },
    url,
  };

  return <StructuredData data={eventSchema} />;
}
