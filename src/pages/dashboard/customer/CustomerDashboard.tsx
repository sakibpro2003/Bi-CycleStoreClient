import { useState } from "react";
import ViewOrders from "./ViewOrders";
import ManageProfile from "./ManageProfile";
// import ViewOrders from "./ViewOrder

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-5 space-y-4">
        <h2 className="text-2xl font-bold">User Dashboard</h2>
        <ul className="space-y-3">
          <li>
            <button
              className={`w-full text-left p-2 rounded-md ${
                activeTab === "orders" ? "bg-blue-700" : "hover:bg-blue-800"
              }`}
              onClick={() => setActiveTab("orders")}
            >
              View Orders
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded-md ${
                activeTab === "profile" ? "bg-blue-700" : "hover:bg-blue-800"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Manage Profile
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        {activeTab === "orders" && <ViewOrders />}
        {activeTab === "profile" && <ManageProfile />}
      </div>
    </div>
  );
};

export default CustomerDashboard;
