import axios from 'axios';


const apiEndPoint = axios.create({
    baseURL: import.meta.env.VITE_API_END_POINT,
    withCredentials: true
})

const useSecureApi = () => {
    apiEndPoint.interceptors.request.use(function(config) {
        const token = localStorage.getItem('token');
        config.headers.Authorization = `Bearer ${token}`

        return config;
    })
    return apiEndPoint
};

export default useSecureApi;