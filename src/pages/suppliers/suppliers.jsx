import { useState, useEffect } from "react";
import { useProviders } from "../../shared/hooks/useProviders.jsx";
import { ProviderForm } from "../../components/providers/ProviderForm";
import { ProviderTable } from "../../components/providers/ProviderTable";
import "./suppliers.css";

const Supplier = () => {
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

  useEffect(() => {
    getProviders();
  }, []);

  const handleSave = (data) => {
    if (editingProvider) {
      editProvider(data, editingProvider.id);
    } else {
      createProvider(data);
    }
    setEditingProvider(null);
  };

  const handleEdit = (provider) => setEditingProvider(provider);
  const handleDelete = (provider) => removeProvider({ id: provider.id });

  const filteredProviders = searchTerm
  ? providers.filter((prov) =>
      prov.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prov.id.toString().includes(searchTerm)
    )
  : providers;
  return (
    <div className="supplier-container">
      <h1 className="supplier-title">Gestión de Proveedores</h1>

      <ProviderForm onSave={handleSave} initialData={editingProvider} />

      <input
        type="text"
        placeholder="Buscar proveedor por nombre o ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="supplier-search"
      />

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

export default Supplier;