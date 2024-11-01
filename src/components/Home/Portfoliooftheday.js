import React from "react";
import { Link } from "react-router-dom";

export default function PortfolioOfTheWeek({ card }) {
  const slug = card.slug;

  return (
    <Link to={`/portfolio/${slug}`} className="block">
      <div className=" w-full max-w-4xl  mx-auto p-1 md:p-4 font-serif">
        <h1 className="text-base sm:text-2xl mb-4 py-4 font-bold text-center text-[#333]">Portfolio of the Week</h1>
        <div className="sm:flex h-72 sm:h-64">
          <img
            src={card.banner}
            alt={card.title}
            className="w-full rounded-sm sm:w-1/2 h-40 sm:h-full object-contain sm:object-cover"
          />
          <div className="w-full sm:w-1/2 pl-4 flex flex-col justify-between">
            <div>
              <span className="bg-[#ffeb3b] px-1 sm:px-4 h0 py-0 sm:py-2 text-xs sm:text-sm font-sans inline-block mb-0 sm:mb-2">
                {card.category}
              </span>
              <h2 className="text-sm sm:text-lg font-bold">{card.title}</h2>
            </div>
            <span className="text-blue-600 hover:underline text-xs sm:text-base">Read More</span>
          </div>
        </div>
      </div>
    </Link>
  );
}