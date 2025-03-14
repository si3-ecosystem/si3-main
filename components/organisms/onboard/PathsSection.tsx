import { Guides } from "./paths/Guides";
import { Partners } from "./paths/Partners";
import { Scholars } from "./paths/Scholars";

export function PathsSection() {
  return (
    <section className="@container mx-auto w-full max-w-[1440px] px-4 py-16 lg:px-24 lg:py-24">
      <ul className="grid grid-cols-1 gap-8 @3xl:grid-cols-3">
        <Scholars />
        <Guides />
        <Partners />
      </ul>
    </section>
  );
}
