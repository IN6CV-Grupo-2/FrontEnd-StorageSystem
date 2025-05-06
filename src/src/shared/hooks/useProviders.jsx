import { useState } from "react";
import toast from "react-hot-toast";
import {
  getProviders as getProvidersRequest,
  saveProvider,
  updateProvider,
  deleteProvider
} from "../../services/api.jsx";

export const useProviders = () => {
  const [providers, setProviders] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getProviders = async () => {
    setIsLoading(true);
    const response = await getProvidersRequest();

    if (response.error) {
      toast.error(
        response.e?.response?.data || "Error al obtener los proveedores"
      );
      setIsLoading(false);
      return;
    }

    setProviders(response.data.providers);
    setIsLoading(false);
  };

  const createProvider = async (data) => {
    const response = await saveProvider(data);

    if (response.error) {
      toast.error(
        response.e?.response?.data || "Error al guardar el proveedor"
      );
      return;
    }

    toast.success("Proveedor guardado correctamente");
    getProviders();
  };

  const editProvider = async (data, id) => {
    const response = await updateProvider(data, id);

    if (response.error) {
      toast.error(
        response.e?.response?.data || "Error al actualizar el proveedor"
      );
      return;
    }

    toast.success("Proveedor actualizado correctamente");
    getProviders();
  };

  const removeProvider = async (data) => {
    const response = await deleteProvider(data);

    if (response.error) {
      toast.error(
        response.e?.response?.data || "Error al eliminar el proveedor"
      );
      return;
    }

    toast.success("Proveedor eliminado correctamente");
    getProviders();
  };

  return {
    providers,
    isLoading,
    getProviders,
    createProvider,
    editProvider,
    removeProvider
  };
};