import { Title } from "@/components/atoms/title";
import { ImpactCard } from "@/components/molecules/cards/ImpactCard";

const cardItems = [
  {
    count: 35,
    description: "Web3 Community Partners",
  },
  {
    count: 15,
    description: "Emerging Technology Partners",
  },
  {
    count: 10000,
    description: "Community Members",
  },
];

export function OurImpact() {
  return (
    <div className="@container mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 py-16 lg:px-24 lg:py-20">
      <Title className="text-center">OUR IMPACT</Title>
      <ul className="mx-auto grid w-full max-w-[931px] grid-cols-1 gap-7 @xl:grid-cols-3">
        {cardItems.map((item, index) => (
          <ImpactCard item={item} key={index} />
        ))}
      </ul>
    </div>
  );
}
