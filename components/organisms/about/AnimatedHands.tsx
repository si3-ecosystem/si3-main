import Image from "next/image";

export function AnimatedHands() {
  return (
    <section className="flex h-[40vh] items-center justify-between gap-6 sm:h-[70vh]">
      <div className="flex h-full w-full items-end justify-start">
        <Image
          src={"/about/hands/left_hand.jpg"}
          alt="left hand"
          width={800}
          height={800}
          loading="lazy"
          decoding="async"
          className="h-full max-h-[180.577px] w-full max-w-[180.577px] object-contain object-left sm:max-h-[392.348px] sm:max-w-[448.255px]"
        />
      </div>
      <div className="flex h-full w-full items-center justify-center">
        <Image
          src={"/about/hands/centerlogo.jpg"}
          alt="left hand"
          width={800}
          height={800}
          loading="lazy"
          decoding="async"
          className="h-full max-h-[141.273px] w-full max-w-[141.273px] object-contain sm:object-cover lg:max-h-[261px] lg:max-w-[261px]"
        />
      </div>
      <div className="flex h-full w-full items-start justify-end max-sm:-mt-32">
        <Image
          src={"/about/hands/right_hand.jpg"}
          alt="left hand"
          width={800}
          height={800}
          loading="lazy"
          decoding="async"
          className="-mr-9 h-full max-h-[205.632px] w-full max-w-[213.522px] object-contain object-right sm:max-h-[392.348px] sm:max-w-[448.255px]"
        />
      </div>
    </section>
  );
}
