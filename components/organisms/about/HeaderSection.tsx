import { Text } from "@/components/atoms/text";
import { Title } from "@/components/atoms/title";
import { urlForImage } from "@/lib/sanity/image";
import { Hero } from "@/types/about";
import Image from "next/image";

type Props = {
  data: Hero;
};

export function HeaderSection({ data }: Props) {
  const imageUrl = data?.image
    ? urlForImage(data.image)?.src
    : "/about/hero/about_herobg.jpg";
  return (
    <section className="about_gradient h-full min-h-[70vh] w-full lg:min-h-[861px]">
      <Image
        src={imageUrl || "/about/hero/about_herobg.jpg"}
        fill
        {...(data.image?.blurDataURL && {
          placeholder: "blur",
          blurDataURL: data.image?.blurDataURL,
        })}
        alt="about_hero"
        priority
        className="object- -z-10 h-full w-full object-top pt-16"
      />
      <div className="flex h-full min-h-[70vh] w-full max-w-[1440px] flex-col justify-center gap-3 px-4 lg:min-h-[80vh] lg:px-[90px]">
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
