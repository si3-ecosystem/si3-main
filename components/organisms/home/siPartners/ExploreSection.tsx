import { ExplorePartnersCard } from "@/components/molecules/cards/ExplorePartnersCard";
import { ExploreItem } from "@/types/home";

type Props = {
  data: ExploreItem[];
};

export function ExploreSection({ data }: Props) {
  return (
    <ul className="mt-16 grid gap-4">
      {data?.map((item, key) => <ExplorePartnersCard item={item} key={key} />)}
    </ul>
  );
}
