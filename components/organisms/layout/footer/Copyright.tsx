export function Copyright() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="border-t border-gray-400 p-4 py-8 text-center text-sm md:text-base">
      Copyright © {currentYear} Solar Intelligence, Inc.{" "}
      <span>
        <span className="min-[430px]:hidden">
          <br />
        </span>
        All rights reserved.
      </span>
    </div>
  );
}
