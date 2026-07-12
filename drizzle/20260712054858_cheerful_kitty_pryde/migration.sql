CREATE TABLE "dishes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"restaurantId" uuid NOT NULL,
	"name" text NOT NULL,
	"price" numeric(10,2) NOT NULL,
	"photoUrl" text,
	"sortOrder" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "restaurants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"slug" text NOT NULL UNIQUE,
	"name" text NOT NULL,
	"address" text NOT NULL,
	"contactNumber" text NOT NULL,
	"tagline" text,
	"template" text DEFAULT 'menu-card' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "dishes" ADD CONSTRAINT "dishes_restaurantId_restaurants_id_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("id") ON DELETE CASCADE;