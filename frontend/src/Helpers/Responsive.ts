export function isMobile(query: string): boolean {
    if (typeof window === "undefined") return false;

    return window.matchMedia(query).matches;
}