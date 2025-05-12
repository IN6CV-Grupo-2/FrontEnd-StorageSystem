import { useEffect, useState } from "react";
import { useCategories } from "../../shared/hooks/useCategories.jsx";
import { CategoryTable } from "./CategoryTable.jsx";


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
    const [name, setName] = useState("");

    useEffect(() => {
        getCategories();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const categoryData = { name };

        if (editingCategory) {
            editCategory(categoryData, editingCategory.id);
        } else {
            createCategory(categoryData);
        }

        setName("");
        setEditingCategory(null);
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setName(category.name);
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Gestión de Categorias</h1>

            <form onSubmit={handleSubmit} className="mb-6">
                <input
                    type="text"
                    placeholder="Nombre de la categoria"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border p-2 rounded w-full mb-2"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {editingCategory  ? "Actualizar" : "Agregar"} Categoria
                </button>
            </form>
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