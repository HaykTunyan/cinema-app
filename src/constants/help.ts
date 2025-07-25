/**
 * Converts a standard YouTube video URL or short link into an embeddable YouTube URL.
 * @param {string} [url] - The YouTube video URL.
 * @returns {string | null} The embed-compatible YouTube URL, or null if parsing fails.
 */
export function getEmbedUrl(url?: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}