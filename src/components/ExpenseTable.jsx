import React from "react";

const ExpenseTable = ({data}) => {



  
  const dateConvert = (date) => {
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString("en-US", options)
  }

  const countTotalConst = data?.reduce((total,item) => {
    const itemQty = item.qty;
    const itemKgPrice = item.kgprice;
    const totalAmount = itemQty * itemKgPrice;
    return  total + totalAmount;
  },0);
  
  
  
  
  return (
    <table className="w-full text-sm text-center border border-black rounded-lg max-h-[450px] overflow-scroll">
  <thead>
    <tr className="bg-gray-600  text-white font-semibold">
      <th className="border border-black px-4 py-2">Date</th>
      <th className="border border-black px-4 py-2">Item name</th>
      <th className="border border-black px-4 py-2">Qty (kg)</th>
      <th className="border border-black px-4 py-2">৳/kg</th>
      <th className="border border-black px-4 py-2">Total</th>
    </tr>
  </thead>

  <tbody>
    {data?.map((item, index) => (
      <tr key={index} className="bg-white text-black">
        <td className="border border-black px-4 py-2">{dateConvert(item.date)}</td>
        <td className="border border-black px-4 py-2">{item.itemname}</td>
        <td className="border border-black px-4 py-2">{item.qty} {item.type}</td>
        <td className="border border-black px-4 py-2"> ৳ {item.kgprice}</td>
        <td className="border border-black px-4 py-2"> ৳ {item.kgprice * item.qty}</td>
      </tr>
    ))}

    <td className=" px-4 py-2 flex text-xl font-semibold">Total: {countTotalConst}৳</td>
  </tbody>
</table>

  );
};

export default ExpenseTable;
