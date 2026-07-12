import { createClient } from './supabase/client'

const BUCKET = 'dish-photos'

export async function uploadDishPhoto(file: File): Promise<string> {
  const supabase = createClient()
  const ext = file.name.split('.').pop() ?? 'jpg'
  const path = `${crypto.randomUUID()}.${ext}`

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type })

  if (error) throw new Error(error.message)

  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl
}

// Extracts the object path from a getPublicUrl() result, e.g.
// https://<ref>.supabase.co/storage/v1/object/public/dish-photos/<uuid>.jpg -> <uuid>.jpg
function pathFromPublicUrl(publicUrl: string): string | null {
  const marker = `/${BUCKET}/`
  const index = publicUrl.indexOf(marker)
  if (index === -1) return null
  return decodeURIComponent(publicUrl.slice(index + marker.length))
}

export async function deleteDishPhoto(publicUrl: string): Promise<void> {
  const path = pathFromPublicUrl(publicUrl)
  if (!path) return

  const supabase = createClient()
  const { error } = await supabase.storage.from(BUCKET).remove([path])

  if (error) throw new Error(error.message)
}
