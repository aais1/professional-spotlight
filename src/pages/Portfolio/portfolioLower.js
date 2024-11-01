import React, { useEffect, useState } from "react";
import Portfoliocard from "../../components/Portfolio/portfoliocard";
import "./../../App.css";
import getApi from "../../utils/sendrequest";
import { FaArrowUp } from "react-icons/fa";

const categories = [
  "Healthcare",
  "CS",
  "Media",
  "Marketing",
  "Finance",
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
     useEffect(()=>{
      window.history.pushState(selectedCategory, "Biographies", `/leaders-journey/${selectedCategory}`);
    },[selectedCategory])

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
    if (selectedCategory === "") {
      setFilteredPortfolios(portfolios);
    } else {
      setFilteredPortfolios(
        portfolios.filter((portfolio) => portfolio.category === selectedCategory)
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
      <h2 className="pl-6 sm:pl-16 text-3xl text-start headings-font font-semibold text-[#124e66]">
        Related Portfolios
      </h2>
      <div className="flex justify-center mb-4 overflow-x-auto">
        <div className="flex flex-row flex-wrap justify-center">
          <button
            className={`px-4 py-2 m-2 rounded ${
              selectedCategory === ""
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black"
            }`}
            onClick={() => setSelectedCategory("")}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 m-2 rounded ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}{" "}{
                category !=="all" && "Portfolios"
              }
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 py-4  md:py-8">
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
          <p className="text-center text-gray-500 w-full col-span-full">No portfolio found</p>
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