import React, { useState } from "react";
import { Link, CheckCircle } from "lucide-react";
import DOMPurify from "dompurify"; // Import DOMPurify for sanitizing HTML

export default function PortfolioView({ Portfolio }) {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  return (
    <div className="bg-gradient-to-br from-cyan-500 to-green-600 p-1 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-xl">
        <div className="relative h-64 bg-[#124e66] overflow-hidden">
          <img
            src={Portfolio.banner}
            alt={Portfolio.title}
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
            <div className="p-6">
              <h1 className="text-white font-[Frutiger] text-2xl sm:text-xl font-bold mb-2">{Portfolio.title}</h1>
              <span className="inline-block font-[calibri] bg-cyan-100 text-cyan-800 rounded-full px-3 py-1 text-xs sm:text-sm font-semibold">
                {Portfolio.category}
              </span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-6 h-52 overflow-y-auto">
            <h2 className="text-2xl font-semibold font-[calibri] mb-2 text-cyan-800">About</h2>
            <div
              className="text-gray-600 font-[calibri] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(Portfolio.about) }} // Sanitize and set HTML
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              className="flex items-center gap-2 px-4 py-2 border border-cyan-300 rounded-md hover:bg-cyan-50 transition-colors text-cyan-700"
              onClick={copyToClipboard}
            >
              {copySuccess ? <CheckCircle className="w-4 h-4" /> : <Link className="w-4 h-4" />}
              <span>{copySuccess ? "Copied!" : "Share"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}