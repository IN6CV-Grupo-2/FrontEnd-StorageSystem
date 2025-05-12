import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:3000/storageSystem/",
  timeout: 5000,
});

apiClient.interceptors.request.use(
  (config) => {
    const useUserDetails = localStorage.getItem("user");
    console.log(localStorage.getItem("user"));

    if (useUserDetails) {
      const token = JSON.parse(useUserDetails).token;
      config.headers["x-token"] = token; // Asegúrate de que este encabezado esté configurado correctamente
    }
    return config;
  },
  (e) => {
    return Promise.reject(e);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && error.response?.data?.msg === "Token expirado") {
      localStorage.removeItem("user");
      window.location.href = "/auth"; // Redirigir al login
    }
    return Promise.reject(error);
  }
);

export const login = async (data) => {
  try {
    return await apiClient.post("/auth/login", data);
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const register = async (data) => {
  try {
    return await apiClient.post("/auth/register", data);
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const saveProvider = async (data) => {
  try {
    return await apiClient.post("/providers", data);
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};
export const getProviders = async () => {
  try {
    return await apiClient.get("/providers");
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const updateProvider = async (data, providerId) => {
  try {
    return await apiClient.put(`/providers/${providerId}`, data);
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const deleteProvider = async (data) => {
  try {
    return await apiClient.delete("/providers", data);
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const getUsers = async () => {
  try {
    return await apiClient.get("/users");
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const updateUser = async (data, userId) => {
  try {
    return await apiClient.put(`/users/update/${userId}`, data); // Ruta para actualizar usuarios
  } catch (e) {
    console.error("Error al actualizar el usuario:", e.response?.data || e.message);
    return {
      error: true,
      msg: e.response?.data?.msg || "Error al actualizar el usuario.",
    };
  }
};

export const updateProfile = async (data) => {
  try {
    const response = await apiClient.put("/users/profile", data);
    return response.data;
  } catch (e) {
    console.error("Error al actualizar el perfil:", e.response?.data || e.message);
    return {
      error: true,
      msg: e.response?.data?.msg || "Error al actualizar el perfil.",
    };
  }
};

export const deleteUser = async (userId) => {
  try {
    if (!userId) {
      console.error("El ID del usuario es undefined.");
      return { error: true, e: "El ID del usuario es undefined." };
    }

    // Agregar el parámetro `confirm=true` a la URL
    return await apiClient.delete(`/users/delete/${userId}?confirm=true`);
  } catch (e) {
    console.error("Error al eliminar el usuario:", e);
    return { error: true, e };
  }
};

export const saveCategory = async (data) => {
  try {
    return await apiClient.post("/categories/save", data); // Asegúrate de que esta URL sea correcta
  } catch (e) {
    console.error("Error en la solicitud POST:", e);
    return { error: true, e };
  }
};

export const getCategory = async () => {
  try {
    return await apiClient.get("/categories");
  } catch (e) {
    return { error: true, e };
  }
};

export const updateCategory = async (data, categoryId) => {
  try {
    return await apiClient.put(`/categories/update/${categoryId}`, data); // Enviar el ID en la URL
  } catch (e) {
    console.error("Error en la solicitud PUT:", e);
    return { error: true, e };
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    return await apiClient.delete(`/categories/delete/${categoryId}`); // Elimina el parámetro `?confirm=true`
  } catch (e) {
    console.error("Error al eliminar la categoría:", e);
    return { error: true, e };
  }
};

export const getUserProfile = async () => {
  try {
    return await apiClient.get("/users/profile");
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export default apiClient; // Asegúrate de que apiClient esté exportado como predeterminado
