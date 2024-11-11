import React, { useState } from "react";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import DOMPurify from "dompurify"; // Import DOMPurify for sanitizing HTML
import ReactShadow from 'react-shadow';

export default function Project({ project, keyaspects }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const handleNext = () => {
    if (currentIndex < project.length) {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setFade(true);
      }, 500);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex - 1);
        setFade(true);
      }, 500);
    }
  };

  console.log(project)

  return (
    <div className="bg-[#1a4f63] w-full min-h-[600px] rounded-lg p-1 sm:p-8 relative">
      {console.log("keyaspects", keyaspects)}
      <div className="absolute top-4 left-4 right-4 flex justify-between z-20">
        <button
          onClick={handlePrev}
          className={`flex items-center bg-white/90 text-[#1a4f63] px-4 py-2 rounded-full transition-all ${
            currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:shadow-lg'
          }`}
          aria-label="Previous"
          disabled={currentIndex === 0}
        >
          <ArrowLeftCircle className="w-6 h-6 mr-2" />
          <span className="font-[calibri] font-medium sm:font-semibold">Previous</span>
        </button>
        <button
          onClick={handleNext}
          className={`flex items-center bg-white/90 text-[#1a4f63] px-4 py-2 rounded-full transition-all ${
            currentIndex >= project.length ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:shadow-lg'
          }`}
          aria-label="Next"
          disabled={currentIndex >= project.length}
        >
          <span className="font-[calibri] font-medium sm:font-semibold">Next</span>
          <ArrowRightCircle className="w-6 h-6 ml-2" />
        </button>
      </div>

      <div className="relative overflow-hidden h-full bg-white rounded-lg mt-16">
        <div className="w-full h-full min-h-[500px]">
          {currentIndex < project.length ? (
            project.map((proj, index) => (
              <div
                key={proj._id}
                style={{
                  opacity: index === currentIndex && fade ? 1 : 0,
                  transition: "opacity 0.5s ease-in-out",
                }}
                className={`absolute top-0 left-0 w-full h-full p-8 overflow-y-auto ${
                  index === currentIndex ? "z-10" : "z-0"
                }`}
              >
                <div className="space-y-6">
                  {/* <div>
                    <h3 className="text-[#1a4f63] font-[Frutiger] text-lg sm:text-xl font-semibold mb-3">
                      Project Title
                    </h3>
                    <p className="text-[#1a4f63] font-[calibri] font text-sm sm:text-lg">
                      {proj.title}
                    </p>
                  </div> */}
                  <ReactShadow.div>
                  <style>{`
                * {
                    color:#1a4f63;
                    transform: scale(0.70);
                }
            `}</style>
                    <div
                      className="text-[#1a4f63] font-[calibri] text-sm sm:text-base overflow-y-auto"
                      style={{ scrollbarColor: 'transparent transparent', scrollbarWidth: 'thin' }}
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(proj.description) }} // Sanitize and set HTML
                    />
                  </ReactShadow.div>
                  {/* <div>
                    <h3 className="text-[#1a4f63] font-[Frutiger] text-lg sm:text-2xl font-semibold mb-3">
                      Link
                    </h3>
                    <a
                      className="text-[#1a4f63] font-[calibri] text-sm sm:text-xl underline hover:text-blue-600 transition-colors"
                      href={`https://${proj.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {proj.link}
                    </a>
                  </div> */}
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                opacity: fade ? 1 : 0,
                transition: "opacity 0.5s ease-in-out",
              }}
              className="absolute top-0 left-0 w-full h-full p-8 overflow-y-auto"
            >
              {keyaspects.length > 0 && (
                <h2 className="text-[#1a4f63] font-[Frutiger] text-lg sm:text-3xl font-bold mb-6 border-b-2 border-[#1a4f63] pb-0 sm:pb-3">
                  Key Aspects
                </h2>
              )}
              <ul className="text-[#1a4f63] font-[calibri] text-sm sm:text-xl list-disc sm:pl-8 space-y-3">
                {keyaspects.map((aspect, index) => (
                  <li key={index}>
                    {aspect.keyaspect.map((key, keyIndex) => (
                      <div key={keyIndex}>{key}</div>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}