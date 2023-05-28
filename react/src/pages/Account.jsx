import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";

import other from "../assets/other_img.png";
import male from "../assets/male_img.svg";
import female from "../assets/female_img.png";

const Account = () => {
    const { user, setUser } = useStateContext();
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

    const onSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="grid place-items-center h-[80vh] mx-[200px]">
            <div className="bg-[#daecea] flex justify-between w-full rounded-3xl rounded-tl-none">
                <div>
                    <ul className="flex -m-12 ml-[.1px] text-lg">
                        <a href="#" className="profile">
                            Account details
                        </a>
                        <a href="#" className="profile ">
                            Settings
                        </a>
                        <a href="#" className="profile">
                            Delivery
                        </a>
                        <a href="#" className="profile">
                            Payments
                        </a>
                    </ul>
                    <form className="ml-32 mt-40" onSubmit={onSubmit}>
                        <div className="flex items-center">
                            <label className="mr-2 text-xl">Nickname:</label>
                            <input
                                type="text"
                                className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:[#66d9c2] outline-[#66d9c2] sm:text-lg sm:leading-6 pl-2 h-10 mr-2"
                                defaultValue={user.nickname}
                                disabled
                            />

                            <AiOutlineEdit
                                size={20}
                                className="cursor-pointer"
                            />
                        </div>
                        <div className="flex items-center mt-10">
                            <label className="mr-2 text-xl">Full-name:</label>
                            <input
                                type="text"
                                className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:[#66d9c2] outline-[#66d9c2] sm:text-lg sm:leading-6 pl-2 h-10 mr-2"
                                defaultValue={user.fullname}
                                disabled
                            />

                            <AiOutlineEdit
                                size={20}
                                className="cursor-pointer"
                            />
                        </div>

                        <div className="flex items-center mt-10">
                            <label className="mr-2 text-xl">Email:</label>
                            <input
                                type="text"
                                className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:[#66d9c2] outline-[#66d9c2] sm:text-lg sm:leading-6 pl-2 h-10 mr-2"
                                defaultValue={user.email}
                                disabled
                            />

                            <AiOutlineEdit
                                size={20}
                                className="cursor-pointer"
                            />
                        </div>

                        <div className="flex items-center mt-10">
                            <label className="mr-2 text-xl">Gender:</label>
                            <input
                                type="text"
                                className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:[#66d9c2] outline-[#66d9c2] sm:text-lg sm:leading-6 pl-2 h-10 uppercase mr-2"
                                value={user.gender}
                                disabled
                            />

                            <AiOutlineEdit
                                size={20}
                                className="cursor-pointer"
                            />
                        </div>
                    </form>
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
