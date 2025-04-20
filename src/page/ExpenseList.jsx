import React from "react";
import ExpenseTable from "../components/ExpenseTable";
import { Search } from "lucide-react";
import MyCalendar from "../components/MyCalendar";


const ExpenseList = () => {
    // const 
    const currentDate = new Date();
    const month = currentDate.toLocaleString("default", { month: "long" });
  return (
    <div className="lg:flex gap-2">
      <div className="lg:w-[30%] bg-white p-5">
        <div className="flex items-center justify-between border-2 w-full border-black/50  rounded-md px-1 ">
          <input
            type="text"
            className="outline-none p-2  w-full placeholder:text-xs"
            placeholder={`Only ${month}'s day (12/3/20225)`}
          />
          <Search className="text-gray-500" size={14} />
        </div>

        <div className="mt-10">
            <MyCalendar/>
        </div>


      </div>

      <div className="lg:w-[70%] max-h-screen overflow-auto">
        <ExpenseTable data={'data'}/>
      </div>
    </div>
  );
};

export default ExpenseList;
