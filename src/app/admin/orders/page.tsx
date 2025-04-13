import { getOrdersWithProducts } from "@/actions/orders";

export default async function Orders() {
  const orderWithProducts = await getOrdersWithProducts();

  if (!orderWithProducts) {
    return (
      <div className="text-center font-bold text-2xl">No orders found</div>
    );
  }

  console.log(orderWithProducts);

  return <div>Orders Page</div>;
}
