import React from "react";
import parse from "html-react-parser";

export default function Biographycard(biographycard) {
    const { banner, title, description } = biographycard.Biographycard;

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
        return truncated + (length >= maxLength ? "" : "");
    };

    const shortDescription = truncateHtml(description, 300);
    const date = new Date(biographycard.Biographycard.date);
    const time = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

    return (
        <div className="p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out w-full sm:flex justify-between bg-white border rounded-md">
            <div className="flex-shrink-0 w-full sm:w-2/5 h-56 sm:h-72">
                <img src={banner} alt={title} className="w-full h-full object-cover border rounded-md" />
            </div>
            <div className="sm:pl-6 pt-4 sm:pt-0 w-full">
                <h1 className="font-semibold font-[Frutiger] text-xl sm:text-3xl text-[#124e66] transition-colors duration-300 hover:text-[#0e3548] cursor-pointer">
                    {title}
                </h1>
                <div className="mt-2 text-sm font-[calibri] line-clamp-4 trun sm:text-base text-[#124e66]">
                    {parse(shortDescription)}
                </div>
                <p className="mt-4  bottom-2 text-xs sm:text-sm text-gray-500">
                    <span className="font-medium">Uploaded on: </span>{time}
                </p>    
            </div>
            
        </div>
    );
}
