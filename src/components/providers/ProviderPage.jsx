import { useEffect, useState } from "react";
import { useProviders } from "../../shared/hooks/useProviders.jsx";
import { ProviderTable } from "./ProviderTable.jsx";

export const ProviderPage = () => {
    const {
        providers,
        getProviders,
        createProvider,
        editProvider,
        removeProvider,
        isLoading,
    } = useProviders();

    const [editingProvider, setEditingProvider] = useState(null);
    const [name, setName] = useState("");

    useEffect(() => {
        getProviders();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const providerData = { name };

        if (editingProvider) {
            editProvider(providerData, editingProvider.id);
        } else {
            createProvider(providerData);
        }

        setName("");
        setEditingProvider(null);
    };

    const handleEdit = (provider) => {
        setEditingProvider(provider);
        setName(provider.name);
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Gestión de Proveedores</h1>

            <form onSubmit={handleSubmit} className="mb-6">
                <input
                    type="text"
                    placeholder="Nombre del proveedor"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border p-2 rounded w-full mb-2"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {editingProvider ? "Actualizar" : "Agregar"} Proveedor
                </button>
            </form>

            {isLoading ? (
                <p>Cargando proveedores...</p>
            ) : (
                <ProviderTable
                    providers={providers}
                    onEdit={handleEdit}
                    onDelete={removeProvider}
                />
            )}
        </div>
    );
};