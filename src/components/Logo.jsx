import React from "react";
import logo from "../assets/logo.png"; 
const Logo = () => {
  return (
    <div className="flex items-center gap-1">
      <img className="w-10" src={logo} alt="logo" />


      <h2 className="text-2xl font-bold font-outfit">
        <span className="text-primary">Khorcha</span>
        <span>Kota</span>
      </h2>
    </div>
  );
};

export default Logo;
