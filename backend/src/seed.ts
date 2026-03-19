import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { customerStories, platformStats } from "./db/schema";

async function seed() {
  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    console.error("DATABASE_URL environment variable is required");
    process.exit(1);
  }

  const sql = neon(DATABASE_URL);
  const db = drizzle(sql);

  console.log("🌱 Seeding database...");

  // Create tables if they don't exist (raw SQL for simplicity)
  await sql`
    CREATE TABLE IF NOT EXISTS platform_stats (
      id SERIAL PRIMARY KEY,
      label VARCHAR(255) NOT NULL,
      value VARCHAR(100) NOT NULL,
      icon VARCHAR(100),
      sort_order SERIAL
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS customer_stories (
      id SERIAL PRIMARY KEY,
      quote TEXT NOT NULL,
      author_name VARCHAR(255) NOT NULL,
      author_title VARCHAR(255) NOT NULL,
      company VARCHAR(255) NOT NULL,
      metric_label VARCHAR(255),
      metric_value VARCHAR(100),
      image_url VARCHAR(500),
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS demo_requests (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      company VARCHAR(255) NOT NULL,
      message TEXT,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `;

  // Clear existing seed data
  await db.delete(platformStats);
  await db.delete(customerStories);

  // Seed platform stats
  await db.insert(platformStats).values([
    { label: "Platform Uptime", value: "99.9%", icon: "uptime" },
    { label: "Predictions Governed Daily", value: "10M+", icon: "predictions" },
    { label: "Audit Coverage", value: "100%", icon: "audit" },
  ]);

  // Seed customer stories
  await db.insert(customerStories).values([
    {
      quote:
        "Thndr AI helped us achieve compliance 3x faster while maintaining full visibility.",
      authorName: "Chief AI Officer",
      authorTitle: "Chief AI Officer",
      company: "Enterprise Healthcare",
      metricLabel: "80% reduction in compliance time",
      metricValue: "80%",
      imageUrl: "/images/testimonial-1.jpg",
    },
    {
      quote:
        "Complete governance across 50+ models without adding overhead to ML teams.",
      authorName: "VP of Engineering",
      authorTitle: "VP of Engineering",
      company: "Enterprise Healthcare",
      metricLabel: "100% model coverage",
      metricValue: "100%",
      imageUrl: "/images/testimonial-2.jpg",
    },
    {
      quote:
        "Seamless integration with our stack. Audit-ready in weeks, not months.",
      authorName: "Head of ML Operations",
      authorTitle: "Head of ML Operations",
      company: "Financial Services",
      metricLabel: "25% faster time to market",
      metricValue: "25%",
      imageUrl: "/images/testimonial-3.jpg",
    },
    {
      quote:
        "Automated governance that scaled with our rapid AI deployment.",
      authorName: "CTO",
      authorTitle: "CTO",
      company: "Tech Scale-up",
      metricLabel: "50+ agents governed",
      metricValue: "50+",
      imageUrl: "/images/testimonial-4.jpg",
    },
  ]);

  console.log("✅ Database seeded successfully!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Seed failed:", error);
  process.exit(1);
});
