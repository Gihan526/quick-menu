# Quick Menu

Quick Menu is a self-service menu-page generator for restaurant owners. An owner enters their restaurant details, adds multiple dishes with photos and prices, previews a menu template, and publishes a live public page in one flow—without manual approval or deployment work.

Published menus use the application's Vercel domain and a restaurant-specific path:

```text
https://your-project.vercel.app/restaurant/dhaba-express
```

If that name already exists, Quick Menu automatically adds a numeric suffix:

```text
/restaurant/dhaba-express-2
/restaurant/dhaba-express-3
```

## Features

- Restaurant details form for name, address, contact number, and tagline
- Multiple dishes per restaurant, each with a name, price, and optional photo
- Dish photos uploaded directly from the form to Supabase Storage
- Live preview before publishing
- Three template styles built on a shared template interface
- Immediate database persistence and public-page publishing
- Unique, readable slugs generated from restaurant names
- Copyable public menu link shown as soon as publishing completes
- Responsive menu pages for desktop and mobile visitors
- Legacy `/menu/[slug]` links redirected to `/restaurant/[slug]`

## How it works

1. The owner enters the restaurant's details.
2. They add one or more dishes. Selected photos are uploaded directly to the public `dish-photos` Supabase Storage bucket.
3. They continue to the template screen and preview their own menu data.
4. They choose a template and click **Publish menu**.
5. A server action generates a unique slug and saves the restaurant and dishes to PostgreSQL.
6. The app immediately shows the public URL. The page is rendered dynamically from the saved data, so no separate Vercel deployment is required for each restaurant.



## Requirements

- [Bun](https://bun.sh/) 1.2 or newer
- A PostgreSQL database
- A Supabase project with Storage enabled


## Local setup

### 1. Install dependencies

```bash
bun install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

`DATABASE_URL` is used by Drizzle on the server. The two `NEXT_PUBLIC_` values are used by the browser to upload dish photos to Supabase Storage.

### 3. Create the database tables

Push the current Drizzle schema to the configured database:

```bash
bunx drizzle-kit push
```

The schema creates:

- `restaurants` — restaurant details, unique slug, selected template, and owner key
- `dishes` — dish details, photo URL, display order, and the restaurant relationship

### 4. Configure Supabase Storage

In the Supabase dashboard, create a **public** bucket named:

```text
dish-photos
```

The current client uploads and removes draft photos directly from the browser, so the bucket needs Storage policies that allow the publishable/anonymous role to insert and delete objects in this bucket. For an MVP, the policies can be created with the following SQL in the Supabase SQL editor:

```sql
create policy "Public dish photo uploads"
on storage.objects for insert
to anon
with check (bucket_id = 'dish-photos');

create policy "Public dish photo deletes"
on storage.objects for delete
to anon
using (bucket_id = 'dish-photos');
```

Because the bucket is public, published menu pages can display the returned public photo URLs.


### 5. Start the development server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

```bash
bun run dev      # Start the local development server
bun run build    # Create a production build
bun run start    # Run the production build
bun run lint     # Run ESLint
```


## Adding another menu template

The saved `template` value determines how a restaurant is rendered, so existing restaurant pages keep their selected design when new templates are introduced.

To add a template:

1. Add its identifier to `MenuTemplateId` in `components/menu-template.tsx`.
2. Create a component that accepts `MenuTemplateData`.
3. Add the identifier to the `MenuTemplate` dispatcher.
4. Add the template option to the list in `components/template-selector.tsx`.

Keep existing template identifiers unchanged so previously published menus continue to render correctly.


## Current MVP considerations

- There is no owner login or menu-editing screen yet. An owner key is generated and stored for future ownership features, but it is not currently exposed or used for authorization.


