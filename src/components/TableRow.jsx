import { XCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

const TableRow = ({ item, dateConvert, updateAction, deleteAction }) => {
  const [openUpdateExpense, setOpenUpdateExpense] = useState(false);
  const [items, setItems] = useState({
    itemname: item.itemname,
    qty: item.qty,
    kgprice: item.kgprice,
    type: item.type,
    date: item.date,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    updateAction(item._id, items,setOpenUpdateExpense);
  };

  useEffect(() => {
    if (openUpdateExpense) {
      document.body.style.overflow = "hidden";
    }
  }, [openUpdateExpense]);

  return (
    <tr className="bg-white text-black">
      <td className="border border-black px-4 py-2">
        {dateConvert(item.date)}
      </td>
      <td className="border border-black px-4 py-2">{item.itemname}</td>
      <td className="border border-black px-4 py-2">
        {item.qty} {item.type}
      </td>
      <td className="border border-black px-4 py-2"> ৳ {item.kgprice}</td>
      <td className="border border-black px-4 py-2">
        {" "}
        ৳ {item.kgprice * item.qty}
      </td>
      <td className="border border-black px-4 py-2">
        <div className="flex flex-col lg:flex-row gap-2 lg:w-10">
          <button
            className="bg-primary text-white p-2 rounded-lg cursor-pointer"
            onClick={() => setOpenUpdateExpense(true)}
          >
            Edit
          </button>
          <button
            className=" bg-red-500 text-white p-2 rounded-lg cursor-pointer"
            onClick={() => deleteAction(item._id)}
          >
            Delete
          </button>
        </div>

        {openUpdateExpense && (
          <div className="w-full h-screen bg-[#00000088] absolute top-0 left-0 flex items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className="border p-4 mt-5 rounded-lg lg:w-[500px] bg-white"
            >
              <XCircle onClick={() => setOpenUpdateExpense(false)} className="cursor-pointer"/>
              <div
                //   key={inx}
                className="lg:flex items-center justify-between gap-2 mt-3  py-3"
              >
                <div className="lg:w-[50%]">
                  <label className="text-sm font-medium" htmlFor="name">
                    Item name
                  </label>
                  <br />
                  <input
                    defaultValue={item.itemname}
                    onChange={(e) => {
                      setItems((prevItems) => ({
                        ...prevItems,
                        itemname: e.target.value, // Update only the `qty` field
                      }));
                    }}
                    type="text"
                    className="outline-none border w-full h-10 pl-2"
                    required
                  />
                </div>

                <div className="lg:w-[50%]">
                  <label className="text-sm font-medium" htmlFor="price">
                    Qty(kg)
                  </label>
                  <br />
                  <input
                    type="text"
                    defaultValue={item.qty}
                    onChange={(e) => {
                      setItems((prevItems) => ({
                        ...prevItems,
                        qty: Number(e.target.value), // Update only the `qty` field
                      }));
                    }}
                    className="outline-none border w-full h-10 pl-2"
                    required
                  />
                </div>
                <div className="lg:w-[50%]">
                  <label className="text-sm font-medium" htmlFor="price">
                    ৳/kg
                  </label>
                  <br />
                  <input
                    type="text"
                    defaultValue={item.kgprice}
                    onChange={(e) => {
                      setItems((prevItems) => ({
                        ...prevItems,
                        kgprice: Number(e.target.value), // Update only the `qty` field
                      }));
                    }}
                    className="outline-none border w-full h-10 pl-2"
                    required
                  />
                </div>
                <div className="lg:w-[50%]">
                  <label className="text-sm font-medium" htmlFor="price">
                    type
                  </label>
                  <br />
                  <input
                    type="text"
                    defaultValue={item.type}
                    onChange={(e) => {
                      setItems((prevItems) => ({
                        ...prevItems,
                        type: e.target.value, // Update only the `qty` field
                      }));
                    }}
                    className="outline-none border w-full h-10 pl-2"
                    required
                  />

                  <datalist className="h-40" id="types">
                    <option value="kg" />
                    <option value="quantity" />
                  </datalist>
                </div>
                <div className="lg:w-[30%]">
                  <label className="text-sm font-medium" htmlFor="price">
                    Expense date
                  </label>
                  <br />
                  <input
                    type="date"
                    defaultValue={item.date}
                    onChange={(e) => {
                      setItems((prevItems) => ({
                        ...prevItems,
                        date: e.target.value, // Update only the `qty` field
                      }));
                    }}
                    className="outline-none border w-full h-10 pl-2"
                    required
                  />
                </div>
              </div>

              <button
                className="bg-primary py-3 px-5 mt-3 rounded-lg text-sm text-white font-medium cursor-pointer"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </td>
    </tr>
  );
};

export default TableRow;
