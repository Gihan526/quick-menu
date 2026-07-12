import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

// Supabase transaction pooler (port 6543) requires prepared statements off.
const client = postgres(process.env.DATABASE_URL!, { prepare: false })

// drizzle-orm v1 dropped the `schema` config in favour of the `relations` API.
// Add `relations` here once tables are defined in ./schema.
export const db = drizzle({ client })
