import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const Delivery = () => {
    const { setNotification } = useStateContext();
    const user = JSON.parse(localStorage.getItem("user"));
    const [openCourier, _setopenCourier] = useState(false);
    const [openLocker, _setopenLocker] = useState(false);
    const [openPost, _setopenPost] = useState(false);
    const [dated, setDated] = useState(null);
    const [courier, setCourier] = useState({
        address: "",
        city: "",
        postal: "",
        country: "",
        nickname: user.nickname,
    });
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        axiosClient.get("/account/courier").then(({ data }) => {
            for (let i = 0; i < data.length; i++) {
                setDated(data[i]);
            }
        });
    }, []);

    const setopenCourier = () => {
        _setopenCourier(!openCourier);
    };

    const setopenLocker = () => {
        _setopenLocker(!openLocker);
    };

    const setopenPost = () => {
        _setopenPost(!openPost);
    };

    const onSubmit = () => {
        axiosClient
            .post("/account/courier", courier)
            .then(() => {
                setNotification("Delivery informations was successfully added");
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    }
                }
            });
    };

    return (
        <div className="w-full py-10">
            <div className="flex flex-col items-center">
                <p className="border-2 tracking-widest p-5 w-1/3 text-center mb-10 text-2xl relative">
                    Delivery<span className="text-3xl">📦</span>
                    <button className="bg-[#ffffff] border-2 border-b-0 border-l-0 absolute left-0 bottom-0 hover:bg-[#eee] mx-auto mt-5 p-2 px-4 cursor-pointer text-sm">
                        <Link to={"/account/details"}>See account details</Link>
                    </button>
                    <button className="bg-[#ffffff] border-2 border-b-0 border-r-0 absolute right-0 bottom-0 hover:bg-[#eee] mx-auto mt-5 p-2 px-4 cursor-pointer text-sm">
                        <Link to={"/account/payment"}>See payment options</Link>
                    </button>
                </p>
                <div className="mt-4">
                    <p className="mb-2 text-center">
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
                                <div className="p-2 grow flex gap-10">
                                    {dated !== null && (
                                        <div>
                                            <h1>Your current informations</h1>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th className="border-2 p-3 px-3">
                                                            Address
                                                        </th>
                                                        <th className="border-2 p-3 px-3">
                                                            City
                                                        </th>
                                                        <th className="border-2 p-3 px-3">
                                                            Postal
                                                        </th>
                                                        <th className="border-2 p-3 px-3">
                                                            Country
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="border-2 p-2">
                                                            {dated.address}
                                                        </td>
                                                        <td className="border-2 p-2">
                                                            {dated.city}
                                                        </td>
                                                        <td className="border-2 p-2">
                                                            {dated.postal}
                                                        </td>
                                                        <td className="border-2 p-2">
                                                            {dated.country}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    )}

                                    <div className="text-lg flex flex-col">
                                        {errors && (
                                            <div className="alert w-full mb-5">
                                                {Object.keys(errors).map(
                                                    (key) => (
                                                        <p key={key}>
                                                            {errors[key][0]}
                                                        </p>
                                                    )
                                                )}
                                            </div>
                                        )}
                                        <div className="flex w-full items-center">
                                            <label className="mr-3">
                                                Address:{" "}
                                            </label>
                                            <input
                                                type="text"
                                                className="outline-[#66d9c2] p-2 text-md border-2"
                                                value={courier.address}
                                                onChange={(e) =>
                                                    setCourier({
                                                        ...courier,
                                                        address: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="flex w-full items-center mt-10">
                                            <label className="mr-12">
                                                City:{" "}
                                            </label>
                                            <input
                                                type="text"
                                                className="outline-[#66d9c2] p-2 text-md border-2"
                                                value={courier.city}
                                                onChange={(e) =>
                                                    setCourier({
                                                        ...courier,
                                                        city: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="flex w-full items-center mt-10">
                                            <label className="mr-7">
                                                Postal:{" "}
                                            </label>
                                            <input
                                                type="text"
                                                className="outline-[#66d9c2] p-2 text-md border-2"
                                                value={courier.postal}
                                                onChange={(e) =>
                                                    setCourier({
                                                        ...courier,
                                                        postal: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="flex w-full items-center mt-10">
                                            <label className="mr-4">
                                                Country:{" "}
                                            </label>
                                            <input
                                                type="text"
                                                className="outline-[#66d9c2] p-2 text-md border-2"
                                                value={courier.country}
                                                onChange={(e) =>
                                                    setCourier({
                                                        ...courier,
                                                        country: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <button
                                            onClick={onSubmit}
                                            className="bg-[#66d9c2] hover:bg-[#4aa996] mx-auto mt-8 p-2 px-10 rounded-md"
                                        >
                                            Add / Update your courier
                                            informations
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
                                <div className="grow">Coming soon!</div>
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
                                <div className="grow">Coming soon!</div>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Delivery;
