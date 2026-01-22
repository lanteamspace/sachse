import { useEffect, useState } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 700);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background overflow-hidden transition-opacity duration-700 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] animate-glow-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[80px] animate-glow-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative w-48 h-48 perspective-1000">
        <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-spin" style={{ animationDuration: "3s" }} />
        <div className="absolute inset-4 rounded-full border-2 border-secondary/40 animate-spin" style={{ animationDuration: "4s", animationDirection: "reverse" }} />
        <div className="absolute inset-8 rounded-full border-2 border-primary/50 animate-spin" style={{ animationDuration: "5s" }} />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="https://i.postimg.cc/8PxTnNp6/k2kwatch.png"
            alt="K2KWatch"
            className="w-20 h-20 object-contain animate-glow drop-shadow-2xl"
          />
        </div>
      </div>

      <p className="mt-10 text-primary font-bold tracking-[0.3em] uppercase text-xs animate-pulse text-center px-4">
        Đang tải trải nghiệm phim tuyệt vời...
      </p>

      <div className="mt-6 w-48 h-1 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full animate-[loading_2.5s_ease-in-out]" 
          style={{
            animation: "loading 2.5s ease-in-out forwards"
          }}
        />
      </div>

      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
