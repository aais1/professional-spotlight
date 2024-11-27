import React from "react";
import { Link } from "react-router-dom";

export default function portfoliocard({ portfoliocard }) {
  console.log("portfoliocard", portfoliocard);
  const title = portfoliocard.title;
  const about = portfoliocard.about;
  const banner = portfoliocard.banner;
  const category = portfoliocard.category;
  const date = new Date(portfoliocard.Date);
  const time =
    date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
  const slug = portfoliocard.slug;
  console.log(portfoliocard);
  return (
    <>
      <Link to={`/portfolio/${slug}`}>
        <div className=" border rounded-md shadow-md mx-auto w-[80%] md:w-72  flex flex-col justify-between transition-transform transform ">
          <div>
            <img
              src={banner}
              alt={title}
              className="border rounded-md h-64 w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-between mt-1 gap-1">
            <h1 className="self-end  font-[Frutiger] italic text-md text-[#212a31] hover:text-[#748d92]">
              {category}
            </h1>
            <h1 className="font-semibold font-[Frutiger] p-1 text-lg text-[#212a31] hover:text-[#748d92]">
              {title}
            </h1>

            {/* <p className="w-full p-1 text-sm text-[#124e66] hover:text-[#748d92]">
              {about}
            </p> */}
          </div>
        </div>
      </Link>
    </>
  );
}
