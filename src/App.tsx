import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard/Dashboard";
// import UserDashboard from "./pages/dashboard/UserDashboard";
// import AdminDashboard from "./pages/dashboard/AdminDashboard";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Bicycles from "./pages/BiCycles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "bicycles", element: <Bicycles /> },
      { path: "about", element: <About /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    // children: [
    //   { path: "", element: <Dashboard /> },
    //   { path: "user", element: <UserDashboard /> },
    //   { path: "admin", element: <AdminDashboard /> },
    // ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
