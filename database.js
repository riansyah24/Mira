import { createClient } from "@supabase/supabase-js"
import "dotenv/config"

let supabaseUrl = process.env.SUPABASE_URL
let supabaseKey = process.env.SUPABASE_KEY

const supabase = createClient(supabaseUrl,supabaseKey)

export default supabase