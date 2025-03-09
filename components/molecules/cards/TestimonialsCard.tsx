import { Card } from "@/components/atoms/card";
import Image from "next/image";

type Props = {
  item: {
    image: string;
    author: string;
    quote: string;
    role: string;
    companyLogo: string;
    companyName: string;
  };
};

export function TestimonialsCard({ item }: Props) {
  return (
    <Card className="bg-[#F6F2F2] p-4">
      <div className="flex flex-col items-start gap-8 @3xl:flex-row">
        <div className="relative aspect-square h-full overflow-hidden rounded-lg @3xl:w-full @3xl:max-w-[257.892px]">
          <Image
            src={item.image}
            alt={item.author}
            fill
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex h-full w-full flex-col justify-between @3xl:flex-row">
          <div>
            <div className="font-serif text-2xl leading-normal lg:text-4xl">
              {"''"}
            </div>
            <blockquote className="mb-6 text-lg lg:mb-7 lg:text-2xl">
              {item.quote}
            </blockquote>
            <div className="flex flex-col items-center justify-between @3xl:flex-row">
              <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-[#454545] lg:text-lg">
                <div className="">{item.author}</div>,
                <div className="">{item.role}</div>
              </div>
              <div className="relative flex h-8 w-full max-w-[148.854px] items-center justify-end">
                <Image
                  src={item.companyLogo}
                  alt={item.companyName}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
