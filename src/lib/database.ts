import { DATABASE_API_KEY, DATABASE_URL } from '@config'
import { createClient } from '@supabase/supabase-js'

export const db = createClient(DATABASE_URL, DATABASE_API_KEY)

export const testConnection = async (): Promise<boolean> => {
  try {
    const { error } = await db.from('_health').select('*').limit(1)

    if (error) {
      console.error('Connection test failed:', error.message)
      return false
    }

    return true
  } catch (err) {
    console.error('Connection test error:', err)
    return false
  }
}
