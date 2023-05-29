import axiosClient from "../axios-client";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";

import other from "../assets/other_img.png";
import male from "../assets/male_img.svg";
import female from "../assets/female_img.png";

const Account = () => {
    const [users, setUsers] = useState([]);
    const [avatar, _setAvatar] = useState(null);
    const { nickname, fullname, email, gender } = users;

    useEffect(() => {
        axiosClient.get("/account").then(({ data }) => {
            setUsers(data.data[0]);
            if (data.data[0].gender === "male") {
                _setAvatar(male);
            } else if (data.data[0].gender === "female") {
                _setAvatar(female);
            } else if (data.data[0].gender === "other") {
                _setAvatar(other);
            }
        });
    }, []);

    return (
        <div className="grid place-items-center h-[80vh] mx-[200px]">
            <div className="bg-[#daecea] flex justify-between w-full rounded-3xl rounded-tl-none">
                <div>
                    <ul className="flex -m-12 ml-[.1px] text-lg">
                        <a href="/account" className="profile">
                            Account details
                        </a>
                        <a href="/account/settings" className="profile">
                            Settings
                        </a>
                        <a href="/account/delivery" className="profile">
                            Delivery
                        </a>
                        <a href="/account/payments" className="profile">
                            Payments
                        </a>
                    </ul>
                </div>

                <div className="mb-10 mt-10 flex flex-col w-[600px]">
                    <img
                        src={avatar}
                        alt="img profile"
                        width={400}
                        className="mx-auto"
                    />
                    <input
                        type="file"
                        placeholder="Change photo"
                        className="mt-5 bg-[#daecea] w-1/2 mx-auto p-3 rounded-2xl hover:bg-[#edfefb] cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
};

export default Account;
