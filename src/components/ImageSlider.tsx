

// Slider component for displaying images in a carousel format.


import React, { useState , useEffect } from "react";
import Image from "next/image";


const Slider = ({ images }: { images: string[] }) => {

    /**
     *  Slider Component Hooks.
     * 
     */


  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect( () => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Change slide every 2 seconds

    return () => clearInterval(interval); 
  } ,[])


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
}

export default Slider;