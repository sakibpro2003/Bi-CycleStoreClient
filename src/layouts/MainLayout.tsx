import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <nav>Navbar</nav>
      <Outlet /> {/* This is where child pages (Home, Bicycles, About) will render */}
      <footer>Footer</footer>
    </div>
  );
};

export default MainLayout;
