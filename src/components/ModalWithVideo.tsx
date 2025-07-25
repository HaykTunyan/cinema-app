"use client";

import React, { useEffect } from "react";
import { ModalWithVideoProps } from "@/types/interface";
import { getEmbedUrl } from "@/constants/help";

/**
 * Props for the ModalWithVideo component.
 *
 * @property {string} title - Title displayed at the top of the modal.
 * @property {string} [videoUrl] - Optional URL for a local or hosted video (non-YouTube).
 * @property {string} [youtubeUrl] - Optional YouTube URL to embed a video.
 * @property {boolean} show - Controls whether the modal is visible.
 * @property {() => void} onClose - Callback fired when modal is requested to be closed.
 */

const ModalWithVideo: React.FC<ModalWithVideoProps> = ({
  title,
  videoUrl,
  youtubeUrl,
  show,
  onClose,
}) => {
  /**
   * Handles ESC key to close the modal.
   */

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (show) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [show, onClose]);

  if (!show) return null;

  const embedUrl = getEmbedUrl(youtubeUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#040404]/80 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl mx-4 sm:mx-auto bg-[#040404] rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition cursor-pointer"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-5 pb-3 text-white text-2xl font-bold">{title}</div>

        <div className="w-full h-[500px] bg-black">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title="YouTube Video"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
            />
          ) : videoUrl ? (
            <video
              src={videoUrl}
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ModalWithVideo;
