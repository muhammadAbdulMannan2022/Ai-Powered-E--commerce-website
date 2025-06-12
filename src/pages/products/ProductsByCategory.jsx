import React, { useState } from "react";
import { useLocation } from "react-router"; // Updated to react-router-dom
import Card from "../../helpers/Card";

export default function ProductsByCategory({ products }) {
  const location = useLocation();
  const category = location.state?.category || "All Products";
  const categoryProducts =
    location.state?.products ||
    products.filter((product) => product.category === category);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  // Calculate total pages
  const totalPages = Math.ceil(categoryProducts.length / productsPerPage);

  // Get current page products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = categoryProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on page change
  };

  // Generate page numbers for display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Show up to 5 page numbers at a time
    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total pages <= 5
      startPage = 1;
      endPage = totalPages;
    } else {
      // Show a range of pages around the current page
      const maxPagesBefore = Math.floor(maxPagesToShow / 2);
      const maxPagesAfter = Math.ceil(maxPagesToShow / 2) - 1;

      if (currentPage <= maxPagesBefore) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + maxPagesAfter >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBefore;
        endPage = currentPage + maxPagesAfter;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 md:px-10">
      <h2 className="text-4xl mb-4 font-semibold text-[#3F4919]">{category}</h2>
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {currentProducts.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-green-700 text-white hover:bg-green-800 hover:cursor-pointer"
            }`}
          >
            Previous
          </button>

          {/* Page Numbers */}
          {getPageNumbers().map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-4 py-2 rounded-md text-sm font-medium hover:cursor-pointer ${
                currentPage === pageNumber
                  ? "bg-green-700 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {pageNumber}
            </button>
          ))}

          {/* Ellipsis for skipped pages */}
          {totalPages > 5 && currentPage < totalPages - 2 && (
            <span className="px-4 py-2 text-sm font-medium">...</span>
          )}

          {/* Last Page (if not already shown) */}
          {totalPages > 5 &&
            getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
              <button
                onClick={() => handlePageChange(totalPages)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  currentPage === totalPages
                    ? "bg-green-700 text-white hover:cursor-pointer"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {totalPages}
              </button>
            )}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-green-700 text-white hover:bg-green-800 hover:cursor-pointer"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
