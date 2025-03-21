import React from "react";
import Image from "next/image";

import LoginLeft from "@/components/organisms/auth/login/LoginLeft";

const Login: React.FC = () => {
  return (
    <main className="flex flex-col md:h-screen md:flex-row">
      <LoginLeft />

      <div className="relative min-h-96 w-full md:block md:w-1/2">
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
