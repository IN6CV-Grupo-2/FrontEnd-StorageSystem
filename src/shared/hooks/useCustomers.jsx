import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  getCustomers as getCustomersRequest,
  saveCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerById
} from "../../services/api.jsx";

export const useCustomers = () => {
  const [customers, setCustomers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true);
      const response = await getCustomersRequest();

      if (response.error) {
        toast.error(response.e?.response?.data || "Error al obtener los clientes");
        setIsLoading(false);
        return;
      }

      setCustomers(response.data.customers);
      setIsLoading(false);
    };

    if (!customers) { 
      fetchCustomers();
    }
  }, [customers]);

  const getCustomers = async () => {
    const response = await getCustomersRequest();
    if (response.error) {
      toast.error(response.e?.response?.data || "Error al obtener los clientes");
      return;
    }
    toast.success("Clientes obtenidos correctamente");
  }

  const createCustomer = async (data) => {
    const response = await saveCustomer(data);

    if (response.error) {
      toast.error(response.e?.response?.data || "Error al guardar el cliente");
      return;
    }

    toast.success("Cliente guardado correctamente");
    setCustomers((prevCustomers) => [...prevCustomers, response.data]);
  };

  const editCustomer = async (data, id) => {
    const response = await updateCustomer(data, id);

    if (response.error) {
      toast.error(response.e?.response?.data || "Error al actualizar el cliente");
      return;
    }

    toast.success("Cliente actualizado correctamente");
    setCustomers((prevCustomers) =>
      prevCustomers.map((cust) => cust.uid === id ? { ...cust, ...data } : cust)
    );
  };

  const removeCustomer = async (id) => {
    const response = await deleteCustomer(id);

    if (response.error) {
      toast.error(response.e?.response?.data || "Error al eliminar el cliente");
      return;
    }

    toast.success("cliente eliminado correctamente");
    setCustomers((prevCustomers) =>
      prevCustomers.filter((cust) => cust.uid !== id)
    );
  };

  const searchCustomerId = async (id) => {
    const response = await getCustomerById(id);
    if (response.error) {
        toast.error(response.e?.response?.data || "No se encontró al cliente");
        return null;
    }
    toast.success("cliente encontrado");
    return response;
};

  return {
    customers,
    isLoading,
    getCustomers,
    createCustomer,
    editCustomer,
    removeCustomer,
    searchCustomerId
  };
};