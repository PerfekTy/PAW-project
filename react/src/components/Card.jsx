import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaTshirt } from "react-icons/fa";
import { IoPricetagsOutline } from "react-icons/io5";

import exampleUserPhoto from "../assets/example.jpeg";
import exampleUserAvatar from "../assets/userPhoto.jpeg";

export const Card = () => {
    const [clicked, isClicked] = useState(false);

    const likeIconHander = () => {
        isClicked(!clicked);
    };

    return (
        <div className="border rounded-lg mb-4 p-4 relative hover:bg-[#34495e10] cursor-pointer">
            <div>
                <div className="flex items-center mb-2">
                    <img
                        className="rounded-3xl mr-2"
                        src={exampleUserAvatar}
                        alt="user-avatar"
                        width={25}
                    />
                    <p>@user</p>
                </div>
                <div>
                    <img src={exampleUserPhoto} alt="item" width="auto" />
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
                        <h5 className="select-none">Niebieska kurteczka</h5>
                        <h5 className="text-xl select-none">
                            <span>&#36;</span>
                            350,00
                        </h5>
                        <h5 className="text-sm flex items-center select-none">
                            <span className="mr-1">
                                <FaTshirt />
                            </span>
                            37
                        </h5>
                        <h5 className="text-sm flex items-center">
                            <span className="mr-1">
                                <IoPricetagsOutline />
                            </span>
                            Karl Lagerfeld
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    );
};
