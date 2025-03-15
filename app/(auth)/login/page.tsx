import React from "react";
import LoginLeft from "@/components/organisms/login/LoginLeft";
import Image from "next/image";

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
