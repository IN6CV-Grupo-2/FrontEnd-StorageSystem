import { useState, useEffect } from "react";
import { useCategories } from "../../shared/hooks/useCategories.jsx";
import { CategoryForm } from "../../components/categories/CategoryForm";
import { CategoryTable } from "../../components/categories/CategoryTable";

const Category = () => {
  const {
    categories,
    isLoading,
    getCategories,
    createCategory,
    editCategory,
    removeCategory,
  } = useCategories();

  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getCategories();
  }, []);

  const handleSave = (data) => {
    if (editingCategory) {
        editCategory(data, editingCategory.id);
    } else {
        createCategory(data);
    }
    setEditingCategory(null);
  };

  const handleEdit = (category) => setEditingProvider(category);
  const handleDelete = (category) => removeCategory({ id: category.id });

  const filteredCategories = searchTerm
  ? categories.filter((cat) =>
     cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     cat.id.toString().includes(searchTerm)
    )
  : categories;
  return (
    <div className="supplier-container">
      <h1 className="supplier-title">Gestión de Categorias</h1>

      <CategoryForm onSave={handleSave} initialData={editingCategory} />

      <input
        type="text"
        placeholder="Buscar categoria por nombre o ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="supplier-search"
      />

      {isLoading ? (
        <p className="text-gray-500">Cargando categorias...</p>
      ) : (
        <CategoryTable
          categories={filteredCategories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Category;