import { FooterSignUp } from "./footer/FooterSignUp";
import { FooterNav } from "./footer/FooterNav";
import { FollowUs } from "./footer/FollowUs";
import { Copyright } from "./footer/Copyright";

export const Footer = () => {
  return (
    <footer className="relative border-t border-gray-400 bg-white max-lg:py-6 lg:-mt-4">
      <div
        id="stayConnected"
        className="mx-auto w-full max-w-[1440px] px-4 lg:flex lg:px-24"
      >
        <FooterSignUp />
        <FooterNav />
        <FollowUs />
      </div>
      <Copyright />
    </footer>
  );
};
