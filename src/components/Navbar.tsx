import { logOut } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/features/hooks";
import { ToastContainer, toast } from 'react-toastify';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(logOut());
    
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
