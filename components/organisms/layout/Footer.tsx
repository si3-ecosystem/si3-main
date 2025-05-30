import { FooterSignUp } from "./footer/FooterSignUp";
import { FooterNav } from "./footer/FooterNav";
import { FollowUs } from "./footer/FollowUs";
import { Copyright } from "./footer/Copyright";

export const Footer = () => {
  return (
    <footer className="relative border-t border-gray-400 bg-white max-lg:pt-6 lg:-mt-4">
      <div id="stayConnected" className="layout mx-auto w-full lg:flex">
        <FooterSignUp />
        <FooterNav />
        <FollowUs />
      </div>
      <Copyright />
    </footer>
  );
};
