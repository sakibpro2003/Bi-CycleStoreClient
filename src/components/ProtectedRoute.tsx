
// const ProtectedRoute = () => {
//     return (
//         <div>
//             portectedroute
//         </div>
//     );
// };

// export default ProtectedRoute;




//!apply leter
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode; // Accepts child components
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = localStorage.getItem("token"); // Replace with your actual auth check

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

