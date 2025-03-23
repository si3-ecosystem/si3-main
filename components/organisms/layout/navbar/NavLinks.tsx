import Link from "next/link";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Diversity Tracker", path: "/diversity-tracker" },
];
export function NavLinks() {
  return (
    <ul className="flex h-full w-full flex-1 items-center justify-center gap-6">
      {navItems.map((item, index) => (
        <li
          key={index}
          className="hover:text-primary leading-6 text-black transition-colors"
        >
          <Link href={item.path}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
}
