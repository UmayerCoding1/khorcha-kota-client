import React from 'react';
import axios from 'axios';
const apiEndPoint = axios.create({
    baseURL: import.meta.env.VITE_API_END_POINT,
    withCredentials: true
})
const usePublicApi = () => {
    
    
    return apiEndPoint;
};

export default usePublicApi;