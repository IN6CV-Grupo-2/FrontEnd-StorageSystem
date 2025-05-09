import React from "react";
import icon from "../../assets/img/icon.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark p-3" style={{backgroundColor: '#1F3B4D'}} >
      <div className="d-flex align-items-center">
        <button
          className="btn btn-outline-light me-4"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebarOffcanvas"
          aria-controls="sidebarOffcanvas"
        >
          ☰
        </button>

        <div className="d-flex align-items-center ms-auto">
          <h1 className="text-white fs-7 mb-0 ms-1">Storage</h1>
          {/* <img
            className="nav-icon ms-2"
            src={icon}
            alt="icon"
            style={{ width: "50px", height: "50px" }}
          /> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;