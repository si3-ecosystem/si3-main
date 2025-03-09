import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { Text } from "@/components/atoms/text";
import { MapPin } from "lucide-react";
import Image from "next/image";

export function SpotlightCard() {
  return (
    <Card className="flex h-auto w-full cursor-pointer flex-col justify-between gap-8 overflow-hidden rounded-2xl border border-[#D1D1D1] p-6 transition-all duration-300 !ease-in-out hover:shadow-lg sm:!w-[391px]">
      <div className="flex flex-col gap-4">
        <div className="group relative h-[303.924px] w-full overflow-hidden rounded-lg">
          <Image
            src={"/icons/jpg/pink-beauty.jpg"}
            alt={"alt"}
            width={600}
            height={400}
            className="z-0 h-full w-full object-cover transition-all duration-300 ease-in group-hover:scale-[1.02]"
          />
        </div>
        <div>
          <Text variant="2xl" className="font-semibold">
            Kara Howard
          </Text>
          <div className="mb-4 flex items-center gap-5">
            <Text className="flex items-center gap-2 text-[#696969]">
              <MapPin className="size-6" />
              MEXICO
            </Text>
            <Text className="flex items-center gap-2 text-[#696969]">
              <MapPin className="size-6" />
              Developer
            </Text>
          </div>
          <Text className="font-normal tracking-[1.7px]">
            Lorem ipsum dolor sit amet consectetur.
          </Text>
        </div>
      </div>
      <div className="w-full">
        <Button variant={"outline"} className="w-full border-2 border-black">
          kara.siher.eth
        </Button>
      </div>
    </Card>
  );
}
