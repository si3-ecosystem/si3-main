import { Card } from "@/components/atoms/card";
import { Text } from "@/components/atoms/text";
import { Title } from "@/components/atoms/title";
import { OurPurposeCard } from "@/components/molecules/cards/OurPurposeCard";
import { AboutQuery } from "@/types/about";

type Props = {
  data: AboutQuery;
};

export function OurPurpose({ data }: Props) {
  return (
    <Card className="@container !z-20 mx-auto w-full max-w-[1083px] rounded-none !border-2 !border-white px-4 py-8 pb-16 max-lg:border-none max-lg:shadow-none lg:-mt-72 lg:rounded-2xl lg:p-14 lg:py-16">
      <Title className="z-50">{data.our_purpose_title}</Title>
      <Text variant="xl" className="z-20 mb-10 w-full">
        {data?.our_purpose_description
          ?.split(".")
          .map((sentence, index, arr) => {
            const trimmed = sentence.trim();
            if (!trimmed) return null; // skip empty
            return (
              <span key={index}>
                {trimmed}
                {index < arr.length - 1 ? "." : ""}
                {index < arr.length - 1 && <br />}
              </span>
            );
          })}
      </Text>

      <ul className="z-20 grid grid-cols-1 gap-6 @xl:grid-cols-2 @3xl:grid-cols-4">
        {data.purposes.map((item, key) => (
          <OurPurposeCard item={item} key={key} />
        ))}
      </ul>
    </Card>
  );
}
