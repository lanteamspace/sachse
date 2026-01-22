import { useState } from "react";
import { Play } from "lucide-react";
import Navbar from "../components/Navbar";
import { hiddenMovies } from "../data/movies";

const Hidden210Page = () => {

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Nội Dung Đặc Biệt
            </span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {hiddenMovies.map((movie) => (
            <a
              key={movie.id}
              href={movie.link}
              className="group cursor-pointer block h-full"
            >
              <div className="relative aspect-[2/3] overflow-hidden rounded-sm bg-[#1a1a1a] border border-white/10">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <Play className="w-5 h-5 text-white fill-white" />
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <h3 className="font-bold text-xs md:text-sm text-white line-clamp-1 group-hover:text-purple-400 transition-colors duration-300">
                  {movie.title}
                </h3>
              </div>
            </a>
          ))}
        </div>

        {hiddenMovies.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/60 text-lg">Không có nội dung nào.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hidden210Page;
