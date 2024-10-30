// Reviews.js
import React, { useState, useEffect } from "react";
import ReviewCard from "../../components/Reviews/reviewcard";
import getApi from "../../utils/sendrequest";
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6;

  const fetchData = async () => {
    const response = await getApi("GET", "/user/reviews");
    setReviews(response.reviews);
    console.log("Reviews Data:", response.reviews);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews?.slice(indexOfFirstReview, indexOfLastReview);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#124e66]">Reviews</h1>
      <div className="grid grid-cols-1 mx-0 sm:mx-10 md:grid-cols-2 gap-6">
        {currentReviews?.map((review, index) => (
          <div key={review.id} className={`md:${index % 2 === 0 ? 'justify-self-end' : 'justify-self-start'}`}>
            <ReviewCard Review={review} />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="mx-1 px-3 py-1 rounded bg-[#124E66] text-white disabled:opacity-50"
        >
          <ChevronLeft size={20} />
        </button>
        {[...Array(Math.ceil(reviews?.length / reviewsPerPage))].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1 ? 'bg-[#124E66] text-white' : 'bg-[#748D92] text-[#212A31]'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(reviews.length / reviewsPerPage)}
          className="mx-1 px-3 py-1 rounded bg-[#124E66] text-white disabled:opacity-50"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}