import { useProviders } from "../../shared/hooks/useProviders.jsx";
import { useEffect, useState } from "react";
import { ProviderForm } from "./ProviderForm.jsx";
import "./ProviderTable.css";

export const ProviderTable = ({ onEdit }) => {
    const { providers, isLoading, getProviders, removeProvider, searchProviderId } = useProviders();
    const [editingProvider, setEditingProvider] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        getProviders();
    }, [getProviders]);

    const handleEdit = (provider) => {
        setEditingProvider(provider);
        setShowForm(true);
    };

    const handleDelete = (provider) => {
        if (window.confirm(`¿Estás seguro de eliminar a ${provider.name}?`)) {
            removeProvider(provider.uid);
        }
    };

    const handleSave = () => {
        setEditingProvider(null);
        setShowForm(false);
    };

    const handleAddProvider = () => {
        setEditingProvider(null);
        setShowForm(true);
    };


    if (isLoading) {
        return <p className="text-gray-500">Cargando proveedores...</p>;
    }

    return (
        <div className="provider-table-container">
            <div className="mb-4">
                <button onClick={handleAddProvider} className="add-provider-btn">
                    Agregar Nuevo Proveedor
                </button>
            </div>

            {showForm && (
                <ProviderForm onSave={handleSave} onCancel={() => setShowForm(false)} initialData={editingProvider} />
            )}

            {!providers?.length && !isLoading ? (
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
                            {providers?.map((prov, index) => (
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