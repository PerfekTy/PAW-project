import { useEffect, useState } from "react";
import axiosClient from "../axios-client";

// import { Loading } from "../components/Loading";
import { Card } from "../components/Card";

const CardList = () => {
    const [clothes, setClothes] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [user, setUser] = useState({});
    const [_photos, _setPhotots] = useState([]);

    useEffect(() => {
        axiosClient.get("/home").then(({ data }) => {
            setClothes(data);
        });

        axiosClient.get("/photos").then(({ data }) => {
            setPhotos(data);
            Object.keys(photos).map((key) => {
                _setPhotots(photos[key].path);
            });
        });

        console.log(_photos);

        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user.nickname);
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
                        user={user}
                        photo={_photos}
                    />
                </div>
            ))}
        </div>
    );
};

export default CardList;
