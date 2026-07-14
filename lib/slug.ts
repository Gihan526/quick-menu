import { eq, like, or } from "drizzle-orm";

import { db } from "@/app/db";
import { restaurants } from "@/app/db/schema";

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function generateUniqueSlug(name: string): Promise<string> {
  const base = slugify(name) || "restaurant";

  const existing = await db
    .select({ slug: restaurants.slug })
    .from(restaurants)
    .where(or(eq(restaurants.slug, base), like(restaurants.slug, `${base}-%`)));

  const taken = new Set(existing.map(({ slug }) => slug));

  if (!taken.has(base)) return base;

  let suffix = 2;
  while (taken.has(`${base}-${suffix}`)) suffix += 1;

  return `${base}-${suffix}`;
}
