// import htmlToDocx from 'html-to-docx'
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { FaDownload } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import getApi from "../../utils/sendrequest";
import PortfolioView from "./PortfolioView";
import Project from "./Projects";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import DOMPurify from "dompurify";
import axios from "axios";
// import { PageTop, PageBottom, PageBreak } from "@fileforge/react-print";
// import htmlDocx from "html-docx-js";
// const htmlToDocx = require("html-to-docx");

export default function SinglePortfolio() {
  const [portfolios, setPortfolios] = useState([]);
  const [projects, setProject] = useState([]);
  const [keyaspects, setKeyaspects] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pdfImageLoaded, setpdfImageLoaded] = useState(true);
  const [base64PdfImage, setBase64PdfImage] = useState(null);
  const { slug } = useParams();
  const contentRef = useRef();
  const imageRef = useRef();

  const FetchData = async () => {
    const response = await getApi("GET", "/user/portfolio/" + slug);
    setPortfolios(response.portfolio);
    setProject(response.projects);
    setKeyaspects(response.keyaspects);
    const img = await getApi(
      "GET",
      "https://firebasestorage.googleapis.com/v0/b/professionals-spotlight.appspot.com/o/Portfolios%2F1728660076579.jpeg-2024-11-10T08%3A45%3A39.808Z?alt=media&token=92091fd5-79e8-4088-8ed1-1be7014c8bbc"
    );
    console.log("imgResponse", img);
  };

  useEffect(() => {
    FetchData();
  }, []);

  console.log(portfolios);
  console.log(projects);
  console.log(keyaspects);

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
  const handleDownloadPdf = async () => {
    if (pdfImageLoaded) {
      const element = contentRef.current;

      // Use html2canvas to capture the content
      const canvas = await html2canvas(element, {
        scale: 2,
      });
      const dataURL = canvas.toDataURL("image/png");

      // Create a jsPDF instance
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Add the captured image to the PDF
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(dataURL, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${portfolios?.slug} CV.pdf`);
    } else {
      alert("Please wait for the image to load.");
    }
  };

  const handleImageLoad = () => {
    setpdfImageLoaded(true);
  };
  // const exportToWord = async () => {
  //   const htmlContent = `
  //   <div>
  //     <h1>My Document</h1>
  //     <p>This is a sample paragraph in a Word document.</p>
  //     <ul>
  //       <li>Item 1</li>
  //       <li>Item 2</li>
  //       <li>Item 3</li>
  //     </ul>
  //   </div>
  // `;
  //   const blob = await htmlToDocx(htmlContent, {
  //     orientation: "portrait",
  //     margins: { top: 720, right: 720, bottom: 720, left: 720 }, // Optional margins
  //   });
  //   saveAs(blob, "my-document.docx");
  // };

  // const generateDocument = async () => {
  //   let imageBuffer = null;
  //   if (portfolios.banner) {
  //     imageBuffer = await fetchImage(portfolios.banner);
  //   }

  //   const doc = new Document({
  //     sections: [
  //       {
  //         properties: {},
  //         children: [
  //           (imageBuffer || portfolios.title) &&
  //             new Paragraph({
  //               children: [
  //                 imageBuffer &&
  //                   new ImageRun({
  //                     data: imageBuffer,
  //                     transformation: {
  //                       width: 100,
  //                       height: 100,
  //                     },
  //                   }),
  //                 portfolios.title &&
  //                   new TextRun({
  //                     text: portfolios.title,
  //                     bold: true,
  //                     size: 32,
  //                     break: 1, // Add a break to ensure the title appears next to the image
  //                   }),
  //               ].filter(Boolean), // Filter out any falsey values
  //               alignment: AlignmentType.LEFT,
  //             }),
  //           portfolios.title &&
  //             new Paragraph({
  //               text: "Portfolio",
  //               heading: HeadingLevel.TITLE,
  //               alignment: AlignmentType.CENTER,
  //             }),
  //           portfolios.title &&
  //             new Paragraph({
  //               text: `${portfolios.title}`,
  //               heading: HeadingLevel.HEADING_1,
  //               alignment: AlignmentType.LEFT,
  //             }),
  //           portfolios.description &&
  //             new Paragraph({
  //               text: `${portfolios.description}`,
  //               heading: HeadingLevel.HEADING_2,
  //               alignment: AlignmentType.LEFT,
  //             }),
  //           portfolios.content &&
  //             new Paragraph({
  //               text: `${portfolios.content}`,
  //               heading: HeadingLevel.HEADING_3,
  //               alignment: AlignmentType.LEFT,
  //             }),
  //         ].filter(Boolean), // Filter out any falsey values
  //       },
  //     ],
  //   });

  //   Packer.toBlob(doc).then((blob) => {
  //     saveAs(blob, `Portfolio-${portfolios.title}`);
  //   });
  // };

  // ... (keep the fetchImage and generateDocument functions as they are)

  const nextPage = () => {
    setCurrentPage((prev) => (prev === 0 ? 1 : prev));
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev === 1 ? 0 : prev));
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col justify-center items-center p-5">
      <h1 className="text-2xl sm:text-6xl font-[Frutiger] font-semibold my-4 mb-6 text-center text-[#124e66]">
        Resume
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
      <div className="flex gap-2">
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href).then(() => {
              toast.success("Link copied ");
            });
          }}
          className="bg-[#124e66] hover:bg-[#1a6f8f] text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center"
        >
          <FaDownload className="mr-3" />
          Copy Portfolio Link
        </button>
        <button
          onClick={handleDownloadPdf}
          className="bg-[#124e66] hover:bg-[#1a6f8f] text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center"
        >
          <FaDownload className="mr-3" />
          Download CV
        </button>
      </div>
      <div
        ref={contentRef}
        className=""
        style={{
          padding: "20px",
          background: "#f9f9f9",
          border: "1px solid #ddd",
          position: "absolute",
          top: "-9999999px", // Hide the element offscreen
          left: "-9999999px",
        }}
      >
        <div className="ml-[1024px]">
          <h1>{portfolios?.title}</h1>
          <h2>Phone:{portfolios?.phone ?? "972 - 50 - 3311101"}</h2>
          <div className="flex gap-2">
            <h2>Email:{portfolios?.email ?? "nama.ahmad@yahoo.com"}</h2>
            <h2>
              LinkedIn:
              {portfolios?.linkedIn ?? "linkedin.com/in/ahmad-namab2a64b173"}
            </h2>
          </div>
        </div>
        <hr />
        <h1>Professional Summary</h1>
        <div
          className=""
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(portfolios?.about),
          }}
        />
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              projects?.map((project) => project?.description)
            ),
          }}
        />
      </div>
    </div>
  );
}
