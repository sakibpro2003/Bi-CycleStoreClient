import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const DashboardLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet /> 
    </div>
  );
};

export default DashboardLayout;
