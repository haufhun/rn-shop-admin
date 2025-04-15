import { getMonthlyOrders } from "@/actions/orders";
import PageComponent from "./page-component";

const AdminDashboard = async () => {
  const monthlyOrders = await getMonthlyOrders();

  return <PageComponent monthlyOrders={monthlyOrders} />;
};

export default AdminDashboard;
