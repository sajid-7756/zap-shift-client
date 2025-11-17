import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const { userName, user_photoURL, review: testimonial } = review;

  return (
    <div className="card bg-base-100 shadow-xl rounded-3xl max-w-md mx-auto relative overflow-hidden border border-base-200">
      {/* Large Quote Icon */}
      <FaQuoteLeft
        className="absolute -top-2.5 -left-2.5 text-primary opacity-30 z-0"
        size={50}
      />

      <div className="card-body relative z-10">
        {/* Quote Text */}
        <p className="text-lg text-base-content leading-relaxed mb-6">
          {testimonial}
        </p>

        {/* Dashed Separator Line */}
        <div className="border-t-2 border-dashed border-base-200 w-full mb-6"></div>

        {/* Author Information */}
        <div className="flex items-center">
          {/* Avatar */}
          <div className="avatar placeholder mr-4">
            <div className="bg-primary text-neutral-content rounded-full w-12 h-12 flex items-center justify-center">
              <img src={user_photoURL} alt="" />
            </div>
          </div>

          {/* Name and Title */}
          <div>
            <p className="text-xl font-semibold text-base-content">
              {userName}
            </p>
            <p className="text-sm text-base-content/70">
              Senior Product Designer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
