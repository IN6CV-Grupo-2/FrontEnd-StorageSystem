import { useState } from "react";
import toast from "react-hot-toast";
import {
  getCategory  as getCategoriesRequest,
  saveCategory,
  updateCategory,
  deleteCategory
} from "../../services/api.jsx";

export const useCategories = () => {
  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCategories = async () => {
    setIsLoading(true);
    const response = await getCategoriesRequest();

    if (response.error) {
      toast.error(
        response.e?.response?.data || "Error al obtener las categorias"
      );
      setIsLoading(false);
      return;
    }

    setCategories(response.data.categories);
    setIsLoading(false);
  };

  const createCategory = async (data) => {
    const response = await saveCategory(data);

    if (response.error) {
      toast.error(
        response.e?.response?.data || "Error al guardar la categoria"
      );
      return;
    }

    toast.success("Categoria guardado correctamente");
    getCategories();
  };

  const editCategory = async (data, id) => {
    const response = await updateCategory(data, id);

    if (response.error) {
      toast.error(
        response.e?.response?.data || "Error al actualizar la categoria"
      );
      return;
    }

    toast.success("Categoria actualizado correctamente");
    getCategories();
  };

  const removeCategory = async (data) => {
    const response = await deleteCategory(data);

    if (response.error) {
      toast.error(
        response.e?.response?.data || "Error al eliminar la categoria"
      );
      return;
    }

    toast.success("Categoria eliminada correctamente");
    getCategories();
  };

  return {
    categories,
    isLoading,
    getCategories,
    createCategory,
    editCategory,
    removeCategory
  };
};