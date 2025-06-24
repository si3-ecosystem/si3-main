import LoginLeft from "@/components/organisms/auth/login/LoginLeft";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Get Started | SI<3> Ecosystem",
  description:
    "Join SI<3> Ecosystem and start your journey with our community of women and non-binary leaders in web3.",
  openGraph: {
    title: "Get Started | SI<3> Ecosystem",
    description:
      "Join SI<3> Ecosystem and start your journey with our community of women and non-binary leaders in web3.",
    images: [
      {
        url: "/onboard.png",
        width: 1200,
        height: 630,
        alt: "SI<3> Get Started - Join Our Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Started | SI<3> Ecosystem",
    description:
      "Join SI<3> Ecosystem and start your journey with our community of women and non-binary leaders in web3.",
    images: ["/onboard.png"],
  },
};
export default async function OnboardPage() {
  const pageContent = (
    <main className="hide-scroll flex h-full min-h-screen w-screen overflow-hidden">
      <Image
        src={"/login/Loginpagebg.png"}
        alt="Login Page Background"
        fill
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <LoginLeft />
    </main>
  );

  return <>{pageContent}</>;
}
