// configuration
const base = "https://conan-proxy.kudodz.workers.dev";
// const base = "http://127.0.0.1:8787";

// missing base
if (!base) {
  console.warn("missing api base. set this in phimapi.ts");
}

// safe types
export type SafeEpisode = {
  name: string;
  slug: string;
  filename: string;
};

export type SafeServer = {
  server_name: string;
  server_data: SafeEpisode[];
};

export type SafeMovie = {
  name: string;
  origin_name: string;
  content: string;
  type?: string;
  status?: string;
  poster_url: string;
  thumb_url: string;
  time: string;
  episode_current: string;
  episode_total: string;
  quality: string;
  lang: string;
  year: number;
  actor: string[];
  director: string[];
  category: { id: string; name: string; slug: string }[];
  country: { id: string; name: string; slug: string }[];
};

export type SafeMovieResponse = {
  status: boolean;
  msg: string;
  movie: SafeMovie;
  episodes: SafeServer[];
};


// movie api func
export async function apiGetMovie(slug: string, signal?: AbortSignal): Promise<SafeMovieResponse> {
  const u = new URL(`${base}/api/movie`);
  u.searchParams.set("slug", slug);

  const res = await fetch(u.toString(), { signal });
  if (!res.ok) throw new Error(`movie failed: ${res.status}`);
  return res.json();
}

export async function apiGetToken(signal?: AbortSignal): Promise<{ ok: boolean; token: string; exp: number }> {
  const res = await fetch(`${base}/api/token`, { signal, cache: "no-store" });
  if (!res.ok) throw new Error(`token failed: ${res.status}`);
  return res.json();
}

export async function apiGetWatchUrl(
  slug: string,
  ep: string,
  token: string,
  signal?: AbortSignal
): Promise<{ ok: boolean; url: string; name: string; ep: string; slug: string }> {
  const u = new URL(`${base}/api/watch-url`);
  u.searchParams.set("slug", slug);
  u.searchParams.set("ep", ep);
  u.searchParams.set("t", token);

  const res = await fetch(u.toString(), { signal, cache: "no-store" });
  if (!res.ok) throw new Error(`watch-url failed: ${res.status}`);
  return res.json();
}

export function getEpisodeNumber(epName: string): number {
 
  const m = epName.match(/(\d+(?:\.\d+)?)/);
  return m ? Number(m[1]) : Number.POSITIVE_INFINITY;
}

export type PaginationResponse = {
  status: boolean;
  msg: string;
  data: SafeMovie[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
};

export async function apiSearch(
  keyword: string,
  page: number = 1,
  signal?: AbortSignal
): Promise<PaginationResponse> {
  const u = new URL(`${base}/api/search`);
  u.searchParams.set("keyword", keyword);
  u.searchParams.set("page", page.toString());

  const res = await fetch(u.toString(), { signal });
  if (!res.ok) throw new Error(`search failed: ${res.status}`);
  return res.json();
}

export async function apiGetTotalMovies(signal?: AbortSignal): Promise<number> {
  try {
    const res = await apiSearch("", 1, signal);
    return res.pagination.totalItems || 0;
  } catch {
    return 0;
  }
}
