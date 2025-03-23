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
    <Card className="@container mx-auto w-full max-w-[1083px] rounded-none px-4 py-8 pb-16 max-lg:border-none max-lg:shadow-none lg:-mt-72 lg:rounded-2xl lg:p-14 lg:py-16">
      <Title className="mb-4">{data.our_purpose_title}</Title>
      <Text variant="xl" className="mb-14 max-w-[570px]">
        {data.our_purpose_description}
      </Text>

      <ul className="grid grid-cols-1 gap-6 @xl:grid-cols-2 @3xl:grid-cols-4">
        {data.purposes.map((item, key) => (
          <OurPurposeCard item={item} key={key} />
        ))}
      </ul>
    </Card>
  );
}
