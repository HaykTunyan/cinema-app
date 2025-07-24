// components/Banner.tsx
import Image from "next/image";
import TitlteBanner from "../../public/images/cover-image-title.png";

interface BannerProps {
  title: string;
  year: number | string;
  rating: string;
  duration: string;
  description: string;
  backgroundUrl: string;
}

export default function Banner({
  title,
  year,
  rating,
  duration,
  description,
  backgroundUrl,
}: BannerProps) {
  /**
   *
   * Banner component displays the movie banner with title, year, rating, duration, and description.
   */

  return (
    <section
      className="relative w-full h-[90vh] flex items-center px-8 py-12 bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10 z-0" />

      {/* Content */}
      <div className="relative bottom-20 z-10 max-w-2xl text-white space-y-4">
        <p className="uppercase text-sm tracking-widest text-gray-300 pb-0">
          Movie
        </p>
        <div className="">
          <Image
            src={TitlteBanner}
            alt="cover-image-title"
            width={680}
            height={84}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
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
          <button className="bg-[#F1F1F1] text-black px-[52px] py-3 rounded-full font-semibold hover:bg-gray-200 transition cursor-pointer">
            ▶ Play
          </button>
          <button className="px-[52px] py-3 rounded-full font-semibold text-white transition cursor-pointer bg-gradient-to-r from-[#2727F5] to-[#03036a] ">
            More Info
          </button>
        </div>
      </div>
    </section>
  );
}
