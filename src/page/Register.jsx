import React from "react";
import Logo from "../components/Logo";
import loginBg from "../assets/login-bg.avif";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [user, setUser] = React.useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const { userRegister } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    userRegister(user.fullname, user.username, user.email, user.password)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message, { duration: 1000 });

          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      })
      .catch((err) => {
        toast.error(err.message, { duration: 1000 });
      });
  };
  return (
    <div
      style={{ backgroundImage: `url(${loginBg})` }}
      className="bg-cover bg-center "
    >
      <Logo />

      <div className="flex justify-center items-center h-screen bg-cover bl">
        <div className="bg-[#6c696971] text-white p-8 rounded-lg shadow-lg max-w-sm w-full ">
          <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="fullname"
              >
                Fullname
              </label>
              <input
                onChange={(e) => setUser({ ...user, fullname: e.target.value })}
                type="text"
                id="fullname"
                placeholder="Enter your fullname"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                type="text"
                id="username"
                placeholder="Enter your username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                type="email"
                id="email"
                placeholder="Enter your email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                type="password"
                id="password"
                placeholder="Enter your password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Register
            </button>
            <p className="text-center p-2 font-medium">
              You have already account?{" "}
              <Link to={"/login"} className="text-[#2254e9] ml-2">
                Login hear
              </Link>
            </p>
          </form>
        </div>
        <Toaster containerStyle={false} position="top-right" />
      </div>
    </div>
  );
};

export default Register;
