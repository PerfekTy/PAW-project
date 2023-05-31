import axiosClient from "../axios-client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel, IconButton } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

import { useStateContext } from "../contexts/ContextProvider";
import Loading from "../components/Loading";
import Delivery from "../components/Delivery";
// import other from "../assets/other_img.png";
// import male from "../assets/male_img.svg";
// import female from "../assets/female_img.png";

const Account = () => {
    const [user, setUsers] = useState([]);
    // const [avatar, _setAvatar] = useState(null);
    const { setNotification } = useStateContext();
    const { nickname, fullname, email, gender } = user;

    useEffect(() => {
        axiosClient.get("/account").then(({ data }) => {
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

        axiosClient.delete(`/account/${nickname}`).then(() => {
            setNotification("User was successfully deleted");
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        });
    };

    return (
        <div className="mt-10 mx-[26rem]">
            <Carousel
                className="rounded-xl"
                prevArrow={({ handlePrev }) => (
                    <IconButton
                        variant="text"
                        color="white"
                        size="lg"
                        onClick={handlePrev}
                        className="!absolute top-2/4 -translate-y-2/4 !bg-[#4aa996] left-40 infinite"
                    >
                        <ArrowLeftIcon
                            strokeWidth={2}
                            className="w-6 h-6"
                            color="white"
                        />
                    </IconButton>
                )}
                nextArrow={({ handleNext }) => (
                    <IconButton
                        variant="text"
                        color="white"
                        size="lg"
                        onClick={handleNext}
                        className="!absolute top-2/4 -translate-y-2/4 !bg-[#4aa996] right-40 infinite"
                    >
                        <ArrowRightIcon
                            strokeWidth={2}
                            className="w-6 h-6"
                            color="white"
                        />
                    </IconButton>
                )}
            >
                <div className="w-full pb-10">
                    <div className="flex flex-col items-center text-2xl">
                        <p
                            className={
                                !gender
                                    ? "border-2 tracking-widest p-5 w-1/3 text-center mb-10"
                                    : "border-2 tracking-widest p-5 w-1/3 text-center"
                            }
                        >
                            Account details <span className="text-3xl">⚙️</span>
                        </p>
                        {!gender && <Loading />}
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
                            {/* <div className="flex justify-center items-center mt-10">
                            <img src={avatar} alt="" width={130} />
                        </div> */}
                            <button className="bg-[#66d9c2] hover:bg-[#4aa996] mx-auto mt-5 p-2 px-10 rounded-md">
                                <Link to={"/account/" + nickname}>
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
                <Delivery nickname={nickname} />
            </Carousel>
        </div>
    );
};

export default Account;
