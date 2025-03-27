import Image from "next/image";

export function HeroDiversityTracker() {
  return (
    <section className="relative flex min-h-[300px] items-center bg-gradient-to-r from-[#B3F1FF] to-[#DFD8FA] p-8 lg:min-h-[493px]">
      <div className="mx-auto flex max-w-[1440px] flex-1 flex-col items-center justify-between gap-y-3 md:flex-row lg:px-24">
        <div className="max-w-3xl flex-1">
          <p className="mb-4 text-xl leading-[140%] text-gray-800 max-md:text-center">
            ECOSYSTEMS FLOURISH WITH DIVERSITY
          </p>
          <h1 className="font-clesmont text-center text-4xl leading-[120%] font-black sm:text-[40px] sm:leading-10 md:text-left">
            DIVERSITY TRACKER
          </h1>

          <p className="mt-6 max-w-[500px] text-xl leading-[140%] text-gray-600 max-md:text-center">
            Share your demographic data (anonymously) to improve diversity,
            equity, accessibility and inclusion metrics in Web3.
          </p>
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
