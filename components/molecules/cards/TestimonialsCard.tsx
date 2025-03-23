import { Card } from "@/components/atoms/card";
import { urlForImage } from "@/lib/sanity/image";
import { Testimonial } from "@/types/home";
import Image from "next/image";
import { QuotIcon } from "../icons/Quot";

type Props = {
  item: Testimonial;
};

export function TestimonialsCard({ item }: Props) {
  const imageUrl = item.image && urlForImage(item.image)?.src;

  const companyLogo = item.companyLogo && urlForImage(item.companyLogo)?.src;
  return (
    <Card className="!h-full bg-[#F6F2F2] p-4">
      <div className="flex h-full flex-col items-start gap-8 @3xl:flex-row">
        <div className="relative aspect-square h-full overflow-hidden rounded-lg @3xl:w-full @3xl:max-w-[257.892px]">
          <Image
            src={imageUrl || "/icons/jpg/testimonial.jpg"}
            alt={item.name || "name"}
            fill
            className="h-full max-h-[257.892px] w-full max-w-[257.892px] object-contain"
          />
        </div>
        <div className="flex h-full w-full flex-col justify-between @3xl:flex-row">
          <div>
            <div className="mb-2 font-serif text-2xl leading-normal lg:text-4xl">
              <QuotIcon />
            </div>
            {item.excerpt && (
              <h4 className="mb-4 text-[32px] leading-10 font-semibold">
                {item.excerpt}
              </h4>
            )}
            <blockquote className="mb-6 text-lg lg:text-2xl">
              {item.description}
            </blockquote>
            <div className="flex flex-col items-center justify-between @3xl:flex-row">
              <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-[#454545] lg:text-lg">
                <div className="">{item.name}</div>
                <div className="">{item.title}</div>
              </div>

              {companyLogo && (
                <div className="relative flex h-8 w-full max-w-[148.854px] items-center justify-end">
                  <Image
                    src={companyLogo}
                    alt={item.companyName}
                    width={600}
                    height={400}
                    className="max-h-[33.906px] max-w-[148.854px] object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
