"use client";

import React, { useEffect } from "react";

interface ModalWithVideoProps {
  title: string;
  videoUrl?: string;     // e.g., /videos/sample.mp4
  youtubeUrl?: string;   // e.g., https://www.youtube.com/watch?v=abc123
  show: boolean;
  onClose: () => void;
}

// Convert various YouTube formats to /embed/ID
function getEmbedUrl(url?: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

const ModalWithVideo: React.FC<ModalWithVideoProps> = ({
  title,
  videoUrl,
  youtubeUrl,
  show,
  onClose,
}) => {
  // ESC to close
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
        {/* Close Button */}
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

        {/* Header */}
        <div className="p-5 pb-3 text-white text-2xl font-bold">{title}</div>

        {/* Video Section */}
        <div className="w-full h-[300px] bg-black">
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
