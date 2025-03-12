import { Button } from "@/components/atoms/button";
import Logo from "@/components/atoms/Logo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/atoms/sheet";

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="group h-full w-full rounded-full bg-black p-2">
          <svg
            className="pointer-events-none size-6"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12L20 12"
              className="origin-center -translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
            />
            <path
              d="M4 12H20"
              className="origin-center transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
            />
            <path
              d="M4 12H20"
              className="origin-center translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
            />
          </svg>
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="h-full w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="!p-6">
            <Logo src="/logo.svg" />
          </SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col justify-between space-y-4 p-6">
          <div className="h-full flex-1 space-y-4">
            <Button
              variant="outline"
              className="w-full justify-start rounded-lg"
              onClick={() => alert("Explore Web3 clicked")}
            >
              Explore Web3
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start rounded-lg"
              onClick={() => alert("Build Web3 clicked")}
            >
              Build Web3
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start rounded-lg"
              onClick={() => alert("Lead Web3 clicked")}
            >
              Lead Web3
            </Button>
          </div>
          <div>
            <Button
              variant="outline"
              className="mt-6 w-full rounded-md bg-black text-white"
              onClick={() => alert("Get Started clicked")}
            >
              Get Started
            </Button>
            <div className="mt-6 rounded-lg bg-gray-200 p-4 text-black">
              <p className="text-base font-medium">
                Help us build a more inclusive Web3!
              </p>
              <p className="text-sm">
                Share your unique perspective by filling out our Diversity
                Tracker—your voice matters.
              </p>
              <Button
                variant="link"
                className="mt-6 rounded-full bg-white text-black"
                onClick={() => alert("Learn More clicked")}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
