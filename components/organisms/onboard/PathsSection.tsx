import { OnboardSchema } from "@/types/onboard";
import { Guides } from "./paths/Guides";
import { Partners } from "./paths/Partners";
import { Scholars } from "./paths/Scholars";
import { Title } from "@/components/atoms/title";

type Props = {
  data: OnboardSchema;
};

export function PathsSection({ data }: Props) {
  return (
    <section className="@container mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 py-16 lg:px-24 lg:py-24">
      <Title className="text-2xl max-lg:text-center lg:text-2xl">
        Choose Your Pathway...
      </Title>

      <ul className="grid grid-cols-1 gap-8 @3xl:grid-cols-3">
        <Scholars data={data.onboard_materials[0]} />
        <Guides data={data.onboard_materials[1]} />
        <Partners data={data.onboard_materials[2]} />
      </ul>
    </section>
  );
}
