import Image from "next/image";
import { DemoSession } from "@/types/home";
import { cn } from "@/lib/utils";
import { urlForImage } from "@/lib/sanity/image";

export interface DemoSessionCardProps {
  session: DemoSession;
  className?: string;
}

export function DemoSessionCard({ session, className }: DemoSessionCardProps) {
  const imageUrl = session.image && urlForImage(session.image)?.src;

  return (
    <div
      className={cn(
        "group relative h-full overflow-hidden rounded-[40px] border border-[#A020F0] bg-white p-5 shadow-md transition-shadow hover:shadow-lg lg:px-8 lg:py-7",
        className,
      )}
    >
      <div className="relative h-[196px] w-full overflow-hidden rounded-[20px] sm:h-[170px]">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={session.title}
            fill
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            {...(session.image.blurDataURL && {
              placeholder: "blur",
              blurDataURL: session.image.blurDataURL,
            })}
          />
        )}
        {session.tag && (
          <span className="absolute top-3 left-3 rounded-full bg-white px-3 py-1 text-base font-medium text-[#3F3F3F] lg:text-xl">
            {session.tag}
          </span>
        )}
      </div>
      <div className="mt-5 lg:mt-8">
        <h3 className="mb-2 text-base font-bold text-[#060606] lg:mb-3 lg:text-2xl">
          {session.title}
        </h3>
        <p className="line-clamp-3 text-sm font-bold text-[#484848] lg:text-2xl">
          {session.description}
        </p>
      </div>
    </div>
  );
}
