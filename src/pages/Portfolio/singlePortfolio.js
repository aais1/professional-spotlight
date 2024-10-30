import React, { useEffect, useState } from "react";
import PortfolioView from "./PortfolioView";
import Project from "./Projects";
import { useParams } from "react-router-dom";
import getApi from "../../utils/sendrequest";
import {
  Document,
  ImageRun,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  HeadingLevel,
} from "docx";
import { saveAs } from "file-saver";
import { FaDownload } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SinglePortfolio() {
  const [portfolios, setPortfolios] = useState([]);
  const [projects, setProject] = useState([]);
  const [keyaspects, setKeyaspects] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const { slug } = useParams();

  const FetchData = async () => {
    const response = await getApi("GET", "/user/portfolio/" + slug);
    setPortfolios(response.portfolio);
    setProject(response.projects);
    setKeyaspects(response.keyaspects);
  };

  useEffect(() => {
    FetchData();
  }, []);


const fetchImage = async (url) => {
  try {
    // Instead of fetching the image directly, we'll use our backend as a proxy
    const response = await fetch(
      "https://professional-spotlight-backend.vercel.app/user/fetch-image",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl: url }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    return await blob.arrayBuffer();
  } catch (error) {
    console.error("Failed to fetch image:", error);
    return null;
  }
};

const generateDocument = async () => {
  let imageBuffer = null;
  if (portfolios.banner) {
    imageBuffer = await fetchImage(portfolios.banner);
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          (imageBuffer || portfolios.title) &&
            new Paragraph({
              children: [
                imageBuffer &&
                  new ImageRun({
                    data: imageBuffer,
                    transformation: {
                      width: 100,
                      height: 100,
                    },
                  }),
                portfolios.title &&
                  new TextRun({
                    text: portfolios.title,
                    bold: true,
                    size: 32,
                    break: 1, // Add a break to ensure the title appears next to the image
                  }),
              ].filter(Boolean), // Filter out any falsey values
              alignment: AlignmentType.LEFT,
            }),
          portfolios.title &&
            new Paragraph({
              text: "Portfolio",
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER,
            }),
          portfolios.title &&
            new Paragraph({
              text: `${portfolios.title}`,
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.LEFT,
            }),
          portfolios.description &&
            new Paragraph({
              text: `${portfolios.description}`,
              heading: HeadingLevel.HEADING_2,
              alignment: AlignmentType.LEFT,
            }),
          portfolios.content &&
            new Paragraph({
              text: `${portfolios.content}`,
              heading: HeadingLevel.HEADING_3,
              alignment: AlignmentType.LEFT,
            }),
        ].filter(Boolean), // Filter out any falsey values
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `Portfolio-${portfolios.title}`);
  });
};

  // ... (keep the fetchImage and generateDocument functions as they are)

  const nextPage = () => {
    setCurrentPage((prev) => (prev === 0 ? 1 : prev));
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev === 1 ? 0 : prev));
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col justify-center items-center p-5">
      <h1 className="text-[#124e66] font-bold text-3xl font-[Frutiger] mt-5 sm:mb-10">
        Portfolio
      </h1>
      <div className="w-full sm:w-11/12 bg-[#124e66] rounded-xl mb-10 p-1 sm:py-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="w-full sm:w-5/12 sm:mt-20">
            <div className="sm:hidden">
              {currentPage === 0 ? (
                <PortfolioView Portfolio={portfolios} />
              ) : (
                <Project project={projects} keyaspects={keyaspects} />
              )}
            </div>
            <div className="hidden sm:block">
              <PortfolioView Portfolio={portfolios} />
            </div>
          </div>
          <div className="w-full sm:w-7/12">
            <div className="sm:hidden">
              <div className="flex justify-between items-center mt-4 mb-4">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className="flex items-center text-white bg-[#1a4f63] px-3 py-2 rounded-full"
                >
                  <ChevronLeft size={20} />
                  About section
                </button>
                <button
                  onClick={nextPage}
                  disabled={currentPage === 1}
                  className="flex items-center text-white bg-[#1a4f63] px-3 py-2 rounded-full"
                >
                  Projects
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            <div className="hidden sm:block">
              <Project project={projects} keyaspects={keyaspects} />
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={generateDocument}
        className="bg-[#124e66] hover:bg-[#1a6f8f] text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center"
      >
        <FaDownload className="mr-3" />
        Download CV
      </button>
    </div>
  );
}