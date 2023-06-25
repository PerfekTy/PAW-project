import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link, useParams } from "react-router-dom";
import { BsCartPlus, BsArrow90DegLeft } from "react-icons/bs";
import { useStateContext } from "../contexts/ContextProvider";

import Loading from "../components/Loading";

const Item = () => {
    const { id } = useParams();
    const { setNotification } = useStateContext();
    const [item, setItem] = useState([]);
    const [photo, setPhoto] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        axiosClient.get(`/home/${id}`).then(({ data }) => {
            setItem(data);
        });

        axiosClient.get("/photos").then(({ data }) => {
            const filteredPhotos = data.filter(
                (photo) => photo.cloth_id === Number(id)
            );

            setPhoto(filteredPhotos);
        });
    }, []);

    const path = Object.keys(photo).map((key) => {
        return photo[key].path;
    });

    const cloth_id = Object.keys(photo).map((key) => {
        return photo[key].cloth_id;
    });

    const product = {
        ...item,
        user_id: user.id,
    };

    const cartHandler = () => {
        axiosClient
            .post(`/home/${cloth_id}`, product)
            .then(() => {
                setNotification("Added to cart");
            })
            .catch(() => {});
    };

    return (
        <>
            {item.name ? (
                <div className="flex justify-center pt-10 h-screen bg-gray-100 shadow-md">
                    <div className="flex border justify-between items-center p-10 w-1/3 h-1/2 bg-[#fff] shadow-md rounded-lg relative">
                        <div className="flex flex-col gap-10">
                            <div className="text-xl">
                                <span className="text-sm">Name:</span>{" "}
                                {item.name}
                            </div>
                            <div className="text-xl">
                                <span className="text-sm">Price:</span> $
                                {item.price}
                            </div>
                            <div className="text-xl">
                                <span className="text-sm">Size:</span>{" "}
                                {item.size}
                            </div>
                            <div className="text-xl">
                                <span className="text-sm">Brand:</span>{" "}
                                {item.brand}
                            </div>
                            <div className="text-md text-center">
                                <textarea
                                    cols="30"
                                    rows="10"
                                    className="border p-4"
                                    defaultValue={item.description}
                                    disabled
                                ></textarea>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            {photo && (
                                <img
                                    src={path}
                                    alt=""
                                    className="rounded-lg w-[400px] h-[500px] object-cover mb-16 grow"
                                />
                            )}
                            <div className="flex gap-4 absolute bottom-6 right-6">
                                {item.user_nickname === user.nickname ? (
                                    ""
                                ) : (
                                    <button
                                        onClick={cartHandler}
                                        className="bg-[#66d9c2] hover:bg-[#4aa996] px-10 p-2 rounded-md flex gap-2 items-center"
                                    >
                                        Buy now! <BsCartPlus size={20} />
                                    </button>
                                )}

                                <Link
                                    to="/home"
                                    className={
                                        item.user_nickname === user.nickname
                                            ? "bg-[#d96666] hover:bg-[#9e4c4c] p-2 px-40 rounded-md flex gap-2 items-center"
                                            : "bg-[#d96666] hover:bg-[#9e4c4c] p-2 px-10 rounded-md flex gap-2 items-center"
                                    }
                                >
                                    Go back <BsArrow90DegLeft size={20} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="pt-20 flex justify-center">
                    <Loading />
                </div>
            )}
        </>
    );
};

export default Item;
