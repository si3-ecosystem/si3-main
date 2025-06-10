import { InitialLoader } from "@/components/atoms/InitialLoader";
import { Loader } from "@/components/atoms/Loader";
import LoginLeft from "@/components/organisms/auth/login/LoginLeft";
import Image from "next/image";
import { Suspense } from "react";

export default async function OnboardPage() {
  const pageContent = (
    <Suspense fallback={<Loader />}>
      <main className="hide-scroll flex h-full min-h-screen w-screen overflow-hidden">
        <Image
          src={"/login/Loginpagebg.png"}
          alt="Login Page Background"
          fill
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <LoginLeft />
      </main>
    </Suspense>
  );

  return <InitialLoader>{pageContent}</InitialLoader>;
}
