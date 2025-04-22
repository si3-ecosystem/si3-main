import React from "react";

import LoginLeft from "@/components/organisms/auth/login/LoginLeft";

const Login: React.FC = () => {
  return (
    <main className="flex h-screen w-screen items-start justify-center bg-[#f6f6f6] md:items-center">
      <LoginLeft />
    </main>
  );
};

export default Login;
