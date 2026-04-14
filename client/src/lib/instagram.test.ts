import { describe, expect, it } from "vitest";
import { buildPortfolioItems, getInstagramEmbedUrl } from "./instagram";

describe("instagram helpers", () => {
  it("formats canonical Instagram post and reel URLs as embed URLs", () => {
    expect(getInstagramEmbedUrl("https://www.instagram.com/p/DWtQEn9kdvi/")).toBe(
      "https://www.instagram.com/p/DWtQEn9kdvi/embed",
    );
    expect(getInstagramEmbedUrl("https://www.instagram.com/reel/DWbb8gCD3vM/")).toBe(
      "https://www.instagram.com/reel/DWbb8gCD3vM/embed",
    );
  });

  it("strips tracking query parameters before building embed URLs", () => {
    expect(
      getInstagramEmbedUrl(
        "https://www.instagram.com/reel/DWbb8gCD3vM/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      ),
    ).toBe("https://www.instagram.com/reel/DWbb8gCD3vM/embed");

    expect(
      getInstagramEmbedUrl(
        "https://www.instagram.com/p/DWtQEn9kdvi/?utm_source=ig_web_copy_link",
      ),
    ).toBe("https://www.instagram.com/p/DWtQEn9kdvi/embed");
  });

  it("returns null when an Instagram URL is missing", () => {
    expect(getInstagramEmbedUrl(undefined)).toBeNull();
    expect(getInstagramEmbedUrl(null)).toBeNull();
    expect(getInstagramEmbedUrl("")).toBeNull();
  });

  it("returns unrecognized URLs unchanged", () => {
    expect(getInstagramEmbedUrl("https://www.instagram.com/maxmedia/")).toBe(
      "https://www.instagram.com/maxmedia/",
    );
    expect(getInstagramEmbedUrl("not-a-url")).toBe("not-a-url");
  });

  it("builds portfolio items with fallback labels for missing entries", () => {
    const items = buildPortfolioItems({
      instagramPostUrl: "https://www.instagram.com/p/DWtQEn9kdvi/?utm_source=ig_web_copy_link",
      instagramReelOneUrl:
        "https://www.instagram.com/reel/DWbb8gCD3vM/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      instagramReelTwoUrl: undefined,
      instagramReelThreeUrl: "",
    });

    expect(items).toHaveLength(4);
    expect(items[0].embedUrl).toBe("https://www.instagram.com/p/DWtQEn9kdvi/embed");
    expect(items[1].embedUrl).toBe("https://www.instagram.com/reel/DWbb8gCD3vM/embed");
    expect(items[2].link).toBeNull();
    expect(items[2].fallbackLabel).toBe("Second reel unavailable");
    expect(items[3].embedUrl).toBeNull();
  });
});
