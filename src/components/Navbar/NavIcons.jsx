import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsDoorOpenFill, BsFillPersonPlusFill, BsCart4 } from "react-icons/bs";
import { RiUserShared2Fill } from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";
import { useState } from "react";

import NavbarIcon from "./NavbarIcon";
import ModalElement from "../Modal/ModalElement";

const NavIcons = () => {
  const [openModal, setOpenModal] = useState(false);
  const modalHandler = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <li>
        <Link to="/">
          <NavbarIcon icon={<AiFillHome size={27} />} info="Cloth 👚" />
        </Link>
      </li>
      <li>
        <Link to="/login">
          <NavbarIcon
            icon={<RiUserShared2Fill size={27} />}
            info="Sign In 🙆‍♂️"
          />
        </Link>
      </li>
      <li>
        <Link to="/register">
          <NavbarIcon
            icon={<BsFillPersonPlusFill size={27} />}
            info="Register ➕"
          />
        </Link>
      </li>
      <li>
        <Link to="/account">
          <NavbarIcon
            icon={<MdManageAccounts size={27} />}
            info="My account 🪪"
          />
        </Link>
      </li>
      <li onClick={modalHandler}>
        <ModalElement />
      </li>
      <li>
        <Link to="/cart">
          <NavbarIcon icon={<BsCart4 size={27} />} info="Cart 🛒" />
        </Link>
      </li>
      <li className="mt-auto ">
        <NavbarIcon icon={<BsDoorOpenFill size={27} />} info="Logout 🚪" />
      </li>
    </>
  );
};

export default NavIcons;
