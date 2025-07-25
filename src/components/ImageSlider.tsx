import React, { useState, useEffect } from "react";
import Image from "next/image";

/**
 * Props for the Slider component.
 *
 * @property {string[]} images - Array of image URLs to be displayed in the carousel.
 */

const Slider = ({ images }: { images: string[] }) => {
  /**
   * Slider component displays a full-width image carousel that automatically changes slides
   * every 2 seconds.
   *
   * @param {SliderProps} props - Props containing an array of image URLs.
   *
   */

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-64 overflow-hidden">
      <div
        className="absolute inset-0 flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              width={800}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
