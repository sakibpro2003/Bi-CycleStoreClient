import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      {/* <nav>Navbar</nav> */}
      <Outlet /> {/* This is where child pages (Home, Bicycles, About) will render */}
      <footer>Footer</footer>
    </div>
  );
};

export default MainLayout;
