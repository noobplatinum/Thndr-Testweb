import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const demoRequests = pgTable("demo_requests", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const customerStories = pgTable("customer_stories", {
  id: serial("id").primaryKey(),
  quote: text("quote").notNull(),
  authorName: varchar("author_name", { length: 255 }).notNull(),
  authorTitle: varchar("author_title", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  metricLabel: varchar("metric_label", { length: 255 }),
  metricValue: varchar("metric_value", { length: 100 }),
  imageUrl: varchar("image_url", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const platformStats = pgTable("platform_stats", {
  id: serial("id").primaryKey(),
  label: varchar("label", { length: 255 }).notNull(),
  value: varchar("value", { length: 100 }).notNull(),
  icon: varchar("icon", { length: 100 }),
  sortOrder: serial("sort_order"),
});

export const siteContent = pgTable("site_content", {
  section: text("section").primaryKey(),
  data: text("data"), // Stored as JSON string
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 80 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
