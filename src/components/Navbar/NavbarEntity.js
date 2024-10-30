import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import css from "./nav.module.css";
export default function NavbarEntity({ name, link, imageaddress, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const styles = {
    color: "#b25274d",
    fontFamily:"Cambria"
  };

  return (
    <div
      className={`${css.hoverEffect} p-2 hover:underline transform transition-transform duration-500 hover:translate-y-0.5 mt-2`}
      onClick={onClick}
    >
      {imageaddress ? (
        <RouterLink to={link} className="flex items-center">
          <img
            src={imageaddress}
            alt={name}
            style={{ marginRight: "8px", color: "#235EAA" }}
            className="w-5 h-5"
          />
          <span
            className="text-sm sm:text-lg text-[#2C041D] mx-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={styles}
          >
            {name}
          </span>
        </RouterLink>
      ) : (
        <RouterLink
          className="text-sm sm:text-base  lg:text-lg  font-semibold text-white mx-2 flex items-center"
          to={link}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={styles}
        >
        
          <span className="hidden sm:inline">{name}</span>{" "}
          {/* Show text on larger screens */}
        </RouterLink>
      )}
    </div>
  );
}
