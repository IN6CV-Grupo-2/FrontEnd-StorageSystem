import { useState } from "react";
import { ProviderForm } from "./ProviderForm.jsx";
import "./ProviderTable.css";

export const ProviderTable = ({ providers, onEdit, onDelete }) => {
    const [editingProvider, setEditingProvider] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const handleEdit = (provider) => {
        setEditingProvider(provider);
        setShowForm(true);
        onEdit(provider);
    };

    const handleDelete = (provider) => {
        if (window.confirm(`¿Estás seguro de eliminar a ${provider.name}?`)) {
            onDelete(provider);
        }
    };

    const handleAddProvider = () => {
        setEditingProvider(null);
        setShowForm(true);
        onEdit(null);
    };

    return (
        <div className="provider-table-container">
            <div className="mb-4">
                <button onClick={handleAddProvider} className="add-provider-btn">
                    Agregar Nuevo Proveedor
                </button>
            </div>

            {!providers?.length ? (
                <p className="text-gray-500 mt-4">No hay proveedores registrados.</p>
            ) : (
                <div className="overflow-x-auto mt-6">
                    <table className="provider-table">
                        <thead>
                            <tr>
                                <th className="p-3">Nombre</th>
                                <th className="p-3">Correo</th>
                                <th className="p-3">Teléfono</th>
                                <th className="p-3 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {providers.map((prov, index) => (
                                <tr
                                    key={prov.uid}
                                    className={index % 2 === 0 ? "bg-white" : "bg-[#F2F2F2]"}
                                >
                                    <td className="p-3 border-b">{prov.name}</td>
                                    <td className="p-3 border-b">{prov.email}</td>
                                    <td className="p-3 border-b">{prov.phone}</td>
                                    <td className="p-3 border-b text-center space-x-2">
                                        <button onClick={() => handleEdit(prov)} className="edit-btn">
                                            Editar
                                        </button>
                                        <button onClick={() => handleDelete(prov)} className="delete-btn">
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