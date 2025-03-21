import { Text } from "@/components/atoms/text";
import { Title } from "@/components/atoms/title";
import { Hero } from "@/types/about";

type Props = {
  data: Hero;
};

export function HeaderSection({ data }: Props) {
  return (
    <section className="about_gradient h-full min-h-[70vh] w-full lg:min-h-[861px]">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
      >
        <source
          src={data.heroVideo?.videoUrl || "/videos/SiUScholars.mp4"}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="mx-auto flex h-full min-h-[70vh] w-full max-w-[1440px] flex-col justify-center gap-3 px-4 lg:min-h-[80vh] lg:px-[90px]">
        <Title
          as="h1"
          variant="large"
          className="max-w-[608.951px] !text-left !leading-none text-white"
        >
          {data.title}
        </Title>
        <Text variant="2xl" className="text-left text-white">
          {data.description}
        </Text>
      </div>
    </section>
  );
}
