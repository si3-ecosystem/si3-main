import { Spinner } from "@/components/atoms/Spinner";

export default function loading() {
  return (
    <section className="flex h-screen items-center justify-center">
      <Spinner />
    </section>
  );
}
