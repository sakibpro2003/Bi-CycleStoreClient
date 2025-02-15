// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext"; // Assuming you have an Auth Context

// const Dashboard = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//     } else if (user.role === "admin") {
//       navigate("/dashboard/admin");
//     } else {
//       navigate("/dashboard/user");
//     }
//   }, [user, navigate]);

//   return <div>Redirecting...</div>;
// };

// export default Dashboard;
