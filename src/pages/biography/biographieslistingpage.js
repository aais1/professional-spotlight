import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Biographycard from "../../components/Biographies/biographycard";
import Poppularbiography from "../../components/Biographies/poppularbiography";
import sendRequest from "../../utils/sendrequest";
import { Link as RouterLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BiographiesListingPage() {
  const [biographies, setBiographies] = useState([]);
  const [popularBiographies, setPopularBiographies] = useState([]);
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const [isLoadingBiographies, setIsLoadingBiographies] = useState(false);
  const [isLoadingPopularBiographies, setIsLoadingPopularBiographies] = useState(false);
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(false);

  const categories = [
    "all",
    "Entrepreneurs",
    "CEO",
    "Presidents",
    "Founders",
    "Executives"
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const FetchPageData = async () => {
    setIsLoadingBiographies(true);
    try {
      const response = await sendRequest("GET", "/user/allbiographies");
      console.log("biographies response ", response.biographies);
      const sortedBiographies = (response?.biographies || []).sort((a, b) => new Date(b.date) - new Date(a.date));
      setBiographies(sortedBiographies);
    } catch (error) {
      console.error("Error fetching biographies:", error);
      toast.error("Failed to fetch biographies. Please try again later.");
    } finally {
      setIsLoadingBiographies(false);
    }
  };

  const FetchPopularData = async () => {
    setIsLoadingPopularBiographies(true);
    try {
      const response = await sendRequest("GET", "/user/popularbiographies");
      console.log("popular ", response);
      setPopularBiographies(response?.biographies || []);
    } catch (error) {
      console.error("Error fetching popular biographies:", error);
      toast.error("Failed to fetch popular biographies. Please try again later.");
    } finally {
      setIsLoadingPopularBiographies(false);
    }
  };

  useEffect(() => {
    FetchPageData();
    FetchPopularData();
  }, []);


  //gen perma links
  useEffect(() => {
    window.history.replaceState(selectedCategory, "Biographies", `/leaders-journey/${selectedCategory}`);
  }, [selectedCategory])

  const filteredBiographies =
    selectedCategory === "all"
      ? biographies
      : biographies.filter(
          (biography) =>
            biography.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const totalPages = Math.ceil(filteredBiographies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBiographies = filteredBiographies.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isChecked) {
      toast.error("You must agree to the privacy policy and terms.");
      return;
    }

    setIsLoadingSubscription(true);
    try {
      const response = await sendRequest("POST", "/user/biography/subscribe", {
        email: email,
      });
      console.log("Subscription successful:", response);
      if (response.message === "Subscribed successfully") {
        toast.success("Subscribed successfully!");
        setEmail("");
        setIsChecked(false);
      } else {
        toast.warning("You may have already subscribed with this email!");
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsLoadingSubscription(false);
    }
  };

  return (
    <>
      <ToastContainer />
      {(isLoadingBiographies || isLoadingPopularBiographies) && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#124e66]"></div>
        </div>
      )}

      <div className="bg-white relative pt-1 p-2 space-y-4">
        <h1 className="text-2xl sm:text-6xl font-[Frutiger] font-semibold text-center text-[#124e66]">
          Biographies
        </h1>
        <div
          className="space-x-3 mt-4 sm:space-x-5 flex overflow-x-auto sm:justify-center w-full md:w-full md:mx-auto bg-[#124e66] "
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", whiteSpace: "nowrap", overflowX: "scroll" }}
        >
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {categories.map((category) => (
            <button
            key={category}
            className={`p-2 m-1  whitespace-nowrap ${
              selectedCategory === category ? "bg-white md:px-4 rounded-sm  font-semibold text-black" : "text-white"
            }
            
            `}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}{" "}{
              category!=="all" && "Biographies"
            }
            </button>
          ))}

        </div>
      </div>

      <div className="sm:flex bg-white px-4 space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="bg-white flex flex-col mx-4 sm:mx-0 sm:w-3/4 items-center justify-center sm:justify-start sm:p-4 min-h-screen sm:overflow-y-auto space-y-4">
          {isLoadingBiographies ? (
            <div className="flex justify-center items-center w-full h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#124e66]"></div>
            </div>
          ) : paginatedBiographies.length > 0 ? (
            paginatedBiographies.map((biography) => (
              <Link
                key={biography._id}
                to={{
                  pathname: `/biography/${biography.slug}`,
                }}
                state={{ biography, popularBiographies }}
                className="no-underline w-full sm:w-5/6"
              >
                <Biographycard Biographycard={biography} />
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">No biographies available.</p>
          )}

          <div className="flex justify-center items-center space-x-2 mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              } bg-gray-200 text-xs sm:text-sm p-2 m-1 hover:bg-gray-300 rounded-md`}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              } text-xs sm:text-sm bg-gray-200 p-2 m-1 hover:bg-gray-300 rounded-md`}
            >
              Next
            </button>
          </div>
        </div>

        <div className="w-full sm:w-1/4 bg-white sm:overflow-y-auto space-y-4">
          <div className="sticky sm:top-0 flex flex-col mr-1 ml-1 sm:ml-0 mb-2 sm:mb-0 sm:p-4 space-y-4">
            {isLoadingPopularBiographies ? (
              <div className="flex justify-center items-center h-24">
                <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-[#124e66]"></div>
              </div>
            ) : (
              popularBiographies.length > 0 && (
                <Poppularbiography Poppularbiography={popularBiographies[0]} />
              )
            )}
            <div className="grid space-y-1 justify-center mt-4">
              <h2 className="text-[#124e66]">Subscribe to our newsletter</h2>
              <form onSubmit={handleSubmit} className="w-full space-y-4">
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
                  className={`border rounded-md w-full h-10 hover:shadow-lg bg-[#124e66] text-white mt-2 ${
                    isLoadingSubscription ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoadingSubscription}
                >
                  {isLoadingSubscription ? (
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                    </div>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </form>
              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  className="border"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  disabled={isLoadingSubscription}
                />
                <p className="text-xs">
                  I have read{" "}
                  <a href="/terms-and-conditions" className="text-blue-500 font-[Calibri] underline">
                    Privacy policy and terms of condition
                  </a>
                </p>
              </div>
              <div className="mt-12">
                <div className="p-2 space-y-4">
                  <h2 className="text-white inline px-2 py-1 rounded-lg bg-[#124e66] font-semibold text-start border text-lg cursor-pointer">Popular</h2>
                  <div className="border border-[#124e66] w-full my-2"></div>
                  <div className="space-y-4">
                    {popularBiographies?.map((bio) =>
                    { const [name,title]= bio.title.split(':')
                      return (
                      <RouterLink
                        key={bio._id}
                        to={{
                          pathname: `/biography/${bio.slug}`,
                        }}
                        state={{ biography: bio, popularBiographies }}
                        className="flex p-1 bg-gray-100 border border-gray-300 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
                      >
                        <div className="min-w-[95px] h-24">
                          <img
                            src={bio.banner}
                            alt={bio.title}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <div className="ml-4">
                          <p className=" text-[#124e66] font-semibold line-clamp-1">
                            {name}
                          </p>
                          <p className=" text-gray-500 text-sm font-semibold break-all line-clamp-2">
                            {title.slice(0,100)}
                          </p>
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
    </>
  );
}