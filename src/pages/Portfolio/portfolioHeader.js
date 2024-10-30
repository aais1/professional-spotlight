import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaLink } from "react-icons/fa";
import getApi from "../../utils/sendrequest";
import { Link } from "react-router-dom";

export default function Portfolio() {
  const [portfolios, setPortfolios] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const FetchData = async () => {
    const response = await getApi("GET", "/user/popularportfolios");
    console.log("response", response.portfolios);
    setPortfolios(response.portfolios);
  };

  useEffect(() => {
    FetchData();
    console.log("portfolios", portfolios);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Change portfolio every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentIndex, portfolios]);

  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % portfolios.length);
      setFade(true);
    }, 500);
  };

  const handlePrev = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + portfolios.length) % portfolios.length);
      setFade(true);
    }, 500);
  };

  return (
    <>
      <div className="p-2 flex justify-center relative overflow-hidden">
        <div className="relative w-11/12 h-96">
          {portfolios?.map((portfolio, index) => (
            <div
              key={portfolio._id}
              style={{
                backgroundColor: "#124e66", // Set the background color
                backgroundImage: `url(${portfolio.banner})`, // Set the background image
                backgroundSize: "auto", // Retain the image size
                backgroundPosition: "center", // Center the image
                backgroundRepeat: "no-repeat", // Prevent the image from repeating
                opacity: index === currentIndex && fade ? 1 : 0,
                transition: "opacity 0.5s ease-in-out",
              }}
              className={`absolute object-contain top-0 border rounded-md left-0 w-full h-full`}
            >
              {/* Left Arrow */}
              <FaChevronLeft
                onClick={handlePrev}
                className="text-3xl text-white cursor-pointer absolute top-1/2 transform -translate-y-1/2 left-4"
              />

              {/* Right Arrow */}
              <FaChevronRight
                onClick={handleNext}
                className="text-3xl text-white cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-4"
              />

              <div className="absolute bottom-0 p-1 sm:p-4">
                <h1 className="text-lg  font-semibold sm:text-3xl text-white">
                  {portfolio.title}
                </h1>
                {/* <p className="text-white text-xs sm:w-2/3 sm:text-sm">
                  {portfolio.about.substring(0, 70)}
                </p> */}
                <Link to={`/portfolio/${portfolio.slug}`} className="text-white mt-2 inline-block">
                  <FaLink className="text-2xl" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
