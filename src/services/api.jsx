import axios from "axios";

const apiClient  = axios.create({
    baseURL: 'http://127.0.0.1:3000/storageSystem/',
    timeout: 5000
})

apiClient.interceptors.request.use(
    (config) => {
        const useUserDetails = localStorage.getItem('user');

        if(useUserDetails){
            const token = JSON.parse(useUserDetails).token
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (e) => {
        return Promise.reject(e);
    }
)

export const login = async (data) => {
    try {
        return await apiClient.post('/auth/login', data);
    }catch (e) {
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


export const saveProvider = async (data) => {
    try {
        return await apiClient.post('/providers', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}
export const getProviders = async () => {
    try {
        return await apiClient.get('/providers')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const updateProvider = async (data, providerId) => {
    try {
        return await apiClient.put(`/providers/${providerId}`, data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const deleteProvider = async (data) => {
    try {
        return await apiClient.delete('/providers', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}


export const saveCategory = async (data) => {
    try {
        return await apiClient.post('/categories', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}
export const getCategory = async () => {
    try {
        return await apiClient.get('/categories')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const updateCategory = async (data, categoryId) => {
    try {
        return await apiClient.put(`/categories/${categoryId}`, data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const deleteCategory = async (data) => {
    try {
        return await apiClient.delete('/categories', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}