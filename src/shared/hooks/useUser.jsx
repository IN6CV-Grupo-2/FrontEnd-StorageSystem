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
        const usersWithId = response.data.users.map((user) => ({
            ...user,
            id: user.uid, // Asegúrate de que todos los usuarios tengan un campo `id`
        }));
        setUsers(usersWithId);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
    } finally {
        setIsLoading(false);
    }
  };

  const editUser = async (userData, userId) => {
    try {
        const response = await updateUser(userData, userId); // Llama a updateUser del servicio
        if (response.error) {
            toast.error("Error al actualizar el usuario.");
            return;
        }
        toast.success("Usuario actualizado correctamente.");

        // Actualizar el estado de los usuarios
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === userId ? { ...user, ...userData } : user
            )
        );
    } catch (error) {
        console.error("Error al editar el usuario:", error);
    }
};

  const removeUser = async (userId) => {
    try {
        const response = await deleteUser(userId);
        if (response.error) {
            toast.error("Error al eliminar el usuario.");
            return;
        }
        toast.success("Usuario eliminado correctamente.");
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
