import { AboutQuery } from "@/types/about";
import { HeaderSection } from "./HeaderSection";
import { OurPurpose } from "./OurPurpose";

type Props = {
  data: AboutQuery;
};

export function HeroSection({ data }: Props) {
  return (
    <div className="">
      <HeaderSection data={data.about_hero} />
      <OurPurpose data={data} />
    </div>
  );
}
