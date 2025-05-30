import { Title } from "@/components/atoms/title";
import { FaqAccordion } from "@/components/molecules/accordions/FaqAccordion";
import { FAQ } from "@/types/home";

export function FaqSection({
  faqTitle,
  faqs,
}: {
  faqTitle: string;
  faqs: FAQ[];
}) {
  return (
    <section className="w-full pb-[125px]">
      <div className="layout @container space-y-[30px] lg:space-y-10">
        <Title className="text-center text-[32px] text-white lg:text-[50px]">
          {faqTitle}
        </Title>
        <FaqAccordion faqs={faqs} />
      </div>
    </section>
  );
}
