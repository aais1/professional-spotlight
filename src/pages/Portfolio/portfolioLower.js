import React, { useEffect, useState } from "react";
import Portfoliocard from "../../components/Portfolio/portfoliocard";
import "./../../App.css";
import getApi from "../../utils/sendrequest";
import { FaArrowUp } from "react-icons/fa";
import PortfolioHeader from "./portfolioHeader";

const categories = [
  "All",
  "Healthcare",
  "Media",
  "Art",
  "Engineering",
  "Business",
  "Journalism",
];

// Skeleton component
const PortfolioSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col items-center p-4 bg-gray-200 rounded-md w-60 h-80 m-4">
      <div className="bg-gray-300 w-48 h-36 mb-4"></div>
      <div className="bg-gray-300 w-40 h-6 mb-2"></div>
      <div className="bg-gray-300 w-32 h-6"></div>
    </div>
  );
};

export default function Portfolio() {
  const [portfolios, setPortfolios] = useState([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const [showScroll, setShowScroll] = useState(false); // State to show/hide scroll button

  //gen perma links
  useEffect(() => {
    // commented it bcz it was generating issue and was taking us back to biographies page
    // window.history.pushState(selectedCategory, "Portfolio", `/leaders-journey/${selectedCategory}`);
  }, [selectedCategory]);

  const FetchData = async () => {
    setLoading(true);
    const response = await getApi("GET", "/user/allportfolios");
    setPortfolios(response.portfolios);
    setFilteredPortfolios(response.portfolios);
    setLoading(false);
  };

  useEffect(() => {
    FetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory === "All" || selectedCategory === "") {
      setFilteredPortfolios(portfolios);
    } else {
      setFilteredPortfolios(
        portfolios.filter(
          (portfolio) => portfolio.category === selectedCategory
        )
      );
    }
  }, [selectedCategory, portfolios]);

  // Show scroll button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Categories */}
      <h2 className="text-2xl sm:text-6xl font-[Frutiger] mt-4 font-semibold text-center text-[#124e66]">
        Related Portfolios
      </h2>
      <div
        className="space-x-3 mb-4 mt-4 sm:space-x-5 flex overflow-x-auto sm:justify-center w-full md:w-full md:mx-auto bg-[#124e66] "
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          whiteSpace: "nowrap",
          overflowX: "scroll",
        }}
      >
        <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        {categories.map((category) => (
          <button
            key={category}
            className={`p-2 m-1  whitespace-nowrap ${
              selectedCategory === category
                ? "bg-white md:px-4 rounded-sm  font-semibold text-black"
                : "text-white"
            }
            
            `}
            onClick={() => {
              setSelectedCategory(category);
            }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
            {category !== "All" && "Portfolios"}
          </button>
        ))}
      </div>
      {loading ? (
        // Render skeletons during loading
        Array.from({ length: 16 }).map((_, index) => (
          <PortfolioSkeleton key={index} />
        ))
      ) : (
        <PortfolioHeader />
      )}

      {/* Portfolio Grid */}
      <div className="bg-[#E8ECF5] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:px-10 py-4  md:py-8">
        {loading ? (
          // Render skeletons during loading
          Array.from({ length: 6 }).map((_, index) => (
            <PortfolioSkeleton key={index} />
          ))
        ) : filteredPortfolios.length > 0 ? (
          filteredPortfolios.map((portfolio) => (
            <Portfoliocard key={portfolio._id} portfoliocard={portfolio} />
          ))
        ) : (
          <p className="text-center text-gray-500 w-full col-span-full">
            No Resume found
          </p>
        )}
      </div>

      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-44 right-10 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </>
  );
}
