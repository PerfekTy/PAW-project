import { FaTshirt } from "react-icons/fa";
import { IoPricetagsOutline } from "react-icons/io5";
import { BiRename } from "react-icons/bi";

const CardInfo = () => {
  return (
    <>
      <div className="mt-2">
        <h5 className="text-xl select-none">
          <span>30zł</span>
        </h5>
        <h5 className="text-md flex items-center select-none">
          <span className="mr-1">
            <BiRename />
          </span>
          Jebana czerowna kurtka
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
    </>
  );
};

export default CardInfo;
