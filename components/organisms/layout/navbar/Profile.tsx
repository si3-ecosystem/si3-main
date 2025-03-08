import { CircleUserRound } from "lucide-react";

export function Profile() {
  return (
    <div className="group cursor-pointer rounded-full border border-gray-300 p-2 hover:bg-gray-50">
      <CircleUserRound size={24} />
    </div>
  );
}
