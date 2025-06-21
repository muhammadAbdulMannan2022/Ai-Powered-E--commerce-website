import React, { useState } from "react";
import Title from "../../../helpers/Title";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useGetFaqQuery } from "../../../redux/features/Products/ProductsSlice";

export default function Faq() {
  const { data: faqs, isLoading, isError } = useGetFaqQuery();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="bg-[#F5F8E8] flex flex-col items-center justify-center py-8 sm:py-10">
        <div>
          <Title
            title={
              <>
                Have any <span className="text-[#94B316]">Questions?</span>
              </>
            }
          />
        </div>
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-center text-base sm:text-lg">Loading FAQs...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div className="bg-[#F5F8E8] flex flex-col items-center justify-center py-8 sm:py-10">
        <div>
          <Title
            title={
              <>
                Have any <span className="text-[#94B316]">Questions?</span>
              </>
            }
          />
        </div>
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-center text-base sm:text-lg text-red-600">
            Something went wrong. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  // Render FAQs when data is available
  return (
    <div className="bg-[#F5F8E8] flex flex-col items-center justify-center py-8 sm:py-10">
      <div>
        <Title
          title={
            <>
              Have any <span className="text-[#94B316]">Questions?</span>
            </>
          }
        />
      </div>
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 mt-10">
        {faqs?.map((faq) => (
          <div key={faq.id} className="hover:cursor-pointer mb-[5px]">
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full text-left p-3 sm:p-4 bg-white hover:cursor-pointer rounded-lg shadow-sm flex justify-between items-center gap-2 sm:gap-4 focus:outline-none"
            >
              <span className="text-base sm:text-lg font-medium flex-1">
                {faq.question}
              </span>
              <span className="text-sm sm:text-base">
                {openIndex === faq.id ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>
            {openIndex === faq.id && faq.answer && (
              <div className="p-3 sm:p-4 bg-gray-50 text-gray-700 rounded-b-lg text-sm sm:text-base">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
