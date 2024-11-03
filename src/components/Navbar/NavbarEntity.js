import React, { useState } from "react";
import { Link } from "react-router-dom";
import css from "./nav.module.css";
export default function NavbarEntity({ name, link, imageaddress, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const styles = {
    color: "#b25274d",
    fontFamily:"Cambria"
  };

  console.log(link)

  return (
    <div
      className={`${css.hoverEffect} p-2 hover:underline transform transition-transform duration-500 hover:translate-y-0.5 mt-2`}
      onClick={onClick}
    >
      
        <Link
          className="text-sm sm:text-base  lg:text-lg  font-semibold text-white mx-2 flex items-center"
          to={link}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={styles}
        >
        
          <span className="hidden sm:inline">{name}</span>{" "}
          {/* Show text on larger screens */}
        </Link>
     
    </div>
  );
}
