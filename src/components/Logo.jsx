import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <Link to={"/"} className=" items-center gap-1  inline-block">
      <div className="flex items-center gap-1">
        <img className="w-10" src={logo} alt="logo" />

        <h2 className="text-2xl font-bold font-outfit">
          <span className="text-primary">Khorcha</span>
          <span>Kota</span>
        </h2>
      </div>
    </Link>
  );
};

export default Logo;
