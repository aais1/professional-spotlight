import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Hamburger and close icons
import Searchbox from "../SearchBox/searchbox";
import Subscription from "../Subscription/subscription"; // Import the Subscription component
import { Bold } from "lucide-react";
import Logo from "./newwlogo.png";

export default function MobileNavbar({
  isOpen,
  toggleMobileNavbar,
  isAuthenticated,
}) {
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false); // State to manage subscription overlay

  const handleLogout = () => {
    toggleMobileNavbar(false); // Close the menu after logging out
  };

  const handleSubscribeClick = () => {
    setIsSubscriptionOpen(true); // Open the subscription overlay
    toggleMobileNavbar(false); // Close the mobile navbar
  };

  const handleSubscriptionClose = () => {
    setIsSubscriptionOpen(false); // Close the subscription overlay
  };

  return (
    <div className="lg:hidden bg-[#124e66]">
      {/* Navbar Header */}
      <div className="flex items-center justify-center space-x-2 p-2 ">
        <button onClick={toggleMobileNavbar} className="text-lg">
          {isOpen ? <FaTimes /> : <FaBars className="text-white" />}
        </button>
        <Searchbox className="flex-1  w-2/3 ml-2" />
        <RouterLink to="/" className="pr-2">
          <img src={Logo} alt="logo" className="w-10 h-9" />
        </RouterLink>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-3/5 h-full bg-white p-4 space-y-2 z-50">
          {/* Menu Links */}
          <RouterLink
            to="/portfolio-hub"
            className="py-2 font-[Cambria] text-center block"
            onClick={toggleMobileNavbar}
          >
            Portfolios
          </RouterLink>
          <RouterLink
            to="/leaders-journey"
            className="py-2 font-[Cambria] text-center block"
            onClick={toggleMobileNavbar}
          >
            Leaders journey
          </RouterLink>
          <RouterLink
            to="/reviews"
            className="py-2 font-[Cambria] text-center block"
            onClick={toggleMobileNavbar}
          >
            Reviews
          </RouterLink>
          <RouterLink
            to="/about-us"
            className="py-2 font-[Cambria] text-center block"
            onClick={toggleMobileNavbar}
          >
            About us
          </RouterLink>
          <RouterLink
            to="/services"
            className="py-2 font-[Cambria] text-center block"
            onClick={toggleMobileNavbar}
          >
            Services
          </RouterLink>

          {/* Authentication Buttons */}
          <button
            className="text-sm text-white bg-[#124e66] px-4 py-2 rounded mt-2 w-full block text-center"
            onClick={handleSubscribeClick}
          >
            Subscribe
          </button>
        </div>
      )}

      {/* Subscription Overlay */}
      {isSubscriptionOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Subscription onClose={handleSubscriptionClose} />
        </div>
      )}
    </div>
  );
}
