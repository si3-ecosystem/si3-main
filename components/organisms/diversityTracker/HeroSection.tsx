import Image from "next/image";

export function HeroDiversityTracker() {
  return (
    <section className="relative flex min-h-[300px] items-center bg-gradient-to-r from-[#B3F1FF] to-[#DFD8FA] p-8 lg:min-h-[493px]">
      <div className="mx-auto flex max-w-[1440px] flex-1 flex-col items-center justify-between gap-y-3 px-4 md:flex-row lg:px-24">
        <div className="max-w-3xl flex-1">
          <h1 className="font-clesmont text-center text-4xl leading-[120%] font-black sm:text-[40px] sm:leading-10 md:text-left">
            ECOSYSTEMS FLOURISH WITH DIVERSITY
          </h1>
        </div>
        <div className="w-full max-w-[200.245px] sm:max-w-[384.589px]">
          <Image
            src="/diversity/heroSection.png"
            alt="Image"
            width={334.035}
            priority
            height={267.867}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
