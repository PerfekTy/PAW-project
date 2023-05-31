import { useState } from "react";
import { Link } from "react-router-dom";

import Loading from "../components/Loading";
const Delivery = (props) => {
    const [openCourier, _setopenCourier] = useState(false);
    const [openLocker, _setopenLocker] = useState(false);
    const [openPost, _setopenPost] = useState(false);

    const setopenCourier = () => {
        _setopenCourier(!openCourier);
    };

    const setopenLocker = () => {
        _setopenLocker(!openLocker);
    };

    const setopenPost = () => {
        _setopenPost(!openPost);
    };

    return (
        <div className="w-full pb-10">
            <div className="flex flex-col items-center">
                <p
                    className={
                        !props.nickname
                            ? "border-2 tracking-widest p-5 w-1/3 text-center mb-10 text-2xl"
                            : "border-2 tracking-widest p-5 w-1/3 text-center text-2xl"
                    }
                >
                    Delivery<span className="text-3xl">📦</span>
                </p>
                {!props.nickname && <Loading />}
                <div className="mt-4">
                    <p className="mb-2">
                        Choose your favorite way to get clothes ⬇️
                    </p>
                    <ul className="text-lg text-center flex items-center flex-col">
                        <li
                            className="border tracking-wide p-1 w-full text-center mb-1 hover:bg-[#dedede] cursor-pointer select-none"
                            onClick={setopenCourier}
                        >
                            Courier
                        </li>
                        {openCourier && (
                            <>
                                <div className="p-2 grow">
                                    <div className="text-lg flex flex-col">
                                        <div className="flex w-full items-center">
                                            <label className="mr-3">
                                                Address:{" "}
                                            </label>
                                            <input
                                                type="text"
                                                className="outline-[#66d9c2] p-2 text-md border-2"
                                            />
                                        </div>
                                        <div className="flex w-full items-center mt-10">
                                            <label className="mr-12">
                                                City:{" "}
                                            </label>
                                            <input
                                                type="text"
                                                className="outline-[#66d9c2] p-2 text-md border-2"
                                            />
                                        </div>
                                        <div className="flex w-full items-center mt-10">
                                            <label className="mr-7">
                                                Postal:{" "}
                                            </label>
                                            <input
                                                type="text"
                                                className="outline-[#66d9c2] p-2 text-md border-2"
                                            />
                                        </div>
                                        <div className="flex w-full items-center mt-10">
                                            <label className="mr-4">
                                                Country:{" "}
                                            </label>
                                            <input
                                                type="text"
                                                className="outline-[#66d9c2] p-2 text-md border-2"
                                            />
                                        </div>
                                        <button className="bg-[#66d9c2] hover:bg-[#4aa996] mx-auto mt-8 p-2 px-10 rounded-md">
                                            <Link
                                                to={
                                                    "/account/" + props.nickname
                                                }
                                            >
                                                Update your informations
                                            </Link>
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}

                        <li
                            className="border tracking-wide p-1 w-full text-center mb-1 hover:bg-[#dedede] cursor-pointer select-none"
                            onClick={setopenLocker}
                        >
                            Parcel locker
                        </li>
                        {openLocker && (
                            <>
                                <div className="grow">Paczkomaty here</div>
                            </>
                        )}
                        <li
                            className="border tracking-wide p-1 w-full text-center mb-1 hover:bg-[#dedede] cursor-pointer select-none"
                            onClick={setopenPost}
                        >
                            Post
                        </li>
                        {openPost && (
                            <>
                                <div className="grow">Poczta here</div>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Delivery;
