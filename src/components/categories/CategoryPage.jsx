import { useEffect, useState } from "react";
import { useCategories } from "../../shared/hooks/useCategories.jsx";
import { CategoryTable } from "./CategoryTable.jsx";
import { CategoryForm } from "./CategoryForm.jsx";

export const CategoryPage = () => {
  const {
    categories,
    getCategories,
    createCategory,
    editCategory,
    removeCategory,
    isLoading,
  } = useCategories();

  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

  const handleSave = (data) => {
    if (data) {
        if (editingCategory && editingCategory._id) {
            console.log("Actualizando categoría con ID:", editingCategory._id);
            editCategory({ ...data }, editingCategory._id); // Enviar el ID al backend
        } else {
            console.log("Creando nueva categoría");
            createCategory(data);
        }
    }
    setEditingCategory(null);
  };
  
  

  const handleEdit = (category) => {
    if (category && (category.uid || category._id)) {
        console.log("Editando categoría:", category);
        setEditingCategory(category);
    } else {
        console.error("La categoría no tiene un ID válido:", category);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gestión de Categorias</h1>

      <CategoryForm onSave={handleSave} initialData={editingCategory} />

      {isLoading ? (
        <p>Cargando categorias...</p>
      ) : (
        <CategoryTable
          categories={categories}
          onEdit={handleEdit}
          onDelete={removeCategory}
        />
      )}
    </div>
  );
};
