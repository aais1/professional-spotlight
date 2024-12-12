import React from "react";
import { Link } from "react-router-dom";

export default function Poppularbiography(Poppularbiography) {
  console.log("pp", Poppularbiography);
  const date = new Date(Poppularbiography?.Poppularbiography?.date);
  const time = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  const slug = Poppularbiography?.Poppularbiography?.slug;
  return (
    <>
      <Link to={`/biography/${slug}`}>
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(${Poppularbiography.Poppularbiography?.banner})`,
          }}
          className="bg-cover relative bg-center  rounded-lg  h-56 sm:h-78 w-full"
        >
          <div className="p-4 absolute bottom-1 ">
            <h1 className=" font-semibold font-[Frutiger] text-white ">
              {Poppularbiography.Poppularbiography?.title}
            </h1>
            <p className="text-sm text-white font-[calibri]">{time}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
