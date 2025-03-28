import { Title } from "@/components/atoms/title";
import { ImpactCard } from "@/components/molecules/cards/ImpactCard";
import { HomepageSchema } from "@/types/home";

type Props = {
  HomePageData: HomepageSchema;
};

export function OurImpact({ HomePageData }: Props) {
  return (
    <div className="@container mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 py-16 lg:px-24 lg:py-20">
      <Title className="text-center">{HomePageData.impact.title}</Title>
      <ul className="mx-auto grid w-full max-w-[931px] grid-cols-1 gap-7 @xl:grid-cols-3">
        {HomePageData?.impact?.metrics?.map((item, index) => (
          <ImpactCard item={item} key={index} />
        ))}
      </ul>
    </div>
  );
}
