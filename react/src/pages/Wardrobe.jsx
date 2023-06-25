import { useEffect, useState } from "react";
import axiosClient from "../axios-client";

// import { Loading } from "../components/Loading";
import { Card } from "../components/Card";

const CardList = () => {
    const [clothes, setClothes] = useState([]);

    useEffect(() => {
        axiosClient.get("/wardrobe").then(({ data }) => {
            setClothes(data);
        });

        axiosClient.get("/photos").then(({ data }) => {
            const pathMap = {};
            Object.keys(data).forEach((key) => {
                const id = data[key].id;
                const path = data[key].path;
                pathMap[id] = path;
            });
            setClothes((prevClothes) =>
                prevClothes.map((clothing) => ({
                    ...clothing,
                    path: pathMap[clothing.id],
                }))
            );
        });
    }, []);

    return (
        <div className="home-page lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
            {Object.keys(clothes).map((key) => (
                <div key={key}>
                    <Card
                        name={clothes[key].name}
                        brand={clothes[key].brand}
                        price={clothes[key].price}
                        size={clothes[key].size}
                        user={clothes[key].user_nickname}
                        path={clothes[key].path}
                    />
                </div>
            ))}
        </div>
    );
};

export default CardList;
