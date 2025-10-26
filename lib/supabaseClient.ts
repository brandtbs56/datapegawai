import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient("https://qrsptmzglyiimavfnbds.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyc3B0bXpnbHlpaW1hdmZuYmRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzNzY5ODAsImV4cCI6MjA3Njk1Mjk4MH0.UnZBnnk7WWLDqc4jYEwDmT49Yigme6awzTMpRFoWujU");