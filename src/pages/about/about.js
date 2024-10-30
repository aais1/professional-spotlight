import React, { useState } from "react";
import Company from "./company";
import Team from "./team";

export default function About() {
  const [activeComponent, setActiveComponent] = useState("company");

  return (
    <div className="flex flex-col items-center bg-white">
      <div className="flex justify-center space-x-3 mt-4">
        <button
          className={`px-6 py-2 mx-2 rounded-full transition-all duration-300 ease-in-out shadow-lg 
            ${activeComponent === "company" ? "bg-[#124e66] text-white" : "bg-gray-100 text-[#124e66] hover:bg-gray-200"}`}
          onClick={() => setActiveComponent("company")}
        >
          Company
        </button>
        <button
          className={`px-6 py-2 mx-2 rounded-full transition-all duration-300 ease-in-out shadow-lg 
            ${activeComponent === "team" ? "bg-[#124e66] text-white" : "bg-gray-100 text-[#124e66] hover:bg-gray-200"}`}
          onClick={() => setActiveComponent("team")}
        >
          Team
        </button>
      </div>
      <div className="mt-8 w-full ">
        {activeComponent === "company" && <Company />}
        {activeComponent === "team" && <Team />}
      </div>
    </div>
  );
}
