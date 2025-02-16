import { useNavigate } from "react-router-dom";
import { logOut } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/features/hooks";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/login");
  };
  return (
    <div>
      navbar
      <button onClick={handleLogOut} className="btn">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
