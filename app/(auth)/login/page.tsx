import React from "react";

import LoginLeft from "@/components/organisms/auth/login/LoginLeft";
import Image from "next/image";

const Login: React.FC = () => {
  return (
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
};

export default Login;
