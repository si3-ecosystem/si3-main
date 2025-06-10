import React from "react";

import LoginMain from "./LoginMain";

const LoginLeft = () => {
  return (
    <div className="no-scrollbar min-h-screen overflow-y-scroll pt-[65px] pl-6 max-sm:pb-[65px] sm:pt-8 sm:pl-[120px]">
      {/* <RedirectBack /> */}
      <LoginMain />
    </div>
  );
};

export default LoginLeft;
