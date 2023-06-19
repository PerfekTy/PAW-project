import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { BiDollar } from "react-icons/bi";

import CartItem from "../components/CartItem";
const Cart = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axiosClient
            .get("/cart")
            .then(({ data }) => {
                setItems(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const price = Object.keys(items).map((key) => {
        return items[key].price;
    });

    let total = 0;
    for (let i = 0; i < price.length; i++) {
        total += price[i];
    }

    return (
        <div className="h-screen bg-gray-100 pt-20 flex justify-center">
            <div className="flex flex-col gap-4">
                {Object.keys(items).map((key) => (
                    <div key={key} className="rounded-lg w-[500px]">
                        <CartItem
                            name={items[key].name}
                            brand={items[key].brand}
                            price={items[key].price}
                            size={items[key].size}
                        />
                    </div>
                ))}
            </div>

            {price.length ? (
                <div className="p-10">
                    <div className="p-5 bg-[#fff] flex flex-col gap-4 shadow-md rounded-lg w-[300px]">
                        <div className="flex justify-between text-[#717883]">
                            Subtotal:
                            <p className="flex items-center">
                                <BiDollar className="-mr-1" size={17} />
                                {total}
                            </p>
                        </div>
                        <div className="flex justify-between text-[#717883]">
                            Subtotal:{" "}
                            <p className="flex items-center">
                                <BiDollar className="-mr-1" size={17} />
                                4.99
                            </p>
                        </div>
                        <hr />
                        <div className="text-xl flex justify-between">
                            Total:
                            <p className=" text-[#717883] flex items-center">
                                <BiDollar className="-mr-1" size={22} />
                                {parseFloat(total * 1.23 + 4.99)}
                            </p>
                        </div>
                        <button className="bg-[#66d9c2] hover:bg-[#4aa996] p-2 rounded-md">
                            Checkout
                        </button>
                    </div>
                </div>
            ) : (
                <h1 className="text-3xl ">
                    😥{" "}
                    <span className="rainbow text-transparent">
                        You have nothing in your cart
                    </span>{" "}
                    😥
                </h1>
            )}
        </div>
    );
};

export default Cart;
