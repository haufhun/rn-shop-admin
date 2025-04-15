"use server";

import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";
import { sendNotification } from "./notifications";

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

export const updateOrderStatus = async (orderId: number, newStatus: string) => {
  const { data: order, error } = await supabase
    .from("order")
    .update({ status: newStatus })
    .eq("id", orderId)
    .select("*")
    .single();

  if (error) {
    throw new Error(`Error updating order status: ${error.message}`);
  }

  await sendNotification(order.user, newStatus + " 🚀");

  revalidatePath("/admin/orders");
};
