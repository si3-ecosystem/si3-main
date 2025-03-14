import { AspectRatio } from "@/components/atoms/aspect-ratio";
import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { Text } from "@/components/atoms/text";
import Image from "next/image";

export function Scholars() {
  return (
    <Card className="hover:border-primary flex h-full w-full flex-col gap-6 border border-[#D1D1D1] p-5">
      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-2xl">
        <Image
          src={"/icons/jpg/si_u_scholars_heroimage.jpg"}
          fill
          loading="lazy"
          decoding="async"
          alt="scholars"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
      <div className="flex flex-col gap-6">
        <Text as={"h2"} variant="2xl" className="text-black">
          SI U Scholars
        </Text>
        <Text variant="xl" as={"p"} className="tracking-tight">
          Discover our emerging tech community network and grow professionally,
          while immersing yourself in free education.
        </Text>
        <Button variant={"outline"} className="w-full">
          Join Now
        </Button>
      </div>
    </Card>
  );
}
