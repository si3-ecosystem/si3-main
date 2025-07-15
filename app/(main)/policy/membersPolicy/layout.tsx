import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Members policy | SI<3> Ecosystem",
  description:
    "Review our policies including privacy, terms of service, and other important legal information.",
  openGraph: {
    title: "Members policy | SI<3> Ecosystem",
    description:
      "Review our policies including privacy, terms of service, and other important legal information.",
    images: [
      {
        url: "/policies.png",
        width: 1200,
        height: 630,
        alt: "SI<3> Policies - Legal Information and Guidelines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Members policy | SI<3> Ecosystem",
    description:
      "Review our policies including privacy, terms of service, and other important legal information.",
    images: ["/policies.png"],
  },
};

export default function PolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
