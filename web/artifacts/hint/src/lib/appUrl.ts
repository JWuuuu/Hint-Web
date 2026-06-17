const DEFAULT_HINT_APP_URL = "http://127.0.0.1:5175/app";

export const HINT_APP_URL =
  (import.meta.env.VITE_HINT_APP_URL as string | undefined)?.trim() || DEFAULT_HINT_APP_URL;

export function getHintAppUrl(path = ""): string {
  if (!path) return HINT_APP_URL;
  if (/^https?:\/\//i.test(path)) return path;

  const base = HINT_APP_URL.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
