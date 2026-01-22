import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import {
  apiGetMovie,
  apiGetToken,
  apiGetWatchUrl,
  getEpisodeNumber,
  SafeEpisode,
  SafeMovieResponse,
} from "@/lib/phimapi";

const SLUG = "xin-hay-mac-no-vao-takaminesan";

export default function TakamineSan() {
  const [data, setData] = useState<SafeMovieResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const [serverIndex, setServerIndex] = useState(0);
  const [pickerOpen, setPickerOpen] = useState(false);

  const [playerUrl, setPlayerUrl] = useState<string>("");
  const [playerLoading, setPlayerLoading] = useState(false);

  const playerRef = useRef<HTMLDivElement | null>(null);
  const lastLoadedRef = useRef<string>("");

  const [searchParams, setSearchParams] = useSearchParams();
  const epSlugFromUrl = searchParams.get("ep") || "";

  useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    setError("");

    apiGetMovie(SLUG, ac.signal)
      .then((json) => {
        if (!json?.status) throw new Error(json?.msg || "API error");
        setData(json);
        setServerIndex(0);
      })
      .catch((e: any) => {
        if (e?.name !== "AbortError") setError(String(e?.message || e));
      })
      .finally(() => setLoading(false));

    return () => ac.abort();
  }, []);

  const movie = data?.movie;
  const servers = data?.episodes || [];
  const currentServer = servers[serverIndex];

  const episodesSorted: SafeEpisode[] = useMemo(() => {
    const list = currentServer?.server_data ? [...currentServer.server_data] : [];
    list.sort((a, b) => getEpisodeNumber(a.name) - getEpisodeNumber(b.name));
    return list;
  }, [currentServer]);

  const selectedEpisode = useMemo(() => {
    if (!epSlugFromUrl) return null;
    return episodesSorted.find((x) => x.slug === epSlugFromUrl) || null;
  }, [episodesSorted, epSlugFromUrl]);

  useEffect(() => {
    if (!data) return;
    if (!epSlugFromUrl) return;
    if (playerLoading) return;

    const target = episodesSorted.find((x) => x.slug === epSlugFromUrl);
    if (!target) return;

    if (lastLoadedRef.current === `${serverIndex}:${target.slug}`) return;
    lastLoadedRef.current = `${serverIndex}:${target.slug}`;

    loadEpisode(target);
  }, [data, epSlugFromUrl, serverIndex, episodesSorted]);

  async function loadEpisode(ep: SafeEpisode) {
    try {
      setPlayerLoading(true);
      setError("");
      setPlayerUrl("");

      setSearchParams({ ep: ep.slug }, { replace: true });

      const tk = await apiGetToken();
      const r = await apiGetWatchUrl(SLUG, ep.slug, tk.token);

      setPlayerUrl(r.url);
      setPickerOpen(false);

      setTimeout(() => playerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
    } catch (e: any) {
      setError(String(e?.message || e));
    } finally {
      setPlayerLoading(false);
    }
  }

  if (loading) return <div className="p-6 text-sm text-muted-foreground">Loading Api Bro..</div>;

  if (error && !movie) {
    return (
      <div className="p-6">
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm">Lỗi: {error}</div>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#060914]">
      <Navbar />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 left-1/2 h-[560px] w-[980px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute top-32 right-[-220px] h-[460px] w-[460px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-[-220px] left-[-220px] h-[520px] w-[520px] rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_45%)]" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-3 pb-12 pt-6 md:px-6">
        <div className="mb-4 text-xs text-white/60">
          Trang chủ <span className="mx-2 text-white/30">›</span> Hoạt Hình{" "}
          <span className="mx-2 text-white/30">›</span> {movie.year} <span className="mx-2 text-white/30">›</span>{" "}
          {movie.country?.[0]?.name || "—"} <span className="mx-2 text-white/30">›</span>{" "}
          <span className="text-white/90">{movie.name}</span>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-4 shadow-[0_20px_90px_rgba(0,0,0,0.55)] backdrop-blur md:p-6">
          <div className="grid gap-5 md:grid-cols-[300px_1fr]">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/40">
              <img
                src={movie.poster_url || movie.thumb_url}
                alt={movie.name}
                className="h-[380px] w-full object-cover"
                loading="lazy"
              />
              <div className="flex gap-2 p-3">
                <button
                  className="flex-1 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:opacity-95"
                  onClick={() => setPickerOpen(true)}
                >
                  Chọn tập để xem
                </button>
                <button
                  className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 hover:bg-white/10"
                  onClick={() => playerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                >
                  Xem
                </button>
              </div>
            </div>

            <div>
              <div className="mb-2 text-center">
                <div className="text-xl font-extrabold tracking-wide text-white md:text-3xl">{movie.name}</div>
                <div className="text-sm text-white/60 italic">{movie.origin_name}</div>
              </div>

              <div className="mt-4 rounded-3xl border border-white/10 bg-black/25">
                <InfoRow label="Tình trạng" value={movie.episode_current} />
                <InfoRow label="Số tập" value={movie.episode_total} />
                <InfoRow label="Thời lượng" value={movie.time} />
                <InfoRow label="Năm phát hành" value={String(movie.year)} />
                <InfoRow label="Chất lượng" value={movie.quality} />
                <InfoRow label="Ngôn ngữ" value={movie.lang} />
                <InfoRow label="Đạo diễn" value={(movie.director || []).join(", ") || "Đang cập nhật"} />
                <InfoRow label="Diễn viên" value={(movie.actor || []).join(", ")} />
                <InfoRow label="Thể loại" value={(movie.category || []).map((c) => c.name).join(", ")} />
                <InfoRow label="Quốc gia" value={(movie.country || []).map((c) => c.name).join(", ")} />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Chip>{movie.status === "ongoing" ? "Đang cập nhật" : "Hoàn thành"}</Chip>
                <Chip>{movie.quality}</Chip>
                <Chip>{movie.lang}</Chip>
                <Chip>{movie.time}</Chip>
              </div>

              {error && (
                <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-200">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4 backdrop-blur md:p-6">
          <div className="mb-2 text-sm font-semibold text-white/90">Nội dung phim</div>
          <div className="text-sm leading-6 text-white/70">{movie.content}</div>
        </div>

        <div
          ref={playerRef}
          className="mt-5 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4 backdrop-blur md:p-6"
        >
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm font-semibold text-white/90">
              Xem phim:{" "}
              {selectedEpisode ? (
                <span className="text-violet-300">{selectedEpisode.name}</span>
              ) : (
                <span className="text-white/50">Chưa chọn tập</span>
              )}{" "}
              <span className="mx-2 text-white/25">|</span> Server:{" "}
              <span className="text-white/80">{currentServer?.server_name || "—"}</span>{" "}
              <span className="ml-2 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-white/70">
                #Vietsub
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {servers.map((s, idx) => (
                <button
                  key={`${s.server_name}-${idx}`}
                  onClick={() => {
                    setServerIndex(idx);
                    setPickerOpen(false);
                    setPlayerUrl("");
                    lastLoadedRef.current = "";
                  }}
                  className={[
                    "rounded-2xl border px-3 py-1.5 text-xs transition",
                    idx === serverIndex
                      ? "border-transparent bg-white/15 text-white"
                      : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10",
                  ].join(" ")}
                >
                  {s.server_name}
                </button>
              ))}

              <button
                className="rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-violet-500/20 hover:opacity-95"
                onClick={() => setPickerOpen(true)}
              >
                Chọn tập
              </button>
            </div>
          </div>

          {!playerUrl ? (
            <div className="grid place-items-center rounded-3xl border border-dashed border-white/15 bg-black/35 py-16 text-center">
              <div className="max-w-md px-4">
                <div className="text-base font-semibold text-white">Chưa chọn tập</div>
                <div className="mt-2 text-sm text-white/70">Nhấn “Chọn tập” để bắt đầu xem.</div>

                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <button
                    className="rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:opacity-95"
                    onClick={() => setPickerOpen(true)}
                  >
                    Mở danh sách tập
                  </button>

                  {selectedEpisode && (
                    <button
                      className="rounded-2xl border border-white/10 bg-white/5 px-6 py-2 text-sm font-semibold text-white/90 hover:bg-white/10 disabled:opacity-50"
                      onClick={() => loadEpisode(selectedEpisode)}
                      disabled={playerLoading}
                    >
                      Phát tập đã chọn
                    </button>
                  )}
                </div>

                {playerLoading && <div className="mt-4 text-xs text-white/60">Đang lấy link xem...</div>}
              </div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-black">
              <iframe
                title="player"
                src={playerUrl}
                className="aspect-video w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>

        <div className="mt-5 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4 backdrop-blur md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm font-semibold text-white/90">Danh sách tập</div>
            <button
              className="h-9 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:opacity-95"
              onClick={() => setPickerOpen(true)}
            >
              Mở danh sách tập
            </button>
          </div>
          <div className="mt-3 rounded-3xl border border-dashed border-white/15 bg-black/35 p-6 text-sm text-white/70">
            Danh sách tập đang được ẩn. Nhấn “Mở danh sách tập” để chọn tập bạn muốn xem.
          </div>
        </div>
      </div>

      <EpisodePickerModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        title={`Chọn tập • ${currentServer?.server_name || ""}`}
        episodes={episodesSorted}
        currentSlug={selectedEpisode?.slug || ""}
        onPick={(ep) => loadEpisode(ep)}
        loading={playerLoading}
      />
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-3 px-4 py-2 text-sm md:grid-cols-[180px_1fr]">
      <div className="text-white/55">{label}</div>
      <div className="text-white/90">{value || "—"}</div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

function EpisodePickerModal({
  open,
  onClose,
  title,
  episodes,
  currentSlug,
  onPick,
  loading,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  episodes: SafeEpisode[];
  currentSlug: string;
  onPick: (ep: SafeEpisode) => void;
  loading: boolean;
}) {
  const [search, setSearch] = useState("");
  const [jump, setJump] = useState("");
  const [p, setP] = useState(1);
  const SIZE = 120;

  useEffect(() => {
    if (open) {
      setSearch("");
      setJump("");
      setP(1);
    }
  }, [open]);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return episodes;
    return episodes.filter((ep) => {
      const n = getEpisodeNumber(ep.name);
      return ep.name.toLowerCase().includes(s) || ep.slug.toLowerCase().includes(s) || String(n).includes(s);
    });
  }, [episodes, search]);

  const total = Math.max(1, Math.ceil(filtered.length / SIZE));
  const ps = Math.min(Math.max(1, p), total);

  const items = useMemo(() => {
    const start = (ps - 1) * SIZE;
    return filtered.slice(start, start + SIZE);
  }, [filtered, ps]);

  function doJump() {
    const num = Number(jump);
    if (!Number.isFinite(num)) return;
    const target = episodes.find((ep) => getEpisodeNumber(ep.name) === num);
    if (!target) return;
    onPick(target);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 w-[min(1040px,94vw)] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/10 bg-gradient-to-b from-[#0b1220] to-[#070b12] p-4 shadow-[0_35px_140px_rgba(0,0,0,0.65)] md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-base font-semibold text-white">{title}</div>
            <div className="mt-1 text-xs text-white/60">
              Click để phát. (Có {filtered.length} tập){loading ? " • Đang lấy link..." : ""}
            </div>
          </div>
          <button
            className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/85 hover:bg-white/10 disabled:opacity-50"
            onClick={onClose}
            disabled={loading}
          >
            Đóng
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setP(1);
            }}
            placeholder="Tìm tập... (vd: 1186)"
            className="h-10 flex-1 rounded-2xl border border-white/10 bg-white/5 px-3 text-sm text-white/90 outline-none placeholder:text-white/35 focus:border-violet-400/40"
          />

          <input
            value={jump}
            onChange={(e) => setJump(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") doJump();
            }}
            placeholder="Nhảy tới (vd: 1000)"
            className="h-10 w-44 rounded-2xl border border-white/10 bg-white/5 px-3 text-sm text-white/90 outline-none placeholder:text-white/35 focus:border-violet-400/40"
          />

          <button
            className="h-10 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:opacity-95 disabled:opacity-50"
            onClick={doJump}
            disabled={loading}
          >
            Đi
          </button>

          <button
            className="h-10 rounded-2xl border border-white/10 bg-white/5 px-3 text-xs text-white/85 hover:bg-white/10 disabled:opacity-40"
            disabled={ps <= 1 || loading}
            onClick={() => setP((x) => Math.max(1, x - 1))}
          >
            Trước
          </button>

          <div className="px-1 text-xs text-white/65">
            Trang <span className="text-white">{ps}</span> / {total}
          </div>

          <button
            className="h-10 rounded-2xl border border-white/10 bg-white/5 px-3 text-xs text-white/85 hover:bg-white/10 disabled:opacity-40"
            disabled={ps >= total || loading}
            onClick={() => setP((x) => Math.min(total, x + 1))}
          >
            Sau
          </button>
        </div>

        <div className="mt-4 max-h-[62vh] overflow-auto rounded-3xl border border-white/10 bg-black/25 p-3">
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10">
            {items.map((ep) => {
              const active = ep.slug === currentSlug;
              return (
                <button
                  key={ep.slug}
                  onClick={() => onPick(ep)}
                  className={[
                    "rounded-2xl border px-2 py-2 text-xs transition disabled:opacity-50",
                    active
                      ? "border-transparent bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-md shadow-violet-500/20"
                      : "border-white/10 bg-white/5 text-white/85 hover:bg-white/10",
                  ].join(" ")}
                  title={ep.filename}
                  disabled={loading}
                >
                  {ep.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-3 text-xs text-white/45">Mẹo: gõ “1000” để lọc nhanh.</div>
      </div>
    </div>
  );
}
