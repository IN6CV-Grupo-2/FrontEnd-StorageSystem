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
      toast.error(res.e?.response?.data || "Error getting moves");
    } else {
      setMovements(res.data.movements);
    }
    setIsLoading(false);
  };

  const getMovementById = async (id) => {
    const res = await getMovementByIdRequest(id);
    if (res.error) {
      toast.error(res.e?.response?.data || "Error getting movement ");
    }
    return res.data?.movement;
  };

  const createMovement = async (data) => {
    const res = await createMovementRequest(data);
    if (res.error) {
      toast.error(res.e?.response?.data || "Error creating movement");
    } else {
      toast.success("Successfully created movement");
      setMovements((prev) => [...prev, res.data.populatedMovement]);
    }
  };

  const updateMovement = async (id, data) => {
    const res = await updateMovementRequest(id, data);
    if (res.error) {
      toast.error(res.e?.response?.data || "Error updating movement");
    } else {
      toast.success("Movement successfully updated");
      await getMovements();
    }
  };

  const deleteMovement = async (id) => {
    const res = await deleteMovementRequest(id);
    if (res.error) {
      toast.error(res.e?.response?.data || "Error removing motion");
    } else {
      toast.success("Move removed");
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