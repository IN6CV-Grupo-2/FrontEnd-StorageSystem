import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  getProviders as getProvidersRequest,
  saveProvider,
  updateProvider,
  deleteProvider,
  getProviderById
} from "../../services/api.jsx";

export const useProviders = () => {
  const [providers, setProviders] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    // Cargar los proveedores solo cuando el componente se monta
    const fetchProviders = async () => {
      setIsLoading(true);
      const response = await getProvidersRequest();

      if (response.error) {
        toast.error(response.e?.response?.data || "Error al obtener los proveedores");
        setIsLoading(false);
        return;
      }

      setProviders(response.data.providers);
      setIsLoading(false);
    };

    if (!providers) {  // Solo hace la petición si no hay proveedores
      fetchProviders();
    }
  }, [providers]); // Agregamos `providers` en las dependencias para evitar peticiones infinitas

  const getProviders = async () => {
    const response = await getProvidersRequest();
    if (response.error) {
      toast.error(response.e?.response?.data || "Error al obtener los proveedores");
      return;
    }
    toast.success("Proveedores obtenidos correctamente");

    
  }

  const createProvider = async (data) => {
    const response = await saveProvider(data);

    if (response.error) {
      toast.error(response.e?.response?.data || "Error al guardar el proveedor");
      return;
    }

    toast.success("Proveedor guardado correctamente");
    setProviders((prevProviders) => [...prevProviders, response.data]); // Actualiza la lista de proveedores localmente
  };

  const editProvider = async (data, id) => {
    const response = await updateProvider(data, id);

    if (response.error) {
      toast.error(response.e?.response?.data || "Error al actualizar el proveedor");
      return;
    }

    toast.success("Proveedor actualizado correctamente");
    setProviders((prevProviders) =>
      prevProviders.map((prov) => prov.uid === id ? { ...prov, ...data } : prov)
    );
  };

  const removeProvider = async (id) => {
    const response = await deleteProvider(id);

    if (response.error) {
      toast.error(response.e?.response?.data || "Error al eliminar el proveedor");
      return;
    }

    toast.success("Proveedor eliminado correctamente");
    // Elimina el proveedor de la lista sin hacer otra llamada a la API
    setProviders((prevProviders) =>
      prevProviders.filter((prov) => prov.uid !== id)
    );
  };

  const searchProviderId = async (id) => {
    const response = await getProviderById(id);
    if (response.error) {
        toast.error(response.e?.response?.data || "No se encontró al proveedor");
        return null;
    }
    toast.success("Proveedor encontrado");
    return response;
};

  return {
    providers,
    isLoading,
    getProviders,
    createProvider,
    editProvider,
    removeProvider,
    searchProviderId
  };
};