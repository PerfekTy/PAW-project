import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

const Hamburger = props => {
  const [openHam, setOpenHam] = useState(false);
  const hamHandler = () => {
    setOpenHam(props.onClick);
    setOpenHam(!openHam);
  };

  return (
    <div>
      <button onClick={hamHandler}>
        {openHam ? <IoMdClose size={30} /> : <GiHamburgerMenu size={30} />}
      </button>
    </div>
  );
};

export default Hamburger;
