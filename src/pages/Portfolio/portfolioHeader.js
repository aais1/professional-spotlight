import React, { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaLink,
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import getApi from "../../utils/sendrequest";
import { Link, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

export default function Portfolio() {
  const [portfolios, setPortfolios] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const navigate = useNavigate();

  const FetchData = async () => {
    const response = await getApi("GET", "/user/allportfolios");
    console.log("response", response.portfolios);
    setPortfolios(response.portfolios);
  };

  useEffect(() => {
    FetchData();
    console.log("portfolios", portfolios);
  }, []);

  const handleNext = () => {
    if (currentIndex === portfolios.length - 1) {
      return;
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex === 0) {
      return;
    }
    setCurrentIndex((prev) => prev - 1);
  };

  const handleReadmore = () => [
    navigate(`/portfolio/${portfolios[currentIndex]?.slug}`),
  ];

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     handleNext();
  //   }, 5000); // Change portfolio every 5 seconds

  //   return () => clearInterval(interval); // Cleanup interval on component unmount
  // }, [currentIndex, portfolios]);

  // const handleNext = () => {
  //   setFade(false);
  //   setTimeout(() => {
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % portfolios.length);
  //     setFade(true);
  //   }, 500);
  // };

  // const handlePrev = () => {
  //   setFade(false);
  //   setTimeout(() => {
  //     setCurrentIndex(
  //       (prevIndex) => (prevIndex - 1 + portfolios.length) % portfolios.length
  //     );
  //     setFade(true);
  //   }, 500);
  // };

  return (
    <>
      <div className="bg-[#E8ECF5]  w-full h-auto grid grid-cols-12 items-center auto-rows-min">
        <div className="bg-[#124E66] h-full row-start-1 col-start-2 col-end-5 max-md:col-span-full"></div>
        <div className="bg-[#FFFFFF] h-full  row-start-1 col-start-6 col-end-12 flex justify-center items-center p-2 max-md:col-span-12 max-md:row-start-2">
          <div className="h-full w-2/4 max-md:w-4/5 flex flex-col gap-8 ">
            <h1 className="text-[#124E66] font-bold text-2xl">About</h1>
            <div>
              <h2 className="font-bold">Professional Summary</h2>

              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(portfolios[currentIndex]?.about),
                }}
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleReadmore}
                className="flex items-center font-semibold px-4 py-2 text-white bg-[#124e66] rounded-lg hover:bg-[#0f3d4e] transition"
              >
                Read More...
              </button>
              <div className="flex gap-3">
                <FaRegArrowAltCircleLeft onClick={handlePrev} size={35} />
                <FaRegArrowAltCircleRight onClick={handleNext} size={35} />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-red-900  h-5/6 w-full row-start-1 col-start-4 col-end-7 max-md:h-[300px] max-h-[300px]  max-md:col-start-2 max-md:col-end-12 ">
          <img
            src={portfolios[currentIndex]?.banner}
            className="h-full w-full"
          />
        </div>
      </div>
    </>
  );
}

// OLD Portfolio Header
{
  /* <div className="p-2 flex justify-center relative overflow-hidden">
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
              <FaChevronLeft
                onClick={handlePrev}
                className="text-3xl text-white cursor-pointer absolute top-1/2 transform -translate-y-1/2 left-4"
              />

              <FaChevronRight
                onClick={handleNext}
                className="text-3xl text-white cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-4"
              />

              <div className="absolute bottom-0 p-1 sm:p-4">
                <h1 className="text-lg  font-semibold sm:text-3xl text-white">
                  {portfolio.title}
                </h1>
                
                <Link to={`/portfolio/${portfolio.slug}`} className="text-white mt-2 inline-block">
                  <FaLink className="text-2xl" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div> */
}
