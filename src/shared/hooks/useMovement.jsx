import { useState } from "react";
import toast from "react-hot-toast";
import {
  getMovements as getMovementsRequest,
  createMovement as createMovementRequest,
  updateMovement as updateMovementRequest,
  deleteMovement as deleteMovementRequest,
  getMovementById as getMovementByIdRequest
} from "../../services/api.jsx";

export const useMovements = () => {
  const [movements, setMovements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMovements = async () => {
    setIsLoading(true);
    const res = await getMovementsRequest();
    if (res.error) {
      toast.error(res.e?.response?.data || "Error al obtener movimientos");
    } else {
      setMovements(res.data.movements);
    }
    setIsLoading(false);
  };

  const getMovementById = async (id) => {
    const res = await getMovementByIdRequest(id);
    if (res.error) {
      toast.error(res.e?.response?.data || "Error al obtener movimiento");
    }
    return res.data?.movement;
  };

  const createMovement = async (data) => {
    const res = await createMovementRequest(data);
    if (res.error) {
      toast.error(res.e?.response?.data || "Error al crear movimiento");
    } else {
      toast.success("Movimiento creado exitosamente");
      setMovements((prev) => [...prev, res.data.populatedMovement]);
    }
  };

  const updateMovement = async (id, data) => {
    const res = await updateMovementRequest(id, data);
    if (res.error) {
      toast.error(res.e?.response?.data || "Error al actualizar movimiento");
    } else {
      toast.success("Movimiento actualizado exitosamente");
      await getMovements();
    }
  };

  const deleteMovement = async (id) => {
    const res = await deleteMovementRequest(id);
    if (res.error) {
      toast.error(res.e?.response?.data || "Error al eliminar movimiento");
    } else {
      toast.success("Movimiento eliminado");
      await getMovements();
    }
  };

  return {
    movements,
    isLoading,
    getMovements,
    createMovement,
    updateMovement,
    deleteMovement,
    getMovementById
  };
};