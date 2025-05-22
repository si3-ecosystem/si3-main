import { DiversityTrackerForm } from "@/components/molecules/forms/DiversityTrackerForm";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { DiversityTracker } from "@/types/diversity-tracker";
import { DiversityTrackerChart } from "./DiversityTrackerChart";

export function DiversityTrackerFormSection({
  showChart,
  setShowChart,
  data,
}: {
  showChart: boolean;
  setShowChart: React.Dispatch<React.SetStateAction<boolean>>;
  data?: DiversityTracker;
}) {
  const handleFormSuccess = () => {
    // Save to localStorage when form is submitted
    if (typeof window !== "undefined") {
      localStorage.setItem("diversityTrackerChartShown", "true");
    }
    setShowChart(true);
  };
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-8 lg:px-24">
      <div className="flex w-full flex-col gap-2 rounded-lg bg-white">
        <div className={cn(showChart ? "mt-8" : "mt-16")}>
          {!showChart ? (
            <>
              <DiversityTrackerForm onSuccess={handleFormSuccess} />
              <p className="mx-auto mt-14 w-full max-w-[782px] pb-20 text-center lg:pb-16">
                By clicking the submit button, I hereby agree to and accept the
                following{" "}
                <Link
                  href={"/policy/diversity-tracker-policy"}
                  className="text-primary"
                  target="_blank"
                >
                  terms and conditions
                </Link>{" "}
                governing my use of the {"SI<3>"} website. I further reaffirm my
                acceptance of the general{" "}
                <Link
                  href={"/policy/diversity-tracker-policy"}
                  className="text-primary"
                  target="_blank"
                >
                  terms and conditions
                </Link>{" "}
                &{" "}
                <Link
                  href={"/policy/privacy"}
                  className="text-primary"
                  target="_blank"
                >
                  privacy policy
                </Link>{" "}
                governing my use of any website controlled by {"SI<3>"} and
                understand the use of my data.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-brand text-center text-sm font-medium">
                {data?.description}
              </h1>
              <p className="text-center text-2xl font-medium text-black">
                {data?.title}
              </p>
              <DiversityTrackerChart />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
