import { Text } from "@/components/atoms/text";
import { Title } from "@/components/atoms/title";
import { formatCount } from "@/utils/formate";

const cardItems = [
  {
    count: 35,
    description: "Web3 Community Partners",
  },
  {
    count: 15,
    description: "Web3 Community Partners",
  },
  {
    count: 10000,
    description: "Web3 Community Partners",
  },
];

type Props = {
  item: {
    count: number;
    description: string;
  };
};

function ImpactCard({ item }: Props) {
  return (
    <li className="flex flex-col items-center justify-center gap-2.5 rounded-2xl bg-[#F4F4F4] p-3.5">
      <p className="text-[40px] leading-none font-semibold">
        {formatCount(item.count)}
      </p>
      <div className="bg-primary h-0.5 w-7"></div>
      <Text className="leading- text-center">{item.description}</Text>
    </li>
  );
}

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
