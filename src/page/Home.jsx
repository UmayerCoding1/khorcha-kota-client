import React, { useEffect, useMemo, useState } from "react";
import BasicPie from "../components/PaiChart";
import ExpenseTable from "../components/ExpenseTable";
import { Info, XCircle } from "lucide-react";
import useAuth from "../hooks/useAuth";
import useGetBudget from "../hooks/useGetBudget";
import useSecureApi from "../hooks/useSecureApi";
import toast, { Toaster } from "react-hot-toast";
import useGetExpense from "../hooks/useGetExpense";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import AverageCount from "../components/AverageCount";
import BudgetDeatils from "../components/BudgetDeatils";
const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [openAddBudget, setOpenAddBudget] = useState(false);
  const [openAddMoreBudget, setOpenAddMoreBudget] = useState(false);
  const [budgetAmount, setBudgetAmount] = useState(0);
  const [openBudgetDetails, setopenBudgetDetails] = useState(false);
  const[budgetAdding,setBudgetAdding] = useState(false);
  const { user } = useAuth();
  const [budget, budgetRefetch] = useGetBudget();
  const secureApi = useSecureApi();
  const [expenses,expenseRefetch] = useGetExpense(searchValue);

  const currentDate = new Date();
  const options = {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);
  const month = currentDate.toLocaleString("default", { month: "long" });
  const monthNumber = currentDate.toLocaleString("default", {
    month: "numeric",
  });
  const year = currentDate.toLocaleString("default", { year: "numeric" });
  const day = currentDate.toLocaleString("default", { day: "numeric" });
  const amountDate = `${year}-${
    monthNumber < 10 ? `0${monthNumber}` : monthNumber
  }-${day}`;

  const memoizedExpenses = useMemo(() => expenses, [expenses]);

  const handleAddBudget = async () => {
    const budgetData = {
      userId: user?._id,
      mouth: month.toLowerCase(),
      year: year,
      budget: budgetAmount,
      budgetInfo: [
        {
          addeddate: amountDate,
          amount: budgetAmount,
        },
      ],
    };

    try {
      const res = await secureApi.post("/add-budget", budgetData);
      if (res.data.success) {
        setOpenAddBudget(false);
        setBudgetAmount(0);
        toast.success(res.data.message, { duration: 1000 });
      }
    } catch (error) {
      console.log(error);
    }
    budgetRefetch();
  };

  const handleAddMoreBudget = async () => {
    setBudgetAdding(true);
    const nextBudgetData = {
      budgetId: budget._id,
      nextBudget: budgetAmount,
      budgetInfo: {
        addeddate: amountDate,
        amount: budgetAmount,
      },
    };

    try {
      const res = await secureApi.put("/next-budget", nextBudgetData);
      console.log(res.data);
      if (res.data.success) {
        setOpenAddMoreBudget(false);
        setBudgetAmount(0);
        toast.success(res.data.message, { duration: 1000 });
        budgetRefetch();
        setBudgetAdding(false);
      }

      if (!res.data.success) {
        toast.error(res.data.message, { duration: 100 });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, { duration: 1000 });
    }
  };

  const handleFindSearchValue = (value) => {
    setSearchValue(value);
  };

  useEffect(() => {
    if (openAddBudget || openAddMoreBudget || openBudgetDetails) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openAddBudget, openAddMoreBudget, openBudgetDetails]);



  if (!memoizedExpenses) {
    return <p>Loading .. .. .</p>;
  }
  return (
    <div className="lg:flex gap-10 lg:p-10 lg:pt-0 ">
      <div className="lg:w-[70%]">
        <div className="mb-5 px-3 w-full lg:hidden">
          {budget ? (
            <button
              onClick={() => setOpenAddMoreBudget(true)}
              className={`w-full bg-black text-white h-10 rounded-xl font-orbitron font-semibold tracking-wider my-5 cursor-pointer`}
            >
              {" "}
              Add more buget
            </button>
          ) : (
            <button
              onClick={() => setOpenAddBudget(true)}
              className={`w-full bg-black text-white h-10 rounded-xl font-orbitron font-semibold tracking-wider my-5 cursor-pointer`}
            >
              Add Budget
            </button>
          )}

          <div className="bg-[#FA83B4] w-full text-center p-4 rounded-lg">
            <h2 className="text-3xl font-semibold font-outfit">Platfron use</h2>
            <h3 className="font-medium">
              <span>Total year: 0</span> <br />
              <span>Total month: 4</span>
            </h3>
          </div>

          <div className=" max-h-[200px] overflow-auto ">
            <AverageCount expenses={memoizedExpenses} />
          </div>
        </div>
        <div className="lg:flex  justify-between bg-white mb-2  w-full">
          <div className="bg-black text-white p-5 rounded-md mb-7 lg:mb-0 lg:h-[190px]">
            <p className="text-sm text-gray-500 tracking-widest font-orbitron">
              {formattedDate}
            </p>

            <div className="flex items-center justify-between lg:gap-20 mt-5">
              <div>
                <img
                  className="w-40 h-40 rounded-full"
                  src={
                    user && user.avatar
                      ? user?.avatar
                      : "https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
                  }
                  alt="avatar"
                />

                <button
                  onClick={() => setopenBudgetDetails(true)}
                  className="text-sm flex items-center gap-1 cursor-pointer mt-3"
                >
                  <Info size={14} /> Budget info
                </button>

                {openBudgetDetails && (
                  <BudgetDeatils
                    budgetDetails={budget?.budgetInfo}
                    setopenBudgetDetails={setopenBudgetDetails}
                  />
                )}
              </div>

              <div className="flex flex-col items-center justify-between gap-10">
                <div>
                  <p className="text-sm tracking-widest text-gray-400 font-orbitron">
                    Total amount
                  </p>
                  <h2
                    className={`${
                      budget ? "text-3xl" : "text-xs"
                    } mt-1 font-semibold`}
                  >
                    {budget ? `৳${budget?.budget}` : "No budget"}
                  </h2>
                </div>

                <div>
                  <p className="text-sm tracking-widest text-gray-400 font-orbitron">
                    Available Amount
                  </p>
                  <h2
                    className={`${
                      budget ? "text-3xl" : "text-xs"
                    } mt-1 font-semibold`}
                  >
                    {" "}
                    {budget ? (
                      budget.remainingBudget <= 0 ? (
                        <p className="text-red-500 text-lg">Budget finished</p>
                      ) : (
                        `৳${budget?.remainingBudget}`
                      )
                    ) : (
                      "No available amount"
                    )}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className="max-h-[200px] overflow-auto my-5">
            <BasicPie data={expenses} />
          </div>
        </div>

        <div>
          <div className="flex flex-col lg:flex-row items-center justify-between p-3">
            <h1 className="text-xl font-medium">
              Expense list{" "}
              <Link to={"/expense-list"} className="text-sm text-blue-500">
                View all
              </Link>
            </h1>

            <Search action={handleFindSearchValue} />
          </div>

          <div className="max-h-[300px] overflow-scroll">
            <ExpenseTable data={expenses} expenseRefetch={expenseRefetch}/>
          </div>
        </div>
      </div>

      <div className="border-l-2 border-gray-200 px-3 w-[30%] hidden lg:block">
        {budget ? (
          <button
            onClick={() => setOpenAddMoreBudget(true)}
            className={`w-full bg-black text-white h-10 rounded-xl font-orbitron font-semibold tracking-wider my-5 cursor-pointer`}
          >
            {" "}
            Add more buget
          </button>
        ) : (
          <button
            onClick={() => setOpenAddBudget(true)}
            className={`w-full bg-black text-white h-10 rounded-xl font-orbitron font-semibold tracking-wider my-5 cursor-pointer`}
          >
            Add Budget
          </button>
        )}

        <div className="bg-[#FA83B4] w-full text-center p-4 rounded-lg">
          <h2 className="text-3xl font-semibold font-outfit">Platfron use</h2>
          <h3 className="font-medium">
            <span>Total year: 0</span> <br />
            <span>Total month: 4</span>
          </h3>
        </div>

        <div className=" max-h-[400px] overflow-auto ">
          <AverageCount expenses={memoizedExpenses} />
        </div>
      </div>

      {openAddBudget && (
        <div className="absolute w-full h-screen bg-black/70 top-0 left-0 flex items-center justify-center">
          <div className="bg-white w-[300px] lg:h-[170px] rounded-lg relative">
            <XCircle
              onClick={() => setOpenAddBudget(false)}
              className="text-black absolute top-2 right-1 cursor-pointer"
            />

            <div className="mt-10 p-5">
              <h2 className="text-2xl font-semibold text-center mb-5">
                Add your budget
              </h2>
              <input
                onChange={(e) => setBudgetAmount(Number(e.target.value))}
                className="outline-none border  w-full rounded-lg p-2 h-10"
                type="text"
                placeholder="Enter your budget "
              />

              <button
                onClick={() => handleAddBudget()}
                className="w-full mt-5 bg-primary  text-sm p-2 rounded-lg text-white font-medium cursor-pointer"
              >
                Add Budget
              </button>
            </div>
          </div>
        </div>
      )}

      {openAddMoreBudget && (
        <div className="absolute w-full h-screen bg-black/70 top-0 left-0 flex items-center justify-center">
          <div className="bg-white w-[300px] lg:h-[180px] rounded-lg relative">
            <XCircle
              onClick={() => setOpenAddMoreBudget(false)}
              className="text-black absolute top-2 right-1 cursor-pointer"
            />

            <div className="mt-10 p-5">
              <h2 className="text-2xl font-semibold text-center mb-5">
                Add more budget
              </h2>

              <label className="text-sm font-medium" htmlFor="Previous-budget">
                Previous budget: {budget.budget}
              </label>
              <input
                onChange={(e) => setBudgetAmount(Number(e.target.value))}
                className="outline-none border  w-full rounded-lg p-2 h-10"
                type="text"
                placeholder="Enter your budget "
              />

             {budgetAdding ?  <button
                
                className="w-full mt-5 bg-primary  text-sm p-2 rounded-lg text-white font-medium cursor-pointer"
              >
                Loading ....
              </button> :  <button
                onClick={() => handleAddMoreBudget()}
                className="w-full mt-5 bg-primary  text-sm p-2 rounded-lg text-white font-medium cursor-pointer"
              >
                Add Budget
              </button>}
            </div>
          </div>
        </div>
      )}

      <Toaster containerStyle={false} position="top-right" />
    </div>
  );
};

export default Home;
