import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router"; // Update to react-router-dom
import Card from "../../helpers/Card";
import Button from "../../helpers/Button";
import ProductsByCategory from "./ProductsByCategory";

export default function Fencing() {
  const [ProductData] = useState([
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
    // Red Bordeaux (11–20)
    {
      id: 11,
      image: "/product/2.png",
      title: "Red Bordeaux Original",
      price: "$29.99",
      features: ["20-Year warranty", "Mineral streaking"],
      colors: ["#8B0000", "#B22222", "#CD5C5C"],
      category: "Red Bordeaux",
    },
    {
      id: 12,
      image: "/product/2.png",
      title: "Red Bordeaux Natural",
      price: "$31.99",
      features: ["Classic style", "Durable build"],
      colors: ["#DC143C", "#A52A2A", "#B22222"],
      category: "Red Bordeaux",
    },
    {
      id: 13,
      image: "/product/2.png",
      title: "Red Bordeaux Matte",
      price: "$32.50",
      features: ["Matte finish", "UV protection"],
      colors: ["#8B0000", "#FA8072", "#CD5C5C"],
      category: "Red Bordeaux",
    },
    {
      id: 14,
      image: "/product/2.png",
      title: "Red Bordeaux Premium",
      price: "$34.99",
      features: ["Enhanced texture", "Weather resistant"],
      colors: ["#B22222", "#A52A2A", "#DEB887"],
      category: "Red Bordeaux",
    },
    {
      id: 15,
      image: "/product/2.png",
      title: "Red Bordeaux Vintage",
      price: "$36.99",
      features: ["Vintage finish", "Natural grain"],
      colors: ["#CD5C5C", "#A0522D", "#F4A460"],
      category: "Red Bordeaux",
    },
    {
      id: 16,
      image: "/product/2.png",
      title: "Red Bordeaux Supreme",
      price: "$38.00",
      features: ["High quality", "Subtle sheen"],
      colors: ["#8B0000", "#800000", "#BC8F8F"],
      category: "Red Bordeaux",
    },
    {
      id: 17,
      image: "/product/2.png",
      title: "Red Bordeaux Smooth",
      price: "$35.99",
      features: ["Smooth surface", "Fade resistant"],
      colors: ["#DC143C", "#CD5C5C", "#FFE4B5"],
      category: "Red Bordeaux",
    },
    {
      id: 18,
      image: "/product/2.png",
      title: "Red Bordeaux Rosewood",
      price: "$37.25",
      features: ["Rosewood tone", "Long lasting"],
      colors: ["#8B0000", "#CD5C5C", "#BC8F8F"],
      category: "Red Bordeaux",
    },
    {
      id: 19,
      image: "/product/2.png",
      title: "Red Bordeaux Bold",
      price: "$39.00",
      features: ["Bold color", "Durable core"],
      colors: ["#B22222", "#8B0000", "#CD5C5C"],
      category: "Red Bordeaux",
    },
    {
      id: 20,
      image: "/product/2.png",
      title: "Red Bordeaux Signature",
      price: "$40.00",
      features: ["Signature style", "Top durability"],
      colors: ["#8B0000", "#FA8072", "#FFE4B5"],
      category: "Red Bordeaux",
    },
    // Caramel Wood (21–30)
    {
      id: 21,
      image: "/product/3.png",
      title: "Caramel Classic",
      price: "$28.99",
      features: ["Smooth surface", "Rich caramel color"],
      colors: ["#D2691E", "#CD853F", "#F4A460"],
      category: "Caramel Wood",
    },
    {
      id: 22,
      image: "/product/3.png",
      title: "Caramel Gold",
      price: "$30.49",
      features: ["Golden tone", "Waterproof layer"],
      colors: ["#FFD700", "#DAA520", "#F5DEB3"],
      category: "Caramel Wood",
    },
    {
      id: 23,
      image: "/product/3.png",
      title: "Caramel Oak",
      price: "$31.99",
      features: ["Oak-inspired look", "Natural wood grain"],
      colors: ["#DEB887", "#D2B48C", "#BC8F8F"],
      category: "Caramel Wood",
    },
    {
      id: 24,
      image: "/product/3.png",
      title: "Caramel Shine",
      price: "$33.00",
      features: ["Glossy finish", "High-end look"],
      colors: ["#FFEBCD", "#FFF5EE", "#FFE4B5"],
      category: "Caramel Wood",
    },
    {
      id: 25,
      image: "/product/3.png",
      title: "Caramel Touch",
      price: "$34.49",
      features: ["Soft texture", "Modern style"],
      colors: ["#CDAA7D", "#DAA520", "#CD853F"],
      category: "Caramel Wood",
    },
    {
      id: 26,
      image: "/product/3.png",
      title: "Caramel Premium",
      price: "$36.00",
      features: ["Top-tier materials", "UV proof"],
      colors: ["#D2B48C", "#BC8F8F", "#DEB887"],
      category: " CARAMEL Wood",
    },
    {
      id: 27,
      image: "/product/3.png",
      title: "Caramel Modern",
      price: "$38.25",
      features: ["Contemporary finish", "Stain resistant"],
      colors: ["#FFE4B5", "#F5DEB3", "#FFDAB9"],
      category: "Caramel Wood",
    },
    {
      id: 28,
      image: "/product/3.png",
      title: "Caramel Urban",
      price: "$39.49",
      features: ["Urban design", "Durable build"],
      colors: ["#BC8F8F", "#DEB887", "#CD853F"],
      category: "Caramel Wood",
    },
    {
      id: 29,
      image: "/product/3.png",
      title: "Caramel Deluxe",
      price: "$41.00",
      features: ["Deluxe series", "Bold color mix"],
      colors: ["#F4A460", "#D2691E", "#FFDAB9"],
      category: "Caramel Wood",
    },
    {
      id: 30,
      image: "/product/3.png",
      title: "Caramel Signature",
      price: "$42.99",
      features: ["Unique grain", "Signature build"],
      colors: ["#FFE4B5", "#DEB887", "#F5DEB3"],
      category: "Caramel Wood",
    },
  ]);

  const location = useLocation();

  const [bruleeWood, setBruleeWood] = useState([]);
  const [redBordeaux, setRedBordeaux] = useState([]);
  const [caramelWood, setCaramelWood] = useState([]);

  useEffect(() => {
    console.log(location.pathname);
    setBruleeWood(
      ProductData.filter((product) => product.category === "Brulee Wood").slice(
        0,
        3
      )
    );
    setRedBordeaux(
      ProductData.filter(
        (product) => product.category === "Red Bordeaux"
      ).slice(0, 3)
    );
    setCaramelWood(
      ProductData.filter(
        (product) => product.category === "Caramel Wood"
      ).slice(0, 3)
    );
  }, []);

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
          products: ProductData.filter((product) => product.category === title),
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
