"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

/**
 * Represents a single movie item displayed in the slider.
 *
 * @interface Movie
 * @property {string} Id - Unique identifier for the movie.
 * @property {string} Title - The title of the movie.
 * @property {string} CoverImage - File name or path to the movie's cover image.
 * @property {string} MpaRating - The MPAA rating of the movie (e.g., PG-13, R).
 * @property {string} Duration - The runtime duration of the movie.
 * @property {string} Description - Short description or synopsis of the movie.
 */

interface Movie {
  Id: string;
  Title: string;
  CoverImage: string;
  MpaRating: string;
  Duration: string;
  Description: string;
}

/**
 * Props for the SliderFooter component.
 *
 * @interface SliderFooterProps
 * @property {Movie[]} items - List of movie items to be displayed in the slider.
 * @property {(id: string) => void} [onItemClick] - Optional click handler for when a movie slide is clicked.
 */

interface SliderFooterProps {
  items: Movie[];
  onItemClick?: (id: string) => void;
}

export default function SliderFooter({ items, onItemClick }: SliderFooterProps) {
  return (

    /**
     * 
     * SliderFooter component displays a footer slider with movie items.
     * @param {SliderFooterProps} props - Properties for the slider footer.
     * * @returns {JSX.Element} The rendered slider footer.
     */


    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Trending Now</h2>

      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={16}
        slidesPerView="auto"
        className="w-full"
      >
        {items.map((item) => (
          <SwiperSlide
            key={item.Id}
            style={{ width: "220px" }} 
            className="rounded-xl overflow-hidden group cursor-pointer"
            onClick={() => onItemClick?.(item.Id)}
          >
            <div className="relative w-full h-[270px]">
              <Image
                src={`/images/${item.CoverImage}`}
                alt={item.Title}
                fill
                className="object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
