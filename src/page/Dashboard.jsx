import React, { useState } from "react";
import {
  CirclePlus,
  LayoutDashboard,
  SquareChevronLeft,
  SquareChevronRight,
  LogOut,
  ListCheck
} from "lucide-react";
import Logo from "../components/Logo";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast, {Toaster} from 'react-hot-toast'
const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const {user,logout,setUser} = useAuth();
 const navigate = useNavigate();
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="relative flex flex-col justify-between h-screen">
      {/* Header */}
      <div className="flex items-center justify-between bg-white mb-2 shadow-lg w-full p-2">
        <div className="flex items-center gap-2">
          <Logo />
          <SquareChevronRight
            className="cursor-pointer hidden lg:block"
            onClick={toggleDrawer}
          />
        </div>

        <div className="flex items-center relative">
          <img
            className="w-14 h-14 rounded-full"
            src={user && user.avatar ? user?.avatar : "https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"}
            alt="avatar"
          />

          <div className="hidden lg:block ml-2">
            <h1 className="text-sm font-semibold ">{user?.fullname}</h1>
            <p className="text-xs text-gray-500">
              <span className="text-green-600">Online</span>
            </p>
          </div>

          <div className="lg:hidden w-4 h-4 rounded-full bg-green-600 absolute top-1 right-1"></div>
        </div>
      </div>

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white shadow-lg transform w-68 hidden lg:block ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out w-64`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between gap-2">
            <Logo />
            <SquareChevronLeft
              className="cursor-pointer"
              onClick={toggleDrawer}
            />
          </div>
          
          <ul className="mt-6 space-y-4 ">
            <NavLink onClick={toggleDrawer} to={'/'} className="hover:text-gray-300 cursor-pointer flex items-center gap-2 text-xl font-medium"><LayoutDashboard/> Home</NavLink> <br />
            <NavLink onClick={toggleDrawer} to={'/add-expense'} className="hover:text-gray-300 cursor-pointer flex items-center gap-2 text-xl font-medium"><CirclePlus /> Add expense</NavLink> <br />
            <NavLink onClick={toggleDrawer} to={'/expense-list'} className="hover:text-gray-300 cursor-pointer flex items-center gap-2 text-xl font-medium"><ListCheck />Expense list</NavLink> <br />
            <li onClick={() => logout().then(res => {
                   if(res.data.success){
                    toast.success(res.data.message, {duration: 1000});
                    setUser('');
                    localStorage.removeItem('token')

                   }
            }).catch(err => console.log(err))} className="text-red-500 cursor-pointer flex items-center gap-2 text-xl font-medium"><LogOut /> Logout</li>
          </ul>
        </div>
      </div>

     

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isDrawerOpen ? "ml-64" : "ml-0"
        }`}
      >
        <div className="p-4 pt-0 pb-20 h-screen overflow-auto">
          <Outlet />
        </div>

        <div className="w-full  bg-black fixed bottom-0 left-0 z-50 lg:hidden flex items-center justify-between p-2 shadow-lg">
        <Link
          to={"/"}
          className="flex flex-col items-center justify-center lg:gap-1"
        >
          <LayoutDashboard className="text-white  cursor-pointer" />
          <p className="text-white font-semibold">Home</p>
        </Link>

        <Link to={'/add-expense'} className="flex flex-col items-center justify-center gap-1">
          <CirclePlus className="text-white cursor-pointer" />
          <p className="text-white font-semibold">Add expense</p>
        </Link>
        <div className="flex flex-col items-center justify-center gap-1">
          <LogOut className="text-red-500 cursor-pointer" />
          <p className="text-red-500 font-semibold">Logout</p>
        </div>
      </div>
      </div>
      <Toaster containerStyle={false} position="top-right"/>
    </div>
  );
};

export default Dashboard;
