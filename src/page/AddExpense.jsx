import React, { useState } from "react";
import { Link } from "react-router-dom";
const AddExpense = () => {
  const [items, setItems] = useState([
    {
      itemname: "",
      itemprice: "",
      date: "",
    },
  ]);

  const handleAddFild = () => {
    setItems([
      ...items,
      {
        itemname: "",
        itemprice: "",
        date: "",
      },
    ]);
  };

  const handleChange = (index, field, value) => {
    const updateItems = [...items];
    updateItems[index][field] = value;

    setItems(updateItems);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("all inp value", items);
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
    "পানির বোতল"
  ];
  
  return (
    <div className="p-2">
      <Link
        to={"/expense-list"}
        className="bg-primary p-2  rounded-lg text-white font-medium text-sm"
      >
        Expense list
      </Link>
      <div className="flex flex-col items-center justify-center mt-10">
        <h2 className="text-3xl font-semibold">Add new expense</h2>

        <form
          onSubmit={handleSubmit}
          className="border p-4 mt-5 rounded-lg w-[400px]"
        >
          {items.map((item, inx) => (
            <div key={inx} className="flex items-center justify-between gap-2">
              <div className="w-[50%]">
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
              <div className="w-[50%]">
                <label className="text-sm font-medium" htmlFor="price">
                  Item price
                </label>
                <br />
                <input
                  type="text"
                  value={item.itemprice}
                  onChange={(e) => {
                    handleChange(inx, "itemprice", e.target.value);
                  }}
                  className="outline-none border w-full h-10 pl-2"
                  required
                />
              </div>
              <div className="w-[50%]">
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
    </div>
  );
};

export default AddExpense;
