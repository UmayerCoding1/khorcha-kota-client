import React from "react";
import heroImage from "./../assets/hero-image.png";
const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center lg:px-24 ">
      <div className="w-full lg:w-1/2">
        <img src={heroImage} alt="" />
      </div>

      <div className="w-full lg:w-1/2">
        <h1 className="text-5xl md:text-[70px] lg:text-[80px] font-poppins font-medium lg:lading-[-50px] ">
          Control your financial future easily
        </h1>
        <p className="mt-5"> 
          "Track what you spend, control what you save. KhorchaKota helps you
          understand your daily expenses, build better habits, and take charge
          of your financial future — one entry at a time."
        </p>

        <button className="p-2 px-6 bg-primary rounded-xl text-white font-semibold cursor-pointer mt-5">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;
