/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { logOut } from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/features/hooks";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { token } = useAppSelector((state) => state.auth);

  const [userRole, setUserRole] = useState<string>("customer");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        setUserRole(decodedToken?.role || "customer");
      } catch (error: any) {
        toast.error(error.errorMessage);
      }
    }
    setLoading(false);
  }, [token]);

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a href="/" className="btn btn-ghost text-xl">
          Bi-CycleStore
        </a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a
              href="/"
              className={
                isActive("/")
                  ? "bg-yellow-400 hover:bg-yellow-500 font-bold"
                  : ""
              }
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/products"
              className={
                isActive("/products")
                  ? "bg-yellow-400 hover:bg-yellow-500 font-bold"
                  : ""
              }
            >
              Products
            </a>
          </li>
          <li>
            <a
              href="/about"
              className={
                isActive("/about")
                  ? "bg-yellow-400 hover:bg-yellow-500 font-bold"
                  : ""
              }
            >
              About
            </a>
          </li>

          {userRole === "admin" && (
            <li>
              <a
                href="/dashboard/admin"
                className={
                  isActive("/dashboard/admin")
                    ? "bg-yellow-400 hover:bg-yellow-500 font-bold"
                    : ""
                }
              >
                Admin Dashboard
              </a>
            </li>
          )}
          {userRole === "customer" && (
            <li>
              <a
                href="/dashboard/user"
                className={
                  isActive("/dashboard/user")
                    ? "bg-yellow-400 hover:bg-yellow-500 font-bold"
                    : ""
                }
              >
                Customer Dashboard
              </a>
            </li>
          )}
        </ul>
      </div>

      <div className="navbar-end">
        {loading ? (
          <span className="loading loading-spinner"></span>
        ) : token ? (
          <button
            onClick={handleLogOut}
            className="btn bg-yellow-400 hover:bg-yellow-500"
          >
            Logout
          </button>
        ) : (
          <a href="/login" className="btn bg-yellow-400 hover:bg-yellow-500">
            Login
          </a>
        )}
      </div>
    </div>
  );
};

export default Navbar;
