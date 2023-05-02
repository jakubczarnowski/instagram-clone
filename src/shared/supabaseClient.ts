import { createClient } from "@supabase/supabase-js";
import { env } from "~/env.mjs";
import { type DatabaseDefinitions } from "~/types/database";

export const getServiceSupabase = () =>
  createClient<DatabaseDefinitions>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

export const clientSupabase = createClient<DatabaseDefinitions>(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const supabase = () =>
  typeof window === "undefined" ? getServiceSupabase() : clientSupabase;

export const getUserAsAdmin = async (token: string) => {
  const { data, error } = await getServiceSupabase().auth.getUser(token);

  if (error) {
    throw error;
  }

  return data;
};

export const storageBucketsNames = {
  postsImages: "posts-images",
};
