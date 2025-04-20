import React from "react";

const ExpenseTable = () => {
//   const tableData = [1, 2, 3, 4, 5, 6];
  const currentDate = new Date();
  const options = {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formetDate = currentDate.toLocaleDateString("en-US", options);
  return (
    <table className="w-full text-center border border-black rounded-lg max-h-[450px] overflow-scroll">
  <thead>
    <tr className="bg-gray-600  text-white font-semibold">
      <th className="border border-black px-4 py-2">Date</th>
      <th className="border border-black px-4 py-2">Item name</th>
      <th className="border border-black px-4 py-2">Item price</th>
    </tr>
  </thead>

  <tbody>
    {Array(60).fill(null)?.map((_, index) => (
      <tr key={index} className="bg-white text-black">
        <td className="border border-black px-4 py-2">{formetDate}</td>
        <td className="border border-black px-4 py-2">Rice</td>
        <td className="border border-black px-4 py-2"> ৳ 2000</td>
      </tr>
    ))}
  </tbody>
</table>

  );
};

export default ExpenseTable;
