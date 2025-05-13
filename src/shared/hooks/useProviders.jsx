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
    const fetchProviders = async () => {
      setIsLoading(true);
      const response = await getProvidersRequest();

      if (response.error) {
        toast.error(response.e?.response?.data || "Error getting suppliers");
        setIsLoading(false);
        return;
      }

      setProviders(response.data.providers);
      setIsLoading(false);
    };

    if (!providers) {
      fetchProviders();
    }
  }, [providers]);

  const getProviders = async () => {
    const response = await getProvidersRequest();
    if (response.error) {
      toast.error(response.e?.response?.data || "Error getting suppliers");
      return;
    }
    toast.success("Successfully sourced suppliers");


  }

  const createProvider = async (data) => {
    const response = await saveProvider(data);

    if (response.error) {
      toast.error(response.e?.response?.data || "Error saving provider");
      return;
    }

    toast.success("Supplier saved successfully");
    setProviders((prevProviders) => [...prevProviders, response.data]);
  };

  const editProvider = async (data, id) => {
    const response = await updateProvider(data, id);

    if (response.error) {
      toast.error(response.e?.response?.data || "Error updating provider");
      return;
    }

    toast.success("Supplier updated successfully");
    setProviders((prevProviders) =>
      prevProviders.map((prov) => prov.uid === id ? { ...prov, ...data } : prov)
    );
  };

  const removeProvider = async (id) => {
    const response = await deleteProvider(id);

    if (response.error) {
      toast.error(response.e?.response?.data || "Error deleting the provider");
      return;
    }

    toast.success("Supplier successfully removed");
    setProviders((prevProviders) =>
      prevProviders.filter((prov) => prov.uid !== id)
    );
  };

  const searchProviderId = async (id) => {
    const response = await getProviderById(id);
    if (response.error) {
      toast.error(response.e?.response?.data || "Provider not found");
      return null;
    }
    toast.success("Provider found");
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