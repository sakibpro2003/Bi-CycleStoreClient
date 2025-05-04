import { useState, useEffect } from "react";
import ManageUsers from "./ManageUsers";
import ManageProducts from "./ManageProducts";
import ManageOrders from "./ManageOrders";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem("adminActiveTab") || "users";
  });

  useEffect(() => {
    localStorage.setItem("adminActiveTab", activeTab);
  }, [activeTab]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-5 space-y-4">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <ul className="space-y-3">
          <li>
            <button
              className={`w-full text-left p-2 rounded-md ${
                activeTab === "users" ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab("users")}
            >
              Manage Users
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded-md ${
                activeTab === "products" ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab("products")}
            >
              Manage Products
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded-md ${
                activeTab === "orders" ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab("orders")}
            >
              Manage Orders
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        {activeTab === "users" && <ManageUsers />}
        {activeTab === "products" && <ManageProducts />}
        {activeTab === "orders" && <ManageOrders />}
      </div>
    </div>
  );
};

export default AdminDashboard;
