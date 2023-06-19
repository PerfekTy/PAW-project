import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaTshirt } from "react-icons/fa";
import { IoPricetagsOutline } from "react-icons/io5";
import { BsCartPlus, BsFillCartCheckFill } from "react-icons/bs";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export const Card = (props) => {
    const { setNotification } = useStateContext();
    const [clicked, isClicked] = useState(false);
    const [cart, setCart] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const item = {
        name: props.name,
        brand: props.brand,
        size: props.size,
        price: props.price,
        nickname: user.nickname,
    };

    const likeIconHander = () => {
        isClicked(!clicked);
    };

    const cartHandler = () => {
        setCart(!cart);
        if (!cart) {
            axiosClient
                .post("/home", item)
                .then(() => {
                    setNotification("Added to cart");
                })
                .catch(() => {
                    setNotification(
                        "You can't add the same item to cart twice!"
                    );
                });
        }
    };

    const itemNavigate = () => {
        navigate("/home/" + props.id);
    };

    return (
        <div
            className="border rounded-lg mb-4 p-4 relative hover:bg-[#34495e10] cursor-pointer grow"
            onClick={itemNavigate}
        >
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
                    {/* {Object.keys(props.photos).map((key) => (
                        <div key={props.photos[key].id}>
                            <img
                                src={props.photos[key].path}
                                alt={props.photos[key].filename}
                            />
                        </div>
                    ))} */}
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
                        <h5 className="select-none">{props.name}</h5>
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
