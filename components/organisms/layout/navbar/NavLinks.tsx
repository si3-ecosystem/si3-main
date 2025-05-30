import Link from "next/link";
import { navItems } from "@/constants/navLinks";

export function NavLinks() {
  return (
    <ul className="nav-gradient flex h-full w-full max-w-[517px] items-center justify-center gap-[22px] rounded-[22px] !bg-[#4C1192] px-4 max-lg:hidden">
      {navItems.map((item, index) => (
        <li key={index} className="group relative overflow-hidden rounded-full">
          <Link
            href={item.path}
            className="relative z-10 flex w-full items-center justify-center px-[22px] py-3 leading-6 font-medium whitespace-nowrap text-white transition-colors"
          >
            {item.name}
          </Link>
          <div className="absolute inset-0 translate-x-[-110%] rounded-full bg-gradient-to-r from-[#9F44D3] to-[#D939CD] transition-transform duration-500 ease-out group-hover:translate-x-0 group-active:translate-x-0"></div>
        </li>
      ))}
    </ul>
  );
}
