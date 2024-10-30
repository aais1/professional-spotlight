import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import MobileNavbar from "./mobileNavbar"; // Import the new mobile navbar
import NavbarEntity from "./NavbarEntity"; // Existing NavbarEntity component
import Searchbox from "../SearchBox/searchbox";
import Subscription from "../Subscription/subscription";
import Logo from "./newwlogo.png";
export default function Navbar() {
  const [isSubscribed, setIsSubscribed] = useState(false); // Control subscription modal visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState(false);
  const mobileNavbarRef = useRef(null);

  const toggleSubscription = () => {
    setIsSubscribed(!isSubscribed); // Toggle subscription modal
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileNavbar = () => {
    setIsMobileNavbarOpen(!isMobileNavbarOpen);
  };

  const handleClickOutside = (event) => {
    if (mobileNavbarRef.current && !mobileNavbarRef.current.contains(event.target)) {
      setIsMobileNavbarOpen(false);
    }
  };

  useEffect(() => {
    if (isMobileNavbarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileNavbarOpen]);

  const links = [
    { name: "Leaders journey", link: "/leaders-journey" },
    { name: "Portfolios", link: "/portfolio-hub" },
    { name: "Reviews", link: "/reviews" },
    { name: "About us", link: "/about-us" },
  ];

  return (
    <>
      {/* Main Navbar for Desktop */}
      <nav className="hidden sm:flex sticky top-0  bg-[#124e66] z-10 items-center justify-around p-4 ">
        <RouterLink  to="/">
          <img src={Logo}  alt="P" className=" h-10 " />
          {/* <p className="text-white text-sm" style={{ fontFamily: "'Dairy of the Day'" }}> */}
         
        </RouterLink>
        <div className="flex items-center space-x-4">
          <Searchbox />
        </div>
        <div className="flex items-center justify-center space-x-4">
          <div className="relative flex items-center">
            {links.map((link) => (
              <div key={link.name} className="relative">
                <NavbarEntity name={link.name} link={link.link} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="btn-subscribe border p-2 mt-2 w-14 sm:w-28 rounded-2xl sm:rounded-lg hover:translate-y-0.5 hover:bg-white font-semibold bg-[#124e66] hover:text-[#124e66] duration-100 text-white"
            onClick={toggleSubscription} // Toggle subscription on click
          >
            Subscribe
          </button>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <div ref={mobileNavbarRef}>
        <MobileNavbar isOpen={isMobileNavbarOpen} toggleMobileNavbar={toggleMobileNavbar} />
      </div>

      {/* Subscription Modal */}
      {isSubscribed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <Subscription onClose={toggleSubscription} />
          </div>
        </div>
      )}
    </>
  );
}
