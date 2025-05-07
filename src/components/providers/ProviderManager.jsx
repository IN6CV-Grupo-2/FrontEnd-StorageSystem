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
        searchProviderId
    } = useProviders();

    const [editingProvider, setEditingProvider] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [searchResult, setSearchResult] = useState(null);

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
        }
    };

    const filteredProviders = searchTerm
        ? providers?.filter((prov) =>
            prov.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prov.uid?.toString().includes(searchTerm)
        )
        : providers;

    const handleSearchTermChange = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim() === "") {
            setSearchResult(null);
            return;
        }

        if (/^\d+$/.test(value)) {
            const result = await searchProviderId(value);
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
                        placeholder="Buscar proveedor por nombre o ID"
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                        className="border px-3 py-2 rounded w-64"
                    />
                )}
            </div>

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
                    providers={searchResult ? [searchResult] : filteredProviders}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};
