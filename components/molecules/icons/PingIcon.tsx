import Image from "next/image";

export const PingIcon = () => {
  return (
    <Image
      src={"/icons/svg/ping.svg"}
      width={24}
      height={24}
      alt="ping"
      className="size-6 h-6 w-6"
    />
  );
};
