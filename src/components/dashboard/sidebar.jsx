import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { path: "/", label: "Main Page" },
    { path: "/products", label: "Products" },
    { path: "/users", label: "Users" },
    { path: "/suppliers", label: "Suppliers" },
    { path: "/reports", label: "Reports and Statistics" }
  ];

  return (
    <div className="sidebar">
      {links.map(({ path, label }) => (
        <Link key={path} to={path}>
          {label}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;