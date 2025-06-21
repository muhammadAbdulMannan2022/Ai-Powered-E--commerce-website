import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import Card from "../../helpers/Card";
import Button from "../../helpers/Button";
import ProductsByCategory from "./ProductsByCategory";
import { useGetProductsQuery } from "../../redux/features/Products/ProductsSlice";

export default function Fencing() {
  const { data, isLoading, isError } = useGetProductsQuery();
  const location = useLocation();

  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    if (!isLoading && data) {
      setCategoryData(data); // Store the full array of categories
    }
  }, [data, isLoading]);

  const renderSection = (category) => {
    const previewProducts = category.wood_types.slice(0, 3);

    if (previewProducts.length === 0) return null; // Don't show empty categories

    return (
      <div
        key={category.id}
        className="mb-10 px-4 flex flex-col items-center justify-center"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-4xl mb-4 font-semibold text-[#3F4919]">
            {category.name}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center w-full">
          {previewProducts.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              slug={product.slug}
              name={product.name}
              tagline={product.tagline}
              secondary_tagline={product.secondary_tagline}
              price_display={product.price_display}
              actual_price={product.actual_price}
              available_colors={product.color_images}
              image_url={
                product.color_images[0]?.image_url || "/placeholder.svg"
              }
              altText={`${product.name} product image`}
            />
          ))}
        </div>
        {console.log(category)}

        <Link
          to="/products/allProductByCategory"
          state={{
            category: category.slug,
            products: category.wood_types,
          }}
          className="text-sm text-green-700 hover:underline mt-10"
        >
          <Button label="See All" />
        </Link>
      </div>
    );
  };

  return (
    <>
      {location.pathname === "/products/fencing_list" ? (
        <div className="max-w-7xl mx-auto py-10">
          {console.log(categoryData)}
          {categoryData &&
            categoryData.map((category) => renderSection(category))}
        </div>
      ) : location.pathname === "/products/allProductByCategory" ? (
        <ProductsByCategory />
      ) : null}
    </>
  );
}
