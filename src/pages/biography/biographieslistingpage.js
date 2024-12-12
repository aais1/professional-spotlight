import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Biographycard from "../../components/Biographies/biographycard";
import Poppularbiography from "../../components/Biographies/poppularbiography";
import sendRequest from "../../utils/sendrequest";
import { toast, ToastContainer } from "react-toastify";
import { Link as RouterLink } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function BiographiesListingPage() {
  const [biographies, setBiographies] = useState([]);
  const [popularBiographies, setPopularBiographies] = useState([]);
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const [isLoadingBiographies, setIsLoadingBiographies] = useState(false);
  const [isLoadingPopularBiographies, setIsLoadingPopularBiographies] =
    useState(false);
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(false);

  const categories = [
    "all",
    "Entrepreneurs",
    "CEO",
    "Presidents",
    "Founders",
    "Executive",
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 4;

  // Fetch the page data (biographies)
  const FetchPageData = async () => {
    setIsLoadingBiographies(true);
    try {
      // Build the query string with pagination and category filters
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: itemsPerPage,
        category: selectedCategory,
      }).toString();

      // Send the GET request with query parameters
      const response = await sendRequest("GET", `/user/allbiographies?${queryParams}`);
      
      // Sort the biographies by the date (newest first)
      const sortedBiographies = (response?.biographies || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setBiographies(sortedBiographies);
      setTotalPages(response.totalPages);  // Set the total pages from the backend
    } catch (error) {
      console.error("Error fetching biographies:", error);
      toast.error("Failed to fetch biographies. Please try again later.");
    } finally {
      setIsLoadingBiographies(false);
    }
  };

  // Fetch popular biographies
  const FetchPopularData = async () => {
    setIsLoadingPopularBiographies(true);
    try {
      const response = await sendRequest("GET", "/user/popularbiographies");
      setPopularBiographies(response?.biographies || []);
    } catch (error) {
      console.error("Error fetching popular biographies:", error);
      toast.error("Failed to fetch popular biographies. Please try again later.");
    } finally {
      setIsLoadingPopularBiographies(false);
    }
  };

  useEffect(()=>{
    FetchPopularData();
  },[])

  useEffect(() => {
    FetchPageData();
  }, [currentPage, selectedCategory]);

  // Update URL with the selected category
  useEffect(() => {
    window.history.replaceState(
      selectedCategory,
      "Biographies",
      `/leaders-journey/${selectedCategory}`
    );
  }, [selectedCategory]);

  // Handle pagination
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

  // Handle subscription form
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
      if (response.message === "Subscribed successfully") {
        toast.success("Subscribed successfully!");
        setEmail("");
        setIsChecked(false);
      } else {
        toast.warning("You may have already subscribed with this email!");
      }
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsLoadingSubscription(false);
    }
  };

  return (
    <>
      <ToastContainer />
      
      <div className="bg-white relative pt-1 p-2 space-y-4">
        <h1 className="text-2xl sm:text-6xl font-[Frutiger] font-semibold text-center text-[#124e66]">
          Biographies
        </h1>

        <div className="space-x-3 mt-4 sm:space-x-5 flex overflow-x-auto sm:justify-center w-full md:w-full md:mx-auto bg-[#124e66]">
          {categories.map((category) => (
            <button
              key={category}
              className={`p-2 m-1  whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-white md:px-4 rounded-sm font-semibold text-black"
                  : "text-white"
              }`}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
            >
              {category?.charAt(0).toUpperCase() + category?.slice(1)}{" "}
              {category !== "all" && "Biographies"}
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
          ) : biographies.length > 0 ? (
            biographies.map((biography) => (
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
              className={`${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""} bg-gray-200 text-xs sm:text-sm p-2 m-1 hover:bg-gray-300 rounded-md`}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""} text-xs sm:text-sm bg-gray-200 p-2 m-1 hover:bg-gray-300 rounded-md`}
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
              <form onSubmit={handleSubmit} className="w-full flex flex-col">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2 border rounded mb-2"
                  required
                />
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                    className="mr-2"
                  />
                  <span>
                    I agree to the{" "}
                    <a href="/privacy-policy" className="text-blue-500">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="/terms" className="text-blue-500">
                      Terms of Service
                    </a>
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={isLoadingSubscription}
                  className="mt-4 bg-[#124e66] text-white p-2 rounded"
                >
                  Subscribe
                </button>
              </form>
            </div>
            <div className="space-y-4">
                    {popularBiographies?.map((bio) => {
                      const [name, title] = bio.title.split(":");
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
                              {title?.slice(0, 100)}
                            </p>
                          </div>
                        </RouterLink>
                      );
                    })}
                  </div>
          </div>
        </div>
      </div>
    </>
  );
}
