"use server";

import { createClient } from "@/supabase/server";

const supabase = await createClient();

export const getOrdersWithProducts = async () => {
  const { data, error } = await supabase
    .from("order")
    .select("*, order_items:order_item(*, product(*)), users(*)")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Error fetching orders: ${error.message}`);
  }

  return data;
};
