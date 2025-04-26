import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import usePublicApi from '../hooks/usePublicApi';
import useSecureApi from '../hooks/useSecureApi';


export const  AuthContext = createContext(null);
const AuthProvider = ({children}) => {
    const [user,setUser] = useState('')
    const publicApi  = usePublicApi();
    const secureApi = useSecureApi();

    const userRegister = async(fullname,number,password) => {
        return await publicApi.post('/auth/register',{fullname,number,password})
    };


    const userLogin = async(number,password) => {
        return await publicApi.post('/auth/login', {number,password})
    }

    const logout = async() => {
        return await secureApi.post('/auth/logout');
    }

    useEffect(() => {
        const getLoginUser  = async () => {
            try {
                const res = await secureApi.get('/auth/login-user');
                
                
                if (res.data.success) {
                    setUser(res.data.user);
                }
            } catch (error) {
                console.log(error);
                
            }
        }


        getLoginUser();
    },[secureApi])

    const value = {
        setUser,
        user,
        userRegister,
        userLogin,
        logout
    }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;