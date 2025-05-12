import { useState, useEffect } from "react";
import { useCategories } from "../../shared/hooks/useCategories.jsx";
import { CategoryForm } from "../../components/categories/CategoryForm";
import { CategoryTable } from "../../components/categories/CategoryTable";
import "./categories.css";

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
    console.log("Datos enviados al backend:", data);
    console.log("Estado de editingCategory:", editingCategory);

    const nameExists = categories.some(
      (category) =>
        category.name.toLowerCase() === data.name.toLowerCase() &&
        category.uid !== (editingCategory?.uid || editingCategory?._id)
    );

    if (nameExists) {
      alert("El nombre de la categoría ya existe. Por favor, elige otro.");
      return;
    }

    if (editingCategory && (editingCategory.uid || editingCategory._id)) {
      const categoryId = editingCategory.uid || editingCategory._id;
      if (window.confirm(`¿Estás seguro de que deseas actualizar la categoría "${editingCategory.name}"?`)) {
        console.log("Actualizando categoría con ID:", categoryId);
        editCategory(data, categoryId);
      }
    } else {
      console.log("Creando nueva categoría");
      createCategory(data);
    }
    setEditingCategory(null);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
  };

  const handleDelete = (categoryId) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar la categoría?`)) {
      removeCategory(categoryId);
    }
  };

  const filteredCategories = searchTerm
    ? categories.filter((cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (cat.uid && cat.uid.toString().includes(searchTerm))
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