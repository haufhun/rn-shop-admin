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

export const getMonthlyOrders = async () => {
  const { data, error } = await supabase.from("order").select("created_at");

  if (error) {
    throw new Error(`Error fetching orders: ${error.message}`);
  }

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const ordersByMonth = data.reduce(
    (acc: Record<string, number>, order: { created_at: string }) => {
      const date = new Date(order.created_at);
      const month = monthNames[date.getMonth()];

      if (!acc[month]) acc[month] = 0;
      acc[month] += 1;
      return acc;
    },
    {}
  );

  return Object.keys(ordersByMonth).map((month) => ({
    name: month,
    orders: ordersByMonth[month],
  }));
};
