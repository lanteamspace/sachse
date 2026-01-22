import { Play, Captions } from "lucide-react";

interface HHTQCardProps {
  title: string;
  image: string;
  link: string;
}

const HHTQCard = ({ title, image, link }: HHTQCardProps) => {
  return (
    <a href={link} className="movie-card group cursor-pointer block">
      <div className="relative aspect-video overflow-hidden rounded-t-xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-300 shadow-lg shadow-primary/50">
            <Play className="w-7 h-7 text-primary-foreground fill-current ml-0.5" />
          </div>
        </div>
      </div>

      <div className="p-4 md:p-5 bg-card/50 rounded-b-xl">
        <h3 className="font-extrabold text-base md:text-lg text-primary line-clamp-1 group-hover:text-foreground transition-colors duration-300">
          {title}
        </h3>
        <div className="flex items-center gap-2 mt-3">
          <span className="inline-flex items-center gap-1.5 bg-muted/50 text-muted-foreground px-3 py-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wide border border-border/50">
            <Captions className="w-3 h-3" />
            Vietsub
          </span>
        </div>
      </div>
    </a>
  );
};

export default HHTQCard;
