import React from "react";
import icon from "../../assets/img/icon.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img className="nav-icon" src={icon} alt="icon" />
      <h1>Storage</h1>
    </nav>
  );
};

export default Navbar;