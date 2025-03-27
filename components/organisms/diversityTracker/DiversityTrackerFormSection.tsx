import { DiversityTrackerForm } from "@/components/molecules/forms/DiversityTrackerForm";
import Link from "next/link";

export function DiversityTrackerFormSection() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-8 lg:px-24">
      {/* <div className="mb-14 flex flex-col items-center justify-center gap-2">
        <p className="text-primary text-center text-sm font-medium">
          CREATORS. BUILDERS. COMMUNITIES.
        </p>
        <h2 className="font-clesmont text-center text-[32px] text-black lg:text-2xl lg:font-medium">
          A DIVERSITY TRACKER
        </h2>
      </div> */}
      <DiversityTrackerForm />
      <p className="mx-auto mt-14 w-full max-w-[782px] pb-20 text-center lg:pb-16">
        By clicking the submit button, I hereby agree to and accept the
        following{" "}
        <Link href={"/terms"} className="text-primary">
          terms and conditions
        </Link>{" "}
        governing my use of the {"Si<3>"} website. I further reaffirm my
        acceptance of the general{" "}
        <Link href={"/terms"} className="text-primary">
          terms and conditions
        </Link>{" "}
        &{" "}
        <Link href={"/privacy"} className="text-primary">
          privacy policy
        </Link>{" "}
        governing my use of any website controlled by {"SI<3>"} and understand
        the use of my data.
      </p>
    </section>
  );
}
