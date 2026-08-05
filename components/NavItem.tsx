"use client";

import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItem = () => {
  const pathname: string = usePathname();
  const isActive = (patch: string) => {
    if (patch === "/") return pathname === "/";

    return pathname.startsWith(patch);
  };
  return (
    <ul className=" flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
      {NAV_ITEMS.map(({ href, label }) => (
        <li key={href}>
          <Link
            href={href}
            className={`hover:text-yellow-500 transition-colors ${isActive(href) ? "text-gray-100" : ""}`}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavItem;
