import axios from "axios";

const apiClient  = axios.create({
    baseURL: 'http://127.0.0.1:8080/storageSystem/',
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

export const saveProvider = async () => {
    try {
        return await apiClient.post('/provider')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}
export const getProviders = async () => {
    try {
        return await apiClient.get('/provider')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const updateProvider = async (data, providerId) => {
    try {
        return await apiClient.put(`/provider/${providerId}`, data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const deleteProvider = async (data) => {
    try {
        return await apiClient.delete('/provider', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}