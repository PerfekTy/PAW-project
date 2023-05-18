import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

import styles from "./MobileNav.module.css";
import Hamburger from "./Hamburger";
import NavIcons from "../Navbar/NavIcons";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className={styles.mobileMenu}>
        <form>
          <div className="w-[80%]">
            <input
              type="text"
              placeholder="Search for items..."
              className="pl-10"
            />
            <label className="absolute top-5 left-5">
              <AiOutlineSearch size={28} />
            </label>
          </div>
        </form>
        <ul>{open ? <NavIcons /> : ""}</ul>
      </div>
      <div className={styles.hamburger}>
        <Hamburger onClick={() => setOpen(!open)} />
      </div>
    </>
  );
};

export default MobileNav;
