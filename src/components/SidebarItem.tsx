import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarItemProps } from "@/types/types";

/**
 * SidebarItem component renders a single item in the sidebar.
 *
 * @param {SidebarItemProps} props - Properties for the sidebar item.
 * @returns {JSX.Element} The rendered sidebar item.
 */

export default function SidebarItem({
  src,
  label,
  href,
  hovered,
}: SidebarItemProps) {


  /**
   * SidebarItem component hooks
   *
   * @param {SidebarItemProps} props - Properties for the sidebar item.
   * @returns {JSX.Element} The rendered sidebar item.
   * */

  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <div className={` `}>
      <Link
        href={href ? href : "#"}
        className={`flex items-center gap-[50px] cursor-pointer transition-all duration-300 py-3 pl-3  
        ${
          isActive
            ? "bg-[#3B486D] font-semibold"
            : "text-white hover:text-[#3B486D]"
        }
        ${hovered ? "rounded-3xl" : "rounded-full"}
        `}
      >
        <Image src={src} alt={label} width={24} height={24} />
        <span
          className={`text-sm transition-all duration-300 whitespace-nowrap ${
            hovered
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-4 pointer-events-none"
          }`}
        >
          {label}
        </span>
      </Link>
    </div>
  );
}
