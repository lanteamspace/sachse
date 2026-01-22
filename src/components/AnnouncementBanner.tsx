// old banner
{/* 
  
const AnnouncementBanner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-[gradient_3s_ease_infinite] text-center py-2 md:py-3 font-bold text-primary-foreground text-[10px] md:text-sm shadow-lg uppercase">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]" />
      <span className="relative z-10 flex items-center justify-center gap-2">
        <span className="animate-bounce">🍿</span>
        Thưởng thức phim siêu hay tại K2KWatch - Tốc độ cao, Full HD
        <span className="animate-bounce" style={{ animationDelay: "0.5s" }}>🎬</span>
      </span>
      
      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
};

export default AnnouncementBanner;
*/}



// happy new year banner
//Kdz-chatwithyourteam -- START
// This File Is Applied By Extension "kdz-chatwithdevteam".
// ext.kdzz.lol/vscode/chatwithdevteam

// Members Participating In This Project: 
// kdz, kudodz, kdz[MACOS], kdz[UBUNTU]: https://github.com/kudodzzz
// skelentzt, skel, skel[macos]: https://github.com/skeletonzz


// Server: Chatwithmyteamkdz.dev
// Url nay se khong co cach nao de vao duoc



//Kdz-Chatwithyourteam -- END

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  target?: Date;
  href?: string;
  ctaText?: string;
};

const pad2 = (n: number) => String(n).padStart(2, "0");

function splitCountdown(ms: number) {
  const total = Math.max(0, ms);
  const s = Math.floor(total / 1000);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;
  return { days, hours, mins, secs };
}

