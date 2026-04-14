import React, { useEffect, useState } from "react";
import { Instagram } from "lucide-react";

export type PortfolioEmbedCardProps = {
  title: string;
  description: string;
  embedUrl: string | null;
  link: string | null;
  fallbackLabel: string;
  forceState?: "loading" | "ready" | "fallback";
};

export function PortfolioEmbedCard({
  title,
  description,
  embedUrl,
  link,
  fallbackLabel,
  forceState,
}: PortfolioEmbedCardProps) {
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">(
    forceState ?? (embedUrl ? "loading" : "fallback"),
  );

  useEffect(() => {
    if (forceState) {
      setStatus(forceState);
      return;
    }

    if (!embedUrl) {
      setStatus("fallback");
      return;
    }

    setStatus("loading");
    const timeout = window.setTimeout(() => {
      setStatus(current => (current === "ready" ? current : "fallback"));
    }, 8000);

    return () => window.clearTimeout(timeout);
  }, [embedUrl, forceState]);

  const showFallback = status === "fallback";
  const showLoading = status === "loading";

  return (
    <article className="rounded-[1.8rem] border border-white/10 bg-black/40 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
      <div className="overflow-hidden rounded-[1.3rem] border border-white/10 bg-[#0f0f12]">
        {showFallback ? (
          <div className="flex aspect-[4/5] min-h-[26rem] items-center justify-center bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.14),transparent_40%),#0f0f12] p-8 text-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-red-400">Portfolio fallback</p>
              <p className="mt-4 text-lg font-semibold text-white">{fallbackLabel}</p>
              <p className="mt-3 text-sm leading-7 text-zinc-400">
                This card stays visible even if an Instagram embed is unavailable.
              </p>
            </div>
          </div>
        ) : (
          <div className="relative aspect-[4/5] min-h-[26rem] w-full">
            {showLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(180deg,rgba(17,17,20,0.92),rgba(17,17,20,0.72))] p-6 text-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-red-400">Loading embed</p>
                  <p className="mt-4 text-sm leading-7 text-zinc-400">
                    The portfolio card remains responsive while Instagram content is loading.
                  </p>
                </div>
              </div>
            ) : null}
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={title}
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                onLoad={() => setStatus("ready")}
                onError={() => setStatus("fallback")}
              />
            ) : null}
          </div>
        )}
      </div>
      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm leading-7 text-zinc-400">{description}</p>
        </div>
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 text-sm text-red-300 transition hover:text-red-200"
          >
            <Instagram className="h-4 w-4" />
            Open
          </a>
        ) : (
          <span className="inline-flex shrink-0 items-center gap-2 text-sm text-zinc-500">
            <Instagram className="h-4 w-4" />
            Unavailable
          </span>
        )}
      </div>
    </article>
  );
}
