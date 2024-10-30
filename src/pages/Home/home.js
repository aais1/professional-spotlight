// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import Portfoliocard from "../../components/Portfolio/portfoliocard";
import Biographycard from "../../components/Biographies/biographyhomepagecard";
import PortfolioftheDay from "../../components/Home/Portfoliooftheday";
import BiographyoftheDaycard from "../../components/Home/biographyoftheweek";
import "./home.css";
import { Link as RouterLink } from "react-router-dom";
import sendRequest from "../../utils/sendrequest";
import SkeletonCard from "../../components/SkeletonCard";
import {Hero} from "../../components/Hero";

export default function Home() {
  const [portfolios, setPortfolios] = useState([]);
  const [biographies, setBiographies] = useState([]);
  const [biographyOfTheDay, setBiographyOfTheDay] = useState(null);
  const [portfolioOfTheDay, setPortfolioOfTheDay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllData = async () => {
    try {
      // Make both API calls in parallel
      const [homeData, dayData] = await Promise.all([
        sendRequest("GET", "/user/home/biographiesandportfolios"),
        sendRequest("GET", "/user/biographyandportfoliooftheday"),
      ]);

      console.log("Home data response:", homeData);
      console.log("Day data response:", dayData);

      setPortfolios(homeData?.portfolios || []);
      setBiographies(homeData?.biographies || []);
      setPortfolioOfTheDay(dayData?.portfolio || null);
      setBiographyOfTheDay(dayData?.biography || null);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Website services are down. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  if (error) {
    return (
      <div className="container mx-auto p-6 flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <>
      {/* Portfolios and Biographies of the Day */}
      <div className="w-full sm:flex-row p-6 flex flex-col justify-around bg-white gap-5">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <div className="flex flex-col items-center justtify-center">
          <Hero/>
             <div className="w-full sm:w-10/12 flex flex-col sm:flex-row bg-[#124e66] rounded-xl p-5 sm:p-6 gap-5">
            <div className="w-full sm:w-1/2">
              <PortfolioftheDay card={portfolioOfTheDay} />
            </div>
            <div className="w-full sm:w-1/2">
              <BiographyoftheDaycard card={biographyOfTheDay} />
            </div>
          </div>
          </div>
        )}
      </div>
      {/* Biographies Section */}
      <div className="w-full sm:p-6 bg-white">
        <div className="flex justify-between">
          <h1 className="text-2xl ml-8 sm:ml-10  font-bold text-[#124e66]">
            Biographies
          </h1>
          <RouterLink to="/leaders-journey">
            <p className="hover:font-medium mr-2 text-[#124e66]">See More</p>
          </RouterLink>
        </div>
        <div className="flex overflow-x-auto space-x-4 scrollbar-hide snap-x snap-mandatory h-[30rem] items-center">
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : biographies.map((biography) => (
                <div key={biography.id} className="flex-shrink-0 w-72 h-[30rem]">
                  <Biographycard Biographycard={biography} />
                </div>
              ))}
        </div>
      </div>
      {/* Portfolios Section */}
      <div className="w-full sm:p-4 bg-white">
        <div className="flex justify-between">
          <h1 className="text-2xl ml-8 sm:ml-10 text-[#124e66] font-bold">
            Portfolios
          </h1>
          <RouterLink to="/portfolio-hub">
            <p className="hover:font-medium text-[#124e66] mr-2">See More</p>
          </RouterLink>
        </div>
        <div className="flex overflow-x-auto space-x-4 scrollbar-hide snap-x snap-mandatory h-[30rem]">
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : portfolios.map((portfolio) => (
                <div key={portfolio.id} className="flex-shrink-0 w-72 h-[30rem]">
                  <Portfoliocard portfoliocard={portfolio} />
                </div>
              ))}
        </div>
      </div>
    </>
  );
}