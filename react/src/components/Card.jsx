import { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaTshirt } from "react-icons/fa";
import { IoPricetagsOutline } from "react-icons/io5";
import { BsCartPlus, BsFillCartCheckFill } from "react-icons/bs";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import Loading from "./Loading";

export const Card = (props) => {
    const { setNotification } = useStateContext();
    const [clicked, isClicked] = useState(false);
    const [cart, setCart] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));

    const item = {
        name: props.name,
        brand: props.brand,
        size: props.size,
        price: props.price,
        user_id: user.id,
    };

    const likeIconHander = () => {
        isClicked(!clicked);
    };

    const cartHandler = () => {
        setCart(!cart);
        if (!cart) {
            axiosClient
                .post(`/home/${props.id}`, item)
                .then(() => {
                    setNotification("Added to cart");
                })
                .catch(() => {});
        }
    };

    return (
        <div className="border rounded-lg mb-4 p-4 relative hover:bg-[#34495e10] grow">
            <div>
                <div className="flex items-center mb-2">
                    {user.nickname === props.user ? (
                        <p className="mr-2 text-[20px] italic">
                            It's your item
                        </p>
                    ) : (
                        <div className="flex items-center">
                            <p className="mr-2 italic">Posted by:</p>
                            <span className="rainbow text-[20px] italic">
                                {props.user}
                            </span>
                        </div>
                    )}

                    <span className="rainbow italic text-[20px]"></span>
                </div>
                <div>
                    {props.path ? (
                        <img
                            src={props.path}
                            alt="photo"
                            className="rounded-lg w-full h-[400px] object-cover"
                        />
                    ) : (
                        <Loading />
                    )}
                </div>
                <div>
                    {clicked ? (
                        <AiFillHeart
                            color="red"
                            onClick={likeIconHander}
                            className="absolute right-5 bottom-4 cursor-pointer"
                            size={25}
                        />
                    ) : (
                        <AiOutlineHeart
                            onClick={likeIconHander}
                            className="absolute right-5 bottom-4 cursor-pointer"
                            size={25}
                        />
                    )}
                </div>
                <div>
                    {user.nickname === props.user ? (
                        ""
                    ) : cart ? (
                        <BsFillCartCheckFill
                            onClick={cartHandler}
                            className="absolute right-5 top-4 cursor-pointer"
                            size={25}
                        />
                    ) : (
                        <BsCartPlus
                            onClick={cartHandler}
                            className="absolute right-5 top-4 cursor-pointer"
                            size={25}
                        />
                    )}
                </div>
                <div>
                    <div className="mt-2">
                        <h5 className="select-non cursor-pointer">
                            <Link to={`/home/${props.id}`}>{props.name}</Link>
                        </h5>
                        <h5 className="text-xl select-none">
                            <span>&#36;</span>
                            {`${props.price},00`}
                        </h5>
                        <h5 className="text-sm flex items-center select-none">
                            <span className="mr-1">
                                <FaTshirt />
                            </span>
                            {props.size}
                        </h5>
                        <h5 className="text-sm flex items-center">
                            <span className="mr-1">
                                <IoPricetagsOutline />
                            </span>
                            {props.brand}
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    );
};
