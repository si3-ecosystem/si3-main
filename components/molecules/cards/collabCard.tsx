import { Badge } from "@/components/atoms/badge";
import { Card, CardContent } from "@/components/atoms/card";
import { Text } from "@/components/atoms/text";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { WarpcastHandle } from "../icons/WarpcastHandle";
import { TwitterIcon } from "../icons/TwitterIcon";
import { Button } from "@/components/atoms/button";

// will need later

// type Props = {
//   data: {
//     communityLogo: string;
//     communityType: string;
//     communityLocation: string;
//     communityName: string;
//     isPublished?: boolean;
//     communityDescription: string;
//     communityWebsite: string;
//     communityLeaderName: string;
//     communityLeaderEmail: string;
//     xHandle: string;
//     warpastHandle: string;
//     discover: string;
//   };
// };

export function CollabCard() {
  return (
    <Card className="cursor-pointer overflow-hidden rounded-2xl border border-[#D1D1D1] !p-0 transition-all duration-300 !ease-in-out hover:shadow-lg">
      <CardContent className="flex h-full flex-col justify-between !p-0">
        <div className="flex h-fit flex-col">
          <div className="relative z-20 flex h-full w-full flex-col gap-6 px-5 pt-5">
            <Image
              src={"/icons/jpg/collabcardbg.jpg"}
              alt=""
              title=""
              decoding="async"
              loading="lazy"
              width={600}
              height={400}
              className="absolute top-0 right-0 left-0 -z-10 h-full w-full object-cover object-left"
            />
            <div className="z-10 flex w-full items-start justify-between gap-4">
              <div className="flex items-center justify-center rounded-[14px] bg-white p-2 shadow-md">
                <Image
                  src={"/icons/jpg/sihericon.jpg"}
                  alt=""
                  title=""
                  decoding="async"
                  loading="lazy"
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="flex items-center gap-2">
                <MapPin className="text-primary size-4" />
                <p className="text-primary text-base leading-6 font-normal">
                  Global
                </p>
              </span>
            </div>
            <div className="flex flex-col gap-2 pb-3">
              <h4 className="text-xl leading-normal font-semibold text-black uppercase">
                Si Her
              </h4>
              <p>
                <Badge
                  variant="outline"
                  className="gap-1.5 border-none bg-none outline-none"
                >
                  <span
                    className="size-1.5 rounded-full bg-black"
                    aria-hidden="true"
                  ></span>
                  Education
                </Badge>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6 bg-white px-5 py-6">
            <Text
              className="line-clamp-5 break-words whitespace-pre-wrap"
              variant="base"
            >
              Find, Book and Meet Mentors around the world. Get virtual
              mentorship from over 1,374+ mentors from the world’s leading
              companies in our global community.
            </Text>
            <ul className="flex flex-col gap-2.5">
              <li className="flex items-center gap-2">
                <TwitterIcon />
                <span className="text-primary text-base leading-5">
                  kara.siher.eth
                </span>
              </li>
              <li className="flex items-center gap-2">
                <WarpcastHandle />
                <span className="text-primary text-base leading-5">
                  kara.siher.eth
                </span>
              </li>
              <li className="flex items-center gap-2">
                <WarpcastHandle />
                <span className="text-primary text-base leading-5">
                  kara.siher.eth
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full px-5 pb-4">
          <Button
            variant={"outline"}
            className="w-full border-2 border-black hover:bg-black hover:text-white"
          >
            Discover Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
