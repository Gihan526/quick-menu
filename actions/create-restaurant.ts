"use server";

import { db } from "@/app/db";
import { dishes, restaurants } from "@/app/db/schema";
import { isValidIndianPhone } from "@/lib/phone";
import { generateOwnerKey } from "@/lib/owner-key";
import { generateUniqueSlug } from "@/lib/slug";

type DishInput = { name: string; price: string; photo: string | null };

type CreateRestaurantResult =
  | { ok: true; slug: string }
  | { ok: false; error: string };

export async function createRestaurant(
  formData: FormData,
): Promise<CreateRestaurantResult> {
  const name = String(formData.get("restaurantName"));
  const contactNumber = String(formData.get("contactNumber"));
  const address = String(formData.get("address"));
  const tagline = String(formData.get("tagline")) || null;
  const template = String(formData.get("template") || "template-1");

  if (!isValidIndianPhone(contactNumber)) {
    return {
      ok: false,
      error:
        "Invalid contact number. Please enter a valid Indian mobile number.",
    };
  }

  const dishList: DishInput[] = JSON.parse(String(formData.get("dishes")));

  const slug = await generateUniqueSlug(name);
  const ownerKey = generateOwnerKey();

  const [restaurant] = await db
    .insert(restaurants)
    .values({
      slug,
      name,
      address,
      contactNumber,
      tagline,
      ownerKey,
      template,
    })
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

  return { ok: true, slug };
}
