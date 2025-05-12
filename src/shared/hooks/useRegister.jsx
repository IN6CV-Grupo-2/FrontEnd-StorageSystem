import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, register as registerRequest } from '../../services/api.jsx';
import toast from "react-hot-toast";

export const useRegister = (getUsers) => {
    const [isLoading, setIsLoading] = useState(false);

    const register = async (email, password, username, role = "USER_ROLE") => {
        setIsLoading(true);
        try {
            const response = await registerRequest({ email, password, username, role });
            toast.success(`Usuario ${username} registrado correctamente.`);
            await getUsers(); // Recargar la lista de usuarios
        } catch (error) {
            toast.error(error.response?.data || "Ocurrió un error al registrar, intenta de nuevo");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        register,
        isLoading,
    };
};
