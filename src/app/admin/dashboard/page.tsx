import { getMonthlyOrders } from "@/actions/orders";
import PageComponent from "./page-component";
import { getCategoryData } from "@/actions/categories";
import { getLatestUsers } from "@/actions/auth";

const AdminDashboard = async () => {
  const monthlyOrders = await getMonthlyOrders();
  const categoryData = await getCategoryData();
  const latestUsers = await getLatestUsers();

  return (
    <PageComponent
      monthlyOrders={monthlyOrders}
      categoryData={categoryData}
      latestUsers={latestUsers}
    />
  );
};

export default AdminDashboard;
