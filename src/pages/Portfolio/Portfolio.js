import React from "react";
import PortfolioHeader from "./portfolioHeader";
import PortfolioLower from "./portfolioLower";
export default function Portfolio() {
    return (
        <>
        <div className="h-full bg-white">
          <PortfolioHeader />
          <PortfolioLower />
        </div>
        </>
    )
}