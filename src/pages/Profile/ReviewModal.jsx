import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useGiveReviewMutation } from "../../redux/Profile/ProfileGetSlice";

const ReviewModal = ({ isOpen, onClose, orderId }) => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [giveReview, { isLoading }] = useGiveReviewMutation();
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the giveReview mutation with the required data
      await giveReview({
        orderId,
        review: { stars: rating, comment: message },
      }).unwrap(); // unwrap() to handle the resolved/rejected promise
      setRating(0);
      setMessage("");
      setError(null);
      onClose(); // Close the modal on success
    } catch (err) {
      setError("Failed to submit review. Please try again.");
      console.error("Review submission error:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#94b31685] backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <div className="flex space-x-1 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer text-2xl ${
                    rating >= star ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              className="mt-1 resize-none block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your review..."
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 hover:cursor-pointer bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 hover:cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700"
              disabled={rating === 0 || isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
