import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export function Hero() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 1.5, ease: "easeOut" },
    });
  }, [controls]);

  return (
    <motion.div
      className="relative py-2 sm:py-4 md:py-8 lg:py-16 hero overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Main Title Section */}
      <div className="text-center mb-12 px-4">
        <h1 className="text-3xl md-text-5xl lg:text-6xl font-bold text-[#0d4f6f] mb-4">
          Professionals Spotlight
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-4">
          Elevating Your Presence with Impactful Biographies and Portfolios
        </p>
        <div className="max-w-3xl mx-auto">
          <p className="mt-4 text-md md:text-lg text-gray-500 leading-relaxed">
            In today's competitive landscape, standing out is essential. At Professionals Spotlight, we specialize in helping you shine by crafting personalized narratives that not only highlight your achievements but also resonate with your audience.
          </p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8">
        {/* Our Company Section */}
        <motion.div
          className="p-6 rounded-lg bg-[#f0f8fb] shadow-md flex flex-col items-center text-center transition-transform transform hover:scale-105"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-xl font-semibold text-[#0d4f6f] mb-2">Our Company</h2>
          <p className="text-gray-700">
            Welcome to Professionals Spotlight, your premier destination for publishing exceptional biographies and creating impactful online portfolios. Established in Los Angeles in 2024, our mission is to elevate your online presence, ensuring your expertise is recognized and celebrated.
          </p>
        </motion.div>

        {/* Our Mission and Services Section */}
        <motion.div
          className="p-6 rounded-lg bg-[#e6f4f9] shadow-md flex flex-col items-center text-center transition-transform transform hover:scale-105"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-xl font-semibold text-[#0d4f6f] mb-2">Our Mission and Services</h2>
          <p className="text-gray-700">
            At Professionals Spotlight, we empower CEOs and students by crafting impactful portfolios and biographies that showcase their unique strengths and achievements. We position our clients for growth and recognition by combining expertly tailored content with advanced SEO strategies.
          </p>
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          className="p-6 rounded-lg bg-[#d9eef7] shadow-md flex flex-col items-center text-center transition-transform transform hover:scale-105"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-xl font-semibold text-[#0d4f6f] mb-2">Why Choose Us?</h2>
          <p className="text-gray-700">
            Professionals Spotlight is your dedicated partner in growth. Our focus on authenticity, quality, and personalized storytelling helps CEOs, students, and professionals craft narratives that maximize visibility and impact.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
