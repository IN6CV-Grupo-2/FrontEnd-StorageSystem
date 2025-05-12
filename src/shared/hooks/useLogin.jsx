import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../../services";
import toast from "react-hot-toast";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);

    const response = await loginRequest({
      email,
      password,
    });

    setIsLoading(false);

    if (response.error) {
      window.alert(response.error?.response?.data || "Ocurrió un error al iniciar sesión, intenta de nuevo");
      return false;
    }

    const { userDetails } = response.data;

    localStorage.setItem("user", JSON.stringify(userDetails)); // Guardar el token en localStorage
    window.alert(`Bienvenido, ${userDetails.username}!`); // Mostrar alerta en ventana
    navigate("/main");
    return true;
  };

  return {
    login,
    isLoading,
  };
};