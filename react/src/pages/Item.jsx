import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link, useParams } from "react-router-dom";
import { BsCartPlus, BsArrow90DegLeft } from "react-icons/bs";

const Item = () => {
    const { id } = useParams();
    const [item, setItem] = useState([]);

    useEffect(() => {
        axiosClient.get(`/home/${id}`).then(({ data }) => {
            setItem(data);
        });

        axiosClient.get("/photos").then(({ data }) => {
            setPhotos(data);
        });
    }, []);

    return (
        <div className="flex justify-center pt-10 h-screen bg-gray-100 shadow-md">
            <div className="flex border justify-between items-center p-10 w-1/2 h-1/2 bg-[#fff] shadow-md rounded-lg relative">
                <div className="flex flex-col gap-10">
                    <div className="text-xl">
                        <span className="text-sm">Name:</span> {item.name}
                    </div>
                    <div className="text-xl">
                        <span className="text-sm">Price:</span> ${item.price}
                    </div>
                    <div className="text-xl">
                        <span className="text-sm">Size:</span> {item.size}
                    </div>
                    <div className="text-xl">
                        <span className="text-sm">Brand:</span> {item.brand}
                    </div>
                    <div className="text-md text-center">
                        {item.description}
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    {/* zdjecia */}
                    <div className="flex gap-4 absolute bottom-6 right-6">
                        <button className="bg-[#66d9c2] hover:bg-[#4aa996] px-10 p-2 rounded-md flex gap-2 items-center">
                            Buy now! <BsCartPlus size={20} />
                        </button>
                        <Link
                            to="/home"
                            className="bg-[#d96666] hover:bg-[#9e4c4c] p-2 px-10 rounded-md flex gap-2 items-center"
                        >
                            Go back <BsArrow90DegLeft size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Item;
