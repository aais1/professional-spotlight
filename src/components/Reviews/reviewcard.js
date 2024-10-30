import React from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FiExternalLink } from 'react-icons/fi';

const ReviewCard = ({ Review }) => {
  console.log("rev", Review);
  const { reviewer, review } = Review;
  const banner = Review.biographyDetails?.banner;
  const title = Review.biographyDetails?.title;
  const category = Review.biographyDetails?.category;
  const rating = Review.rating;
  const slug = Review.biographySlug;

  return (
    <div className="bg-[#748D92] p-6 rounded-lg shadow-md w-full max-w-md">
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <h2 className="text-xl font-bold text-[#212A31]">{title}</h2>
          <p className="text-[#2E3944] text-sm italic">by {reviewer}</p>
          <div className="mt-2">
            <p className="text-[#124E66]"><span className="font-semibold">Category:</span> {category}</p>
          </div>
        </div>
        <img src={banner} alt={title} className="w-24 h-24 rounded-full object-cover border-2 border-[#D3D9D4]" />
      </div>
      <p className="mt-4 text-sm text-[#2E3944] italic">" {review} "</p>
      <div className="mt-4 flex justify-center sm:justify-start">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`text-[#FFD700] ${i < rating ? 'fill-current' : 'text-gray-300'}`}
            size={20}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-center sm:justify-end">
        <Link to={`/biography/${slug}`} className="flex items-center text-[#124E66] hover:text-[#0d3a4d]">
          <span className="mr-2">Biography</span>
          <FiExternalLink size={16} />
        </Link>
      </div>
    </div>
  );
};

export default ReviewCard;