import React from "react";

import FollowUs from "./footer/FollowUs";
import Copyright from "./footer/Copyright";
import FooterNav from "./footer/FooterNav";
import FooterSignUp from "./footer/FooterSignUp";
import FooterLanguage from "./footer/FooterLanguage";

export function Footer() {
  return (
    <footer>
      <div className="flex">
        <div>
          <FooterSignUp />
          <FooterLanguage />
        </div>

        <FooterNav />
        <FollowUs />
      </div>

      <Copyright />
    </footer>
  );
}
