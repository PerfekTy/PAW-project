import { FaTshirt } from "react-icons/fa";
import { IoPricetagsOutline } from "react-icons/io5";
import { BiRename } from "react-icons/bi";

const CardInfo = ({ price, name, size, brand }) => {
  return (
    <>
      <div className="mt-2">
        <h5 className="text-xl select-none">
          <span>{price}</span>
        </h5>
        <h5 className="text-md flex items-center select-none">
          <span className="mr-1">
            <BiRename />
          </span>
          {name}
        </h5>
        <h5 className="text-sm flex items-center select-none">
          <span className="mr-1">
            <FaTshirt />
          </span>
          {size}
        </h5>
        <h5 className="text-sm flex items-center">
          <span className="mr-1">
            <IoPricetagsOutline />
          </span>
          {brand}
        </h5>
      </div>
    </>
  );
};

export default CardInfo;
