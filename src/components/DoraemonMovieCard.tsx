import { Play } from "lucide-react";

interface DoraemonMovieCardProps {
  title: string;
  image: string;
  movie?: string;
  year?: string;
  quality?: string;
  badge?: string;
  link?: string;
}

const DoraemonMovieCard = ({ title, image, movie, year, badge, link }: DoraemonMovieCardProps) => {
  const CardWrapper = link ? "a" : "div";
  const cardProps = link ? { href: link } : {};

  return (
    <CardWrapper {...cardProps} className="movie-card group cursor-pointer block">
      <div className="relative aspect-[2/3] overflow-hidden rounded-t-xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-300 shadow-lg shadow-primary/50">
            <Play className="w-6 h-6 text-primary-foreground fill-current ml-0.5" />
          </div>
        </div>

        {badge && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-md shadow-lg animate-pulse">
              {badge}
            </span>
          </div>
        )}
      </div>

      <div className="p-3 md:p-4 bg-card/50 rounded-b-xl">
        <h3 className="font-bold text-xs md:text-sm text-primary line-clamp-1 group-hover:text-foreground transition-colors duration-300">
          {title}
        </h3>
        {movie && year && (
          <p className="text-muted-foreground text-[10px] md:text-xs mt-1 font-mono">
            Movie {movie} ({year})
          </p>
        )}
      </div>
    </CardWrapper>
  );
};

export default DoraemonMovieCard;
