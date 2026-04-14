import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertSiteContent, InsertUser, siteContent, users } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export const defaultSiteContent: InsertSiteContent = {
  key: "main",
  heroEyebrow: "Adelaide automotive marketing and content",
  heroHeadline: "Modern automotive creative built to make performance brands impossible to ignore.",
  heroSupportingText:
    "Max Media Marketing produces founder-led content, high-impact visuals, and performance-minded social creative for brands that want sharper positioning and stronger local attention.",
  heroPrimaryCta: "See the work",
  heroSecondaryCta: "Contact Max Media",
  servicesTitle: "A lean creative system for brands that sell emotion, speed, and trust.",
  servicesIntro:
    "The new site pairs cinematic visual storytelling with a straightforward conversion path. It positions Max Media as both the camera behind the brand and the strategist shaping how the work performs.",
  aboutTitle: "Founder-led, hands-on, and built around automotive culture.",
  aboutBody:
    "The brand works best when it feels personal. That is why the site now uses your founder image in the credibility section, the Ferrari detail as the hero visual anchor, and the editing-screen photo inside the process story. Together they show the person, the product category, and the craft behind the content.",
  trustPointOne: "Founder-facing communication from planning to final delivery.",
  trustPointTwo: "Automotive-first visuals suited to reels, launches, and campaigns.",
  trustPointThree: "A lightweight backend editor so key website text can be updated without code changes.",
  portfolioTitle: "Recent work and platform-native proof.",
  portfolioIntro:
    "Live Instagram embeds remain part of the site so visitors can move from the landing page into real posts and reels without relying on placeholder mockups.",
  featuredWorkTitle: "How the provided photos are now used",
  featuredWorkDescription:
    "The Ferrari close-up functions as the primary hero image, the founder photo supports the about section, and the laptop editing shot reinforces the post-production process section.",
  instagramPostUrl: "https://www.instagram.com/p/DWtQEn9kdvi/",
  instagramReelOneUrl: "https://www.instagram.com/reel/DWbb8gCD3vM/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  instagramReelTwoUrl: "https://www.instagram.com/reel/DWvYDixgRgh/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  instagramReelThreeUrl: "https://www.instagram.com/reel/DVfrWwBEa21/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  contactTitle: "Ready to sharpen the brand?",
  contactIntro:
    "Get in touch to discuss campaigns, content production, or ongoing creative support. The public site remains view-only for visitors.",
  contactEmail: "hello@maxmedia.au",
  contactPhone: "+61 400 000 000",
  instagramProfileUrl: "https://www.instagram.com/maxmedia.au/",
  footerText: "Max Media Marketing — black-and-red automotive brand presentation for high-performance brands.",
};

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }

  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  const values: InsertUser = {
    openId: user.openId,
  };
  const updateSet: Record<string, unknown> = {};

  const textFields = ["name", "email", "loginMethod"] as const;
  type TextField = (typeof textFields)[number];

  const assignNullable = (field: TextField) => {
    const value = user[field];
    if (value === undefined) return;
    const normalized = value ?? null;
    values[field] = normalized;
    updateSet[field] = normalized;
  };

  textFields.forEach(assignNullable);

  if (user.lastSignedIn !== undefined) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  }

  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
    updateSet.role = "admin";
  }

  if (!values.lastSignedIn) {
    values.lastSignedIn = new Date();
  }

  if (Object.keys(updateSet).length === 0) {
    updateSet.lastSignedIn = new Date();
  }

  await db.insert(users).values(values).onDuplicateKeyUpdate({
    set: updateSet,
  });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function getSiteContent() {
  const db = await getDb();
  if (!db) {
    return defaultSiteContent;
  }

  const result = await db.select().from(siteContent).where(eq(siteContent.key, "main")).limit(1);
  if (result.length > 0) {
    return result[0];
  }

  await db.insert(siteContent).values(defaultSiteContent);
  const created = await db.select().from(siteContent).where(eq(siteContent.key, "main")).limit(1);
  return created[0] ?? defaultSiteContent;
}

export async function updateSiteContent(input: Omit<InsertSiteContent, "key">) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available for site content updates");
  }

  const payload: InsertSiteContent = {
    key: "main",
    ...input,
  };

  await db.insert(siteContent).values(payload).onDuplicateKeyUpdate({
    set: input,
  });

  const result = await db.select().from(siteContent).where(eq(siteContent.key, "main")).limit(1);
  return result[0] ?? payload;
}
