"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/SidebarMenu";
import Banner from "@/components/Banner";
import DynamicBanner from "@/components/DynamicBanner";
import SliderFooter from "@/components/SliderFooter";
import ModalWithVideo from "@/components/ModalWithVideo";

import dataInformation from "@/lib/data.json";

interface Movie {
  Id: string;
  Title: string;
  CoverImage: string;
  TitleImage: string;
  Date: string;
  ReleaseYear: number;
  MpaRating: string;
  Category?: string;
  Duration: string;
  Description: string;
  VideoUrl?: string;
  YoutubeUrl?: string;
}

export default function Home() {
  /**
   *
   * This is the main layout of the application.
   * It includes the sidebar and the main content area.
   */

  const [sidebarHovered, setSidebarHovered] = useState(false);

  const [trending, setTrending] = useState(dataInformation.TendingNow);
  // const [firstInfo, setFirstInfo] = useState<Movie | null>(dataInformation.Featured)
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  // const [sliderList, setSliserList] = useState<any>();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleMovieClick = (id: string) => {
    localStorage.setItem("viewedMovieId", id);

    const movie = dataInformation.TendingNow.find((m) => m.Id === id);
    if (movie) {
      localStorage.setItem("lastViewedMovie", JSON.stringify(movie));
      localStorage.setItem("lastViewedMovieId", id);
      // @ts-ignore
      setFeaturedMovie(movie); // update state immediately
    }
  };

  useEffect(() => {
    const existing = localStorage.getItem("trendingData");
    if (!existing) {
      localStorage.setItem(
        "trendingData",
        JSON.stringify(dataInformation.TendingNow)
      );
    }
  }, []);

  useEffect(() => {
    const storedMovie = localStorage.getItem("lastViewedMovie");
    const lastId = localStorage.getItem("lastViewedMovieId");

    if (storedMovie) {
      try {
        setFeaturedMovie(JSON.parse(storedMovie));
      } catch {
        setFeaturedMovie(null);
      }
    }

    if (lastId) {
      const reordered = [
        ...dataInformation.TendingNow.filter((movie) => movie.Id === lastId),
        ...dataInformation.TendingNow.filter((movie) => movie.Id !== lastId),
      ];
      setTrending(reordered);
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}

    
    {sidebarHovered && (
  <div
    className="fixed top-0 left-0 h-full w-full z-50 pointer-events-none bg-gradient-to-r from-black via-black/50 to-transparent transition-opacity duration-300"
    style={{ opacity: sidebarHovered ? 1 : 0 }}
  />
)}


      <div className="w-[140px] bg-black/80 flex flex-col items-center py-6 ">
        {/* <Sidebar /> */}
        <Sidebar hovered={sidebarHovered} setHovered={setSidebarHovered} />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Main Content */}
        <main className="flex-1">
          <Banner
            title="The Irishman"
            year={2021}
            rating="18+"
            duration="1h 48m"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
            backgroundUrl="/images/cover-image.png"
          />

          {/* Dynamic Banner */}
          <DynamicBanner
            title={featuredMovie?.Title || dataInformation.Featured.Title}
            year={
              featuredMovie?.ReleaseYear || dataInformation.Featured.ReleaseYear
            }
            rating={
              featuredMovie?.MpaRating || dataInformation.Featured.MpaRating
            }
            duration={
              featuredMovie
                ? `${Math.floor(+featuredMovie.Duration / 60)}m`
                : `${Math.floor(+dataInformation.Featured.Duration / 60)}m`
            }
            category={
              featuredMovie?.Category || dataInformation.Featured.Category
            }
            description={
              featuredMovie?.Description || dataInformation.Featured.Description
            }
            // backgroundUrl={
            //   featuredMovie
            //     ? `/images/${featuredMovie.CoverImage}`
            //     : `/images/${dataInformation.Featured.CoverImage}`
            // }
            coverImageUrl={
              featuredMovie
                ? `/images/${featuredMovie.CoverImage}`
                : `/images/${dataInformation.Featured.CoverImage}`
            }
            onPlayClick={() => setIsOpenModal(true)}
          />
        </main>
        <section className="">
          <SliderFooter items={trending} onItemClick={handleMovieClick} />
        </section>
      </div>

      {isOpenModal && (
        <ModalWithVideo
          show={isOpenModal}
          onClose={() => setIsOpenModal(false)}
          title={featuredMovie?.Title || "Trailer"}
          videoUrl={featuredMovie?.VideoUrl || "/videos/default.mp4"}
          youtubeUrl={
            featuredMovie?.YoutubeUrl ||
            "https://www.youtube.com/watch?v=6mJ2b1a4g0c"
          }
        />
      )}
    </div>
  );
}
