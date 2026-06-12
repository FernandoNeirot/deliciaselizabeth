/**
 * Storage adapter — SSR-safe.
 *
 * Toda lectura/escritura a localStorage pasa por acá para evitar errores
 * en Server Components / SSR de Next.js.
 */

export const isBrowser = (): boolean =>
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

export function safeGet<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function safeSet(key: string, value: unknown): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota / private mode */
  }
}

export function safeRemove(key: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

export function safeOrigin(): string {
  if (!isBrowser()) return process.env.NEXT_PUBLIC_SITE_URL ?? "";
  return window.location.origin;
}

export function dispatchBrowserEvent(name: string): void {
  if (!isBrowser()) return;
  window.dispatchEvent(new Event(name));
}
