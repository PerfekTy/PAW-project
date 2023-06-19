import { Link } from "react-router-dom";
import { BsCartPlus, BsArrow90DegLeft } from "react-icons/bs";

const Item = () => {
    return (
        <div className="flex justify-center pt-10 h-screen bg-gray-100 shadow-md ">
            <div className="flex border justify-between items-center p-10 w-1/2 h-1/2 bg-[#fff] shadow-md rounded-lg relative">
                <div className="flex flex-col gap-10">
                    <div className="underline text-2xl">Name</div>
                    <div className="underline text-xl"> Price</div>
                    <div className="underline text-lg">Size</div>
                    <div className="underline text-md">Brand</div>
                    <div className="text-md text-center">Description</div>
                </div>
                <div className="flex flex-col items-center">
                    <img src="" alt="image" width={300} height={400} />
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
