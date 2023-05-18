import { Outlet } from "react-router-dom";

import NavIcons from "./NavIcons";
import MobileNav from "../MobileNav/MobileNav";

const Navbar = () => {
  return (
    <nav>
      <div className="fixed top-0 left-0 h-screen w-18 flex flex-col bg-[#1e1f22] text-white max-[600px]:hidden">
        <NavIcons />
      </div>
      <div className="hidden max-[600px]:flex">
        <MobileNav />
      </div>
      <Outlet />
    </nav>
  );
};

export default Navbar;
