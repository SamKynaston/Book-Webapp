// Function to check if a device is mobile based on a query, which is set to screen size.
export function isMobile(query: string): boolean {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
}