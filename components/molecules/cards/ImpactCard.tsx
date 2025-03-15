"use client";

import { formatCount } from "@/utils/formate";
import CountUp from "react-countup";
import { Text } from "@/components/atoms/text";

type Props = {
  item: {
    count: number;
    description: string;
  };
};

export function ImpactCard({ item }: Props) {
  return (
    <li className="flex flex-col items-center justify-center gap-2.5 rounded-2xl bg-[#F4F4F4] p-3.5">
      <p className="text-[40px] leading-none font-semibold">
        <CountUp
          end={item.count}
          duration={5}
          formattingFn={formatCount}
          start={2}
          delay={2}
        />
      </p>
      <div className="bg-primary h-0.5 w-7"></div>
      <Text className="leading- text-center">{item.description}</Text>
    </li>
  );
}
