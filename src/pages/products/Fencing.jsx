import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router"; // Update to react-router-dom
import Card from "../../helpers/Card";
import Button from "../../helpers/Button";
import ProductsByCategory from "./ProductsByCategory";
import { useGetProductsQuery } from "../../redux/features/Products/ProductsSlice";

export default function Fencing() {
  const [ProductData, setProductsData] = useState([]);
  const { data, isLoading, isError } = useGetProductsQuery();
  const location = useLocation();

  const [bruleeWood, setBruleeWood] = useState([]);
  const [redBordeaux, setRedBordeaux] = useState([]);
  const [caramelWood, setCaramelWood] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      setProductsData(data);
    }
  }, [data]);

  useEffect(() => {
    if (ProductData.length > 0) {
      setBruleeWood(
        ProductData.filter((product) =>
          product.name.toLowerCase().includes("brulee")
        ).slice(0, 3)
      );
      setRedBordeaux(
        ProductData.filter((product) =>
          product.name.toLowerCase().includes("red bordeaux")
        ).slice(0, 3)
      );
      setCaramelWood(
        ProductData.filter((product) =>
          product.name.toLowerCase().includes("caramel")
        ).slice(0, 3)
      );
    }
  }, [ProductData]);

  const renderSection = (title, data) => (
    <div className="mb-10 px-4 flex flex-col items-center justify-center">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-4xl mb-4 font-semibold text-[#3F4919]">{title}</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center w-full">
        {data.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
      <Link
        to="/products/allProductByCategory"
        state={{
          category: title,
          products: ProductData.filter((product) =>
            product.name.toLowerCase().includes(title.toLowerCase())
          ),
        }}
        className="text-sm text-green-700 hover:underline mt-10"
      >
        <Button label="See All" />
      </Link>
    </div>
  );

  return (
    <>
      {location.pathname === "/products/fencing_list" ? (
        <div className="max-w-7xl mx-auto py-10">
          {renderSection("Brulee Wood", bruleeWood)}
          {renderSection("Red Bordeaux", redBordeaux)}
          {renderSection("Caramel Wood", caramelWood)}
        </div>
      ) : location.pathname === "/products/allProductByCategory" ? (
        <ProductsByCategory products={ProductData} />
      ) : null}
    </>
  );
}
