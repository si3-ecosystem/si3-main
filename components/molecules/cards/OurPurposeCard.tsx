import { Card } from "@/components/atoms/card";
import { Text } from "@/components/atoms/text";
import { urlForImage } from "@/lib/sanity/image";
import { Purpose } from "@/types/about";
import Image from "next/image";

type Props = {
  item: Purpose;
};

export function OurPurposeCard({ item }: Props) {
  const imageUrl = item.image
    ? urlForImage(item.image)?.src
    : "/about/purpose/AccessibleIcon.svg";
  return (
    <Card className="flex flex-col gap-4 p-6">
      <div>
        <Image
          src={imageUrl || "/about/purpose/AccessibleIcon.svg"}
          alt={item.title}
          {...(item.image?.blurDataURL && {
            placeholder: "blur",
            blurDataURL: item.image?.blurDataURL,
          })}
          width={400}
          height={400}
          className="h-24 w-24"
        />
      </div>
      <Text className="font-semibold text-black">{item.title}</Text>
      <Text>{item.description}</Text>
    </Card>
  );
}
