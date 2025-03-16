import React from "react";
import Image from "next/image";

import LoginLeft from "@/components/organisms/login/LoginLeft";

const Login: React.FC = () => {
  return (
    <main className="flex h-screen">
      <LoginLeft />

      <div className="relative w-1/2">
        <Image
          src="/login/login-bg.png"
          alt=""
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    </main>
  );
};

export default Login;
