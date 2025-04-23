import React from "react";
import Logo from "./Logo";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();
const Loading = () => {
  return (
    <div
      data-aos="flip-left"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="2000"
      className="flex items-center justify-center h-screen trans"
    >
      <div className="hidden lg:block">
        <Logo />
      </div>

      <div data-aos="fade-down" className="border-l-2 ml-3 px-4">
        <h1 className="text-8xl lg:text-9xl">
          Let's <br /> explore
        </h1>
      </div>
    </div>
  );
};

export default Loading;
