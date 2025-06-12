import React, { useState } from "react";
import TopFreeSamples from "./TopFreeSamples";
import BottomFreeSamples from "./BottomFreeSamples";
import Card from "../../helpers/Card";
import { Link } from "react-router";
import Button from "../../helpers/Button";

export default function FreeSamples() {
  const [recentView] = useState([
    // Brulee Wood (1–10)
    {
      id: 1,
      image: "/product/1.png",
      title: "Brulee Classic",
      price: "$24.99",
      features: ["15-Year warranty", "Smooth matte finish"],
      colors: ["#A0522D", "#8B4513", "#CD853F"],
      category: "Brulee Wood",
    },
    {
      id: 2,
      image: "/product/1.png",
      title: "Brulee Natural",
      price: "$26.99",
      features: ["Eco-friendly materials", "Textured surface"],
      colors: ["#DEB887", "#D2691E", "#FFE4B5"],
      category: "Brulee Wood",
    },
    {
      id: 3,
      image: "/product/1.png",
      title: "Brulee Deep Grain",
      price: "$27.99",
      features: ["Slip-resistant", "Deep grain texture"],
      colors: ["#8B4513", "#5D4037", "#CD853F"],
      category: "Brulee Wood",
    },
    {
      id: 4,
      image: "/product/1.png",
      title: "Brulee Walnut Finish",
      price: "$29.99",
      features: ["20-Year limited warranty", "UV resistant"],
      colors: ["#654321", "#D2691E", "#A0522D"],
      category: "Brulee Wood",
    },
    {
      id: 5,
      image: "/product/1.png",
      title: "Brulee Rich Oak",
      price: "$31.99",
      features: ["Premium build", "Smooth polish"],
      colors: ["#F4A460", "#DAA520", "#BC8F8F"],
      category: "Brulee Wood",
    },
    {
      id: 6,
      image: "/product/1.png",
      title: "Brulee Rustic",
      price: "$28.49",
      features: ["Rustic appearance", "Water resistant"],
      colors: ["#D2B48C", "#8B4513", "#DEB887"],
      category: "Brulee Wood",
    },
    {
      id: 7,
      image: "/product/1.png",
      title: "Brulee Maple Touch",
      price: "$30.00",
      features: ["Subtle grains", "Scratch resistant"],
      colors: ["#FFEBCD", "#EEDC82", "#CDAA7D"],
      category: "Brulee Wood",
    },
    {
      id: 8,
      image: "/product/1.png",
      title: "Brulee Hazelnut",
      price: "$27.50",
      features: ["Rich color tone", "Durable material"],
      colors: ["#A0522D", "#8B4513", "#BC8F8F"],
      category: "Brulee Wood",
    },
    {
      id: 9,
      image: "/product/1.png",
      title: "Brulee Premium",
      price: "$33.49",
      features: ["Premium finish", "Long lifespan"],
      colors: ["#D2B48C", "#F5DEB3", "#CD853F"],
      category: "Brulee Wood",
    },
    {
      id: 10,
      image: "/product/1.png",
      title: "Brulee Mocha",
      price: "$35.00",
      features: ["Elegant design", "Textured surface"],
      colors: ["#8B4513", "#5D4037", "#A0522D"],
      category: "Brulee Wood",
    },
  ]);
  const [product, setProduct] = useState({
    id: 1,
    images: ["/product/1.png", "/product/2.png", "/product/3.png"],
    title: "Brulee Classic",
    price: "$24.99",
    features: ["15-Year warranty", "Smooth matte finish"],
    colors: ["#A0522D", "#8B4513", "#CD853F"],
    category: "Brulee Wood",
    name: "Brulee-wood Grain Stock",
    category: "Composite Decking",
    colorOptions: [
      { name: "Red Mahogany", hex: "#4A2C2A" },
      { name: "Charcoal", hex: "#333333" },
      { name: "Choice Pine Height", hex: "#8B5A2B" },
    ],
    dimensions: {
      enterLinearFootage: 320,
      quantity: 10,
      unitPrice: "$500",
    },
    totalPrice: "$5000",
    description:
      "Reimagine your property’s perimeter with our premium composite fence boards, engineered to blend sophisticated style and lasting performance. Available in four deep, rich hues, they preserve their natural, contemporary look season after season without fading. Crafted from 60 % recycled wood powder, 34 % plastic (including 10 % virgin plastic for strength), and 6 % high-performance additives, these fence boards offer outstanding resistance to impacts, UV rays and moisture. Maintenance is a breeze—no more sanding or staining: a simple wash with soapy water restores their original sheen and texture. Their non-slip, embossed surface and smooth, splinter-free edges ensure both comfortable handling during installation and safe enjoyment for everyone on your property. Designed to remain warp- and crack-free for over 20 years, our fence boards help upcycle wood and plastic waste, giving your outdoor living area a beautiful—and responsible—upgrade. Elevate your yard with a fence that combines elegance, durability and peace of mind.",
    keyFeatures: [
      "No warping, cracking or rotting",
      "75-Year Limited Warranty",
      "1-inch Thick Solid Decking Planks",
      "Fade Resistant",
      "Maximum width tolerance",
    ],
    shippingAndReturns: {
      shippingPolicy: "Details available",
      returnsPolicy: "Details available",
    },
    installationGuide: [
      { file: "/path/to/guide1.pdf", fileName: "Installation Guide 1" },
      { file: "/path/to/guide2.pdf", fileName: "Installation Guide 2" },
      { file: "/path/to/guide3.pdf", fileName: "Installation Guide 3" },
    ],
    warranty: "Details available",
    addToCart: true,
    shareOptions: ["Shop", "Tweet"],
  });

  return (
    <div>
      <TopFreeSamples product={product} />
      <BottomFreeSamples product={product} />

      <div>
        <div className="mb-10 px-4 flex flex-col items-center justify-center">
          <div className="flex items-start mb-4">
            <h2 className="text-4xl mb-4 font-semibold text-[#3F4919]">
              Recent View
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center w-full">
            {[...recentView].slice(0, 3).map((product) => (
              <Card key={product.id} {...product} />
            ))}
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
    </div>
  );
}
