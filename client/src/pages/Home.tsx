import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import {
  ArrowRight,
  Camera,
  ChevronRight,
  Film,
  Instagram,
  MonitorPlay,
  ShieldCheck,
} from "lucide-react";
import { Link } from "wouter";
import { buildPortfolioItems } from "@/lib/instagram";
import { PortfolioEmbedCard } from "@/components/PortfolioEmbedCard";

const heroImage =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663537530230/SG9bc6pRJWsU5Yi9PHxXWE/ferrarifinal_4eabb9f8.webp";
const founderImage =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663537530230/SG9bc6pRJWsU5Yi9PHxXWE/SNY09334_9e0a14e0.JPEG";
const editingImage =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663537530230/SG9bc6pRJWsU5Yi9PHxXWE/IMG_1568_84088057.JPEG";

const services = [
  {
    icon: Camera,
    title: "Content capture",
    description:
      "Short-form shoots, founder-led clips, and automotive visuals built to feel current rather than templated.",
  },
  {
    icon: Film,
    title: "Social creative",
    description:
      "Campaign-ready edits shaped for reels, launches, and consistent brand presentation across platforms.",
  },
  {
    icon: MonitorPlay,
    title: "Post-production",
    description:
      "Refinement, pacing, and polish that help raw footage land like a premium piece of brand media.",
  },
];

export default function Home() {
  const { data, isLoading } = trpc.siteContent.getPublic.useQuery();

  if (isLoading || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <div className="rounded-full border border-red-500/30 px-5 py-3 text-sm uppercase tracking-[0.3em] text-red-400">
          Loading site
        </div>
      </div>
    );
  }

  const portfolioItems = buildPortfolioItems({
    instagramPostUrl: data.instagramPostUrl,
    instagramReelOneUrl: data.instagramReelOneUrl,
    instagramReelTwoUrl: data.instagramReelTwoUrl,
    instagramReelThreeUrl: data.instagramReelThreeUrl,
  });

  const trustPoints = [data.trustPointOne, data.trustPointTwo, data.trustPointThree];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-red-600/40 selection:text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="container flex h-20 items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-red-400">Max Media Marketing</p>
            <p className="mt-1 text-sm text-zinc-400">Automotive-first creative presentation</p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={data.instagramProfileUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-200 transition hover:border-red-500/40 hover:text-white"
            >
              Instagram
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0">
            <img src={heroImage} alt="Red Ferrari close-up" className="h-full w-full object-cover object-center opacity-35" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.96)_0%,rgba(5,5,5,0.88)_42%,rgba(5,5,5,0.65)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(220,38,38,0.35),transparent_26%),radial-gradient(circle_at_20%_80%,rgba(127,29,29,0.22),transparent_26%)]" />
          </div>

          <div className="container relative grid min-h-[86vh] items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
            <div className="max-w-3xl">
              <p className="inline-flex rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.32em] text-red-300">
                {data.heroEyebrow}
              </p>
              <h1 className="mt-8 max-w-4xl text-5xl font-semibold leading-[0.95] text-white md:text-7xl">
                {data.heroHeadline}
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-300">
                {data.heroSupportingText}
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#portfolio"
                  className="inline-flex items-center justify-center rounded-full bg-red-600 px-7 py-4 text-base font-medium text-white transition hover:bg-red-500"
                >
                  {data.heroPrimaryCta}
                  <ArrowRight className="ml-3 h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-4 text-base font-medium text-white transition hover:bg-white/10"
                >
                  {data.heroSecondaryCta}
                </a>
              </div>

              <div className="mt-12 grid gap-4 md:grid-cols-3">
                {services.map((service) => (
                  <div key={service.title} className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                    <service.icon className="h-5 w-5 text-red-400" />
                    <h2 className="mt-4 text-lg font-semibold text-white">{service.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-zinc-400">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
              <div className="rounded-[1.7rem] border border-red-500/20 bg-black/60 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-red-400">Image placement</p>
                <h2 className="mt-4 text-2xl font-semibold text-white">{data.featuredWorkTitle}</h2>
                <p className="mt-4 text-sm leading-7 text-zinc-400">{data.featuredWorkDescription}</p>

                <div className="mt-6 space-y-4">
                  {[
                    "Ferrari close-up: used as the hero backdrop because it delivers the strongest visual tension and fits the red-led palette.",
                    "Founder portrait beside the car: used in the about section to establish credibility and personality.",
                    "Editing-screen laptop shot: used in the process section to show actual production craft rather than generic stock imagery.",
                  ].map((item) => (
                    <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                      <p className="text-sm leading-7 text-zinc-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#09090b] py-24">
          <div className="container grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/40">
              <img src={editingImage} alt="Laptop editing workflow for automotive media" className="h-full w-full object-cover" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-red-400">Services and process</p>
              <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-white md:text-5xl">
                {data.servicesTitle}
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">{data.servicesIntro}</p>

              <div className="mt-8 grid gap-4">
                {trustPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3 rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-5">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                    <p className="text-sm leading-7 text-zinc-300">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#050505] py-24">
          <div className="container grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-red-400">About the brand</p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight text-white md:text-5xl">{data.aboutTitle}</h2>
              <p className="mt-6 text-lg leading-8 text-zinc-400">{data.aboutBody}</p>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-[0_24px_90px_rgba(0,0,0,0.4)]">
              <img src={founderImage} alt="Founder standing beside a red sports car" className="w-full rounded-[1.5rem] object-cover" />
            </div>
          </div>
        </section>

        <section id="portfolio" className="border-b border-white/10 bg-[#09090b] py-24">
          <div className="container">
            <p className="text-xs uppercase tracking-[0.3em] text-red-400">Portfolio</p>
            <h2 className="mt-5 text-4xl font-semibold text-white md:text-5xl">{data.portfolioTitle}</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">{data.portfolioIntro}</p>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {portfolioItems.map((item, index) => (
                <PortfolioEmbedCard
                  key={item.link ?? `${item.title}-${index}`}
                  title={item.title}
                  description={item.description}
                  embedUrl={item.embedUrl}
                  link={item.link}
                  fallbackLabel={item.fallbackLabel}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.14),transparent_28%),#050505] py-24">
          <div className="container grid gap-8 rounded-[2rem] border border-white/10 bg-black/40 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.45)] lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-red-400">Contact</p>
              <h2 className="mt-5 text-4xl font-semibold text-white md:text-5xl">{data.contactTitle}</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">{data.contactIntro}</p>
            </div>

            <div className="rounded-[1.7rem] border border-white/10 bg-white/5 p-6">
              <div className="space-y-4 text-sm text-zinc-300">
                <p>
                  <span className="block text-xs uppercase tracking-[0.24em] text-zinc-500">Email</span>
                  <a href={`mailto:${data.contactEmail}`} className="mt-1 inline-block text-base text-white hover:text-red-300">
                    {data.contactEmail}
                  </a>
                </p>
                <p>
                  <span className="block text-xs uppercase tracking-[0.24em] text-zinc-500">Phone</span>
                  <a href={`tel:${data.contactPhone}`} className="mt-1 inline-block text-base text-white hover:text-red-300">
                    {data.contactPhone}
                  </a>
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href={data.instagramProfileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm text-white transition hover:border-red-500/40 hover:bg-white/5">
                  Visit Instagram
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black py-8">
        <div className="container flex flex-col gap-2 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>{data.footerText}</p>
          <p>Modern black-and-red UI with protected admin-only content management.</p>
        </div>
      </footer>
    </div>
  );
}
