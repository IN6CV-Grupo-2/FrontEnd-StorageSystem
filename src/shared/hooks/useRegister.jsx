import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, register as registerRequest } from '../../services/api.jsx';
import toast from "react-hot-toast";

export const useRegister = (getUsers) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
  
    const register = async (email, password, username) => {
      setIsLoading(true);
      try {
        const response = await registerRequest({ email, password, username });
        const { userDetails } = response.data;
        localStorage.setItem('user', JSON.stringify(userDetails));
        toast.success('Usuario registrado correctamente');
  
        await getUsers();
        navigate('/');  
      } catch (error) {
        toast.error(error.response?.data || 'Ocurrio un error al registrar, intenta de nuevo');
      } finally {
        setIsLoading(false);
      }
    };
  
    return {
      register,
      isLoading
    };
  };
  