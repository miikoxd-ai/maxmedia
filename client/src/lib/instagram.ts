export type PortfolioItem = {
  title: string;
  description: string;
  embedUrl: string | null;
  link: string | null;
  fallbackLabel: string;
};

/**
 * Instagram portfolio embeds use the canonical /p/{shortcode}/embed and
 * /reel/{shortcode}/embed pattern. We intentionally normalize incoming public
 * share URLs by removing tracking query parameters because the embed endpoint
 * is more reliable when built from the clean canonical path.
 */
export function getInstagramEmbedUrl(url: string | null | undefined) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const segments = parsed.pathname.split("/").filter(Boolean);
    const contentType = segments[0];
    const shortcode = segments[1];

    if ((contentType === "reel" || contentType === "p") && shortcode) {
      return `${parsed.origin}/${contentType}/${shortcode}/embed`;
    }

    return `${parsed.origin}${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return url;
  }
}

export function buildPortfolioItems(input: {
  instagramPostUrl?: string | null;
  instagramReelOneUrl?: string | null;
  instagramReelTwoUrl?: string | null;
  instagramReelThreeUrl?: string | null;
}) {
  return [
    {
      title: "Pinned post",
      description: "A live Instagram post used as proof-of-work inside the site.",
      embedUrl: getInstagramEmbedUrl(input.instagramPostUrl),
      link: input.instagramPostUrl ?? null,
      fallbackLabel: "Instagram post unavailable",
    },
    {
      title: "Reel 01",
      description: "Short-form creative aligned to automotive attention and brand energy.",
      embedUrl: getInstagramEmbedUrl(input.instagramReelOneUrl),
      link: input.instagramReelOneUrl ?? null,
      fallbackLabel: "First reel unavailable",
    },
    {
      title: "Reel 02",
      description: "Another live example showing how Max Media work appears in-platform.",
      embedUrl: getInstagramEmbedUrl(input.instagramReelTwoUrl),
      link: input.instagramReelTwoUrl ?? null,
      fallbackLabel: "Second reel unavailable",
    },
    {
      title: "Reel 03",
      description: "A final embedded reel to round out the on-site portfolio section.",
      embedUrl: getInstagramEmbedUrl(input.instagramReelThreeUrl),
      link: input.instagramReelThreeUrl ?? null,
      fallbackLabel: "Third reel unavailable",
    },
  ] satisfies PortfolioItem[];
}
