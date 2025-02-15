import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div>
      <nav>Dashboard Sidebar</nav>
      <Outlet /> {/* This is where child pages (Dashboard, UserDashboard, AdminDashboard) will render */}
    </div>
  );
};

export default DashboardLayout;
