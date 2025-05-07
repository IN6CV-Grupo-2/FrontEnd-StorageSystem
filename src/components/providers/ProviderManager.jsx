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
        removeProvider
    } = useProviders();

    const [editingProvider, setEditingProvider] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
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
        await getProviders();
        setEditingProvider(null);
        setShowForm(false);
    };

    const handleDelete = async (provider) => {
        if (window.confirm(`¿Estás seguro de eliminar a ${provider.name}?`)) {
            await removeProvider(provider.uid);
            await getProviders();
        }
    };

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        setSearchQuery(searchTerm);
    };

    const filteredProviders = searchQuery
        ? providers?.filter((prov) =>
            prov.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            prov.phone.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : providers;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">{title}</h1>

            {showSearch && (
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="Buscar proveedor por correo o teléfono"
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                        className="border px-3 py-2 rounded w-64"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Buscar
                    </button>
                </div>
            )}

            {showForm && (
                <ProviderForm
                    onSave={handleSave}
                    onCancel={() => {
                        setEditingProvider(null);
                        setShowForm(false);
                    }}
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