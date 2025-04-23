import React from "react";

const BudgetDeatils = ({budgetDetails,setopenBudgetDetails}) => {
  console.log(budgetDetails);
 

  return (
    <div className="w-full h-screen absolute bg-black/70 top-0 left-0 z-50 flex flex-col items-center justify-center">
      <div className="w-[500px] h-[350px]  max-h-[400px] overflow-auto bg-white text-black rounded-xl p-2">
        {budgetDetails ? budgetDetails?.map(((budget,inx) => (
            <div className="flex items-center  justify-between border p-2 my-2">
               <p>No: {inx + 1}</p>
               <h2>{budget?.addeddate}</h2>
               <h2 className="font-medium"> ৳ {budget?.amount}</h2>
            </div>
        ))) : 'Budget details not found'}
      </div>

      <div>
        <button onClick={() => setopenBudgetDetails(false)} className="bg-red-500 px-5 py-2 mt-1 rounded-lg font-semibold cursor-pointer">Close</button>
        </div>
    </div>
  );
};

export default BudgetDeatils;
