
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
import { useAppSelector } from "../redux/features/hooks";
import { useCurrentToken } from "../redux/features/auth/authSlice";

interface ProtectedRouteProps {
  children: ReactNode; // Accepts child components
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = useAppSelector(useCurrentToken)
  if(!token){
    <Navigate to={'/login'} replace/>
  }
  const isAuthenticated = localStorage.getItem("token"); // Replace with your actual auth check

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

