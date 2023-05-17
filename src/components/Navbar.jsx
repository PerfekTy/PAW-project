import { Link, Outlet } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import { BsDoorOpenFill, BsFillPersonPlusFill } from "react-icons/bs";
import { RiUserShared2Fill } from "react-icons/ri";
import NavbarIcon from "./NavbarIcon";

const Navbar = () => {
  return (
    <nav>
      <div className="fixed top-0 left-0 h-screen w-18 flex flex-col bg-[#1e1f22] text-white shadow-lg">
        <li>
          <Link to="/">
            <NavbarIcon icon={<AiFillHome size={27} />} info="Home 🏠" />
          </Link>
        </li>
        <li>
          <Link to="/login">
            <NavbarIcon
              icon={<RiUserShared2Fill size={27} />}
              info="Sign In 🙆‍♂️"
            />
          </Link>
        </li>
        <li>
          <Link to="/register">
            <NavbarIcon
              icon={<BsFillPersonPlusFill size={27} />}
              info="Register ➕"
            />
          </Link>
        </li>
      </div>
      <Outlet />
    </nav>
  );
};

export default Navbar;
