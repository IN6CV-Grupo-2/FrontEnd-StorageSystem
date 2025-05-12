import { ProviderManager } from "../../components/providers/ProviderManager.jsx";
import "./suppliers.css";

const Supplier = () => {
  return (
    <div className="supplier-container">
      <ProviderManager
        title="Proveedores Externos"
        showSearch={true}
      />
    </div>
  );
};

export default Supplier;