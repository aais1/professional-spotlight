import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Use Link and useNavigate
import MobileNavbar from "./mobileNavbar";
import NavbarEntity from "./NavbarEntity";
import Searchbox from "../SearchBox/searchbox";
import Subscription from "../Subscription/subscription";
import Logo from "./newwlogo.png";

export default function Navbar() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState(false);
  const mobileNavbarRef = useRef(null);
  const navigate = useNavigate(); // Use useNavigate for navigation
  const pathname = useLocation().pathname;

  const toggleSubscription = () => {
    setIsSubscribed(!isSubscribed);
  };

  const toggleMobileNavbar = () => {
    setIsMobileNavbarOpen(!isMobileNavbarOpen);
  };

  const handleClickOutside = (event) => {
    if (
      mobileNavbarRef.current &&
      !mobileNavbarRef.current.contains(event.target)
    ) {
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
    { name: "Services", link: "/services" },
  ];

  // Condition to show the back button or the navbar
  if (
    pathname.includes("leaders-journey") ||
    pathname.includes("portfolio-hub")
  ) {
    return (
      <div className="pt-4 mx-4 flex justify-between items-center">
        <button
          onClick={() => {
            navigate("/");
          }} // Navigate back using navigate
          className="flex items-center font-semibold px-4 py-2 text-white bg-[#124e66] rounded-lg hover:bg-[#0f3d4e] transition"
        >
          Back
        </button>
        <div className="flex items-center  ">
          <Searchbox />
        </div>
      </div>
    );
  }

  return (
    <>
      <nav className="hidden lg:flex sticky top-0 bg-[#124e66] z-50 items-center justify-around p-4">
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-14" />
        </Link>
        <div className="flex items-center  ">
          <Searchbox />
        </div>
        <div className="flex items-center justify-center  ">
          <div className="relative flex items-center">
            {links.map((link) => (
              <div key={link.name} className="relative">
                <NavbarEntity name={link.name} link={link.link} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center  ">
          <button
            className="btn-subscribe border p-2 mt-2 w-14 sm:w-28 rounded-2xl sm:rounded-lg hover:translate-y-0.5 hover:bg-white font-semibold bg-[#124e66] hover:text-[#124e66] duration-100 text-white"
            onClick={toggleSubscription}
          >
            Subscribe
          </button>
        </div>
      </nav>

      <div ref={mobileNavbarRef}>
        <MobileNavbar
          isOpen={isMobileNavbarOpen}
          toggleMobileNavbar={toggleMobileNavbar}
        />
      </div>

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
