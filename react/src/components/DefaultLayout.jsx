import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { useEffect, useState } from "react";

import logo from "../assets/logo.png";
import other from "../assets/other_img.png";
import male from "../assets/male_img.svg";
import female from "../assets/female_img.png";

const DefaultLayout = () => {
    const { user, token, setUser, setToken } = useStateContext();
    const [open, setOpen] = useState(false);
    const [avatar, _setAvatar] = useState(null);

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
            if (data.gender === "male") {
                _setAvatar(male);
            } else if (data.gender === "female") {
                _setAvatar(female);
            } else if (data.gender === "other") {
                _setAvatar(other);
            }
        });
    }, []);

    const dropdownHandler = () => {
        setOpen(!open);
    };

    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (e) => {
        e.preventDefault();

        axiosClient
            .post("/logout")
            .then(() => {
                setUser({});
                setToken(null);
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
                        <a
                            href="#"
                            className="profile-img"
                            onClick={dropdownHandler}
                        >
                            <img src={avatar} alt="img profile" width={40} />
                        </a>

                        {user.nickname ? (
                            <p className="ml-3">{user.nickname}</p>
                        ) : (
                            <p className="ml-3">Loading...</p>
                        )}

                        {open && (
                            <div className="dropdown-content">
                                <div className="flex flex-col bg-[#fffe] rounded-lg p-4 absolute border top-10 left-0 w-[170px]">
                                    <Link to="/wardrobe">My wardrobe</Link>
                                    <Link to="/account">My account</Link>
                                    <a href="#" onClick={onLogout}>
                                        Logout
                                    </a>
                                </div>
                            </div>
                        )}
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
