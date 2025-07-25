"use client";

import Image from "next/image";
import React from "react";
import { BannerProps } from "@/types/interface";

/**
 * Props for the DynamicBanner component.
 * 
 * @property {string} title - The title of the banner (usually a movie or series title).
 * @property {number | string} year - Release year of the content.
 * @property {string} rating - Rating (e.g. "PG-13", "R").
 * @property {string} duration - Duration of the content (e.g. "2h 30m").
 * @property {string} category - Category or genre of the content.
 * @property {string} description - Short description or synopsis.
 * @property {string} coverImageUrl - URL of the cover image to be displayed.
 * @property {() => void} [onPlayClick] - Optional callback function triggered when the "Play" button is clicked.
 */

// interface BannerProps {
//   title: string;
//   year: number | string;
//   rating: string;
//   duration: string;
//   category: string;
//   description: string;
//   coverImageUrl: string;
//   onPlayClick?: () => void;
// }

export default function DynamicBanner({
  title,
  year,
  rating,
  duration,
  category,
  description,
  coverImageUrl,
  onPlayClick,
}: BannerProps) {
  /**
   *
   *  DynamicBanner component hooks
   *
   */

  return (
    <section className="w-full h-[75vh] flex flex-row bg-[#040404] rounded-xl overflow-hidden mt-10 shadow-xl">
      <div className="flex flex-col justify-center flex-1 p-10 text-white space-y-6">
        <p className="uppercase text-sm tracking-widest text-gray-300 pb-0">
          {category}
        </p>

        <div className="">
          <h2 className="text-4xl font-bold mb-2 text-gray-300">{title}</h2>
        </div>

        {/* <Image
          src={TitleBanner}
          alt="Movie Title"
          width={600}
          height={80}
          className="object-contain w-full max-w-md"
        /> */}

        <div className="pt-5" />
        <div className="flex text-2xl text-[#F1F1F1]">
          <div className="flex flex-row gap-5">
            <div className="flex justify-center">{year}</div>
            <div className="flex justify-center">{rating}</div>
            <div className="flex justify-center">{duration}</div>
          </div>
        </div>

        <p className="text-2xl text-gray-200">{description}</p>

        <div className="flex gap-4 pt-4">
          <button
            onClick={onPlayClick}
            className="bg-[#F1F1F1] text-black px-[52px] py-3 rounded-full font-semibold hover:bg-gray-200 transition cursor-pointer"
          >
            ▶ Play
          </button>
          <button className="px-[52px] py-3 rounded-full font-semibold text-white transition cursor-pointer bg-gradient-to-r from-[#2727F5] to-[#03036a]">
            More Info
          </button>
        </div>
      </div>

      <div className="flex-1 relative h-full min-w-[300px]">
        <Image
          src={coverImageUrl}
          alt={title}
          fill
          priority
          className="object-contain object-right h-full z-0"
        />
      </div>
    </section>
  );
}
