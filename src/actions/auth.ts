"use server";
import { createClient } from "@/supabase/server";

const supabase = await createClient();

export const authenticate = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.log("AUTHENTICATION ERROR", error);
    throw error;
  }
};

export const getLatestUsers = async () => {
  const { data, error } = await supabase
    .from("users")
    .select("id, email, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    throw new Error(`Error fetching latest users: ${error.message}`);
  }

  const latestUsers = data.map((user) => ({
    id: user.id,
    email: user.email,
    date: user.created_at,
  }));

  return latestUsers;
};
