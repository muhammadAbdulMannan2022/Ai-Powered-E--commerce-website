"use client";

import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Title from "../../../helpers/Title";
import { useGetReviewsQuery } from "../../../redux/features/Products/ProductsSlice";

export default function CustomerReviewSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: reviewsData, isLoading, isError } = useGetReviewsQuery(); // Fetch reviews using the query hook
  const [reviews, setReviews] = useState([]);

  // Map fetched data to the component's expected format
  useEffect(() => {
    if (reviewsData) {
      const formattedReviews = reviewsData.map((review) => ({
        id: review.order_number,
        rating: review.stars,
        text: review.comment,
        author: {
          name: review.full_name,
          title: "Customer", // Placeholder since title isn't provided in the API data
          avatar: review.user_image,
        },
      }));
      setReviews(formattedReviews);
    }
  }, [reviewsData]);

  const reviewsPerSlide = 2;
  const totalSlides = Math.ceil(reviews.length / reviewsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]); // Update dependency to totalSlides to reflect changes in reviews length

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white text-center">
        <p>Loading reviews...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white text-center">
        <p>Error loading reviews. Please try again later.</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white text-center">
        <p>No reviews available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Title
          title={
            <>
              Customer <span className="text-[#94B316]">Review</span>
            </>
          }
        />
        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-[#94B31680] hover:bg-[#94B316] transition-colors hover:cursor-pointer"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-[#94B31680] hover:bg-[#94B316] transition-colors hover:cursor-pointer"
            aria-label="Next reviews"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Reviews Container */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {Array.from({ length: totalSlides }, (_, slideIndex) => (
            <div key={slideIndex} className="w-full flex-shrink-0">
              <div className="grid md:grid-cols-2 gap-6">
                {reviews
                  .slice(
                    slideIndex * reviewsPerSlide,
                    (slideIndex + 1) * reviewsPerSlide
                  )
                  .map((review) => (
                    <div
                      key={review.id}
                      className="bg-gray-50 rounded-lg p-6 border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                      <div>
                        {/* Star Rating */}
                        <div className="flex items-center gap-1 mb-4">
                          {renderStars(review.rating)}
                        </div>
                        {/* Review Text */}
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">
                          {review.text}
                        </p>
                      </div>
                      {/* Author Info */}
                      <div className="flex items-center gap-3">
                        <img
                          src={review.author.avatar || "/placeholder.svg"}
                          alt={review.author.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">
                            {review.author.name}
                          </h4>
                          <p className="text-gray-500 text-xs">
                            {review.author.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot Navigation */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: totalSlides }, (_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide
                ? "bg-[#94B316]"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
