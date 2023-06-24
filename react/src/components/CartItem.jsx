import { CiCircleRemove } from "react-icons/ci";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import { useState } from "react";

const CartItem = (props) => {
    const { setNotification } = useStateContext();
    const [hide, setHide] = useState(false);

    const deleteItem = () => {
        axiosClient
            .delete(`/cart/${props.id}`)
            .then(() => {
                setHide(!hide);
                setNotification("Item was successfully deleted from cart");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <div
                className={
                    hide
                        ? "hidden"
                        : "p-5 bg-[#fff] shadow-md rounded-lg relative flex gap-10"
                }
            >
                <div>
                    <h2>{props.name}</h2>
                </div>
                <div className="text-[15px] italic">
                    <h2>{props.brand}</h2>
                </div>
                <div className="italic">
                    <h3>Size: {props.size}</h3>
                </div>
                <div className="italic">
                    <h4>
                        <span>&#x24;</span>
                        {props.price}
                    </h4>
                </div>
                <div className="absolute top-5 right-5">
                    <CiCircleRemove
                        onClick={deleteItem}
                        size={28}
                        className="hover:text-red-600 cursor-pointer hover:scale-110 transition-all duration-150"
                    />
                </div>
            </div>
        </>
    );
};

export default CartItem;
