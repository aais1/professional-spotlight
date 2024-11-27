import React from "react";
function ServicesCard({ imgSrc, text }) {
  return (
    <>
      <div className=" col-span-4 max-sm:col-span-11 max-lg:col-span-6 hover:scale-105 transition-transform duration-300">
        <img src={imgSrc} />
        <div className="bg-[#D3D3D3] w-full">
          <h1 className="text-center font-bold">{text}</h1>
        </div>
      </div>
    </>
  );
}

export default ServicesCard;
