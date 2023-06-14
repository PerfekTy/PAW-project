import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";

const SeeCards = () => {
    const { setNotification } = useStateContext();
    const [card, setCard] = useState([]);

    useEffect(() => {
        axiosClient.get("/cards").then(({ data }) => {
            setCard(data);
        });
    }, []);

    const onDeleteClick = () => {
        if (!window.confirm("Are you sure you want to delete this card?")) {
            return;
        }

        axiosClient.delete("/cards").then(() => {
            setNotification("Card was successfully deleted");
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        });
    };
    return (
        <div>
            <table className="mx-auto mt-20 grow">
                <thead>
                    <tr>
                        <th className="border-2 p-3 px-10">ID</th>
                        <th className="border-2 p-3 px-10">Full Name</th>
                        <th className="border-2 p-3 px-10">Card Number</th>
                        <th className="border-2 p-3 px-10">Expiration Date</th>
                        <th className="border-2 p-3 px-10">Secure Code</th>
                        <th>
                            {" "}
                            <button
                                onClick={onDeleteClick}
                                className="p-3 ml-5 bg-[#d96666] hover:bg-[#9e4c4c] px-10 rounded-md"
                            >
                                Delete all cards
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {card.map((card) => (
                        <tr key={card.id} className="text-center">
                            <td className="border-2 p-3">{card.id}</td>
                            <td className="border-2 p-3">{card.fullname}</td>
                            <td className="border-2 p-3">{card.cardnumber}</td>
                            <td className="border-2 p-3">{card.expiration}</td>
                            <td className="border-2 p-3">{card.securecode}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SeeCards;
