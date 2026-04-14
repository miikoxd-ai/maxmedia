import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PortfolioEmbedCard } from "./PortfolioEmbedCard";

describe("PortfolioEmbedCard", () => {
  it("renders the responsive action layout classes", () => {
    const html = renderToStaticMarkup(
      <PortfolioEmbedCard
        title="Pinned post"
        description="Live Instagram proof-of-work"
        embedUrl="https://www.instagram.com/p/example/embed"
        link="https://www.instagram.com/p/example/"
        fallbackLabel="Instagram post unavailable"
        forceState="ready"
      />,
    );

    expect(html).toContain("sm:flex-row");
    expect(html).toContain("sm:justify-between");
    expect(html).toContain("Pinned post");
  });

  it("renders a visible loading state", () => {
    const html = renderToStaticMarkup(
      <PortfolioEmbedCard
        title="Pinned post"
        description="Live Instagram proof-of-work"
        embedUrl="https://www.instagram.com/p/example/embed"
        link="https://www.instagram.com/p/example/"
        fallbackLabel="Instagram post unavailable"
        forceState="loading"
      />,
    );

    expect(html).toContain("Loading embed");
    expect(html).toContain("The portfolio card remains responsive while Instagram content is loading.");
  });

  it("renders a runtime fallback state when an embed is unavailable", () => {
    const html = renderToStaticMarkup(
      <PortfolioEmbedCard
        title="Pinned post"
        description="Live Instagram proof-of-work"
        embedUrl={null}
        link={null}
        fallbackLabel="Instagram post unavailable"
        forceState="fallback"
      />,
    );

    expect(html).toContain("Portfolio fallback");
    expect(html).toContain("Instagram post unavailable");
    expect(html).toContain("Unavailable");
  });
});
