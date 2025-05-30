"use client";

import { formatCount } from "@/utils/formate";
import CountUp from "react-countup";
import { Text } from "@/components/atoms/text";
import { ImpactMetric } from "@/types/home";

type Props = {
  item: ImpactMetric;
  isFirst?: boolean;
  isHovered?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
};

export function ImpactCard({
  item,
  isFirst = false,
  isHovered = false,
  onHover,
  onLeave,
}: Props) {
  return (
    <li
      className={`flex w-full max-w-[291px] flex-col items-center justify-center gap-2.5 rounded-2xl py-6 transition-colors lg:p-3.5 ${
        isHovered ? "bg-[#F4F4F4]" : isFirst ? "bg-white" : "bg-[#9c83bd]"
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
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
      <Text className="text-center text-[18px] leading-[140%]">
        {item.metricTitle}
      </Text>
    </li>
  );
}
