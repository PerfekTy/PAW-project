import React from "react";

const NavbarIcon = props => {
  return (
    <div className="sidebar-icon group">
      {props.icon}
      <span className="sidebar-info group-hover:scale-100">{props.info}</span>
    </div>
  );
};

export default NavbarIcon;
