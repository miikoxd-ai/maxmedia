/*
Design reminder for this file: Midnight Broadcast Editorial.
Use a dark cinematic base, copper-gold accents, left-anchored composition,
refined glow fields, and premium editorial spacing. Every added section must
feel like a continuation of the original Max Media Marketing landing page.
*/

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Camera,
  Check,
  ChevronDown,
  Clapperboard,
  ExternalLink,
  Mail,
  Menu,
  Phone,
  Play,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SectionId = "services" | "portfolio" | "about" | "enquire";

type FormData = {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

type SubmitState =
  | { type: "idle"; message: string }
  | { type: "loading"; message: string }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

const headerHeight = 96;

const navItems: { label: string; id: SectionId }[] = [
  { label: "Services", id: "services" },
  { label: "Portfolio", id: "portfolio" },
  { label: "About Me", id: "about" },
  { label: "Enquire Now", id: "enquire" },
];

const services = [
  {
    icon: Camera,
    title: "Video Production",
    description:
      "Cinematic dealership content, walkarounds, presenter-led promos, and launch pieces built to stop the scroll and earn attention.",
    bullets: ["Dealership walkarounds", "Presenter content", "Cinematic edits"],
  },
  {
    icon: Clapperboard,
    title: "Paid Social Campaigns",
    description:
      "Campaign creative and ad delivery aligned around local targeting, faster follow-up, and clearer return on marketing spend.",
    bullets: ["Meta ad creative", "Offer testing", "Lead-focused targeting"],
  },
  {
    icon: Sparkles,
    title: "Content Strategy",
    description:
      "Monthly planning that turns sporadic posting into a repeatable acquisition system with stronger messaging and cleaner positioning.",
    bullets: ["Campaign planning", "Content pillars", "Offer positioning"],
  },
];

const instagramPortfolioItems = [
  {
    title: "Feature Post",
    category: "Instagram Post",
    kicker: "Pinned portfolio example",
    description:
      "A live post embedded directly from the Max Media profile to show real creative output inside the site rather than placeholder case-study cards.",
    embedUrl: "https://www.instagram.com/p/DWtQEn9kdvi/embed",
    permalink: "https://www.instagram.com/p/DWtQEn9kdvi/",
  },
  {
    title: "Automotive Reel 01",
    category: "Instagram Reel",
    kicker: "Short-form editorial video",
    description:
      "A public reel embed presented as part of the portfolio grid so visitors can review real motion work in context.",
    embedUrl: "https://www.instagram.com/reel/DWbb8gCD3vM/embed",
    permalink:
      "https://www.instagram.com/reel/DWbb8gCD3vM/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    title: "Automotive Reel 02",
    category: "Instagram Reel",
    kicker: "Social-first campaign asset",
    description:
      "This reel demonstrates the kind of founder-led, scroll-stopping content now surfaced directly inside the website portfolio section.",
    embedUrl: "https://www.instagram.com/reel/DWvYDixgRgh/embed",
    permalink:
      "https://www.instagram.com/reel/DWvYDixgRgh/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    title: "Automotive Reel 03",
    category: "Instagram Reel",
    kicker: "Real account proof",
    description:
      "A fourth live embed rounds out the showcase and gives visitors a direct path back to Instagram for deeper browsing.",
    embedUrl: "https://www.instagram.com/reel/DVfrWwBEa21/embed",
    permalink:
      "https://www.instagram.com/reel/DVfrWwBEa21/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
];

const trustPoints = [
  "Founder-led service with direct communication from strategy to delivery.",
  "Creative built specifically for automotive buyers, dealerships, and service-based growth campaigns.",
  "A practical blend of filming, editing, ad execution, and messaging under one roof.",
];

const initialFormData: FormData = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

const portfolioImage =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663537530230/SG9bc6pRJWsU5Yi9PHxXWE/max-media-hero-cinematic-ckWVQ3EKimatUzoymds8mS.webp";
const founderImage =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663537530230/SG9bc6pRJWsU5Yi9PHxXWE/max-media-founder-portrait-9i2UHHpPY6n6GoXQfy8qGc.webp";
const enquiryImage =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663537530230/SG9bc6pRJWsU5Yi9PHxXWE/max-media-enquiry-side-image-UTFAGjXWtKaWmFjg7qHnJh.webp";
const logoImage =
  "https://assets.ls-assets.com/uploads/057ba25b-5fa0-4f0e-8159-7682cd716771/670ea2fd-6b4d-4eac-bd74-218e1f6a9d34.png?w=768";

function scrollToSection(id: SectionId) {
  const section = document.getElementById(id);
  if (!section) return;

  const y = section.getBoundingClientRect().top + window.scrollY - headerHeight;
  window.scrollTo({ top: y, behavior: "smooth" });
}

function validateForm(data: FormData) {
  const errors: FormErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.name.trim()) errors.name = "Please enter your name.";
  if (!data.businessName.trim()) {
    errors.businessName = "Please enter your business name.";
  }
  if (!data.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.phone.trim()) errors.phone = "Please enter your phone number.";
  if (!data.service.trim()) {
    errors.service = "Please select the service you are interested in.";
  }
  if (!data.message.trim()) {
    errors.message = "Please tell us a little about your goals.";
  }

  return errors;
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("services");
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>({
    type: "idle",
    message: "",
  });

  const observerSections = useMemo(() => navItems.map((item) => item.id), []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  useEffect(() => {
    const observers = observerSections
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id as SectionId);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.2, 0.35, 0.6],
      },
    );

    observers.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [observerSections]);

  const handleNavClick = (id: SectionId) => {
    scrollToSection(id);
    setMobileOpen(false);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const submitEnquiry = async (data: FormData) => {
    /**
     * Backend integration placeholder:
     * Replace this simulated request with Formspree, Supabase, EmailJS,
     * Netlify Forms, or your own API endpoint when backend wiring is ready.
     */
    await new Promise((resolve) => window.setTimeout(resolve, 1100));

    if (data.email.toLowerCase().includes("fail")) {
      throw new Error("Simulated integration failure.");
    }

    return { ok: true };
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitState({
        type: "error",
        message: "Please fix the highlighted fields and try again.",
      });
      return;
    }

    setSubmitState({ type: "loading", message: "Sending your enquiry..." });

    try {
      await submitEnquiry(formData);
      setSubmitState({
        type: "success",
        message:
          "Thanks for reaching out. Your enquiry has been captured and is ready to connect to your preferred backend workflow.",
      });
      setFormData(initialFormData);
      setErrors({});
    } catch {
      setSubmitState({
        type: "error",
        message:
          "Something went wrong while sending your enquiry. Please try again or connect this form to your preferred submission service.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0d] text-[#f5efe6] selection:bg-[#d8a55a]/30 selection:text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#090a0d]/90 backdrop-blur-md">
        <div className="container flex h-20 items-center justify-between gap-6">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center"
            aria-label="Go to top of page"
          >
            <img src={logoImage} alt="Max Media Marketing" className="h-11 w-auto" />
          </button>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "text-sm font-medium tracking-[0.18em] uppercase text-[#d6d1ca] transition-colors duration-300 hover:text-[#d8a55a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a55a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090a0d]",
                  activeSection === item.id && "text-[#d8a55a]",
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <Button
            type="button"
            variant="ghost"
            onClick={() => setMobileOpen((open) => !open)}
            className="border border-white/10 bg-white/5 px-3 text-[#f5efe6] hover:bg-white/10 hover:text-white lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>

        <div
          id="mobile-menu"
          className={cn(
            "overflow-hidden border-t border-white/10 bg-[#0d0f14] transition-all duration-300 lg:hidden",
            mobileOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="container flex flex-col gap-2 py-5">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "rounded-full border border-transparent px-4 py-3 text-left text-sm font-medium tracking-[0.14em] uppercase text-[#d6d1ca] transition-colors duration-300 hover:border-[#d8a55a]/30 hover:bg-white/5 hover:text-[#d8a55a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a55a]",
                  activeSection === item.id && "border-[#d8a55a]/30 bg-white/5 text-[#d8a55a]",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main>
        <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
          <div className="absolute inset-0">
            <img
              src={portfolioImage}
              alt="Automotive content production for Max Media Marketing"
              className="h-full w-full object-cover object-center opacity-35"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,9,12,0.96)_0%,rgba(8,9,12,0.92)_38%,rgba(8,9,12,0.5)_72%,rgba(8,9,12,0.25)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(216,165,90,0.16),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.08),transparent_28%)]" />
          </div>

          <div className="pointer-events-none absolute right-[12%] top-[20%] hidden h-56 w-56 rounded-full bg-[#d8a55a]/12 blur-3xl lg:block" />
          <div className="pointer-events-none absolute bottom-[12%] left-[8%] hidden h-44 w-44 rounded-full bg-white/8 blur-3xl lg:block" />

          <div className="container relative py-24 lg:py-32">
            <div className="max-w-3xl">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d8a55a]/30 bg-[#d8a55a]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#d8a55a]">
                Adelaide automotive growth partner
              </span>
              <h1 className="font-display max-w-4xl text-5xl leading-[0.94] text-[#f7f1e8] sm:text-6xl lg:text-7xl xl:text-[5.6rem]">
                Turn your auto business into a
                <span className="block bg-[linear-gradient(120deg,#d8a55a_0%,#f0d5a6_40%,#b98947_100%)] bg-clip-text text-transparent">
                  digital marketing powerhouse.
                </span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-[#c7c0b6] sm:text-xl">
                Max Media Marketing films, edits, and runs targeted social campaigns
                for automotive businesses across Adelaide, helping good operators turn
                attention into qualified enquiries.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => handleNavClick("enquire")}
                  className="group inline-flex items-center justify-center rounded-full bg-[#d8a55a] px-8 py-4 text-base font-semibold text-[#17130f] shadow-[0_20px_60px_rgba(216,165,90,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e3b46f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f1c889] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090a0d]"
                >
                  Enquire Now
                  <ArrowRight className="ml-3 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick("portfolio")}
                  className="inline-flex items-center justify-center rounded-full border border-white/16 bg-white/5 px-8 py-4 text-base font-semibold text-[#f5efe6] transition-all duration-300 hover:border-[#d8a55a]/40 hover:text-[#d8a55a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a55a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090a0d]"
                >
                  <Play className="mr-3 size-4 text-[#d8a55a]" />
                  Portfolio
                </button>
              </div>

              <div className="mt-14 grid max-w-2xl gap-4 sm:grid-cols-3">
                {[
                  ["Performance creative", "Cinematic content for modern dealerships"],
                  ["Lead generation", "Campaigns designed for enquiries, not vanity"],
                  ["Local market focus", "Adelaide-first strategy and execution"],
                ].map(([title, copy]) => (
                  <div
                    key={title}
                    className="rounded-[1.6rem] border border-white/10 bg-white/6 p-5 backdrop-blur-sm"
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d8a55a]">
                      {title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#c8c0b5]">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleNavClick("services")}
            className="absolute bottom-8 left-1/2 inline-flex -translate-x-1/2 flex-col items-center gap-2 text-[#d0c7bc] transition-colors hover:text-[#d8a55a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a55a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090a0d]"
            aria-label="Scroll to services section"
          >
            <span className="text-[11px] uppercase tracking-[0.35em]">Scroll</span>
            <ChevronDown className="size-4 animate-bounce text-[#d8a55a]" />
          </button>
        </section>

        <section id="services" className="scroll-mt-28 bg-[#f6f1e8] py-24 text-[#181513] lg:py-28">
          <div className="container">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full bg-[#d8a55a]/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#9a6930]">
                Our Services
              </span>
              <h2 className="mt-6 max-w-4xl font-display text-4xl leading-tight sm:text-5xl">
                High-converting promotional content built to move from attention to
                enquiry.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5f554a]">
                The existing offer remains simple: capture strong creative, package it
                with clean strategy, and put it in front of the right local audience.
              </p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <article
                    key={service.title}
                    className={cn(
                      "group relative overflow-hidden rounded-[1.9rem] border border-[#e7ddcf] bg-white p-8 shadow-[0_18px_50px_rgba(24,21,19,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(24,21,19,0.14)]",
                      index === 1 && "lg:-mt-6",
                    )}
                  >
                    <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-[5rem] bg-[radial-gradient(circle,rgba(216,165,90,0.16),transparent_70%)]" />
                    <div className="relative">
                      <div className="inline-flex rounded-2xl bg-[linear-gradient(135deg,#d8a55a_0%,#b78144_100%)] p-4 text-white shadow-lg shadow-[#d8a55a]/25">
                        <Icon className="size-6" />
                      </div>
                      <h3 className="mt-6 text-2xl font-semibold text-[#181513]">{service.title}</h3>
                      <p className="mt-4 text-base leading-7 text-[#5f554a]">{service.description}</p>
                      <ul className="mt-6 space-y-3">
                        {service.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-center gap-3 text-sm text-[#453d35]">
                            <span className="inline-flex size-6 items-center justify-center rounded-full bg-[#d8a55a]/12 text-[#a56a25]">
                              <Check className="size-3.5" />
                            </span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="portfolio"
          className="scroll-mt-28 relative overflow-hidden bg-[#0a0c10] py-24 lg:py-28"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(216,165,90,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_25%)]" />
          <div className="container relative">
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
              <div className="max-w-2xl">
                <span className="inline-flex rounded-full border border-[#d8a55a]/25 bg-[#d8a55a]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#d8a55a]">
                  Portfolio
                </span>
                <h2 className="mt-6 font-display text-4xl leading-tight text-[#f7f1e8] sm:text-5xl">
                  Recent work designed to earn attention, trust, and local action.
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-8 text-[#c6beb2]">
                  The portfolio now pulls in real public Instagram content from
                  <span className="mx-1 text-[#f7f1e8]">@maxmedia.au</span>
                  so visitors can browse actual posts and reels without leaving the site.
                </p>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.32)] backdrop-blur-sm">
                <div className="rounded-[1.5rem] border border-white/10 bg-[#0e1218] p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d8a55a]">
                    Live account showcase
                  </p>
                  <h3 className="mt-4 font-display text-3xl leading-tight text-[#f7f1e8]">
                    Embedded posts and reels that connect the website directly to current creative work.
                  </h3>
                  <p className="mt-4 text-base leading-7 text-[#c6beb2]">
                    Each card below loads from a public Instagram embed URL, giving this section real proof-of-work while preserving the editorial polish of the site.
                  </p>
                  <a
                    href="https://www.instagram.com/maxmedia.au/"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#d8a55a]/30 bg-[#d8a55a]/10 px-4 py-2 text-sm font-semibold tracking-[0.12em] text-[#f4d19f] transition-colors duration-300 hover:bg-[#d8a55a]/18"
                  >
                    View profile
                    <ExternalLink className="size-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {instagramPortfolioItems.map((item) => (
                <article
                  key={item.embedUrl}
                  className="group flex h-full flex-col rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#d8a55a]/35 hover:shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-6"
                >
                  <div className="overflow-hidden rounded-[1.45rem] border border-white/8 bg-[#12151a]">
                    <div className="relative aspect-[4/5] min-h-[31rem] w-full bg-[#0f1318]">
                      <iframe
                        src={item.embedUrl}
                        title={item.title}
                        className="absolute inset-0 h-full w-full"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex flex-1 flex-col">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-[#d8a55a]/25 bg-[#d8a55a]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d8a55a]">
                        {item.category}
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b9b1a5]">
                        {item.kicker}
                      </p>
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold text-[#f7f1e8]">{item.title}</h3>
                    <p className="mt-4 flex-1 text-sm leading-7 text-[#c6beb2]">{item.description}</p>
                    <a
                      href={item.permalink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#f4d19f] transition-colors duration-300 hover:text-[#ffdcae]"
                    >
                      Open on Instagram
                      <ExternalLink className="size-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-28 bg-[#111317] py-24 lg:py-28">
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
              <div className="relative order-2 lg:order-1">
                <div className="absolute -left-6 top-10 hidden h-40 w-40 rounded-full bg-[#d8a55a]/14 blur-3xl md:block" />
                <div className="relative mx-auto max-w-md rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-5 shadow-[0_32px_90px_rgba(0,0,0,0.34)]">
                  <div className="rounded-[1.7rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(216,165,90,0.12),transparent_40%),#0d0f13] p-6">
                    <img
                      src={founderImage}
                      alt="Founder portrait for Max Media Marketing"
                      className="mx-auto max-h-[32rem] w-auto object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <span className="inline-flex rounded-full border border-[#d8a55a]/25 bg-[#d8a55a]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#d8a55a]">
                  About Me
                </span>
                <h2 className="mt-6 font-display text-4xl leading-tight text-[#f7f1e8] sm:text-5xl">
                  A personal brand built around clear strategy, strong creative, and dependable follow-through.
                </h2>
                <p className="mt-6 text-lg leading-8 text-[#c8c0b5]">
                  I built Max Media Marketing to give automotive businesses a sharper,
                  more accountable marketing partner. Instead of handing content, ads,
                  and messaging to separate providers, clients get one focused workflow
                  designed around better presentation and stronger local demand.
                </p>
                <p className="mt-5 text-lg leading-8 text-[#c8c0b5]">
                  The work spans filming, editing, ad creative, and campaign direction,
                  with a practical emphasis on what actually helps a dealership or
                  service-led operator generate trust before the first phone call.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    ["Services offered", "Video production, social ads, campaign strategy"],
                    ["Why clients trust", "Direct communication and measurable campaign thinking"],
                    ["Working style", "Fast, clear, founder-led execution"],
                  ].map(([title, copy]) => (
                    <div key={title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d8a55a]">{title}</p>
                      <p className="mt-3 text-sm leading-6 text-[#c8c0b5]">{copy}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-4 rounded-[1.8rem] border border-white/10 bg-[#0c0f13] p-7">
                  {trustPoints.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[#d8a55a]/12 text-[#d8a55a]">
                        <ShieldCheck className="size-4" />
                      </span>
                      <p className="text-base leading-7 text-[#ddd4c8]">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="enquire" className="scroll-mt-28 bg-[#f6f1e8] py-24 text-[#181513] lg:py-28">
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div>
                <span className="inline-flex rounded-full bg-[#d8a55a]/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#9a6930]">
                  Enquire Now
                </span>
                <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
                  Tell me about your business, your offer, and where the leads need to come from.
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-8 text-[#5f554a]">
                  This enquiry form is fully structured for frontend validation now and
                  clean backend integration later, whether you prefer Formspree,
                  Supabase, EmailJS, Netlify Forms, or a custom submission endpoint.
                </p>

                <div className="mt-8 overflow-hidden rounded-[2rem] border border-[#e5dacb] bg-[#12161d] shadow-[0_28px_80px_rgba(24,21,19,0.15)]">
                  <img
                    src={enquiryImage}
                    alt="Editing workspace for Max Media Marketing enquiry section"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>

                <div className="mt-6 space-y-4 rounded-[1.7rem] border border-[#e5dacb] bg-white p-6 shadow-[0_12px_40px_rgba(24,21,19,0.07)]">
                  <div className="flex items-center gap-3 text-sm text-[#463b31]">
                    <Mail className="size-4 text-[#b17835]" />
                    Reply-friendly enquiry flow and clean field structure
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#463b31]">
                    <Phone className="size-4 text-[#b17835]" />
                    Built for desktop and mobile conversion paths
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#e5dacb] bg-white p-7 shadow-[0_24px_80px_rgba(24,21,19,0.09)] sm:p-8">
                <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-semibold text-[#27211b]">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-[#ddd0bf] bg-[#fbf7f1] px-4 py-3 text-[#181513] outline-none transition-colors focus:border-[#c68d45] focus:bg-white"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {errors.name ? (
                        <p id="name-error" className="mt-2 text-sm text-[#b74848]">
                          {errors.name}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label htmlFor="businessName" className="mb-2 block text-sm font-semibold text-[#27211b]">
                        Business Name
                      </label>
                      <input
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-[#ddd0bf] bg-[#fbf7f1] px-4 py-3 text-[#181513] outline-none transition-colors focus:border-[#c68d45] focus:bg-white"
                        aria-invalid={Boolean(errors.businessName)}
                        aria-describedby={errors.businessName ? "businessName-error" : undefined}
                      />
                      {errors.businessName ? (
                        <p id="businessName-error" className="mt-2 text-sm text-[#b74848]">
                          {errors.businessName}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#27211b]">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-[#ddd0bf] bg-[#fbf7f1] px-4 py-3 text-[#181513] outline-none transition-colors focus:border-[#c68d45] focus:bg-white"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email ? (
                        <p id="email-error" className="mt-2 text-sm text-[#b74848]">
                          {errors.email}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-[#27211b]">
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-[#ddd0bf] bg-[#fbf7f1] px-4 py-3 text-[#181513] outline-none transition-colors focus:border-[#c68d45] focus:bg-white"
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                      />
                      {errors.phone ? (
                        <p id="phone-error" className="mt-2 text-sm text-[#b74848]">
                          {errors.phone}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="mb-2 block text-sm font-semibold text-[#27211b]">
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-[#ddd0bf] bg-[#fbf7f1] px-4 py-3 text-[#181513] outline-none transition-colors focus:border-[#c68d45] focus:bg-white"
                      aria-invalid={Boolean(errors.service)}
                      aria-describedby={errors.service ? "service-error" : undefined}
                    >
                      <option value="">Select a service</option>
                      <option value="Video Production">Video Production</option>
                      <option value="Paid Social Campaigns">Paid Social Campaigns</option>
                      <option value="Content Strategy">Content Strategy</option>
                      <option value="Full Growth Package">Full Growth Package</option>
                    </select>
                    {errors.service ? (
                      <p id="service-error" className="mt-2 text-sm text-[#b74848]">
                        {errors.service}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-semibold text-[#27211b]">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full rounded-[1.5rem] border border-[#ddd0bf] bg-[#fbf7f1] px-4 py-3 text-[#181513] outline-none transition-colors focus:border-[#c68d45] focus:bg-white"
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message ? (
                      <p id="message-error" className="mt-2 text-sm text-[#b74848]">
                        {errors.message}
                      </p>
                    ) : null}
                  </div>

                  {submitState.message ? (
                    <div
                      className={cn(
                        "rounded-[1.4rem] border px-4 py-3 text-sm leading-6",
                        submitState.type === "success" &&
                          "border-[#cde8d1] bg-[#edf8ef] text-[#1f5d31]",
                        submitState.type === "error" &&
                          "border-[#f0c4c4] bg-[#fff1f1] text-[#8a2d2d]",
                        submitState.type === "loading" &&
                          "border-[#e7d8c0] bg-[#fbf3e5] text-[#7c5f2d]",
                      )}
                      role="status"
                    >
                      {submitState.message}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-[#17130f] px-8 py-4 text-base font-semibold text-[#f6f1e8] transition-all duration-300 hover:bg-[#2a241d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c68d45] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={submitState.type === "loading"}
                  >
                    {submitState.type === "loading" ? "Sending..." : "Enquire Now"}
                    <ArrowRight className="ml-3 size-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
