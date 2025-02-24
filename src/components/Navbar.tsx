// import { useNavigate } from "react-router-dom";
// import { logOut } from "../redux/features/auth/authSlice";
// import { useAppDispatch } from "../redux/features/hooks";

// const Navbar = () => {
//   const storedAuth = localStorage.getItem("persist:auth");

//         let token = "";
//         if (!storedAuth) {
//           console.error("No auth data found!");
//           return;
//         }

//         if (storedAuth) {
//           const parsedAuth = JSON.parse(storedAuth);
//           token = parsedAuth?.token ? JSON.parse(parsedAuth.token) : "";
//       console.log(token,"tokennnnnfrom orderapi")

//         }
//       } catch (error) {
//         console.error("Error retrieving auth token:", error);
//       }
        
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const handleLogOut = () => {
//     dispatch(logOut());
//     navigate("/login");
//   };
//   return (
//     <div className="navbar bg-base-100">
//       <div className="navbar-start">
//         <div className="dropdown">
//           <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h8m-8 6h16"
//               />
//             </svg>
//           </div>
//           <ul
//             tabIndex={0}
//             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
//           >
//             <li>
//               <a href="/">Home</a>
//             </li>
//             <li>
//               <a href="/products">products</a>
//             </li>
//             <li>
//               <a href="/about">About</a>
//             </li>

//             //! make it dynamic
//             <li>
//               <a href="/about">About</a>
//             </li>

//           </ul>
//         </div>
//         <a className="btn btn-ghost text-xl">Bi-CycleStore</a>
//       </div>
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1">
//           <li>
//             <a href="/">Home</a>
//           </li>
//           <li>
//             <a href="/products">products</a>
//           </li>
//           <li>
//               <a href="/about">About</a>
//             </li>

//         </ul>
//       </div>
//       <div className="navbar-end">
//         <button onClick={handleLogOut} className="btn">
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


import { useNavigate } from "react-router-dom";
import { logOut } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/features/hooks";
import { jwtDecode } from "jwt-decode";
// import jwtDecode from "jwt-decode"; // Import JWT decoder

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  let token = "";
  let userRole = "";

  try {
    const storedAuth = localStorage.getItem("persist:auth");

    if (storedAuth) {
      const parsedAuth = JSON.parse(storedAuth);
      token = parsedAuth?.token ? JSON.parse(parsedAuth.token) : "";

      if (token) {
        const decodedToken: any = jwtDecode(token); // Decode token
        userRole = decodedToken?.role || "customer"; // Get role, default to 'customer'
      }

      console.log("🔑 Token:", token);
      console.log("👤 User Role:", userRole);
    } else {
      console.error("⚠️ No auth data found in localStorage!");
    }
  } catch (error) {
    console.error("🚨 Error retrieving auth token:", error);
  }

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">Bi-CycleStore</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          
          {userRole === "admin" && (
            <li>
              <a href="/dashboard/admin">Admin Dashboard</a>
            </li>
          )}
          {userRole === "customer" && (
            <li>
              <a href="/dashboard/user">Customer Dashboard</a>
            </li>
          )}
        </ul>
      </div>

      <div className="navbar-end">
        <span className="mr-4 font-semibold">{userRole.toUpperCase()}</span>
        <button onClick={handleLogOut} className="btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;

