import React, { useState } from "react";
import Logo from "../components/Logo";
import loginBg from "../assets/login-bg.avif";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast, {Toaster} from 'react-hot-toast'
const Login = () => {
  const [loginData,setLoginData] = useState({
    email:'',
    password: ''
  });

  const {userLogin,setUser} = useAuth();
 const navigate = useNavigate();
  


  const handleSubmit = (e) => {
    e.preventDefault();
    userLogin(loginData.email,loginData.password)
    .then(res => {
      if(res.data.success){
        localStorage.setItem('token', res.data.token);
        setUser(res.data.data);
        toast.success(res.data.message, {duration: 1000});

        setTimeout(() =>
           {navigate('/')}
        ,1000)
      }
    })
    .catch(err => {
      console.log(err.response.data.message);
      toast.error(err.response.data.message, {duration: 1000})
    })
    
  }
  return (
    <div style={{ backgroundImage: `url(${loginBg})` }} className="bg-cover bg-center ">
      <Logo />

      <div  className="flex justify-center items-center h-screen bg-cover bl">
        <div className="bg-[#9797979e] text-white p-8 rounded-lg shadow-lg max-w-sm w-full ">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
              onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                type="email"
                id="email"
                placeholder="Enter your email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                type="password"
                id="password"
                placeholder="Enter your password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Login
            </button>

            <p className="text-center p-2 font-medium">You have new account? <Link to={'/register'} className="text-[#2254e9] ml-2">Register hear</Link></p>
          </form>
        </div>
      </div>
      <Toaster containerStyle={false} position="top-right"/>
    </div>
  );
};

export default Login;
