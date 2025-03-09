import Image from "next/image";

export function WarpcastHandle() {
  return (
    <>
      <Image
        src={"/icons/jpg/WarpcastHandle.jpg"}
        width={20}
        height={20}
        alt="ping"
        className="size-5 h-5 w-5"
      />
    </>
  );
}
