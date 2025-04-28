import { DiversityTrackerForm } from "@/components/molecules/forms/DiversityTrackerForm";
import Link from "next/link";

export function DiversityTrackerFormSection() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-8 lg:px-24">
      <DiversityTrackerForm />
      <p className="mx-auto mt-14 w-full max-w-[782px] pb-20 text-center lg:pb-16">
        By clicking the submit button, I hereby agree to and accept the
        following{" "}
        <Link
          href={"https://si3.sanity.studio/structure/diversityTrackerPolicy"}
          className="text-primary"
          target="_blank"
        >
          terms and conditions
        </Link>{" "}
        governing my use of the {"Si<3>"} website. I further reaffirm my
        acceptance of the general{" "}
        <Link
          href={"https://si3.sanity.studio/structure/diversityTrackerPolicy"}
          className="text-primary"
          target="_blank"
        >
          terms and conditions
        </Link>{" "}
        &{" "}
        <Link
          href={"https://si3.sanity.studio/structure/privacyPolicy"}
          className="text-primary"
          target="_blank"
        >
          privacy policy
        </Link>{" "}
        governing my use of any website controlled by {"SI<3>"} and understand
        the use of my data.
      </p>
    </section>
  );
}
