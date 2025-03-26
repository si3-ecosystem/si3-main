import React from "react";

import LoginMain from "./LoginMain";

const LoginLeft = () => {
  return (
    <div className="hide-scroll w-full px-4 py-10 sm:p-10 md:h-screen md:overflow-y-scroll lg:w-1/2">
      <LoginMain />
    </div>
  );
};

export default LoginLeft;
