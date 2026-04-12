"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";

interface Props {
  images: { url: string; sortOrder: number }[];
  title: string;
}

export function ImageGallery({ images, title }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const sortedImages = [...images].sort((a, b) => a.sortOrder - b.sortOrder);

  function next() {
    setCurrentIndex((i) => (i + 1) % sortedImages.length);
  }

  function prev() {
    setCurrentIndex((i) => (i - 1 + sortedImages.length) % sortedImages.length);
  }

  return (
    <>
      {/* Main image */}
      <div className="relative bg-gray-100 rounded-xl overflow-hidden group">
        <div className="aspect-[16/10]">
          <img
            src={sortedImages[currentIndex]?.url}
            alt={`${title} - billede ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </div>

        {sortedImages.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="px-2 py-1 bg-black/60 text-white text-xs rounded">
            {currentIndex + 1} / {sortedImages.length}
          </span>
        </div>

        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute bottom-3 right-3 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
        >
          <Expand className="w-4 h-4" />
        </button>
      </div>

      {/* Thumbnails */}
      {sortedImages.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
          {sortedImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                i === currentIndex ? "border-primary" : "border-transparent hover:border-gray-300"
              }`}
            >
              <img
                src={img.url}
                alt={`Thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prev}
            className="absolute left-4 p-3 text-white hover:bg-white/10 rounded-full"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <img
            src={sortedImages[currentIndex]?.url}
            alt={`${title} - billede ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain p-8"
          />

          <button
            onClick={next}
            className="absolute right-4 p-3 text-white hover:bg-white/10 rounded-full"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="absolute bottom-4 text-white text-sm">
            {currentIndex + 1} / {sortedImages.length}
          </div>
        </div>
      )}
    </>
  );
}
