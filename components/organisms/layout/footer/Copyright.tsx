export function Copyright() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="border-t border-gray-400 p-4 py-8 text-center text-sm md:text-base">
      Copyright © {currentYear} Solar Intelligence, Inc. All rights reserved.
    </div>
  );
}
