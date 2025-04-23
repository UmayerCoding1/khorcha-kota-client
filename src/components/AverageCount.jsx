import React, { useMemo } from "react";

const AverageCount = ({ expenses }) => {
  const result = useMemo(() => {
    if (!expenses || expenses.length === 0) {

      return []; // Return an empty array if no expenses
    }

    const groupItems = {};

    expenses.forEach((item) => {
      const key = item.itemname;

      if (!groupItems[key]) {
        groupItems[key] = {
          totalQty: 0,
          totalPrice: 0,
          type: item.type,
        };
      }

      // Accumulate totalQty and totalPrice
      groupItems[key].totalQty += item.qty;
      groupItems[key].totalPrice += item.qty * item.kgprice;
    });

    return Object.entries(groupItems).map(([name, data]) => ({
      itemname: name,
      totalQty: data.totalQty,
      avgPrice: (data.totalPrice / data.totalQty).toFixed(2),
      type: data.type,
    }));
  }, [expenses]); // Recalculate only when `expenses` changes


  if (!result || result.length === 0) {
    return <p>No data available</p>; // Show a fallback message if result is empty
  }

  return (
    <div>
      {result.map((item, inx) => (
        <div key={inx} className={`flex items-center gap-4 mt-5 p-2 px-4 rounded-lg
         ${parseInt(item.avgPrice) <= 10 && parseInt(item.avgPrice) > 5 && 'bg-red-400 text-white'}
         ${parseInt(item.avgPrice) <= 50 && parseInt(item.avgPrice) > 10 && 'bg-yellow-300 text-black'}
         ${parseInt(item.avgPrice) <= 100 && parseInt(item.avgPrice) > 50 && 'bg-blue-400 text-white'}
         ${parseInt(item.avgPrice) >= 100  && 'bg-emerald-500 text-black'}
         ${parseInt(item.avgPrice) <= 5  && 'bg-gray-300'}
         `}>
          <h2 className="text-lg font-medium ">{item.itemname} : </h2>
          <p className="text-sm font-semibold">Average Price:  ৳ {item.avgPrice}</p>
          
        </div>
      ))}
    </div>
  );
};

export default AverageCount;
