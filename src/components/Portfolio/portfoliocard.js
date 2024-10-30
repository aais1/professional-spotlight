import React from "react";
import { Link } from "react-router-dom";

export default function portfoliocard({ portfoliocard }) {
  console.log("portfoliocard", portfoliocard);
  const title = portfoliocard.title;
  const about = portfoliocard.about;
  const banner = portfoliocard.banner;
  const category = portfoliocard.category;
  const date = new Date(portfoliocard.Date);
const time = date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
  const slug = portfoliocard.slug;
  return (
    <>
      <Link to={`/portfolio/${slug}`}>
        <div className="p-2 border m-10 rounded-md shadow-md w-72 h-80 flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-lg">
          <img
            src={banner}
            alt={title}
            className="border rounded-md h-48 object-cover"
          />
          <div>
            <h1 className="font-semibold font-[Frutiger] p-1 text-lg text-[#212a31] hover:text-[#748d92]">
              {title}
            </h1>
            {/* <p className="w-full p-1 text-sm text-[#124e66] hover:text-[#748d92]">
              {about}
            </p> */}
          </div>
          <p className="font-[calibri] text-sm font-bold text-[#124e66]">
            <span className="font-medium text-xs text-[#124e66] p-1">
              Uploaded on
            </span>{" "}
            {time}
          </p>
        </div>
      </Link>
    </>
  );
}
