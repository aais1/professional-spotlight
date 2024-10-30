import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaLinkedin, FaEnvelope } from "react-icons/fa6";
import { Link as RouterLink } from "react-router-dom";
import "./footer.css";
export default function Footer() {
  return (
    <footer className="bg-[#124e66] w-full sm:h-32 h-52  grid items-center  p-4">
      <div className="flex flex-col sm:flex-row justify-around items-center text-center sm:text-left">
        {/* Left Section */}
        <div className="flex mb-4 sm:mb-0">
          <div className="p-2">
            <h1
              className="font-[Century Schoolbook] text-white text-sm sm:text-xl font-medium sm:font-semibold"

            >
              Professionals Spotlight
            </h1>
            <p className="italic left_font text-white text-xs">
              Where Experts Meet Recognition
            </p>
          </div>
          <span className="w-0.5 h-14 border mt-2  hidden sm:block bg-white opacity-50"></span>
        </div>

        {/* Center Section */}
        <div className="mb-4 sm:mb-0">
          <nav className="flex justify-center sm:justify-start space-x-4">
            <RouterLink to="/about-us" className="text-white text-xs sm:text-base right_font hover:text-gray-200">
              About Us
            </RouterLink>
            <RouterLink to="/terms-and-conditions" className="text-white  right_font text-xs sm:text-base hover:text-gray-200">
              Terms and Services
            </RouterLink>
            <RouterLink to="/privacy-policy" className="text-white  right_font text-xs sm:text-base hover:text-gray-200">
              Privacy Policy
            </RouterLink>
          </nav>
          <p className="text-white right_font font-[Public Sans] text-xs mt-2">
            © 2024 Professionals-Spotlight. All Rights Reserved.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col sm items-center ">
          <div className="flex space-x-2"> 
            <a href="https://www.linkedin.com/company/professionals-spotlight/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} className="text-white right_font text-xs sm:text-xl hover:text-gray-200" />
            </a>
            <a href="mailto:Admin@Professionals-Spotlight.com">
              <FaEnvelope style={{ color: 'white', fontSize: '24px' }} />
            </a>
          </div>
          <p className="text-white right_font text-xs">
            <a href="mailto:Admin@Professionals-Spotlight.com" className="hover:text-gray-200">
              Admin@Professionals-Spotlight.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
