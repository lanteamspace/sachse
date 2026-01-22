import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Play } from "lucide-react";
import { hiddenMovies, HiddenMovie } from "../data/movies";
import Navbar from "../components/Navbar";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [movies, setMovies] = useState<HiddenMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    setIsLoading(true);
    // Simulate delay for better UX
    const timer = setTimeout(() => {
      const results = hiddenMovies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase()) ||
          movie.id.toLowerCase().includes(query.toLowerCase())
      );
      setMovies(results);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Kết quả tìm kiếm cho{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              "{query}"
            </span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
          {!isLoading && movies.length > 0 && (
            <p className="text-white/60 text-sm mt-3">Tìm thấy {movies.length} kết quả</p>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
          </div>
        )}

        {/* Results Grid */}
        {!isLoading && movies.length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {movies.map((movie) => (
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
          </>
        )}

        {/* Empty State */}
        {!isLoading && movies.length === 0 && query && (
          <div className="text-center py-20">
            <p className="text-white/60 text-lg">Không tìm thấy phim nào cho "{query}"</p>
          </div>
        )}

        {/* No Query State */}
        {!query && (
          <div className="text-center py-20">
            <p className="text-white/60 text-lg">Nhập từ khóa để tìm kiếm phim</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
