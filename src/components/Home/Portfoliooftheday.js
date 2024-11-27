import React from "react";
import { Link } from "react-router-dom";

export default function PortfolioOfTheWeek({ card }) {
  const slug = card.slug;
  console.log("portfolio", card);

  return (
<<<<<<< HEAD
    <div className=" w-full max-w-4xl  mx-auto p-1 md:p-4 font-serif">
      <h1 className="text-base sm:text-4xl mb-4 py-4 font-bold text-center text-[#333]">
        Resume of the Week
      </h1>
      <div className="sm:flex h-72 sm:h-64">
        <img
          src={card.banner}
          alt={card.title}
          className="w-full rounded-sm sm:w-1/2 h-40 sm:h-full object-contain sm:object-cover"
        />
        <div className="w-full sm:w-1/2 p-1 mt-2 md:pl-4 flex flex-col justify-between">
          <div>
            <span className="bg-[#ffeb3b] px-1 sm:px-4 h0 py-0 sm:py-2 text-xs sm:text-sm font-sans inline-block mb-0 sm:mb-2">
              {card.category}
            </span>
            <h2 className="text-lg sm:text-xl font-bold italic text-gray-500 mb-2">
              From the diary of
            </h2>
            <h2 className="text-xl sm:text-3xl font-bold">{card.title}</h2>
=======
      <div className=" w-full max-w-4xl  mx-auto p-1 md:p-4 font-serif">
            <h1 className="text-base sm:text-4xl mb-4 py-4 font-bold text-center text-[#333]">Portfolio of the Week</h1>
        <div className="sm:flex h-72 sm:h-64">
          <img
            src={card.banner}
            alt={card.title}
            className="w-full rounded-sm sm:w-1/2 h-40 sm:h-full object-contain sm:object-cover"
          />
          <div className="w-full sm:w-1/2 p-1 mt-2 md:pl-4 flex flex-col justify-between">
            <div>
              <span className="bg-[#ffeb3b] px-1 sm:px-4 h0 py-0 sm:py-2 text-xs sm:text-sm font-sans inline-block mb-0 sm:mb-2">
                {card.category}
              </span>
              <h2 className="text-lg sm:text-xl font-bold italic text-gray-500 mb-2">From the portfolio of</h2>
              <h2 className="text-xl sm:text-3xl font-bold">{card.title}</h2>
            </div>
>>>>>>> 352cda19fd3a2084dfd3dbf16c1a5ac904aeae97
          </div>
        </div>
      </div>
      <div className="h-[1px] md:mt-4 mb-2 border border-gray-300"></div>
      <div
        className="line-clamp-3"
        dangerouslySetInnerHTML={{ __html: card.about }}
      ></div>
      <span className="bg-[#124e66]  text-white rounded-md hover:underline text-xs sm:text-base mt-4 inline-block ">
        {" "}
        <Link to={`/portfolio/${slug}`} className="inline-block px-4 py-1">
          Read More
        </Link>{" "}
      </span>
    </div>
  );
}
