const HeroSection = () => {
  return (
    <header className="relative max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-yellow-600/15 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="text-center md:text-left order-2 md:order-1 relative z-10 flex-1">
        <div className="inline-flex items-center gap-2 text-yellow-400 font-mono text-[10px] md:text-xs tracking-widest mb-6 bg-yellow-400/10 px-4 py-2 rounded-full border border-yellow-400/30">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
          Nền tảng xem phim anime & hoạt hình
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight uppercase tracking-tight text-white">
          k2k<span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">watch</span>
        </h1>

        <p className="text-white/70 font-medium text-sm md:text-base max-w-xl mx-auto md:mx-0 leading-relaxed mb-6">
          Xem Doraemon, Conan, anime và hoạt hình Trung Quốc chất lượng cao. Hàng ngàn tập, cập nhật nhanh.
        </p>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
          <a
            href="#mainbody"
            className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-yellow-400/40 transition-all duration-300 hover:-translate-y-0.5 text-sm md:text-base"
          >
            Khám phá ngay
          </a>
        </div>
      </div>

      <div className="relative group order-1 md:order-2 flex-1 flex justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-orange-400/20 blur-3xl rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute inset-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 blur-2xl rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-700" />
        <img
          src="//i.postimg.cc/8PxTnNp6/k2kwatch.png"
          alt="K2KWatch Logo"
          className="w-40 md:w-64 lg:w-72 relative z-10 animate-float drop-shadow-2xl group-hover:drop-shadow-[0_0_30px_rgba(250,204,21,0.4)] transition-all duration-300"
        />
      </div>
    </header>
  );
};

export default HeroSection;
