import { Card } from "@/components/atoms/card";
import { Text } from "@/components/atoms/text";
import { Title } from "@/components/atoms/title";
import { OurPurposeCard } from "@/components/molecules/cards/OurPurposeCard";

const purpose = [
  {
    title: "Human-Centered",
    desc: "We support human-centric values of well-being, empathy and equity.",
    img: "/about/purpose/HumanCenteredIcon.svg",
  },
  {
    title: "Collaborative",
    desc: "It is important to us that we are aware and taking action towards reducing competitive mindsets and structures that are hindering our human progress.",
    img: "/about/purpose/CollaborativeIcon.svg",
  },
  {
    title: "Accessible",
    desc: "We believe that how and where we communicate our projects should be accessible to groups across languages, regions and socio-economic statuses.",
    img: "/about/purpose/AccessibleIcon.svg",
  },
  {
    title: "Unique Value",
    desc: "Ecosystems flourish with diversity in nature, and in economies it should be no different.",
    img: "/about/purpose/UniqueValueIcon.svg",
  },
];

export function OurPurpose() {
  return (
    <Card className="@container mx-auto w-full max-w-[1083px] rounded-none px-4 py-16 max-lg:border-none max-lg:shadow-none lg:-mt-72 lg:rounded-2xl lg:p-14">
      <Title className="mb-4">OUR PURPOSE</Title>
      <Text variant="xl" className="mb-14">
        Our purpose is driven by our values. <br /> We have clear intentions
        behind our <br /> collaborative, our technologies, and our ecosystem.
      </Text>

      <ul className="grid grid-cols-1 gap-6 @xl:grid-cols-2 @3xl:grid-cols-4">
        {purpose.map((item, key) => (
          <OurPurposeCard item={item} key={key} />
        ))}
      </ul>
    </Card>
  );
}
