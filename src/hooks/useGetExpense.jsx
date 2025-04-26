import React from "react";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useSecureApi from "./useSecureApi";

const useGetExpense = (searchValue) => {
  const { user } = useAuth();
  const secureApi = useSecureApi();
  const currentDate = new Date();
  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.toLocaleString("default", { year: "numeric" });

 
  const { data: expenses = [], refetch: expenseRefetch } = useQuery({
    queryKey: ["data",searchValue],
    enabled: !!user?._id,
    queryFn: async () => {
      const res = await secureApi.get(`/get-expense?userId=${user?._id}&month=${month.toLowerCase()}&year=${year}&filterDate=${searchValue ? searchValue : ""}`);
      
      
      return res.data.expenses
    },
  });

  return [expenses,expenseRefetch];
};

export default useGetExpense;
