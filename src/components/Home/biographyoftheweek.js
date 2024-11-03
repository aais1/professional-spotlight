import React from "react";
import { Link } from "react-router-dom";

export default function BiographyOfTheDay({ card }) {
  const slug = card.slug;

  const [name,title]=card.title.split(":");
  console.log(name,title)
  
  return (
      <div className="bg-[#f5f1e4] w-full max-w-4xl mx-auto h-full border-8 p-1 md:p-4 font-serif">
        <h1 className="text-base sm:text-4xl mb-4 font-bold py-4 text-center text-[#333]">Biography of the Day</h1>
        <div className="sm:flex h-72 sm:h-64">
          <img
            src={card.banner}
            alt={card.title}
            className="w-full rounded-sm sm:w-1/2 h-40 sm:h-full object-contain sm:object-cover"
          />
          <div className="w-full sm:w-1/2 p-1 mt-2 md:pl-4 flex flex-col justify-between">
            <div >
              <span className="bg-[#ffeb3b] px-1 sm:px-4 h0 py-0 sm:py-2 text-xs sm:text-sm font-sans inline-block mb-2">
                {card.category}
              </span>
              <h2 className="text-lg sm:text-xl font-bold italic text-gray-500 mb-2">From the diary of</h2>
              <h2 className="text-xl sm:text-3xl font-bold">{name}</h2>
            </div>
          </div>
        </div>
        <div className="h-[1px]  md:mt-4 mb-2 border border-gray-300"></div>
        <h2 className="text-sm sm:text-lg font-bold line-clamp-3 ">{title}</h2>
        <span className="bg-[#124e66]  text-white rounded-md hover:underline text-xs sm:text-base mt-4 inline-block "> <Link to={`/biography/${slug}`} className="inline-block px-4 py-1">Read More</Link> </span>
      </div>
  );
}