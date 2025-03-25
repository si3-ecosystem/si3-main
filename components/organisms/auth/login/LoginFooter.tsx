import React from "react";
import Link from "next/link";

const LoginFooter = () => {
  return (
    <p className="mt-2 mb-5 text-base text-gray-500">
      New to Si&lt;3&gt;? Discover our{" "}
      <Link href="/" className="font-semibold text-purple-500 underline">
        Ecosystem Pathways
      </Link>
      .
    </p>
  );
};

export default LoginFooter;
