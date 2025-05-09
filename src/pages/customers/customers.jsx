import { CustomerManager } from "../../components/customers/CustomerManager.jsx";
import "./customers.css";

const Customer = () => {
  return (
    <div className="customer-container">
      <CustomerManager
        title="Clientes Externos"
        showSearch={true}
      />
    </div>
  );
};

export default Customer;