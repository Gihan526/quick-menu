import {
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

// A restaurant owner's self-serve submission. `slug` powers the public link
// (e.g. /restaurant/dhaba1); collisions are resolved to dhaba1-2 at insert time.
export const restaurants = pgTable('restaurants', {
  id: uuid().primaryKey().defaultRandom(),
  slug: text().notNull().unique(),
  name: text().notNull(),
  address: text().notNull(),
  contactNumber: text().notNull(),
  tagline: text(),
  // Which layout the page renders with. Kept as a string so new templates can
  // be added later without a schema change or breaking existing pages.
  template: text().notNull().default('menu-card'),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
})

// Dishes belong to a restaurant. A restaurant can have many.
export const dishes = pgTable('dishes', {
  id: uuid().primaryKey().defaultRandom(),
  restaurantId: uuid()
    .notNull()
    .references(() => restaurants.id, { onDelete: 'cascade' }),
  name: text().notNull(),
  // Stored as numeric but read back as a string to match the form/UI type.
  price: numeric({ precision: 10, scale: 2, mode: 'string' }).notNull(),
  photoUrl: text(),
  // Preserves the order dishes were added in for stable menu rendering.
  sortOrder: integer().notNull().default(0),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
})

export type Restaurant = typeof restaurants.$inferSelect
export type NewRestaurant = typeof restaurants.$inferInsert
export type Dish = typeof dishes.$inferSelect
export type NewDish = typeof dishes.$inferInsert
