import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaTshirt } from "react-icons/fa";
import { IoPricetagsOutline } from "react-icons/io5";

export const Card = (props) => {
    const [clicked, isClicked] = useState(false);

    const likeIconHander = () => {
        isClicked(!clicked);
    };

    return (
        <div className="border rounded-lg mb-4 p-4 relative hover:bg-[#34495e10] cursor-pointer">
            <div>
                <div className="flex items-center mb-2">
                    <p className="mr-2">Posted by:</p>{" "}
                    <span className="rainbow italic text-[20px]">
                        {props.user}
                    </span>
                </div>
                <div>
                    <img
                        src={`../../../storage/app/${props.photo}`}
                        alt=""
                        width="auto"
                    />
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
