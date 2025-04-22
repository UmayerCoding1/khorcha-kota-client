import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useSecureApi from "../hooks/useSecureApi";
import toast, { Toaster } from "react-hot-toast";
const AddExpense = () => {
  const [items, setItems] = useState([
    {
      itemname: "",
      qty: "",
      kgprice: "",
      type: "",
      date: "",
    },
  ]);
  const { user } = useAuth();
  const secureApi = useSecureApi();
  const navigate = useNavigate();

  const handleAddFild = () => {
    setItems([
      ...items,
      {
        itemname: "",
        qty: "",
        kgprice: "",
        type: "",
        date: "",
      },
    ]);
  };

  const handleChange = (index, field, value) => {
    const updateItems = [...items];
    updateItems[index][field] = value;

    setItems(updateItems);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Validate dates in the items array
    const invalidDate = items.some((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate.getMonth() !== currentMonth ||
        itemDate.getFullYear() !== currentYear
      );
    });

    if (invalidDate) {
      toast.error("All expense dates must match the current month and year", {
        duration: 2000,
      });
      return; // Prevent API call if validation fails
    }

    try {
      const res = await secureApi.post("/add-expense", {
        userId: user?._id,
        expense: items,
      });

      if (res.data.success) {
        toast.success(res.data.message, { duration: 1000 });
        setItems([
          {
            itemname: "",
            itemprice: 0,
            date: "",
          },
        ]);

        setTimeout(() => navigate("/"), 1000);
      }

      if (!res.data.success) {
        toast(res.data.message, {
          icon: "ℹ️", // info icon
          duration: 3000,
          style: {
            background: "#000",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong", {
        duration: 1000,
      });
    }
  };
  const essentialItemsBN = [
    "চাল",
    "ডাল",
    "তেল",
    "লবণ",
    "চিনি",
    "ময়দা",
    "দুধ",
    "ডিম",
    "পাউরুটি",
    "আলু",
    "পেঁয়াজ",
    "রসুন",
    "সবজি",
    "ফল",
    "মাংস",
    "মাছ",
    "চা",
    "কফি",
    "সাবান",
    "শ্যাম্পু",
    "টুথপেস্ট",
    "টয়লেট পেপার",
    "কাপড় কাচার গুঁড়া",
    "ডিটারজেন্ট",
    "গ্যাস সিলিন্ডার",
    "দিয়াশলাই",
    "মসলা",
    "স্ন্যাকস",
    "বিস্কুট",
    "পানির বোতল",
  ];

  return (
    <div className="lg:p-2">
      <Link
        to={"/expense-list"}
        className="bg-primary p-2  rounded-lg text-white font-medium text-sm"
      >
        Expense list
      </Link>
      <div className="lg:flex flex-col items-center justify-center mt-10">
        <h2 className="text-3xl font-semibold">Add new expense</h2>

        <form
          onSubmit={handleSubmit}
          className="border p-4 mt-5 rounded-lg lg:w-[500px]"
        >
          {items.map((item, inx) => (
            <div key={inx} className="lg:flex items-center justify-between gap-2 mt-3 border-b py-3">
              <div className="lg:w-[50%]">
                <label className="text-sm font-medium" htmlFor="name">
                  Item name
                </label>
                <br />
                <input
                  value={item.itemname}
                  onChange={(e) => {
                    handleChange(inx, "itemname", e.target.value);
                  }}
                  list="itemSuggestions"
                  type="text"
                  className="outline-none border w-full h-10 pl-2"
                  required
                />
                <datalist className="h-40" id="itemSuggestions">
                  {essentialItemsBN.map((item) => (
                    <option value={`${item}`} />
                  ))}
                </datalist>
              </div>

              <div className="lg:w-[50%]">
                <label className="text-sm font-medium" htmlFor="price">
                  Qty(kg)
                </label>
                <br />
                <input
                  type="text"
                  value={item.qty}
                  onChange={(e) => {
                    handleChange(inx, "qty", Number(e.target.value));
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
                  value={item.kgprice}
                  onChange={(e) => {
                    handleChange(inx, "kgprice", Number(e.target.value));
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
                  list="types"
                  value={item.type}
                  onChange={(e) => {
                    handleChange(inx, "type", e.target.value);
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
                  value={item.date}
                  onChange={(e) => {
                    handleChange(inx, "date", e.target.value);
                  }}
                  className="outline-none border w-full h-10 pl-2"
                  required
                />
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between  mt-2">
            <button
              onClick={() => handleAddFild()}
              type="button"
              className="bg-emerald-500 p-2 px-4 rounded-xl text- text-white mt-5 cursor-pointer"
            >
              +
            </button>

            <button
              className="bg-primary   py-3 px-5 rounded-lg text-sm text-white font-medium cursor-pointer "
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <Toaster containerStyle={false} position="top-right" />
    </div>
  );
};

export default AddExpense;
