import { useLocation } from "react-router-dom";
import { Card } from "../components/Card";

const CardList = (props) => {
    const { filteredClothes } = props;
    const location = useLocation();

    if (location.pathname !== "/home") {
        return null;
    }

    return (
        <div className="home-page lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
            {Object.keys(filteredClothes).map((key) => (
                <div key={key}>
                    <Card
                        name={filteredClothes[key].name}
                        brand={filteredClothes[key].brand}
                        price={filteredClothes[key].price}
                        size={filteredClothes[key].size}
                        id={filteredClothes[key].id}
                        user={filteredClothes[key].user_nickname}
                        path={filteredClothes[key].path}
                    />
                </div>
            ))}
        </div>
    );
};

export default CardList;
