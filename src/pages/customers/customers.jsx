import { useState, useEffect } from "react";
import { useCustomers } from "../../shared/hooks/useCustomers.jsx";
import { CustomerForm } from "../../components/customers/customerForm.jsx";
import { CustomerTable } from "../../components/customers/customerTable.jsx";
import "./customers.css";

const Customer = () => {
  const {
    customers,
    isLoading,
    getCustomers,
    createCustomer,
    editCustomer,
    removeCustomer,
  } = useCustomers();

  const [editingCustomer, setEditingCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getCustomers();
  }, []);

  const handleSave = (data) => {
    if (editingCustomer) {
      editCustomer(data, editingCustomer.id);
    } else {
      createCustomer(data);
    }
    setEditingCustomer(null);
  };

  const handleEdit = (customer) => setEditingCustomer(customer);
  const handleDelete = (customer) => removeCustomer({ id: customer.id });

  const filteredCustomers = searchTerm
    ? customers.filter((cust) =>
        cust.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cust.id.toString().includes(searchTerm)
      )
    : customers;

  return (
    <div className="customer-container">
      <h1 className="customer-title">Gestión de Clientes</h1>

      <CustomerForm onSave={handleSave} initialData={editingCustomer} />

      <input
        type="text"
        placeholder="Buscar cliente por nombre o id"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="customer-search"
      />

      {isLoading ? (
        <p className="text-gray-500">Cargando clientes...</p>
      ) : (
        <CustomerTable
          customers={filteredCustomers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Customer;