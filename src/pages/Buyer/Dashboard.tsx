import { useState, useEffect } from "react";
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

const BuyerDashboardPage = () => {
  // Mock Data
  const [analytics, setAnalytics] = useState({
    totalOrders: 345,
    totalSpent: 12450,
    mostPurchased: [
      { name: "Laptop", purchases: 120 },
      { name: "Phone", purchases: 98 },
      { name: "Headphones", purchases: 75 },
      { name: "Watch", purchases: 65 },
    ],
    ordersByStatus: [
      { name: "Pending", value: 80 },
      { name: "Accepted", value: 100 },
      { name: "Dispatched", value: 50 },
      { name: "Delivered", value: 90 },
      { name: "Cancelled", value: 25 },
    ],
  });

  useEffect(() => {
    // Fetch real analytics data here in a real project
  }, []);

  const COLORS = ["#FFBB28", "#FF8042", "#00C49F", "#0088FE", "#FF3B30"];

  return (
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
            ${analytics.totalSpent}
          </p>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Purchased Products */}
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

        {/* Orders Breakdown by Status */}
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
  );
};

export default BuyerDashboardPage;
