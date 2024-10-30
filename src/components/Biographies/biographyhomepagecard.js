import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

export default function Bio(biographycard) {
  console.log("bio", biographycard);
  const title = biographycard.Biographycard.title || biographycard.title;
  const banner = biographycard.Biographycard.banner;
  const category = biographycard.Biographycard.category;
  const description = biographycard.Biographycard.description.substring(0, 70);
  const date = new Date(biographycard.Biographycard.date);
  const time = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  const slug = biographycard.Biographycard.slug;

  // Function to truncate HTML content while preserving tags
  const truncateHtml = (html, maxLength) => {
    let truncated = "";
    let length = 0;
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const traverse = (node) => {
      if (length >= maxLength) return;

      if (node.nodeType === Node.TEXT_NODE) {
        const remainingLength = maxLength - length;
        truncated += node.textContent.slice(0, remainingLength);
        length += node.textContent.length;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        truncated += `<${node.tagName.toLowerCase()}>`;
        node.childNodes.forEach(traverse);
        truncated += `</${node.tagName.toLowerCase()}>`;
      }
    };

    doc.body.childNodes.forEach(traverse);
    return truncated + (length >= maxLength ? "..." : "");
  };

  const shortDescription = truncateHtml(description, 70);

  return (
    <>
      <Link to={`/biography/${slug}`} state={{ biography: biographycard }}>
        <div className="p-2 border m-10 rounded-md shadow-md w-72 h-80 flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-lg">
          <img
            src={banner}
            alt={title}
            className="border rounded-md h-48 object-cover"
          />
          <div>
            <h1 className="font-semibold font-[Frutiger] p-1 text-lg text-[#212a31] hover:text-[#748d92]">
              {title}
            </h1>
            {/* <div className="w-full p-1 text-sm text-[#124e66] hover:text-[#748d92]">
              {parse(shortDescription)}
            </div> */}
          </div>
          <p className="text-sm font-bold font-[calibri] text-[#124e66]">
            <span className="font-[calibri] font-medium text-xs  text-[#124e66] p-1">
              Uploaded on
            </span>{" "}
            {time}
          </p>
        </div>
      </Link>
    </>
  );
}