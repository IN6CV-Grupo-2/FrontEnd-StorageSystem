import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3000/storageSystem/',
    timeout: 5000
})

apiClient.interceptors.request.use(
    (config) => {
        const useUserDetails = localStorage.getItem('user');

        if (useUserDetails) {
            const token = JSON.parse(useUserDetails).token
            config.headers["x-token"] = token
        }
        return config
    },
    (e) => {
        return Promise.reject(e);
    }
)

export const saveProvider = async (data) => {
    try {
        return await apiClient.post('/providers/save', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getProviderById = async (id) => {
    try {
        return await apiClient.get(`/providers/search/${id}`)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getProviders = async () => {
    try {
        return await apiClient.get('/providers/')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const updateProvider = async (data, providerId) => {
    try {
        return await apiClient.put(`/providers/update/${providerId}`, data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const deleteProvider = async (id) => {
    try {
        return await apiClient.delete(`/providers/delete/${id}`)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const createProduct = async (data) => {
    try {
        return await apiClient.post('/products', data);
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const updateProduct = async (productId, data) => {
    try {
        return await apiClient.put(`/products/${productId}`, data);
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const deleteProduct = async (productId) => {
    try {
        return await apiClient.delete(`/products/${productId}`);
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getProducts = async () => {
    try {
        return await apiClient.get('/products/');
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const searchProduct = async (productId) => {
    try {
        return await apiClient.get(`/products/${productId}`);
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getReportInventory = async () => {
    try {
        return await apiClient.get('/products/report/inventory');
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getReportMovements = async () => {
    try {
        return await apiClient.get('/products/report/movements');
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getReportStatistics = async () => {
    try {
        return await apiClient.get('/products/report/statistics');
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const login = async (data) => {
    try {
        return await apiClient.post('/auth/login', data);
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const register = async (data) => {
    try {
        return await apiClient.post('/auth/register', data);
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getMovements = async () => {
    try {
        return await apiClient.get("/movements");
    } catch (e) {
        return { 
            error: true, 
            e 
        };
    }
};

export const createMovement = async (data) => {
    try {
        return await apiClient.post("/movements", data);
    } catch (e) {
        return { error: true, e };
    }
};

export const updateMovement = async (id, data) => {
    try {
        return await apiClient.put(`/movements/${id}`, data);
    } catch (e) {
        return { error: true, e };
    }
};

export const deleteMovement = async (id) => {
    try {
        return await apiClient.delete(`/movements/${id}`);
    } catch (e) {
        return { error: true, e };
    }
};

export const getMovementById = async (id) => {
    try {
        return await apiClient.get(`/movements/${id}`);
    } catch (e) {
        return { error: true, e };
    }
};

export const getUsers = async () => {
    try {
        return await apiClient.get('/users/')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const updateUser  = async (data, userId) => {
    try {
        return await apiClient.put(`/users/update/${userId}`, data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const deleteUser = async (id) => {
    try {
        return await apiClient.delete(`/users/delete/${id}`)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}
