import { AspectRatio } from "@/components/atoms/aspect-ratio";
import { Card } from "@/components/atoms/card";
import { Text } from "@/components/atoms/text";
import { PartnerProgramForm } from "@/components/molecules/forms/PartnerProgramForm";
import { urlForImage } from "@/lib/sanity/image";
import { OnboardMaterial } from "@/types/onboard";
import Image from "next/image";

type Props = {
  data: OnboardMaterial;
};

export function Partners({ data }: Props) {
  const imageUrl = data?.thumbnail
    ? urlForImage(data.thumbnail)?.src
    : "/icons/jpg/si_u_scholars_heroimage.jpg";
  return (
    <>
      <Card className="hover:border-primary flex h-full w-full flex-col gap-6 border border-[#D1D1D1] p-5">
        <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-2xl">
          <Image
            src={imageUrl || "/icons/jpg/si_u_scholars_heroimage.jpg"}
            fill
            {...(data?.thumbnail?.blurDataURL && {
              placeholder: "blur",
              blurDataURL: data?.thumbnail?.blurDataURL,
            })}
            loading="lazy"
            decoding="async"
            alt="scholars"
            className="h-full w-full object-cover"
          />
        </AspectRatio>
        <div className="flex flex-col gap-6">
          <Text as={"h2"} variant="2xl" className="text-black">
            {data.title}
          </Text>
          <Text variant="xl" as={"p"} className="tracking-tight">
            {data.description}
          </Text>
          <PartnerProgramForm />
        </div>
      </Card>
    </>
  );
}
