"use server";

import { redirect } from "next/navigation";

import { db } from "@/app/db";
import { dishes, restaurants } from "@/app/db/schema";

type DishInput = { name: string; price: string; photo: string | null };

export async function createRestaurant(formData: FormData) {
  const name = String(formData.get("restaurantName"));
  const contactNumber = String(formData.get("contactNumber"));
  const address = String(formData.get("address"));
  const tagline = String(formData.get("tagline")) || null;

  const dishList: DishInput[] = JSON.parse(String(formData.get("dishes")));

  const slug =
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") +
    "-" +
    Math.random().toString(36).slice(2, 8);

  const [restaurant] = await db
    .insert(restaurants)
    .values({ slug, name, address, contactNumber, tagline })
    .returning({ id: restaurants.id });

  await db.insert(dishes).values(
    dishList.map((dish, index) => ({
      restaurantId: restaurant.id,
      name: dish.name,
      price: dish.price,
      photoUrl: dish.photo,
      sortOrder: index,
    })),
  );

  redirect(`/menu/${slug}`);
}
