import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

import Dropdown from "../components/Dropdown";
import logo from "../assets/logo.png";

const DefaultLayout = () => {
    const { token, notification } = useStateContext();
    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <aside className="bg-[#cde9e4] flex items-center justify-center">
                <li className="p-5 list-none text-xl text-[] flex items-center">
                    <Link to="/home">
                        <img src={logo} width={45} alt="cloth logo" />
                    </Link>
                </li>
                <li className="p-5 list-none text-xl text-[]">
                    <Link to="/sell">Sell</Link>
                </li>
                <form>
                    <input
                        type="text"
                        placeholder="Search for clothes..."
                        className="p-2 rounded-lg text-lg w-[400px] outline-none"
                    />
                </form>
                <li className="p-5 list-none text-xl text-[]">
                    <Link to="/cart">Cart</Link>
                </li>
                <li className="p-5 list-none text-lg">
                    <div className="dropdown relative flex items-center">
                        <div className="dropdown-content">
                            <Dropdown />
                        </div>
                    </div>
                </li>
            </aside>
            <div>
                <main>
                    <Outlet />
                    {notification && (
                        <div className="notification">{notification}</div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default DefaultLayout;
