import { useEffect, useState } from "react";
import { useCustomers } from "../../shared/hooks/useCustomers.jsx";
import { CustomerForm } from "./CustomerForm.jsx";
import { CustomerTable } from "./CustomerTable.jsx";

export const CustomerManager = ({ showSearch = true, title = "Gestión de Clientes" }) => {
    const {
        customers,
        isLoading,
        getCustomers,
        createCustomer,
        editCustomer,
        removeCustomer,
        searchCustomerId
    } = useCustomers();

    const [editingCustomer, setEditingCustomer] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [searchResult, setSearchResult] = useState(null);

    useEffect(() => {
        getCustomers();
    }, []);

    const handleAddCustomer = () => {
        setEditingCustomer(null);
        setShowForm(true);
    };

    const handleEdit = (customer) => {
        setEditingCustomer(customer);
        setShowForm(true);
    };

    const handleSave = async (data) => {
        if (editingCustomer) {
          await editCustomer(data, editingCustomer.uid);
        } else {
          await createCustomer(data);
        }
        await getCustomers();
        setEditingCustomer(null);
        setShowForm(false);
      };
    const handleDelete = async (customer) => {
        if (window.confirm(`¿Estás seguro de eliminar a ${customer.name}?`)) {
            await removeCustomer(customer.uid);
        }
    };

    const filteredCustomers = searchTerm
        ? customers?.filter((cust) =>
            cust.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cust.uid?.toString().includes(searchTerm)
        )
        : customers;

    const handleSearchTermChange = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim() === "") {
            setSearchResult(null);
            return;
        }

        if (/^\d+$/.test(value)) {
            const result = await searchCustomerId(value);
            setSearchResult(result?.data || null);
        } else {
            setSearchResult(null);
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">{title}</h1>

            <div className="flex justify-between items-center mb-4">

                {showSearch && (
                    <input
                        type="text"
                        placeholder="Buscar cliente por nombre o ID"
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                        className="border px-3 py-2 rounded w-64"
                    />
                )}
            </div>

            {showForm && (
                <CustomerForm
                    onSave={handleSave}
                    onCancel={() => {
                        setEditingCustomer(null);
                        setShowForm(false);
                    }}
                    initialData={editingCustomer}
                />
            )}

            {isLoading ? (
                <p className="text-gray-500">Cargando clientes...</p>
            ) : (
                <CustomerTable
                    customers={searchResult ? [searchResult] : filteredCustomers}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};
