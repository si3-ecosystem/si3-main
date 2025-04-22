import { AspectRatio } from "@/components/atoms/aspect-ratio";
import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { Text } from "@/components/atoms/text";
import { PartnerProgramForm } from "@/components/molecules/forms/PartnerProgramForm";
import { urlForImage } from "@/lib/sanity/image";
import { OnboardMaterial } from "@/types/onboard";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  data: OnboardMaterial;
};

export function Partners({ data }: Props) {
  const imageUrl = data?.thumbnail
    ? urlForImage(data.thumbnail)?.src
    : "/icons/jpg/si_u_scholars_heroimage.jpg";
  const logoUrl = data?.image && urlForImage(data.image)?.src;

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
          <div className="flex w-full items-center justify-between gap-4">
            <div>
              <Text as={"h2"} variant="2xl" className="text-black">
                {data.title}
              </Text>
              <Text className="!text-sm">{data.subtitle}</Text>
            </div>
            <div className="relative h-11 w-11 overflow-hidden rounded-2xl">
              {data?.image && (
                <Image
                  src={logoUrl || "/icons/jpg/si_u_scholars_heroimage.jpg"}
                  fill
                  loading="lazy"
                  decoding="async"
                  alt="scholars"
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </div>
          <Text variant="xl" as={"p"} className="mb-16 tracking-tight">
            {data.description}
          </Text>
          <div className="flex w-full items-center justify-between gap-2 overflow-hidden lg:gap-4">
            <div className="w-full">
              <PartnerProgramForm showGradient className="text-white" />
            </div>
            <Button
              showGradient
              asChild
              variant={"outline"}
              aria-label="Login Button"
              className="w-full max-w-[96px] border border-gray-400 bg-white !py-2 text-black"
            >
              <Link className="flex items-center gap-2" href={"/login"}>
                Login
                <MoveRight />
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}
