"use client";

import React, { useState, useEffect, useLayoutEffect, Fragment } from "react";
import Sidebar from "@/components/SidebarMenu";
import Banner from "@/components/Banner";
import DynamicBanner from "@/components/DynamicBanner";
import SliderFooter from "@/components/SliderFooter";
import ModalWithVideo from "@/components/ModalWithVideo";

import dataInformation from "@/lib/data.json";

/**
 * 
 *
 * @interface MovieLayoutProps
 * 
 * @property {string} Id - Unique identifier for the movie.
 * @property {string} Title - Display title of the movie.
 * @property {string} CoverImage - Filename or path to the cover image (poster).
 * @property {string} TitleImage - Filename or path to the stylized title image (e.g., logo or banner).
 * @property {string} Date - The release or featured date (can be a formatted string).
 * @property {number} ReleaseYear - The year the movie was released.
 * @property {string} MpaRating - MPAA rating (e.g., G, PG, PG-13, R).
 * @property {string} [Category] - Optional genre or category label (e.g., Action, Drama).
 * @property {string} Duration - Length of the movie (e.g., "2h 15m").
 * @property {string} Description - Brief summary or plot of the movie.
 * @property {string} [VideoUrl] - Optional direct URL to a video file (e.g., .mp4).
 * @property {string} [YoutubeUrl] - Optional YouTube video link for trailers or previews.
 */

interface MovieLayoutProps {
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
  const [lastSelectedMovieId, setLastSelectedMovieId] = useState<string | null>(
    null
  );
  const [featuredMovie, setFeaturedMovie] = useState<MovieLayoutProps | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleMovieClick = (id: string) => {
    setLastSelectedMovieId(id);
    localStorage.setItem("viewedMovieId", id);

    const movie = dataInformation.TendingNow.find((m) => m.Id === id);
    if (movie) {
      localStorage.setItem("lastViewedMovie", JSON.stringify(movie));
      localStorage.setItem("lastViewedMovieId", id);
      // @ts-ignore
      setFeaturedMovie(movie);
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

  useLayoutEffect(() => {
    const savedId = localStorage.getItem("lastViewedMovieId");
    if (savedId) {
      setLastSelectedMovieId(savedId);
    }
  }, [lastSelectedMovieId]);

  return (

    /**
     * Main layout of the application.
     */


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
          {lastSelectedMovieId ? (
            <Fragment>
              <DynamicBanner
                title={featuredMovie?.Title || dataInformation.Featured.Title}
                year={
                  featuredMovie?.ReleaseYear ||
                  dataInformation.Featured.ReleaseYear
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
                  featuredMovie?.Description ||
                  dataInformation.Featured.Description
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
            </Fragment>
          ) : (
            <Fragment>
              <Banner
                title="The Irishman"
                year={2021}
                rating="18+"
                duration="1h 48m"
                description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                backgroundUrl="/images/cover-image.png"
              />
            </Fragment>
          )}
        </main>
        <section className="">
          <SliderFooter items={trending} onItemClick={handleMovieClick} />
        </section>
      </div>

      {/* Modal for Video */}
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
