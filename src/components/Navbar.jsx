import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul className="flex m-2">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Sign In</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
      <Outlet />
    </nav>
  );
};

export default Navbar;
