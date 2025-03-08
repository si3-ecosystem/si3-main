import { Button } from "@/components/atoms/button";
import { Logo } from "@/components/atoms/Logo";
import { Profile } from "./navbar/Profile";
import { Notification } from "./navbar/Notification";
import Subscribe from "./navbar/Subscribe";
import { MobileMenu } from "./navbar/MobileMenu";

export function Navbar() {
  return (
    <header className="w-full border border-white">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 py-4 lg:px-24">
        <div>
          <Logo src="/logo.svg" />
        </div>
        <nav className="flex items-center gap-3">
          <Notification />
          <div className="flex items-center gap-3 max-lg:hidden">
            <Subscribe>
              <Button showGradient>Subscribe</Button>
            </Subscribe>
            <Profile />
          </div>
          <div className="lg:hidden">
            <MobileMenu />
          </div>
        </nav>
      </div>
    </header>
  );
}
