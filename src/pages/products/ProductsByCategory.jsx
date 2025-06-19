import React, { useState } from "react";
import { useLocation } from "react-router";
import Card from "../../helpers/Card";
import { useGetCategorysAllProductQuery } from "../../redux/features/Products/ProductsSlice";

export default function ProductsByCategory() {
  const location = useLocation();
  const category = location.state?.category || "all-products";

  const { data, isLoading, isError, refetch } = useGetCategorysAllProductQuery(
    category,
    {
      skip: !category || category === "all-products",
    }
  );

  const categoryProducts = data?.wood_types || [];

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  const totalPages = Math.ceil(categoryProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = categoryProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  console.log("Current Products:", currentProducts); // Debug log

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
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

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-700 mx-auto"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Error fetching products.{" "}
        <button onClick={() => refetch()} className="underline text-blue-500">
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 md:px-10">
      <h2 className="text-4xl mb-4 font-semibold text-[#3F4919]">
        {data?.name || category.replace(/-/g, " ")}
      </h2>
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {currentProducts.length === 0 ? (
          <div className="text-center py-10">No products found.</div>
        ) : (
          currentProducts.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              name={product.name}
              tagline={product.tagline}
              secondary_tagline={product.secondary_tagline}
              price_display={product.price_display}
              actual_price={product.actual_price}
              available_colors={
                Array.isArray(product.color_images)
                  ? product.color_images.map((img) => img.color_option)
                  : []
              }
              image_url={product.color_images?.[0]?.image_url || ""}
              altText={product.name}
              slug={product.slug}
            />
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
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

          {totalPages > 5 && currentPage < totalPages - 2 && (
            <span className="px-4 py-2 text-sm font-medium">...</span>
          )}

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
