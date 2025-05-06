import { useEffect, useState } from "react";
import { useProviders } from "../../shared/hooks/useProviders.jsx";
import { ProviderForm } from "./ProviderForm.jsx";
import { ProviderTable } from "./ProviderTable.jsx";

export const ProviderManager = ({ showSearch = true, title = "Gestión de Proveedores" }) => {
    const {
        providers,
        isLoading,
        getProviders,
        createProvider,
        editProvider,
        removeProvider,
    } = useProviders();

    const [editingProvider, setEditingProvider] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        getProviders();
    }, []);

    const handleAddProvider = () => {
        setEditingProvider(null);
        setShowForm(true);
    };

    const handleEdit = (provider) => {
        setEditingProvider(provider);
        setShowForm(true);
    };

    const handleSave = async (data) => {
        if (editingProvider) {
            await editProvider(data, editingProvider.uid);
        } else {
            await createProvider(data);
        }
        setEditingProvider(null);
        setShowForm(false);
    };

    const handleDelete = async (provider) => {
        if (window.confirm(`¿Estás seguro de eliminar a ${provider.name}?`)) {
            await removeProvider(provider.uid);
        }
    };

    const filteredProviders = searchTerm
        ? providers?.filter((prov) =>
            prov.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prov.uid?.toString().includes(searchTerm)
        )
        : providers;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">{title}</h1>

            <div className="flex justify-between items-center mb-4">

                {showSearch && (
                    <input
                        type="text"
                        placeholder="Buscar proveedor por nombre o ID"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border px-3 py-2 rounded w-64"
                    />
                )}
            </div>

            {showForm && (
                <ProviderForm
                    onSave={handleSave}
                    initialData={editingProvider}
                />
            )}

            {isLoading ? (
                <p className="text-gray-500">Cargando proveedores...</p>
            ) : (
                <ProviderTable
                    providers={filteredProviders}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};
