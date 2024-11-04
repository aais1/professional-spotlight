import React, { useEffect, useState } from "react";
import getApi from "../../utils/sendrequest";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaCopy,
  FaCheckCircle,
} from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { Link as RouterLink, useLocation } from "react-router-dom";
import parse, { domToReact } from "html-react-parser";
import DOMPurify from "dompurify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import background from "./background.png";
const linkify = (text) => {
  // Handle full HTML-like links
  const htmlLinkPattern = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*>(.*?)<\/a>/g;
  let processedText = text.replace(htmlLinkPattern, (match, quote, url, linkText) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
  });

  // Handle plain URLs having www,hhtp,https
  const urlPattern = /(?<!<a[^>]*>)(https?:\/\/[^\s]+)(?![^<]*<\/a>)/g;
  processedText = processedText.replace(urlPattern, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
  });

  return processedText;
};

// Keep existing imports and utility functions...

export default function BiographyPage() {
  const [biography, setBiography] = useState({});
  const [popularBiographies, setPopularBiographies] = useState([]);
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isLoadingBiography, setIsLoadingBiography] = useState(false);
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");

  const location = useLocation();
  const {
    biography: stateBiography,
    popularBiographies: statePopularBiographies,
  } = location.state || {};

  const fetchBiography = async (slug) => {
    setIsLoadingBiography(true);
    try {
      const response = await getApi("GET", `/user/biography/${slug}`);
      if (response && response.biography) {
        setBiography(response.biography);
      } else {
        setBiography({});
      }
    } catch (error) {
      console.error("Error fetching biography:", error);
      setBiography({});
    } finally {
      setIsLoadingBiography(false);
    }
  };

  const fetchPopularBiographies = async () => {
    try {
      const response = await getApi("GET", "/user/popularbiographies");
      setPopularBiographies(response.biographies);
    } catch (error) {
      console.error("Error fetching popular biographies:", error);
      setPopularBiographies([]);
    }
  };

  useEffect(() => {
    if (!stateBiography || !stateBiography.slug) {
      const slugFromUrl = location.pathname.split("/").pop();
      fetchBiography(slugFromUrl);
    } else {
      setBiography(stateBiography);
    }

    if (!statePopularBiographies || statePopularBiographies.length === 0) {
      fetchPopularBiographies();
    } else {
      setPopularBiographies(statePopularBiographies);
    }
  }, [stateBiography, statePopularBiographies, location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isChecked) {
      toast.error("You must agree to the privacy policy and terms.");
      return;
    }

    setIsLoadingSubscription(true);
    try {
      const response = await getApi("POST", "/user/biography/subscribe", {
        email: email,
      });
      if (response.message === "Subscribed successfully") {
        toast.success("Subscribed successfully!");
        setEmail("");
        setIsChecked(false);
      } else {
        toast.info("You may have already subscribed with this email!");
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsLoadingSubscription(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopySuccess("Link copied!");
      setTimeout(() => setCopySuccess(""), 2000);
    });
  };

  if (!biography.title) {
    return (
    <div className="min-h-screen flex items-center justify-center bg-white z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#124e66]"></div>
    </div>
    );
  }

  const parseOptions = {
    replace: (domNode) => {
      if (domNode.name === "a" && domNode.attribs && domNode.attribs.href) {
        const href = domNode.attribs.href;
        const sanitizedHref = DOMPurify.sanitize(href, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
        return (
          <a
            href={sanitizedHref}
            target="_blank"
            rel="noopener noreferrer"
            className="underline" // Optional: Add Tailwind classes for styling
          >
            {domToReact(domNode.children, parseOptions)}
          </a>
        );
      }
    },
  };
  // / Sanitize the description and convert URLs to clickable links
  const sanitizedDescription = DOMPurify.sanitize(linkify(biography?.description || ""));

  return (
    <>
      <ToastContainer />
      {isLoadingBiography && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#124e66]"></div>
        </div>
      )}


      <div className="min-h-screen bg-white">
        <div className="relative space-y-2 bg-center mt-5 sm:mt-10 px-4 sm:px-10 rounded-lg w-full">
          <div className="relative   bg-[#124e66] ">
            <div  style={{
            backgroundImage:`url(${background})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            objectFit: 'contain',
            minWidth: '100%',
          }}  className="h-[24rem] md:h-[38rem]  w-full overflow-hidden">
              <img
                className="object-fill w-full lg:min-w-[48%] lg:max-w-[49.5%] mx-auto  h-full bg-center "
                src={biography?.banner}
                alt={biography?.title}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h1 className="text-lg sm:text-[54px] leading-[1.1] text-center sm:mb-6 font-semibold font-[Frutiger] text-white w-[80%] mx-auto">
                  {biography?.title}
                </h1>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-8">
            {/* Main content area */}
            <div className="sm:col-span-8 p-4 sm:p-12">
              <div className="ql-editor text-[#124e66] font-[calibri] text-justify"
              >
                {parse(sanitizedDescription, parseOptions)}
              
              <div className="flex flex-wrap justify-around space-x-4 mt-8">
                {biography?.images?.slice(0, 2).map((image, index) => (
                  <img
                    key={index}
                    className="h-64 w-72 object-cover rounded-lg mb-4"
                    src={image}
                    alt={`Image ${index + 1}`}
                  />
                ))}
              </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="sm:col-span-4 p-4">
              <div className="sticky top-20 bg-gray-100 bg-opacity-20 rounded-lg shadow-md space-y-8 p-4">
                {/* Share section */}
                <div className="border p-4 mb-6 relative">
                  <p className="font-[celibri] text-center">SHARE THE POST AT</p>
                  <div className="flex mt-4 justify-center space-x-4">
                    <a
                      href="https://www.facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebook
                        size={24}
                        className="cursor-pointer text-[#124e66] hover:text-blue-600"
                      />
                    </a>
                    <a
                      href="https://www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram
                        size={24}
                        className="cursor-pointer text-[#124e66] hover:text-pink-600"
                      />
                    </a>
                    <a
                      href="https://www.twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaX
                        size={20}
                        className="cursor-pointer text-[#124e66] hover:text-red-600"
                      />
                    </a>
                    <a
                      href="https://www.linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin
                        size={24}
                        className="cursor-pointer text-[#124e66] hover:text-blue-700"
                      />
                    </a>
                    <div className="relative">
                      <FaCopy
                        size={24}
                        className="cursor-pointer text-[#124e66] hover:text-green-600"
                        onClick={copyToClipboard}
                      />
                      {copySuccess && (
                        <div className="absolute -top-8 left-2 mt-2 mr-2 flex items-center text-green-500 text-sm">
                          <FaCheckCircle className="mr-1" /> {copySuccess}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Newsletter subscription */}
                <div className="space-y-4">
                  <h2 className="text-[#124e66] text-lg font-semibold text-center">
                    Subscribe to our newsletter
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="border p-2 w-full rounded-md"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoadingSubscription}
                    />
                    <button
                      type="submit"
                      className={`border rounded-md w-full h-10 hover:shadow-lg bg-[#124e66] text-white mt-2 flex justify-center items-center ${
                        isLoadingSubscription ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={isLoadingSubscription}
                    >
                      {isLoadingSubscription ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                      ) : (
                        "Subscribe"
                      )}
                    </button>
                  </form>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="border"
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                      disabled={isLoadingSubscription}
                    />
                    <p className="text-xs">
                      I have read{" "}
                      <a href="/terms-and-conditions" className="text-blue-500 underline">
                        Privacy policy and terms of condition
                      </a>
                    </p>
                  </div>
                </div>

                {/* Popular posts */}
                <div className="flex flex-col mt-8 space-y-4">
                  <h2 className="text-white inline p-2 w-20 bg-[#124e66] font-semibold text-start border rounded-md text-lg">
                    Popular
                  </h2>
                  <div className="border border-[#124e66] w-full my-0.5"></div>
                  <div className="space-y-4">
                    {popularBiographies.map((bio) => {
                      const [name,title]=bio.title.split(':');
                      return(
                      <RouterLink
                        key={bio._id}
                        to={{
                          pathname: `/biography/${bio.slug}`,
                          state: { biography: bio },
                        }}
                        className="block bg-gray-200 rounded-lg p-1 hover:bg-gray-300"
                      >
                        <div className="flex space-x-4">
                          <img
                            className="h-[115px] min-w-30 object-cover rounded-lg"
                            src={bio.banner}
                            alt={bio.title}
                          />
                          <div>
                            <h3 className="font-semibold line-clamp-1 text-[#124e66]">
                              {name}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {title.slice(0,200)}
                            </p>
                          </div>
                        </div>
                      </RouterLink>
                    )})}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .ql-editor {
          padding: 0;
          line-height: 2;
        }
        
        /* Keep existing Quill editor styles */
        .ql-editor h1 { font-size: 2em; }
        .ql-editor h2 { font-size: 1.5em; }
        .ql-editor h3 { font-size: 1.17em; }
        .ql-editor h4 { font-size: 1em; }
        .ql-editor h5 { font-size: 0.83em; }
        .ql-editor h6 { font-size: 0.67em; }
        .ql-editor .ql-size-small { font-size: 0.75em; }
        .ql-editor .ql-size-large { font-size: 1.5em; }
        .ql-editor .ql-size-huge { font-size: 2.5em; }
        .ql-editor p { margin-bottom: 1em; }
        .ql-editor ul, .ql-editor ol {
          padding-left: 1.5em;
          margin-bottom: 1em;
        }
        .ql-editor li { margin-bottom: 0.5em; }
        .ql-editor a {
          
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}