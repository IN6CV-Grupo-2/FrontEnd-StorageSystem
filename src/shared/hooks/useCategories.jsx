import { useState } from "react";
import toast from "react-hot-toast";
import apiClient from "../../services/api.jsx";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCategories = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get("/categories"); // Asegúrate de que esta solicitud use apiClient
      setCategories(response.data.categories);
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error("No tienes permisos para acceder a las categorías.");
      } else {
        console.error("Error al obtener categorías:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const createCategory = async (data) => {
    try {
        console.log("Datos enviados al backend:", data); // Verifica los datos enviados
        const response = await apiClient.post("/categories/save", data);
        if (response.error) {
            toast.error("Error al crear la categoría.");
            return;
        }
        toast.success("Categoría creada correctamente.");
        getCategories(); // Recargar la lista de categorías
    } catch (error) {
        console.error("Error al crear la categoría:", error);
    }
  };

  const editCategory = async (data, categoryId) => {
    try {
      const response = await apiClient.put(`/categories/update/${categoryId}`, data);
      if (response.error) {
        toast.error("Error al actualizar la categoría.");
        return;
      }
      toast.success("Categoría actualizada correctamente.");
      getCategories(); // Recargar la lista de categorías
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
    }
  };

  const removeCategory = async (categoryId) => {
    try {
      if (!categoryId) {
        console.error("El ID de la categoría es undefined.");
        return;
      }

      console.log("Eliminando categoría con ID:", categoryId);
      const response = await apiClient.delete(`/categories/delete/${categoryId}?confirm=true`); // Agregar confirm=true
      if (response.error) {
        console.error("Error al eliminar la categoría:", response.error);
        return;
      }

      toast.success("Categoría eliminada correctamente.");
      getCategories(); // Recargar la lista de categorías
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };

  return {
    categories,
    isLoading,
    getCategories,
    createCategory, // Asegúrate de que esta función esté exportada
    editCategory,
    removeCategory,
  };
};
