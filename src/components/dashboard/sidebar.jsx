import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const links = [
    { path: "/", label: "Main Page" },
    { path: "/products", label: "Products" },
    { path: "/users", label: "Users" },
    { path: "/suppliers", label: "Suppliers" },
    { path: "/reports", label: "Reports and Statistics" },
    { path: "/movements", label: "Movements" }
  ];

  return (
    <div
      className="offcanvas offcanvas-start bg-dark text-white"
      tabIndex="-1"
      id="sidebarOffcanvas"
      aria-labelledby="sidebarOffcanvasLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="sidebarOffcanvasLabel">Menú</h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        {links.map(({ path, label }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="btn btn-outline-light w-100 mb-2"
            data-bs-dismiss="offcanvas"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;