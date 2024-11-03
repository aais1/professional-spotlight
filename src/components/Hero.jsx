import React, { useEffect, useState } from "react";
import Marquee from "react-marquee-slider";
import SkeletonCard from "./SkeletonCard";
import { motion } from "framer-motion";

export function Hero() {
  const [biographies, setBiographies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBiographies = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://professional-spotlight-backend-beta.vercel.app/user/biography/heart');
        if (!response.ok) {
          throw new Error("Failed to fetch biographies");
        }
        const data = await response.json();
        setBiographies(data.biographies || []);
      } catch (error) {
        console.error("Error fetching biographies:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBiographies();
  }, []);

  if (loading) {
    return (
      <>
        <div className="text-center mb-12 px-4 pt-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0d4f6f] mb-4">
            Professionals Spotlight
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-4">
          Where <strong>Experts</strong> Meet <strong>Recoginition.</strong> Meet our top <strong>Professional</strong>
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

  return (
    <motion.div
      className="relative mb-4 py-2 sm:py-4 sm:pb-1 md:py-8 md:pb-2 lg:py-16 lg:pb-4 hero overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <div className="text-center mb-12 px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0d4f6f] mb-4">
          Professionals Spotlight
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-4">
          Where <strong>Experts</strong> Meet <strong>Recoginition.</strong> Meet our top <strong>Professional</strong>
        </p>
      </div>

      <Marquee velocity={20} direction="rtl" resetAfterTries={3}>
        {biographies.map((bio,index) => {
          const [name, title] = bio.title.split(':');
          return (
            <motion.div
              key={bio._id}
              className={`flex-shrink-0 p-6 w-72 rounded-lg shadow-lg flex flex-col items-center m-4 ${index===3&& 'bg-purple-100'} ${index===2&& 'bg-pink-100'} ${index===1&& 'bg-green-50'} ${index===0&& 'bg-blue-50'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-lg font-bold text-[#0d4f6f] mb-2 text-center">
                {name.trim()}
              </h2>
              <p className="text-sm text-gray-700 line-clamp-3 mb-3 text-center">
                {title?.trim()}
              </p>
              <img
                src={bio.banner}
                alt={bio.title}
                className="w-36 h-36 object-cover rounded-full mb-4 border-2 border-[#0d4f6f] shadow-md"
              />
              <a href={`/biography/${bio.slug}`} className="text-sm text-blue-600 hover:underline font-semibold flex items-center">
                Read more <span className="ml-1">→</span>
              </a>
            </motion.div>
          );
        })}
      </Marquee>
    </motion.div>
  );
}
