import { getOrdersWithProducts } from "@/actions/orders";
import PageComponent from "@/app/admin/orders/page-component";

export default async function Orders() {
  const ordersWithProducts = await getOrdersWithProducts();

  if (!ordersWithProducts) {
    return (
      <div className="text-center font-bold text-2xl">No orders found</div>
    );
  }

  console.log(ordersWithProducts);

  return (
    <div>
      <PageComponent ordersWithProducts={ordersWithProducts} />
    </div>
  );
}
