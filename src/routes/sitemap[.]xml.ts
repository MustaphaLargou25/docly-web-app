import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { contacts } from "@/lib/mock-data";

const BASE_URL = "https://docly-web-app.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/search", changefreq: "weekly", priority: "0.7" },
          { path: "/library", changefreq: "weekly", priority: "0.7" },
          { path: "/community", changefreq: "daily", priority: "0.8" },
          { path: "/upload", changefreq: "monthly", priority: "0.5" },
          { path: "/messages", changefreq: "weekly", priority: "0.4" },
          { path: "/notifications", changefreq: "weekly", priority: "0.4" },
          { path: "/profile", changefreq: "weekly", priority: "0.5" },
          { path: "/settings", changefreq: "monthly", priority: "0.3" },
          { path: "/signin", changefreq: "yearly", priority: "0.3" },
          { path: "/register", changefreq: "yearly", priority: "0.3" },
          { path: "/onboarding", changefreq: "yearly", priority: "0.3" },
          ...contacts.map((c) => ({ path: `/messages/${c.id}`, changefreq: "weekly" as const, priority: "0.3" })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
