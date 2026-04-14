import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const siteContent = mysqlTable("siteContent", {
  key: varchar("key", { length: 32 }).primaryKey(),
  heroEyebrow: text("heroEyebrow").notNull(),
  heroHeadline: text("heroHeadline").notNull(),
  heroSupportingText: text("heroSupportingText").notNull(),
  heroPrimaryCta: varchar("heroPrimaryCta", { length: 120 }).notNull(),
  heroSecondaryCta: varchar("heroSecondaryCta", { length: 120 }).notNull(),
  servicesTitle: text("servicesTitle").notNull(),
  servicesIntro: text("servicesIntro").notNull(),
  aboutTitle: text("aboutTitle").notNull(),
  aboutBody: text("aboutBody").notNull(),
  trustPointOne: text("trustPointOne").notNull(),
  trustPointTwo: text("trustPointTwo").notNull(),
  trustPointThree: text("trustPointThree").notNull(),
  portfolioTitle: text("portfolioTitle").notNull(),
  portfolioIntro: text("portfolioIntro").notNull(),
  featuredWorkTitle: text("featuredWorkTitle").notNull(),
  featuredWorkDescription: text("featuredWorkDescription").notNull(),
  instagramPostUrl: text("instagramPostUrl").notNull(),
  instagramReelOneUrl: text("instagramReelOneUrl").notNull(),
  instagramReelTwoUrl: text("instagramReelTwoUrl").notNull(),
  instagramReelThreeUrl: text("instagramReelThreeUrl").notNull(),
  contactTitle: text("contactTitle").notNull(),
  contactIntro: text("contactIntro").notNull(),
  contactEmail: varchar("contactEmail", { length: 320 }).notNull(),
  contactPhone: varchar("contactPhone", { length: 120 }).notNull(),
  instagramProfileUrl: text("instagramProfileUrl").notNull(),
  footerText: text("footerText").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type SiteContent = typeof siteContent.$inferSelect;
export type InsertSiteContent = typeof siteContent.$inferInsert;
