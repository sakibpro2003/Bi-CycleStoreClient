import { useState } from "react";
import ViewOrders from "./ViewOrders";
import ManageProfile from "./ManageProfile";

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-5 space-y-4 shadow-lg">
        <h2 className="text-2xl font-bold border-b-2 border-yellow-400 pb-2">
          User Dashboard
        </h2>
        <ul className="space-y-3">
          <li>
            <button
              className={`w-full text-left p-2 rounded-md transition-all duration-300 ${
                activeTab === "orders"
                  ? "bg-yellow-500 text-black font-bold"
                  : "hover:bg-yellow-400 hover:text-black"
              }`}
              onClick={() => setActiveTab("orders")}
            >
              View Orders
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded-md transition-all duration-300 ${
                activeTab === "profile"
                  ? "bg-yellow-500 text-black font-bold"
                  : "hover:bg-yellow-400 hover:text-black"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Manage Profile
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white overflow-y-auto shadow-inner border-l-4 border-yellow-400">
        {activeTab === "orders" && <ViewOrders />}
        {activeTab === "profile" && <ManageProfile />}
      </div>
    </div>
  );
};

export default CustomerDashboard;
