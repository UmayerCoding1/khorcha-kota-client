import React, { useState } from "react";
import ExpenseTable from "../components/ExpenseTable";

import MyCalendar from "../components/MyCalendar";
import useGetExpense from "../hooks/useGetExpense";
import Search from "../components/Search";


const ExpenseList = () => {
   const [searchValue, setSearchValue] = useState("");
    const [expenses,expenseRefetch] = useGetExpense(searchValue);
    
    
    const handleFindSearchValue = (value) => {
      setSearchValue(value)
      
    }    
   
  return (
    <div className="lg:flex gap-2">
      <div className="lg:w-[30%] bg-white p-5">
        <Search  action={handleFindSearchValue}/>

        <div className="mt-10">
            <MyCalendar/>
        </div>


      </div>

      <div className="lg:w-[70%] max-h-screen overflow-auto">
        <ExpenseTable data={expenses} expenseRefetch={expenseRefetch}/>
      </div>
    </div>
  );
};

export default ExpenseList;
