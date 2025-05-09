import { useCustomers } from "../../shared/hooks/useCustomers.jsx";
import { useEffect, useState } from "react";
import { CustomerForm } from "./CustomerForm.jsx";
import "./CustomerTable.css";

export const CustomerTable = ({ onEdit }) => {
    const { customers, isLoading, getCustomers, removeCustomer, searchCustomerId } = useCustomers();
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        getCustomers();
    }, [getCustomers]);

    const handleEdit = (customer) => {
        setEditingCustomer(customer);
        setShowForm(true);
    };

    const handleDelete = (customer) => {
        if (window.confirm(`¿Estás seguro de eliminar a ${customer.name}?`)) {
            removeCustomer(customer.uid);
        }
    };

    const handleSave = () => {
        setEditingCustomer(null);
        setShowForm(false);
    };

    const handleAddCustomer = () => {
        setEditingCustomer(null);
        setShowForm(true);
    };

    if (isLoading) {
        return <p className="text-gray-500">Cargando clientes...</p>;
    }

    return (
        <div className="customer-table-container">
            <div className="mb-4">
                <button onClick={handleAddCustomer} className="add-customer-btn">
                    Agregar Nuevo cliente
                </button>
            </div>

            {showForm && (
                <CustomerForm onSave={handleSave} onCancel={() => setShowForm(false)} initialData={editingCustomer} />
            )}

            {!customers?.length && !isLoading ? (
                <p className="text-gray-500 mt-4">No hay clientes registrados.</p>
            ) : (
                <div className="overflow-x-auto mt-6">
                    <table className="customer-table">
                        <thead>
                            <tr>
                                <th className="p-3">Nombre</th>
                                <th className="p-3">Correo</th>
                                <th className="p-3">Teléfono</th>
                                <th className="p-3 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers?.map((cust, index) => (
                                <tr
                                    key={cust.uid}
                                    className={index % 2 === 0 ? "bg-white" : "bg-[#F2F2F2]"}
                                >
                                    <td className="p-3 border-b">{cust.name}</td>
                                    <td className="p-3 border-b">{cust.email}</td>
                                    <td className="p-3 border-b">{cust.phone}</td>
                                    <td className="p-3 border-b text-center space-x-2">
                                        <button onClick={() => handleEdit(cust)} className="edit-btn">
                                            Editar
                                        </button>
                                        <button onClick={() => handleDelete(cust)} className="delete-btn">
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};