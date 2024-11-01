import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SkeletonCard from "./SkeletonCard";
import getApi from "../utils/sendrequest";

export function Hero() {
  const [biographies, setBiographies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBiographies = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://professional-spotlight-backend-beta.vercel.app/user/biography/heart');
        
        // Ensure response.ok is true before parsing JSON
        if (!response.ok) {
          throw new Error("Failed to fetch biographies");
        }

        const data = await response.json();
        setBiographies(data.biographies || []); // Fallback to an empty array if biographies is undefined
      } catch (error) {
        console.error("Error fetching biographies:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBiographies();
  }, []);

  // Show loading skeleton while fetching data
  if (loading) {
    return (
      <>
        <div className="text-center mb-12 px-4 pt-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0d4f6f] mb-4">
            Professionals Spotlight
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-4">
            Elevating Your Presence with Impactful Biographies and Portfolios
          </p>
        </div>
        <div className="flex space-x-2 justify-center p-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </>
    );
  }

  // Render biographies
  return (
    <motion.div
      className="relative mb-8 py-2 sm:py-4 md:py-8 lg:py-16 hero overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <div className="text-center mb-12 px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0d4f6f] mb-4">
          Professionals Spotlight
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-4">
          Elevating Your Presence with Impactful Biographies and Portfolios
        </p>
      </div>

      <div className="flex sm:mx-auto overflow-x-auto space-x-4 justify-center">
        {biographies.map((bio) => {
          const [name, title] = bio.title.split(':');

          return (
            <motion.div
              key={bio._id}
              className="flex-shrink-0 p-6 w-72 rounded-lg bg-[#e6f4f9] shadow-lg flex flex-col items-center transition-transform transform"
            >
              <h2 className="text-lg font-bold text-[#0d4f6f] mb-2 text-center">
                {name.trim()}
              </h2>
              <p className="text-sm text-gray-700 line-clamp-3 mb-3 text-center">
                {title?.trim()} {/* Ensure title is defined before trimming */}
              </p>
              <img
                src={bio.banner}
                alt={bio.title}
                className="w-36 h-36 object-cover rounded-full mb-4 border-2 border-[#0d4f6f] shadow-md"
              />
              <a href={`/biography/${bio.slug}`} className="text-sm text-blue-600 font-semibold flex items-center">
                Read more <span className="ml-1">→</span>
              </a>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
