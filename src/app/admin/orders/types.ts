import { createClient } from "@/supabase/server";
import { QueryData } from "@supabase/supabase-js";

const supabase = await createClient();

export const ordersWithProductsQuery = supabase
  .from("order")
  .select("*, order_items:order_item(*, product(*)), users(*)")
  .order("created_at", { ascending: false });

export type OrdersWithProducts = QueryData<typeof ordersWithProductsQuery>;
