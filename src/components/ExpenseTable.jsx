import React from "react";
import TableRow from "./TableRow";
import useAuth from "../hooks/useAuth";
import useSecureApi from "../hooks/useSecureApi";
import toast, { Toaster } from "react-hot-toast";

const ExpenseTable = ({ data, expenseRefetch }) => {
  const { user } = useAuth();
  const secureApi = useSecureApi();

  const dateConvert = (date) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const countTotalConst = data?.reduce((total, item) => {
    const itemQty = item.qty;
    const itemKgPrice = item.kgprice;
    const totalAmount = itemQty * itemKgPrice;
    return total + totalAmount;
  }, 0);

  const handleUpdateExpense = async (expenseId,updatedExpense,setOpenUpdateExpense) => {
    if (!user?._id || !expenseId || !updatedExpense) {
      return toast.error("All field is required", { duration: 1000 });
    }

    try {
      const response = await secureApi.patch("/update-expense", {
        userId: user?._id,
        expenseId,
        updatedExpense,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setOpenUpdateExpense(false);
        expenseRefetch();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleDeleteExpense =async (expenseId) => {
    if(!expenseId || !user?._id) return toast.error('Expense id in required', {duration: 1000});
    
    
    try {
      const response = await secureApi.delete('/delete-expense',{data :{
        userId: user?._id,
        expenseId
      }});
      if (response.data.success) {
        toast.success(response.data.message, {duration: 1000});
        expenseRefetch();
      }
    } catch (error) { 
      console.log(error);
      toast.error(error.message)
    }
  };

  return (
    <table className="w-full text-sm text-center border border-black rounded-lg max-h-[450px] overflow-scroll">
      <thead>
        <tr className="bg-gray-600  text-white font-semibold">
          <th className="border border-black px-4 py-2">Date</th>
          <th className="border border-black px-4 py-2">Item name</th>
          <th className="border border-black px-4 py-2">Qty (kg)</th>
          <th className="border border-black px-4 py-2">৳/kg</th>
          <th className="border border-black px-4 py-2">Total</th>
          <th className="border border-black px-4 py-2">Action</th>
        </tr>
      </thead>

      <tbody>
        {data?.map((item, index) => (
          <TableRow
            key={index}
            item={item}
            dateConvert={dateConvert}
            updateAction={handleUpdateExpense}
            deleteAction={handleDeleteExpense}
          />
        ))}

        <td className=" px-4 py-2 flex text-xl font-semibold">
          Total: {countTotalConst}৳
        </td>
      </tbody>

      <Toaster containerStyle={false} position="top-right" />
    </table>
  );
};

export default ExpenseTable;
