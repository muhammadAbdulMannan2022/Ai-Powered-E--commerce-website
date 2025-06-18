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
  // const [product, setProduct] = useState([
  //   {
  //     id: 1,
  //     images: ["/product/1.png", "/product/2.png", "/product/3.png"],
  //     title: "Brulee Classic",
  //     price: "$24.99",
  //     features: ["15-Year warranty", "Smooth matte finish"],
  //     colors: ["#A0522D", "#8B4513", "#CD853F"],
  //     category: "Brulee Wood",
  //     name: "Brulee-wood Grain Stock",
  //     category: "Composite Decking",
  //     colorOptions: [
  //       { name: "Red Mahogany", hex: "#4A2C2A" },
  //       { name: "Charcoal", hex: "#333333" },
  //       { name: "Choice Pine Height", hex: "#8B5A2B" },
  //     ],
  //     dimensions: {
  //       enterLinearFootage: 320,
  //       quantity: 10,
  //       unitPrice: "$500",
  //     },
  //     totalPrice: "$5000",
  //     description:
  //       "Reimagine your property’s perimeter with our premium composite fence boards, engineered to blend sophisticated style and lasting performance. Available in four deep, rich hues, they preserve their natural, contemporary look season after season without fading. Crafted from 60 % recycled wood powder, 34 % plastic (including 10 % virgin plastic for strength), and 6 % high-performance additives, these fence boards offer outstanding resistance to impacts, UV rays and moisture. Maintenance is a breeze—no more sanding or staining: a simple wash with soapy water restores their original sheen and texture. Their non-slip, embossed surface and smooth, splinter-free edges ensure both comfortable handling during installation and safe enjoyment for everyone on your property. Designed to remain warp- and crack-free for over 20 years, our fence boards help upcycle wood and plastic waste, giving your outdoor living area a beautiful—and responsible—upgrade. Elevate your yard with a fence that combines elegance, durability and peace of mind.",
  //     keyFeatures: [
  //       "No warping, cracking or rotting",
  //       "75-Year Limited Warranty",
  //       "1-inch Thick Solid Decking Planks",
  //       "Fade Resistant",
  //       "Maximum width tolerance",
  //     ],
  //     shippingAndReturns: {
  //       shippingPolicy: "Details available",
  //       returnsPolicy: "Details available",
  //     },
  //     installationGuide: [
  //       { file: "/path/to/guide1.pdf", fileName: "Installation Guide 1" },
  //       { file: "/path/to/guide2.pdf", fileName: "Installation Guide 2" },
  //       { file: "/path/to/guide3.pdf", fileName: "Installation Guide 3" },
  //     ],
  //     warranty: "Details available",
  //     addToCart: true,
  //     shareOptions: ["Shop", "Tweet"],
  //   },
  //   {
  //     id: 2,
  //     images: ["/product/1.png", "/product/2.png", "/product/3.png"],
  //     title: "Brulee Classic",
  //     price: "$24.99",
  //     features: ["15-Year warranty", "Smooth matte finish"],
  //     colors: ["#A0522D", "#8B4513", "#CD853F"],
  //     category: "Brulee Wood",
  //     name: "Brulee-wood Grain Stock",
  //     category: "Composite Decking",
  //     colorOptions: [
  //       { name: "Red Mahogany", hex: "#4A2C2A" },
  //       { name: "Charcoal", hex: "#333333" },
  //       { name: "Choice Pine Height", hex: "#8B5A2B" },
  //     ],
  //     dimensions: {
  //       enterLinearFootage: 320,
  //       quantity: 10,
  //       unitPrice: "$500",
  //     },
  //     totalPrice: "$5000",
  //     description:
  //       "Reimagine your property’s perimeter with our premium composite fence boards, engineered to blend sophisticated style and lasting performance. Available in four deep, rich hues, they preserve their natural, contemporary look season after season without fading. Crafted from 60 % recycled wood powder, 34 % plastic (including 10 % virgin plastic for strength), and 6 % high-performance additives, these fence boards offer outstanding resistance to impacts, UV rays and moisture. Maintenance is a breeze—no more sanding or staining: a simple wash with soapy water restores their original sheen and texture. Their non-slip, embossed surface and smooth, splinter-free edges ensure both comfortable handling during installation and safe enjoyment for everyone on your property. Designed to remain warp- and crack-free for over 20 years, our fence boards help upcycle wood and plastic waste, giving your outdoor living area a beautiful—and responsible—upgrade. Elevate your yard with a fence that combines elegance, durability and peace of mind.",
  //     keyFeatures: [
  //       "No warping, cracking or rotting",
  //       "75-Year Limited Warranty",
  //       "1-inch Thick Solid Decking Planks",
  //       "Fade Resistant",
  //       "Maximum width tolerance",
  //     ],
  //     shippingAndReturns: {
  //       shippingPolicy: "Details available",
  //       returnsPolicy: "Details available",
  //     },
  //     installationGuide: [
  //       { file: "/path/to/guide1.pdf", fileName: "Installation Guide 1" },
  //       { file: "/path/to/guide2.pdf", fileName: "Installation Guide 2" },
  //       { file: "/path/to/guide3.pdf", fileName: "Installation Guide 3" },
  //     ],
  //     warranty: "Details available",
  //     addToCart: true,
  //     shareOptions: ["Shop", "Tweet"],
  //   },
  //   {
  //     id: 3,
  //     images: ["/product/1.png", "/product/2.png", "/product/3.png"],
  //     title: "Brulee Classic",
  //     price: "$24.99",
  //     features: ["15-Year warranty", "Smooth matte finish"],
  //     colors: ["#A0522D", "#8B4513", "#CD853F"],
  //     category: "Brulee Wood",
  //     name: "Brulee-wood Grain Stock",
  //     category: "Composite Decking",
  //     colorOptions: [
  //       { name: "Red Mahogany", hex: "#4A2C2A" },
  //       { name: "Charcoal", hex: "#333333" },
  //       { name: "Choice Pine Height", hex: "#8B5A2B" },
  //     ],
  //     dimensions: {
  //       enterLinearFootage: 320,
  //       quantity: 10,
  //       unitPrice: "$500",
  //     },
  //     totalPrice: "$5000",
  //     description:
  //       "Reimagine your property’s perimeter with our premium composite fence boards, engineered to blend sophisticated style and lasting performance. Available in four deep, rich hues, they preserve their natural, contemporary look season after season without fading. Crafted from 60 % recycled wood powder, 34 % plastic (including 10 % virgin plastic for strength), and 6 % high-performance additives, these fence boards offer outstanding resistance to impacts, UV rays and moisture. Maintenance is a breeze—no more sanding or staining: a simple wash with soapy water restores their original sheen and texture. Their non-slip, embossed surface and smooth, splinter-free edges ensure both comfortable handling during installation and safe enjoyment for everyone on your property. Designed to remain warp- and crack-free for over 20 years, our fence boards help upcycle wood and plastic waste, giving your outdoor living area a beautiful—and responsible—upgrade. Elevate your yard with a fence that combines elegance, durability and peace of mind.",
  //     keyFeatures: [
  //       "No warping, cracking or rotting",
  //       "75-Year Limited Warranty",
  //       "1-inch Thick Solid Decking Planks",
  //       "Fade Resistant",
  //       "Maximum width tolerance",
  //     ],
  //     shippingAndReturns: {
  //       shippingPolicy: "Details available",
  //       returnsPolicy: "Details available",
  //     },
  //     installationGuide: [
  //       { file: "/path/to/guide1.pdf", fileName: "Installation Guide 1" },
  //       { file: "/path/to/guide2.pdf", fileName: "Installation Guide 2" },
  //       { file: "/path/to/guide3.pdf", fileName: "Installation Guide 3" },
  //     ],
  //     warranty: "Details available",
  //     addToCart: true,
  //     shareOptions: ["Shop", "Tweet"],
  //   },
  // ]);

  const token = localStorage.getItem("access_token");
  const {
    data: recentData,
    isLoading: recientLoading,
    isError,
  } = useGetRecentQuery(undefined, {
    skip: !token,
  });
  // seclect product
  // const selectedProduct = id
  //   ? product.find((p) => p.id === id) || product[0]
  //   : product[0];
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
