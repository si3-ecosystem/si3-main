import { Card } from "@/components/atoms/card";
import { Text } from "@/components/atoms/text";
import Image from "next/image";

type Props = {
  item: {
    title: string;
    desc: string;
    img: string;
  };
};

export function OurPurposeCard({ item }: Props) {
  return (
    <Card className="flex flex-col gap-4 p-6">
      <div>
        <Image
          src={item.img}
          alt={item.title}
          width={400}
          height={400}
          className="h-24 w-24"
        />
      </div>
      <Text className="font-semibold text-black">{item.title}</Text>
      <Text>{item.desc}</Text>
    </Card>
  );
}
