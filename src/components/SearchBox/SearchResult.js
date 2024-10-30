import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import sendRequest from "../../utils/sendrequest";
import { Link as RouterLink } from "react-router-dom";
import { Filter } from 'lucide-react';

const ResultCard = ({ item, type }) => (
  <RouterLink to={`/${type.toLowerCase()}/${item.slug}`} key={item._id}>
    <div className="mb-6 bg-[#D3D9D4] rounded-lg shadow-md overflow-hidden">
      <img src={item.banner} className="w-full h-48 object-cover" alt={item.title} />
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold text-[#212A31]">{item.title}</h2>
        <p className="text-sm text-[#2E3944]">
          <span className="font-medium">Category:</span> {item.category}
        </p>
        <p className="text-sm text-[#2E3944]">
          <span className="font-medium">About:</span>{" "}
          {item.about && item.about.length > 100
            ? `${item.about.substring(0, 100)}...`
            : item.about}
        </p>
        <p className="text-sm text-[#2E3944]">
          <span className="font-medium">Created:</span>{" "}
          <span className="font-medium">Created:</span>{" "}
          {item.Date || item.date ? new Date(item.Date || item.date).toLocaleDateString() : 'N/A'}    
        </p>
        {type === "Portfolio" && item.portfoliooftheweek && (
          <p className="text-sm font-medium text-[#124E66]">
            Portfolio of the Week
          </p>
        )}
      </div>
    </div>
  </RouterLink>
);

export default function SearchResults() {
  const location = useLocation();
  const { query } = useParams();
  const [results, setResults] = useState({ portfolios: [], biographies: [] });
  const [filteredResults, setFilteredResults] = useState({ portfolios: [], biographies: [] });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      setError(null);
      sendRequest("GET", `/user/search?query=${query}`)
        .then((response) => {
          console.log("Response Data:", response);
          if (response && (response.portfolios || response.biographies)) {
            setResults({
              portfolios: response.portfolios || [],
              biographies: response.biographies || []
            });
          } else {
            setError("Unexpected response format");
          }
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
          setError("Failed to fetch search results");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [query]);

  useEffect(() => {
    const filteredPortfolios = results.portfolios.filter((portfolio) => 
      (selectedCategories.length === 0 || selectedCategories.includes(portfolio.category)) &&
      (selectedTypes.length === 0 || selectedTypes.includes("Portfolio"))
    );

    const filteredBiographies = results.biographies.filter((biography) =>
      (selectedCategories.length === 0 || selectedCategories.includes(biography.category)) &&
      (selectedTypes.length === 0 || selectedTypes.includes("Biography"))
    );


    setFilteredResults({
      portfolios: filteredPortfolios,
      biographies: filteredBiographies
    });
  }, [selectedCategories, selectedTypes, results]);

  const types = ["Portfolio", "Biography"];

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white min-h-screen p-4">
      <h1 className="text-2xl font-semibold mb-4 text-[#212A31]">
        Search Results for "{query}"
      </h1>
      
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden mb-4 flex items-center bg-[#124E66] text-white px-4 py-2 rounded"
      >
        <Filter size={20} className="mr-2" />
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>

      <div className="flex flex-col md:flex-row">
        <div className={`${showFilters ? 'block' : 'hidden'} md:block md:w-1/6 bg-[#D3D9D4] p-4 rounded-lg mb-4 md:mb-0 md:mr-4`}>
          <h2 className="font-semibold text-xl text-[#212A31] mb-4">Filter by</h2>
          <div className="space-y-4">
            {/* <div>
              <h3 className="font-medium text-[#2E3944] mb-2">Category</h3>
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={category}
                    onChange={() => handleCategoryChange(category)}
                    checked={selectedCategories.includes(category)}
                    className="form-checkbox text-[#124E66]"
                  />
                  <label htmlFor={category} className="text-[#2E3944]">{category}</label>
                </div>
              ))}
            </div> */}
            <div>
              <h3 className="font-medium text-[#2E3944] mb-2">Type</h3>
              {types.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={type}
                    onChange={() => handleTypeChange(type)}
                    checked={selectedTypes.includes(type)}
                    className="form-checkbox text-[#124E66]"
                  />
                  <label htmlFor={type} className="text-[#2E3944]">{type}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:w-3/4">
        {
          console.log("Filtered Results:", filteredResults)
        }
          {filteredResults.portfolios.length > 0 || filteredResults.biographies.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredResults.portfolios.map((portfolio) => (
                <ResultCard key={portfolio._id} item={portfolio} type="Portfolio" />
              ))}
              {filteredResults.biographies.map((biography) => (
                <ResultCard key={biography._id} item={biography} type="Biography" />
              ))}
            </div>
          ) : (
            <p className="text-center text-[#212A31]">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
}