import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar";
import { Card } from "@/components/atoms/card";
import { Text } from "@/components/atoms/text";
import Image from "next/image";

function Presenters() {
  return (
    <div className="flex w-full items-center justify-between gap-2 rounded-full bg-[#eeeeee] p-2">
      <Avatar className="size-9 h-10 w-10">
        <AvatarImage
          className="size-9 h-9 w-9"
          src="./avatar-80-07.jpg"
          alt="Kelly King"
        />
        <AvatarFallback className="h-full w-full bg-[#D9D9D9]"></AvatarFallback>
      </Avatar>
      <div>
        <Text className="leading-normal font-medium">Emily Carrig</Text>
        <Text className="line-clamp-1 text-sm leading-4 font-medium whitespace-pre-wrap opacity-50">
          Founder & editor-in-chief
        </Text>
      </div>
      <div>
        <Image
          src={"/icons/jpg/polygon.jpg"}
          width={64}
          height={16}
          alt="polygon"
          className="h-auto w-full max-w-16 object-cover"
        />
      </div>
    </div>
  );
}

export function ProgrammingCard() {
  return (
    <Card className="flex h-full w-full cursor-pointer flex-col justify-between gap-8 overflow-hidden rounded-2xl border border-[#D1D1D1] p-6 transition-all duration-300 !ease-in-out hover:shadow-lg sm:!w-[391px]">
      <div className="flex flex-col gap-4">
        <div className="relative h-[259px] w-full overflow-hidden rounded-lg">
          <Image
            src={"/icons/jpg/pink-beauty.jpg"}
            alt={"alt"}
            width={600}
            height={400}
            className="z-0 h-full w-full object-cover"
          />
        </div>
        <div className="mb-6">
          <Text variant="2xl" className="font-semibold">
            Si Her Thought Lead
          </Text>

          <Text className="leading-5 font-normal tracking-[1.7px] text-[#454545]">
            Join Anupa Dasgupta, Strategy and Design Lead at Role Model Rebels,
            and Emily Carrig, Founder & Editor-In-Chief at True Stars, as they
            share insights on the emerging tech media landscape and how to
            develop oneself as a thought leader in the industry. Explore how Si
            Her members can become thought leaders and writers for two women in
            Web3-led organizations, and amplify your content through your Si Her
            Web3 page.
          </Text>
        </div>
        <ul className="grid w-full gap-1">
          {Array.from({ length: 3 }).map((item, key) => (
            <Presenters key={key} />
          ))}
        </ul>
      </div>
    </Card>
  );
}
