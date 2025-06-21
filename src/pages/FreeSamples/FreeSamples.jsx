import React, { useEffect, useState } from "react";
import TopFreeSamples from "./TopFreeSamples";
import BottomFreeSamples from "./BottomFreeSamples";
import Card from "../../helpers/Card";
import { Link, useLocation } from "react-router";
import Button from "../../helpers/Button";
import { useGetRecentQuery } from "../../redux/Profile/ProfileGetSlice";
import { useGetProductQuery } from "../../redux/features/Products/ProductsSlice";

export default function FreeSamples() {
  const location = useLocation();
  const id = location?.state?.id ?? "brulee-wood-grain-light-tone";
  const [selectedProduct, setSeclectedProduct] = useState({});
  const { data: product, isLoading } = useGetProductQuery(id);

  // end of local
  const [recentView, setRecentView] = useState([]);
  const token = localStorage.getItem("access_token");
  const {
    data: recentData,
    isLoading: recientLoading,
    isError,
  } = useGetRecentQuery(undefined, {
    skip: !token,
  });
  useEffect(() => {
    if (!recientLoading) setRecentView(recentData);
    console.log(recentData, "lllllllllllllllllllllllllllllllllllllllll");
    console.log(token);
  }, [recentData, recientLoading]);
  useEffect(() => {
    if (!isLoading) setSeclectedProduct(product);
  }, [product, isLoading]);

  return (
    <div>
      <TopFreeSamples product={selectedProduct} />
      <BottomFreeSamples product={selectedProduct} />

      {recentView && (
        <div>
          <div className="mb-10 px-4 flex flex-col items-center justify-center">
            <div className="flex items-start mb-4">
              <h2 className="text-4xl mb-4 font-semibold text-[#3F4919]">
                Recent View
              </h2>
            </div>
            <div className="w-full flex items-center justify-center ">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center w-full  max-w-7xl">
                {recentView &&
                  [...recentView]
                    .slice(0, 3)
                    .map((product) => (
                      <Card key={product.id} {...product.wood_type_details} />
                    ))}
              </div>
            </div>
            <Link
              to="/products/allProductByCategory"
              state={{
                category: "Recent View",
                products: recentView,
              }}
              className="text-sm text-green-700 hover:underline mt-10"
            >
              <Button label="See All" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
