import { notFound } from "next/navigation";

import { asc, eq } from "drizzle-orm";

import { db } from "@/app/db";
import { dishes, restaurants } from "@/app/db/schema";
import MenuTemplate from "@/components/menu-template";

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [restaurant] = await db
    .select()
    .from(restaurants)
    .where(eq(restaurants.slug, slug))
    .limit(1);

  if (!restaurant) notFound();

  const dishList = await db
    .select()
    .from(dishes)
    .where(eq(dishes.restaurantId, restaurant.id))
    .orderBy(asc(dishes.sortOrder));

  const background =
    restaurant.template === "template-2"
      ? "bg-[#f4efe5]"
      : restaurant.template === "template-3"
        ? "bg-zinc-950"
        : "bg-[#f7f7f5]";

  return (
    <main className={`min-h-screen ${background}`}>
      <MenuTemplate
        data={{
          name: restaurant.name,
          address: restaurant.address,
          contactNumber: restaurant.contactNumber,
          tagline: restaurant.tagline,
          dishes: dishList.map((dish) => ({
            id: dish.id,
            name: dish.name,
            price: dish.price,
            photo: dish.photoUrl,
          })),
        }}
        template={restaurant.template}
      />
    </main>
  );
}
