const API_BASE = import.meta.env.VITE_API_BASE as string;

export type MovieSafeResponse = {
  status: boolean;
  msg: string;
  movie: any;
  episodes: Array<{
    server_name: string;
    server_data: Array<{
      name: string;
      slug: string;
      filename: string;
    }>;
  }>;
};

export async function apiGetMovie(slug: string, signal?: AbortSignal): Promise<MovieSafeResponse> {
  const url = new URL(`${API_BASE}/api/movie`);
  url.searchParams.set("slug", slug);

  const res = await fetch(url.toString(), { signal });
  if (!res.ok) throw new Error(`movie failed: ${res.status}`);
  return res.json();
}

export async function apiGetToken(signal?: AbortSignal): Promise<{ ok: boolean; token: string; exp: number }> {
  const res = await fetch(`${API_BASE}/api/token`, { signal });
  if (!res.ok) throw new Error(`token failed: ${res.status}`);
  return res.json();
}

export async function apiGetWatchUrl(
  slug: string,
  ep: string,
  token: string,
  signal?: AbortSignal
): Promise<{ ok: boolean; url: string; name: string; ep: string; slug: string }> {
  const u = new URL(`${API_BASE}/api/watch-url`);
  u.searchParams.set("slug", slug);
  u.searchParams.set("ep", ep);
  u.searchParams.set("t", token);

  const res = await fetch(u.toString(), { signal });
  if (!res.ok) throw new Error(`watch-url failed: ${res.status}`);
  return res.json();
}

export function getEpisodeNumber(epName: string): number {
  const m = epName.match(/(\d+(?:\.\d+)?)/);
  return m ? Number(m[1]) : Number.POSITIVE_INFINITY;
}
