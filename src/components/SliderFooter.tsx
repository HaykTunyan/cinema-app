"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

interface Movie {
  Id: string;
  Title: string;
  CoverImage: string;
  MpaRating: string;
  Duration: string;
  Description: string;
}

interface SliderFooterProps {
  items: Movie[];
  onItemClick?: (id: string) => void;
}

export default function SliderFooter({ items, onItemClick }: SliderFooterProps) {
  return (
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
            style={{ width: "220px" }} // This fixes the width of each slide
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
