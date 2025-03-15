import { Spinner } from "@/components/atoms/Spinner";

export function Loader() {
  return (
    <section className="flex h-screen items-center justify-center">
      <Spinner />
    </section>
  );
}
