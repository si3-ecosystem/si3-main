import React from "react";

import LoginMain from "./LoginMain";

const LoginLeft = () => {
  return (
    <div className="hide-scroll h-screen w-full overflow-y-scroll px-4 py-10 sm:p-10 lg:w-1/2">
      <LoginMain />
    </div>
  );
};

export default LoginLeft;
