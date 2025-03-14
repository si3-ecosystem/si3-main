import { AspectRatio } from "@/components/atoms/aspect-ratio";
import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { Text } from "@/components/atoms/text";
import Image from "next/image";

export function Guides() {
  return (
    <Card className="hover:border-primary flex h-full w-full flex-col gap-6 border border-[#D1D1D1] p-5">
      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-2xl">
        <Image
          src={"/icons/jpg/si_her_guides_heroimage.jpg"}
          fill
          loading="lazy"
          decoding="async"
          alt="scholars"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
      <div className="flex flex-col gap-6">
        <Text as={"h2"} variant="2xl" className="text-black">
          Si Her Guides
        </Text>
        <Text variant="xl" as={"p"} className="tracking-tight">
          Advanced Web3 education and professional development resources to
          accelerate women & non-binary leaders as guides.
        </Text>
        <Button variant={"outline"} className="w-full">
          Join Now
        </Button>
        <Text variant="base" as={"p"} className="text-center text-[#585858]">
          $300 USD one-time fee
        </Text>
      </div>
    </Card>
  );
}