const AnnouncementBanner = ({
  target = new Date(2026, 1, 17, 0, 0, 0),
  href = "/",
  ctaText = "Xem phim ngay",
}: Props) => {
  const TARGET = useMemo(() => target.getTime(), [target]);

  const [now, setNow] = useState(() => Date.now());
  const [dismissed, setDismissed] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  const didCelebrate = useRef(false);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const remaining = TARGET - now;
  const isTetTime = remaining <= 0;
  const c = splitCountdown(remaining);

  useEffect(() => {
    if (!isTetTime) return;
    if (didCelebrate.current) return;

    didCelebrate.current = true;
    setDismissed(false);
    setCelebrate(true);

    const timeout = setTimeout(() => setCelebrate(false), 18000);
    return () => clearTimeout(timeout);
  }, [isTetTime]);

  const confetti = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${(Math.random() * 1.6).toFixed(2)}s`,
        dur: `${(2.8 + Math.random() * 2.8).toFixed(2)}s`,
        rot: `${Math.floor(Math.random() * 120) - 60}deg`,
        size: `${6 + Math.floor(Math.random() * 8)}px`,
        hue: `${Math.floor(Math.random() * 360)}deg`,
        op: (0.35 + Math.random() * 0.45).toFixed(2),
      })),
    []
  );

  const fireworks = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        left: `${8 + Math.random() * 84}%`,
        top: `${8 + Math.random() * 68}%`,
        delay: `${(Math.random() * 0.9).toFixed(2)}s`,
        hue: `${Math.floor(Math.random() * 360)}deg`,
        scale: `${(0.85 + Math.random() * 0.9).toFixed(2)}`,
      })),
    []
  );

  if (dismissed && !isTetTime) return null;

  return (
    <section className="relative overflow-hidden">
      <div className="relative isolate">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-600 via-fuchsia-600 to-indigo-600 bg-[length:260%_100%] animate-[tetGradient_6s_ease_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_68%)] opacity-55" />
        <div className="pointer-events-none absolute inset-0 opacity-45">
          <div className="absolute -left-1/2 top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/35 to-transparent animate-[tetShimmer_3.1s_ease-in-out_infinite]" />
        </div>

        {!isTetTime && (
          <div className="pointer-events-none absolute inset-0">
            {confetti.map((p) => (
              <span
                key={p.id}
                className="absolute top-0 block rounded-sm"
                style={{
                  left: p.left,
                  width: p.size,
                  height: p.size,
                  opacity: Number(p.op),
                  transform: `rotate(${p.rot})`,
                  filter: `hue-rotate(${p.hue})`,
                  background: "rgba(255,255,255,0.9)",
                  animation: `confFall ${p.dur} linear ${p.delay} infinite`,
                  boxShadow: "0 0 18px rgba(255,255,255,0.25)",
                }}
              />
            ))}
          </div>
        )}

        {celebrate && (
          <div className="pointer-events-none absolute inset-0">
            {fireworks.map((f) => (
              <div
                key={f.id}
                className="absolute"
                style={{
                  left: f.left,
                  top: f.top,
                  transform: `scale(${f.scale})`,
                  filter: `hue-rotate(${f.hue})`,
                  animation: `fwBurst 1.35s ease-out ${f.delay} infinite`,
                }}
              >
                <span className="fw" />
              </div>
            ))}
          </div>
        )}

        {celebrate && (
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <div className="px-3 text-center">
              <div className="text-2xl md:text-4xl font-black tracking-[0.14em] uppercase text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.35)] animate-[titlePop_1.1s_ease-in-out_infinite]">
                HAPPY NEW YEAR!!
              </div>
              <div className="mt-1 text-[11px] md:text-base font-extrabold text-white/95 animate-[shine_1.6s_ease-in-out_infinite]">
                🎆🎇 Chúc mừng năm mới! An khang thịnh vượng, vạn sự như ý 🎇🎆
              </div>
            </div>
          </div>
        )}

        <div className="relative mx-auto max-w-6xl px-2 py-2.5 md:py-3.5">
          <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center">
            <div className="justify-self-start">
              <div className="hidden sm:flex items-center gap-2 text-lg md:text-xl">
                <span className="drop-shadow animate-[float_2.6s_ease-in-out_infinite]">🏮</span>
                <span className="drop-shadow animate-[float_3.0s_ease-in-out_infinite]">🧧</span>
                <span className="drop-shadow animate-[float_2.8s_ease-in-out_infinite]">🌸</span>
              </div>
            </div>

            <div className="justify-self-center text-center text-white">
              <div className="relative inline-flex flex-col items-center">
                <div className="relative">
                  <div className="absolute -inset-2 rounded-full bg-white/12 blur-xl" />
                  <div className="relative flex items-center justify-center gap-2">
                    <span className="text-[11px] md:text-sm font-black tracking-[0.26em] uppercase text-white/95">
                      {isTetTime ? "CHÚC MỪNG TẾT 2026 !!" : "Happy New Year 2026"}
                    </span>
                    <span className="rounded-full bg-white/14 px-2 py-0.5 text-[11px] md:text-sm font-extrabold backdrop-blur">
                      {isTetTime ? "🎆" : "⏳"}
                    </span>
                  </div>
                </div>

                <div className="mt-1 text-[10px] md:text-sm font-semibold text-white/95">
                  {isTetTime
                    ? "An khang thịnh vượng — vạn sự như ý ✨"
                    : "Đếm ngược tới giao thừa 17/02/2026 00:00 🧧"}
                </div>

                {!isTetTime && (
                  <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5 md:gap-2">
                    <div className="chip">
                      <span className="num">{pad2(c.days)}</span>
                      <span className="lbl">NGÀY</span>
                    </div>
                    <div className="chip">
                      <span className="num">{pad2(c.hours)}</span>
                      <span className="lbl">GIỜ</span>
                    </div>
                    <div className="chip">
                      <span className="num">{pad2(c.mins)}</span>
                      <span className="lbl">PHÚT</span>
                    </div>
                    <div className="chip">
                      <span className="num">{pad2(c.secs)}</span>
                      <span className="lbl">GIÂY</span>
                    </div>
                  </div>
                )}

                <div className="mt-2 flex items-center justify-center gap-2">
                  <a
                    href={href}
                    className="inline-flex items-center gap-2 rounded-full bg-white/14 px-3 py-1.5 text-[11px] md:text-sm font-extrabold text-white backdrop-blur transition hover:bg-white/24 active:scale-[0.98]"
                  >
                    <span className="relative">
                      <span className="absolute -inset-1 rounded-full bg-white/20 blur-md opacity-0 transition hover:opacity-100" />
                      <span className="relative">{ctaText}</span>
                    </span>
                    <span className="translate-x-0 transition group-hover:translate-x-0.5">→</span>
                  </a>
                  <span className="hidden md:inline text-xs font-bold text-white/80">
                    🎋 K2KWatch
                  </span>
                </div>
              </div>
            </div>

            <div className="justify-self-end">
              <button
                onClick={() => setDismissed(true)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/12 text-white/90 backdrop-blur transition hover:bg-white/22 active:scale-[0.98]"
                aria-label="Đóng thông báo"
                title="Đóng"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes tetGradient {
            0%,100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          @keyframes tetShimmer {
            0% { transform: translateX(-45%) rotate(12deg); opacity: .16; }
            50% { opacity: .55; }
            100% { transform: translateX(260%) rotate(12deg); opacity: .16; }
          }

          /* confetti rơi */
          @keyframes confFall {
            0%   { transform: translateY(-10px) rotate(0deg); opacity: 0; }
            10%  { opacity: 0.9; }
            100% { transform: translateY(120px) rotate(240deg); opacity: 0; }
          }

          /* float icons */
          @keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-5px) } }
          @keyframes shine { 0%,100% { filter: drop-shadow(0 0 0 rgba(255,255,255,0))} 50% { filter: drop-shadow(0 0 18px rgba(255,255,255,.45))} }
          @keyframes titlePop { 0%,100% { transform: scale(1) } 50% { transform: scale(1.06) } }

          /* countdown chips */
          .chip{
            display:flex; align-items:center; gap:.45rem;
            border-radius:999px;
            padding:.4rem .65rem;
            background: rgba(255,255,255,.14);
            border: 1px solid rgba(255,255,255,.18);
            backdrop-filter: blur(8px);
            box-shadow: 0 12px 30px rgba(0,0,0,.16);
          }
          .num{
            font-weight: 900;
            letter-spacing: .14em;
            font-size: 11px;
          }
          .lbl{
            font-weight: 900;
            opacity: .9;
            font-size: 9px;
            letter-spacing: .20em;
          }
          @media (min-width: 768px){
            .num{ font-size: 13px; }
            .lbl{ font-size: 10px; }
            .chip{ padding: .45rem .85rem; }
          }

          /* fireworks */
          @keyframes fwBurst {
            0%   { transform: scale(0.25); opacity: 0; }
            15%  { opacity: 1; }
            100% { transform: scale(1.45); opacity: 0; }
          }
          .fw{ position:relative; display:block; width:2px; height:2px; }
          .fw::before{
            content:"";
            position:absolute; inset:0;
            width:2px; height:2px; border-radius:999px;
            background: rgba(255,255,255,.95);
            box-shadow:
              0 -34px 0 rgba(255,255,255,.95),
              0  34px 0 rgba(255,255,255,.95),
              34px 0 0 rgba(255,255,255,.95),
              -34px 0 0 rgba(255,255,255,.95),
              24px 24px 0 rgba(255,255,255,.95),
              -24px 24px 0 rgba(255,255,255,.95),
              24px -24px 0 rgba(255,255,255,.95),
              -24px -24px 0 rgba(255,255,255,.95),
              14px 30px 0 rgba(255,255,255,.85),
              -14px 30px 0 rgba(255,255,255,.85),
              14px -30px 0 rgba(255,255,255,.85),
              -14px -30px 0 rgba(255,255,255,.85);
            filter: drop-shadow(0 0 12px rgba(255,255,255,.55));
          }

          @media (prefers-reduced-motion: reduce) {
            * { animation: none !important; transition: none !important; }
          }
        `}</style>
      </div>
    </section>
  );
};

export default AnnouncementBanner;
