"use client";
import React, { Fragment, useState } from "react";
import Image from "next/image";

// ICON IMPORTS
import UserIcon from "../../public/icons/userIcon.svg";
import TVIcon from "../../public/images/tv-shows.png";
import MenuIcon from "../../public/images/menu.png";
import SearchIcon from "../../public/images/search.png";
import WatchLaterIcon from "../../public/images/watch-later.png";
import MoviesIcon from "../../public/images/movies.png";
import GenresIcon from "../../public/images/genres.png";

import SidebarItem from "./SidebarItem";

interface SidebarProps {
  hovered: boolean;
  setHovered: (value: boolean) => void;
}

export default function Sidebar({ hovered, setHovered }: SidebarProps) {
  // const [hovered, setHovered] = useState(false);

  return (
<Fragment>

  {hovered && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/40 z-40 transition-opacity duration-300 pointer-events-none" />
      )}


    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`fixed z-50 transition-all duration-500 ease-in-out pl-16 pb-8 pt-[60px]  ${
        hovered ? "translate-x-0 bg-black w-56" : "-translate-x-10 bg-black/0"
      }`}
      style={{
        top: "0px",
        bottom: "0px",
        left: "30px",
      }}
    >
      <div
        className={`h-full transition-all duration-500 ease-in-out text-white rounded-xl overflow-hidden ${
          hovered ? "w-56 " : "w-20"
        } flex flex-col justify-between backdrop-blur-md`}
      >
        {/* TOP USER SECTION */}
        <div>

          {/* User */}
          <div className="p-4 flex items-center gap-4 h-[66px]">
            <div
              className={`w-[50px] h-[50px] flex-shrink-0 transition-opacity duration-300 ${
                hovered ? "opacity-100 bg-black" : "opacity-0"
              }`}
            >
              <Image src={UserIcon} alt="User Icon" width={50} height={50} />
            </div>
            <span
              className={`text-sm font-bold  transition-all duration-300 whitespace-nowrap pl-5 ${
                hovered
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4 pointer-events-none"
              }`}
            >
              Daniel
            </span>
          </div>

          {/* User */}

          {/* MENU ITEMS */}
          <div className="flex flex-col gap-8 p-4">
            <SidebarItem src={SearchIcon} label="Search" hovered={hovered} />
            <SidebarItem
              src={MenuIcon}
              label="Home"
              href="/"
              hovered={hovered}
            />
            <SidebarItem src={TVIcon} label="TV Shows" hovered={hovered} />
            <SidebarItem src={MoviesIcon} label="Movies" hovered={hovered} />
            <SidebarItem src={GenresIcon} label="Genres" hovered={hovered} />
            <SidebarItem
              src={WatchLaterIcon}
              label="Watch Later"
              hovered={hovered}
            />
          </div>
        </div>

        {/* BOTTOM TEXT LINKS */}
        <div className="p-4 flex flex-col gap-2 text-sm text-gray-400">
          {["Language", "Get Help", "Exit"].map((text) => (
            <div key={text} className="flex items-center gap-4">
              <span
                className={`transition-all duration-300 whitespace-nowrap ${
                  hovered
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4 pointer-events-none"
                }`}
              >
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>

    </Fragment>
  );
}
