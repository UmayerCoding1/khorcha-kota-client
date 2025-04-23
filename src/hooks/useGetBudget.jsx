import React from 'react';
import useSecureApi from './useSecureApi';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';


const useGetBudget = () => {
    const secureApi = useSecureApi();
    const {user} = useAuth();
 

    const {data: budget, refetch: budgetRefetch} = useQuery({
        queryKey: ['budget'],
        queryFn: async () => {
           const res = await secureApi.get(`/get-budget?userId=${user?._id}`);
        
           
           return res.data
        }
    })

  
    
    return [budget?.budget,budgetRefetch]
};

export default useGetBudget;