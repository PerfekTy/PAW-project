import axiosClient from "../axios-client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useStateContext } from "../contexts/ContextProvider";
import Loading from "../components/Loading";
import other from "../assets/other_img.png";
import male from "../assets/male_img.svg";
import female from "../assets/female_img.png";

const Account = () => {
    const [user, setUsers] = useState([]);
    const [avatar, _setAvatar] = useState(null);
    const { setNotification } = useStateContext();
    const { nickname, fullname, email, gender } = user;

    useEffect(() => {
        axiosClient.get("/account").then(({ data }) => {
            setUsers(data.data[0]);

            if (data.gender === "male") {
                _setAvatar(male);
            } else if (data.gender === "female") {
                _setAvatar(female);
            } else if (data.gender === "other") {
                _setAvatar(other);
            }
        });
    }, []);

    const onDeleteClick = (user) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }

        axiosClient.delete(`/account/${user.id}`).then(() => {
            setNotification("User was successfully deleted");
            axiosClient.get("/account").then(({ data }) => {
                setUsers(data.data[0]);
            });
        });
    };

    return (
        <div className="flex justify-center bg-[#fefefe] mt-10">
            <div className="flex w-full">
                <div className="flex flex-col items-center justify-center text-2xl mx-5 w-full">
                    <p className="border-2 tracking-widest p-5 w-full text-center mb-10">
                        Account details
                    </p>
                    {!nickname && !fullname && !email && !gender && !avatar && (
                        <Loading />
                    )}
                    <div className="text-lg flex flex-col">
                        <div className="flex w-full items-center mt-10">
                            <label className="mr-4">Nickname: </label>
                            <input
                                type="text"
                                defaultValue={nickname}
                                className="bg-[#ced3d2] border-[#66d9c2] p-2 text-md"
                                disabled
                            />
                        </div>
                        <div className="flex w-full items-center mt-10">
                            <label className="mr-3">Full-name: </label>
                            <input
                                type="text"
                                defaultValue={fullname}
                                className="bg-[#ced3d2] border-[#66d9c2] p-2 text-md"
                                disabled
                            />
                        </div>
                        <div className="flex w-full items-center mt-10">
                            <label className="mr-10">E-mail: </label>
                            <input
                                type="text"
                                defaultValue={email}
                                className="bg-[#ced3d2] border-[#66d9c2] p-2 text-md"
                                disabled
                            />
                        </div>
                        <div className="flex w-full items-center mt-10">
                            <label className="mr-8">Gender: </label>
                            <input
                                type="text"
                                defaultValue={gender}
                                className="bg-[#ced3d2] border-[#66d9c2] p-2 text-md uppercase"
                                disabled
                            />
                        </div>
                        <div className="flex justify-center items-center mt-10">
                            <img src={avatar} alt="" width={130} />
                        </div>
                        <button className="bg-[#66d9c2] mx-auto mt-5 p-2 px-10 rounded-md">
                            <Link to={"/account/" + nickname}>
                                Update your informations
                            </Link>
                        </button>
                        <button
                            className="bg-[#d96666] mx-auto mt-5 p-2 px-10 rounded-md"
                            onClick={() => onDeleteClick(user)}
                        >
                            Delete your account
                        </button>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center text-2xl mx-5 w-full">
                    <p className="border-2 tracking-widest w-full text-center p-5">
                        Delivery
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center text-2xl mx-5 w-full">
                    <p className="border-2 tracking-widest w-full text-center p-5">
                        Payments
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Account;
