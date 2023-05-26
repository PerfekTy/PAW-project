import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

import logo from "../assets/logo.png";
import profileimg from "../assets/profileimg.png";

const DefaultLayout = () => {
    const { user, token } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <aside className="bg-[#cde9e4] flex items-center justify-center">
                <li className="p-5 list-none text-xl text-[] flex items-center">
                    <Link to="/home">
                        <img src={logo} width={40} alt="cloth logo" />
                    </Link>
                </li>
                <li className="p-5 list-none text-xl text-[]">
                    <Link to="/sell">Sell</Link>
                </li>
                <form>
                    <input
                        type="text"
                        placeholder="Search for clothes..."
                        className="p-2 rounded-lg text-lg w-[400px]"
                    />
                </form>
                <li className="p-5 list-none text-xl text-[]">
                    <Link to="/cart">Cart</Link>
                </li>
                <li className="p-5 list-none text-lg">
                    <div className="dropdown relative flex items-center">
                        <a href="#" className="profile-img">
                            <img
                                src={profileimg}
                                alt="img profile"
                                width={40}
                            />
                        </a>
                        <p className="ml-3">{user.nickname}</p>
                        <div className="dropdown-content hidden">
                            <div className="flex flex-col bg-[#fffe] rounded-lg p-4 absolute border top-10 left-0 w-[170px]">
                                <a href="#">My wardrobe</a>
                                <a href="#">Settings</a>
                                <a href="#" onClick={onLogout}>
                                    Logout
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
            </aside>
            <div>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DefaultLayout;
