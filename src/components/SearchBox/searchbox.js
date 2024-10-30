import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function Searchbox({ className = "" }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`flex justify-start p-2  relative w-full ${className}`}>
      <FaSearch className="absolute ml-2 sm:left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
      <input
        className="border border-gray-300 rounded-lg py-[0.45rem] placeholder:text-xs pl-10 pr-3 focus:outline-none w-48"
        type="search"
        placeholder="Portfolio or Biography"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
