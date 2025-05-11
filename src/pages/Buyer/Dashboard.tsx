import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks/app-hooks";
<<<<<<< HEAD
import { getOrderHistory } from "@/modules/Buyer/models/track-order/trackOrderSlice";
=======
import { getOrderHistory } from "@/modules/Buyer/models/trackOrderSlice";
>>>>>>> staging
import { RootState } from "@/store/store";
import useOrderFilter from "@/modules/Buyer/hooks/useOrderFilter";
import ErrorBoundary from "@/common/components/ErrorBoundary";


const COLORS = ["#FFBB28", "#FF8042", "#00C49F", "#0088FE", "#FF3B30"];
interface AnalyticsData {
  totalOrders: number;
  totalSpent: number;
  mostPurchased: { name: string; purchases: number }[];
  ordersByStatus: { name: string; value: number }[];
}

const BuyerDashboardPage = () => {
  const dispatch = useAppDispatch();
  const { allOrders, loading, error } = useAppSelector(
    (state: RootState) => state.trackOrder
  );

  const normalizedOrders = useOrderFilter(allOrders, "all", ""); // Replace raw orders

  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalOrders: 0,
    totalSpent: 0,
    mostPurchased: [],
    ordersByStatus: [],
  });

  useEffect(() => {
    dispatch(getOrderHistory());
  }, [dispatch]);

  useEffect(() => {
    if (normalizedOrders.length > 0) {
      const totalOrders = normalizedOrders.length;
      const totalSpent = normalizedOrders.reduce(
        (sum, order) =>
          sum + (order.product?.price || 0) * (order.product?.quantity || 1),
        0
<<<<<<< HEAD
=======
        
>>>>>>> staging
      );

      const productCountMap: Record<string, number> = {};
      normalizedOrders.forEach((order) => {
        const name = order.product?.model || "Unknown Product";
        productCountMap[name] =
          (productCountMap[name] || 0) + (order.product?.quantity || 1);
      });

      const mostPurchased = Object.entries(productCountMap)
        .map(([name, purchases]) => ({ name, purchases }))
        .sort((a, b) => b.purchases - a.purchases)
        .slice(0, 5);

      const statusMap: Record<string, number> = {};
      normalizedOrders.forEach((order) => {
        const status = order.order_status || "Unknown";
        statusMap[status] = (statusMap[status] || 0) + 1;
      });

      const ordersByStatus = Object.entries(statusMap).map(([name, value]) => ({
        name,
        value,
      }));
<<<<<<< HEAD
=======
      const content_ids = normalizedOrders.map((order) => order.product?.productId).filter(Boolean);
      const order_ids = normalizedOrders.map((order) => order.orderId).filter(Boolean);

      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("trackCustom", "OrderAnalyticsUpdated", {
          content_ids,
          order_ids,
          total_orders: totalOrders,
          total_spent: totalSpent,
        });
      }
>>>>>>> staging

      setAnalytics({ totalOrders, totalSpent, mostPurchased, ordersByStatus });
    }
  }, [normalizedOrders]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <ErrorBoundary>
      {analytics.totalOrders === 0 ? (
        <div className="p-6 text-center text-xl text-gray-600">
          No orders yet
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-6 space-y-6"
        >
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div
              className="p-4 bg-white rounded-2xl shadow-md text-center"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-gray-600 font-semibold">Total Orders</h3>
              <p className="text-2xl font-bold text-blue-600">
                {analytics.totalOrders}
              </p>
            </motion.div>

            <motion.div
              className="p-4 bg-white rounded-2xl shadow-md text-center"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-gray-600 font-semibold">Total Spent</h3>
              <p className="text-2xl font-bold text-green-600">
                ₦{analytics.totalSpent.toLocaleString()}
              </p>
            </motion.div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Most Purchased */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold mb-4">
                Most Purchased Products
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.mostPurchased}>
                  <Tooltip />
                  <Bar dataKey="purchases" fill="#4A90E2" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Orders by Status */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold mb-4">Orders Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics.ordersByStatus}
                    dataKey="value"
                    outerRadius={100}
                    label
                  >
                    {analytics.ordersByStatus.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      )}
    </ErrorBoundary>
  );
};

export default BuyerDashboardPage;
