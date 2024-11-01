import React, { useEffect, useState } from "react";
import Portfoliocard from "../../components/Portfolio/portfoliocard";
import Biographycard from "../../components/Biographies/biographyhomepagecard";
import PortfolioftheDay from "../../components/Home/Portfoliooftheday";
import BiographyoftheDaycard from "../../components/Home/biographyoftheweek";
import "./home.css";
import { Link as RouterLink } from "react-router-dom";
import sendRequest from "../../utils/sendrequest";
import SkeletonCard from "../../components/SkeletonCard";
import { Hero } from "../../components/Hero";

export default function Home() {
  const [portfolios, setPortfolios] = useState([]);
  const [biographies, setBiographies] = useState([]);
  const [biographyOfTheDay, setBiographyOfTheDay] = useState(null);
  const [portfolioOfTheDay, setPortfolioOfTheDay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllData = async () => {
    try {
      const [homeData, dayData] = await Promise.all([
        sendRequest("GET", "/user/home/biographiesandportfolios"),
        sendRequest("GET", "/user/biographyandportfoliooftheday"),
      ]);

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
      {/* Hero Section */}
      <div className="p-6 bg-white">
        <Hero />
      </div>

      {/* Portfolios and Biographies of the Day */}
      
        {loading ? (
          <div className="flex space-x-1 justify-center">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <div className="max-w-[1300px] mx-auto p-6">
          <div className=" md:h-[630px] flex flex-col sm:flex-row bg-[#124e66] rounded-xl p-5 sm:p-6 gap-5">
            <div className="flex-1 bg-[#f5f1e4]">
              <PortfolioftheDay card={portfolioOfTheDay} />
            </div>
            <div className="flex-1">
              <BiographyoftheDaycard card={biographyOfTheDay} />
            </div>
          </div>
          </div>
        )}
      

      {/* Biographies Section */}
      <div className="max-w-[1200px] mx-auto p-4 bg-white">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-[#124e66]">Biographies</h1>
          <RouterLink to="/leaders-journey">
            <p className="hover:font-medium text-[#124e66]">See More</p>
          </RouterLink>
        </div>
        <div className="flex overflow-x-auto space-x-4 scrollbar-hide snap-x snap-mandatory h-[30rem] items-center">
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : biographies.map((biography) => (
                <div key={biography._id} className="flex-shrink-0 w-64 h-[30rem] sm:w-72">
                  <Biographycard Biographycard={biography} />
                </div>
              ))}
        </div>
      </div>

      {/* Portfolios Section */}
      <div className="max-w-[1200px] mx-auto p-4 bg-white">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-[#124e66]">Portfolios</h1>
          <RouterLink to="/portfolio-hub">
            <p className="hover:font-medium text-[#124e66]">See More</p>
          </RouterLink>
        </div>
        <div className="flex overflow-x-auto space-x-4 scrollbar-hide snap-x snap-mandatory h-[30rem] items-center">
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : portfolios.map((portfolio) => (
                <div key={portfolio._id} className="flex-shrink-0 w-64 h-[30rem] sm:w-72">
                  <Portfoliocard portfoliocard={portfolio} />
                </div>
              ))}
        </div>
      </div>
    </>
  );
}
