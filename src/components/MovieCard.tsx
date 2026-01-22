interface MovieCardProps {
  title: string;
  image: string;
  movie?: string;
  year?: string;
  quality?: string;
  badge?: string;
  link?: string;
}

const MovieCard = ({ title, image, movie, year, badge, link }: MovieCardProps) => {
  const CardWrapper = link ? "a" : "div";
  const cardProps = link ? { href: link } : {};

  return (
    <CardWrapper {...cardProps} className="group cursor-pointer block h-full">
      <div className="relative aspect-[2/3] overflow-hidden rounded-sm bg-[#1a1a1a] border border-white/10">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {badge && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2.5 py-1 bg-yellow-400 text-black text-[9px] font-bold rounded shadow-lg">
              {badge}
            </span>
          </div>
        )}
      </div>

      <div className="mt-3">
        <h3 className="font-bold text-xs md:text-sm text-white line-clamp-1 group-hover:text-yellow-400 transition-colors duration-300">
          {title}
        </h3>
        {movie && year && (
          <p className="text-white/50 text-[10px] md:text-xs mt-1">
            Movie {movie} ({year})
          </p>
        )}
      </div>
    </CardWrapper>
  );
};

export default MovieCard;
