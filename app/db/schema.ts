import {
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const restaurants = pgTable("restaurants", {
  id: uuid().primaryKey().defaultRandom(),
  slug: text().notNull().unique(),
  name: text().notNull(),
  address: text().notNull(),
  contactNumber: text().notNull(),
  tagline: text(),

  template: text().notNull().default("menu-card"),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

export const dishes = pgTable("dishes", {
  id: uuid().primaryKey().defaultRandom(),
  restaurantId: uuid()
    .notNull()
    .references(() => restaurants.id, { onDelete: "cascade" }),
  name: text().notNull(),

  price: numeric({ precision: 10, scale: 2, mode: "string" }).notNull(),
  photoUrl: text(),

  sortOrder: integer().notNull().default(0),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

export type Restaurant = typeof restaurants.$inferSelect;
export type NewRestaurant = typeof restaurants.$inferInsert;
export type Dish = typeof dishes.$inferSelect;
export type NewDish = typeof dishes.$inferInsert;
