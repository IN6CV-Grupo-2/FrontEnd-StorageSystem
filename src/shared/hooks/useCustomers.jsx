import { useState } from "react";
import toast from "react-hot-toast";
import {
  getCustomers as getCustomersRequest,
  saveCustomer,
  updateCustomer,
  deleteCustomer
} from "../../services/api.jsx";

export const useCustomers = () => {
  const [customers, setCustomers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCustomers = async () => {
    setIsLoading(true);
    const response = await getCustomersRequest();

    if (response.error) {
      toast.error(
        response.e?.response?.data || "Error al obtener los clientes"
      );
      setIsLoading(false);
      return;
    }

    setCustomers(response.data.customers);
    setIsLoading(false);
  };

  const createCustomer = async (data) => {
    const response = await saveCustomer(data);

    if (response.error) {
      toast.error(
        response.e?.response?.data || "Error al guardar el cliente"
      );
      return;
    }

    toast.success("Cliente guardado correctamente");
    getCustomers();
  };

  const editCustomer = async (data, id) => {
    const response = await updateCustomer(data, id);

    if (response.error) {
      toast.error(
        response.e?.response?.data || "Error al actualizar el cliente"
      );
      return;
    }

    toast.success("Cliente actualizado correctamente");
    getCustomers();
  };

  const removeCustomer = async (data) => {
    const response = await deleteCustomer(data);

    if (response.error) {
      toast.error(
        response.e?.response?.data || "Error al eliminar el cliente"
      );
      return;
    }

    toast.success("Cliente eliminado correctamente");
    getCustomers();
  };

  return {
    customers,
    isLoading,
    getCustomers,
    createCustomer,
    editCustomer,
    removeCustomer
  };
};