import { ExplorePartnersCard } from "@/components/molecules/cards/ExplorePartnersCard";

const exploreData = [
  {
    title: "Drive Product Adoption",
    description:
      "We partner with leading & promising emerging tech organizations, introducing our community ecosystem through workshops, user research, and growth campaigns.",
    subTitle: "Partner Workshops & Events",
    CtaText: "Explore Partnership",
    CtaLink: "#",
    image: "/icons/jpg/partners.jpg",
  },
  {
    title: "Develop Healthy Teams",
    description:
      "While some technology companies are cutting their Diversity, Equity, Accessibility and Inclusion programs, we are doubling down on ours. Explore our applied learning programs on topics relevant to Web3 teams, including Advocacy, Allyship, Inclusion, Visibility and Impact.",
    subTitle: "DEAI Training",
    CtaText: "Explore Training",
    CtaLink: "#",
    image: "/icons/jpg/partners.jpg",
  },
  {
    title: "Strengthen Grant Programs",
    description:
      "We initiated FIXX (Financial Inclusion XX Chromosomes) as a monthly working group covering topics focused on improving financial inclusion in Web3 grants. After a successful Season 1 with 15 partners, discover what's happening in Season 2.",
    subTitle: "Grants & Financial Inclusion",
    CtaText: "Explore Membership",
    CtaLink: "#",
    image: "/icons/jpg/partners.jpg",
  },
  {
    title: "Co-Develop Programming",
    description:
      "Our experienced leadership team works with our partners to create impactful programming based on your organization's needs.",
    subTitle: "Custom Partnerships",
    CtaText: "Explore Partnership",
    CtaLink: "#",
    image: "/icons/jpg/partners.jpg",
  },
];

export function ExploreSection() {
  return (
    <ul className="grid gap-4">
      {exploreData.map((item, key) => (
        <ExplorePartnersCard data={item} key={key} />
      ))}
    </ul>
  );
}
