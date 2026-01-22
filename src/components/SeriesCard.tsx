import { Play, Star } from "lucide-react";

interface SeriesCardProps {
  title: string;
  image: string;
  description?: string;
  episodes?: number;
  rating?: number;
}

const SeriesCard = ({ title, image, description, episodes, rating }: SeriesCardProps) => {
  return (
    <div className="movie-card group cursor-pointer flex flex-col sm:flex-row overflow-hidden">
      <div className="relative w-full sm:w-48 shrink-0 aspect-video sm:aspect-[3/4] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card opacity-0 sm:opacity-100" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 sm:hidden">
          <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/50">
            <Play className="w-6 h-6 text-primary-foreground fill-current ml-0.5" />
          </div>
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
            {title}
          </h3>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            {episodes && (
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {episodes} tập
              </span>
            )}
            {rating && (
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                {rating.toFixed(1)}
              </span>
            )}
          </div>
          
          {description && (
            <p className="text-muted-foreground text-sm line-clamp-2">
              {description}
            </p>
          )}
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-bold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 flex items-center gap-2">
            <Play className="w-4 h-4 fill-current" />
            Xem ngay
          </button>
          <button className="px-4 py-2 bg-muted/50 border border-border text-foreground text-sm font-medium rounded-lg hover:bg-muted transition-all duration-300">
            Chi tiết
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeriesCard;
