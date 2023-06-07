import axiosClient from "../axios-client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useStateContext } from "../contexts/ContextProvider";
import Loading from "../components/Loading";

// import other from "../assets/other_img.png";
// import male from "../assets/male_img.svg";
// import female from "../assets/female_img.png";

const Account = () => {
    const [user, setUsers] = useState([]);
    // const [avatar, _setAvatar] = useState(null);
    const { setNotification } = useStateContext();
    const { nickname, fullname, email, gender } = user;

    useEffect(() => {
        axiosClient.get("/account/details").then(({ data }) => {
            setUsers(data.data[0]);
            // if (data.gender === "male") {
            //     _setAvatar(male);
            // } else if (data.gender === "female") {
            //     _setAvatar(female);
            // } else if (data.gender === "other") {
            //     _setAvatar(other);
            // }
        });
    }, []);

    const onDeleteClick = () => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }

        axiosClient.delete(`/account/details/${nickname}`).then(() => {
            setNotification("User was successfully deleted");
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        });
    };

    return (
        <div className="mt-10">
            <div className="w-full pb-10">
                <div className="flex flex-col items-center text-2xl">
                    <p
                        className={
                            !gender
                                ? "border-2 tracking-widest p-5 w-1/3 text-center mb-10 relative"
                                : "border-2 tracking-widest p-5 w-1/3 text-center relative"
                        }
                    >
                        Account details <span className="text-3xl">⚙️</span>
                        <button className="bg-[#ffffff] border-2 border-b-0 border-r-0 absolute right-0 bottom-0 hover:bg-[#eee] mx-auto mt-5 p-2 px-4 cursor-pointer text-sm">
                            <Link to={"/account/delivery"}>
                                See delivery options
                            </Link>
                        </button>
                    </p>
                    {!gender && <Loading />}
                    <div className="text-lg flex flex-col">
                        <div className="flex w-full items-center mt-10">
                            <label className="mr-4">Nickname: </label>
                            <input
                                type="text"
                                defaultValue={nickname}
                                className="bg-[#f0f0f0] p-2 text-md text-[#999999]"
                                disabled
                            />
                        </div>
                        <div className="flex w-full items-center mt-10">
                            <label className="mr-3">Full-name: </label>
                            <input
                                type="text"
                                defaultValue={fullname}
                                className="bg-[#f0f0f0] p-2 text-md text-[#999999]"
                                disabled
                            />
                        </div>
                        <div className="flex w-full items-center mt-10">
                            <label className="mr-10">E-mail: </label>
                            <input
                                type="text"
                                defaultValue={email}
                                className="bg-[#f0f0f0] p-2 text-md text-[#999999]"
                                disabled
                            />
                        </div>
                        <div className="flex w-full items-center mt-10">
                            <label className="mr-8">Gender: </label>
                            <input
                                type="text"
                                defaultValue={gender}
                                className="bg-[#f0f0f0] p-2 text-md text-[#999999] uppercase"
                                disabled
                            />
                        </div>
                        <button className="bg-[#66d9c2] hover:bg-[#4aa996] mx-auto mt-16 p-2 px-10 rounded-md">
                            <Link to={"/account/details/" + nickname}>
                                Update your informations
                            </Link>
                        </button>
                        <button
                            className="bg-[#d96666] hover:bg-[#9e4c4c] mx-auto mt-5 p-2 px-10 rounded-md"
                            onClick={() => onDeleteClick(user)}
                        >
                            Delete your account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
