import { ProviderManager } from "../../components/providers/ProviderManager.jsx";
import Sidebar from "../../components/dashboard/sidebar.jsx";
import Navbar from "../../components/navbars/navbar.jsx";
import "./suppliers.css";

const Supplier = () => {
  return (
    <div>
      <div className="layout d-flex flex-column">
      <Sidebar/>
      <Navbar/>
    </div>
    <div className="supplier-container">
      <ProviderManager
        title="Proveedores Externos"
        showSearch={true}
      />
    </div>
    </div>
  );
};

export default Supplier;