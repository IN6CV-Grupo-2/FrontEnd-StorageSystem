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

export const saveCustomer = async (data) => {
    try {
        return await apiClient.post('/customers', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getCustomers = async () => {
    try {
        return await apiClient.get('/customers')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const updateCustomer = async (data, customerId) => {
    try {
        return await apiClient.put(`/customers/${customerId}`, data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const deleteCustomer = async (data) => {
    try {
        return await apiClient.delete('/customers', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}