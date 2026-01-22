import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import { hiddenMovies } from "../data/movies";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const totalMovies = hiddenMovies.length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-b from-[#1a1a1a] via-[#0f0f0f] to-transparent border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-1000 animate-pulse" />
              <div className="relative px-4 py-2 bg-[#0f0f0f] rounded-xl">
                <span className="text-lg md:text-xl font-bold tracking-wider bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  LANTeam
                </span>
              </div>
            </div>
            <div className="hidden sm:flex flex-col gap-0.5">
              <span className="text-xs font-semibold text-white/80">Nội dung sạch sẽ, có thể liên hệ <a href="//zalo.me/0911539644">mìn</a> để đóng góp phim!</span>
              <div className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Search Bar */}
          <div className="w-full md:w-96 lg:w-[28rem]">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
                <div className="relative flex items-center">
                  <Search className="absolute left-4 w-4 h-4 text-white/40 group-focus-within:text-white/60 transition-colors" />
                  <Input
                    type="text"
                    placeholder={`Tìm kiếm với ${totalMovies.toLocaleString()} phim...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/25 rounded-full text-sm text-white placeholder:text-white/40 focus:bg-white/15 focus:border-white/40 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
