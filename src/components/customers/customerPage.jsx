import { useEffect, useState } from "react";
import { useCustomers } from "../../shared/hooks/useCustomers.jsx";
import { CustomerTable } from "./customerTable.jsx";

export const CustomerPage = () => {
    const {
        customers,
        getCustomers,
        createCustomer,
        editCustomer,
        removeCustomer,
        isLoading,
    } = useCustomers();

    const [editingCustomer, setEditingCustomer] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [dpi, setDpi] = useState("");

    useEffect(() => {
        getCustomers();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const customerData = { name, email, phone, address, dpi };

        if (editingCustomer) {
            editCustomer(customerData, editingCustomer.id);
        } else {
            createCustomer(customerData);
        }

        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setDpi("");
        setEditingCustomer(null);
    };

    const handleEdit = (customer) => {
        setEditingCustomer(customer);
        setName(customer.name);
        setEmail(customer.email);
        setPhone(customer.phone);
        setAddress(customer.address);
        setDpi(customer.dpi || "");
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Gestion de Clientes</h1>

            <form onSubmit={handleSubmit} className="mb-6">
                <input
                    type="text"
                    placeholder="Nombre del cliente"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border p-2 rounded w-full mb-2"
                />
                <input
                    type="email"
                    placeholder="Correo electronico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border p-2 rounded w-full mb-2"
                />
                <input
                    type="text"
                    placeholder="Numero de telefono"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="border p-2 rounded w-full mb-2"
                />
                <input
                    type="text"
                    placeholder="Direccion"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="border p-2 rounded w-full mb-2"
                />
                <input
                    type="text"
                    placeholder="DPI (opcional)"
                    value={dpi}
                    onChange={(e) => setDpi(e.target.value)}
                    className="border p-2 rounded w-full mb-2"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {editingCustomer ? "Actualizar" : "Agregar"} Cliente
                </button>
            </form>

            {isLoading ? (
                <p>Cargando clientes...</p>
            ) : (
                <CustomerTable
                    customers={customers}
                    onEdit={handleEdit}
                    onDelete={removeCustomer}
                />
            )}
        </div>
    );
};