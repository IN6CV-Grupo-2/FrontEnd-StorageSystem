import { useNavigate } from "react-router-dom";
import perfilImg from '../../assets/img/MeIcon.png';

const Sidebar = () => {
  const navigate = useNavigate();

  const links = [
    { path: "/", label: "Storage System" },
    { path: "/products", label: "Products" },
    { path: "/users", label: "Users" },
    { path: "/categories", label: "Category" },
    { path: "/suppliers", label: "Suppliers" },
    { path: "/reports", label: "Reports and Statistics" },
    { path: "/profile", label: "Profile" },
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

      <div
          className="d-flex align-items-center mb-3 cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          <img src={perfilImg} alt="Perfil"className="rounded-circle"width="50"height="50"/>
          <span className="ms-2">My Profile</span>
        </div>

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