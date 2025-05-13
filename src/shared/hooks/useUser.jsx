import { useState } from "react";
import toast from "react-hot-toast";
import {getUsers as getUsersRequest,updateUser,deleteUser} from "../../services/api.jsx";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const response = await getUsersRequest();
      setUsers(response.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const editUser = async (userData, userId) => {
    try {
      await updateUser(userData, userId);  
      await getUsers();  
    } catch (error) {
      console.error("Error al editar el usuario:", error);
    }
  };

  const removeUser = async ({ id }) => {
    try {
      await deleteUser(id); 
      await getUsers();  
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  return {
    users,
    getUsers,
    editUser,
    removeUser,
    isLoading
  };
};