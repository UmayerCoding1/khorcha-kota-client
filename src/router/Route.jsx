import { createBrowserRouter } from "react-router-dom";
import Login from "../page/Login";
import Root from "../layout/Root";
import Register from "../page/Register";
import Home from "../page/Home";
import AddExpense from "../page/AddExpense";
import ExpenseList from "../page/ExpenseList";

const render = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: '/add-expense',
        element: <AddExpense />
      },
      {
        path: '/expense-list',
        element: <ExpenseList />
      }
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default render;
