import { CiCircleRemove } from "react-icons/ci";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const CartItem = (props) => {
    const { setNotification } = useStateContext();
    const deleteItem = () => {
        axiosClient
            .delete("/cart")
            .then(() => {
                setNotification("Item was successfully deleted from cart");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <div className="p-5 bg-[#fff] shadow-md rounded-lg relative">
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
