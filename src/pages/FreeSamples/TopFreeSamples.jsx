"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaMinus,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
  FaInstagramSquare,
} from "react-icons/fa";
import Button from "../../helpers/Button";
import { addToCart } from "../../redux/features/cart/cartSlice";

export default function TopFreeSamples({ product }) {
  // Map colorOptions from color_images
  const colorOptions = product.color_images?.length
    ? product.color_images.map((item) => ({
        name: item.color_option.name,
        hex: item.color_option.hex_code,
      }))
    : [{ name: "Default", hex: "#000000" }];

  // All images for thumbnails
  const allImages = product.color_images?.length
    ? product.color_images.map((item) => ({
        url: item.image_url,
        colorName: item.color_option.name,
      }))
    : [{ url: "/placeholder.svg?height=400&width=400", colorName: "Default" }];

  // Initialize state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    colorOptions[0]?.name || ""
  );
  const [linearFootage, setLinearFootage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [fenceHeight, setFenceHeight] = useState("6");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Parse unit price with fallback
  const unitPriceNumber = Number.parseFloat(product.actual_price) || 0;
  const totalPrice = quantity * unitPriceNumber;

  // Filter images for the slider based on selected color
  const sliderImages = product.color_images?.length
    ? product.color_images
        .filter((item) => item.color_option.name === selectedColor)
        .map((item) => item.image_url)
    : ["/placeholder.svg?height=400&width=400"];

  // Find the index of the current color's image in allImages for highlighting
  const currentImageIndex = allImages.findIndex(
    (img) =>
      img.url === sliderImages[selectedImageIndex] &&
      img.colorName === selectedColor
  );

  // Ensure initial image and index are valid
  useEffect(() => {
    // Verify selectedColor exists in colorOptions
    const validColor =
      colorOptions.find((c) => c.name === selectedColor)?.name ||
      colorOptions[0]?.name;
    if (validColor !== selectedColor) {
      setSelectedColor(validColor);
    }
    // Ensure selectedImageIndex is within bounds
    if (sliderImages.length > 0 && selectedImageIndex >= sliderImages.length) {
      setSelectedImageIndex(0);
    }
  }, [selectedColor, sliderImages, colorOptions]);

  // Navigation handlers
  const handlePreviousImage = () => {
    setSelectedImageIndex((prev) =>
      sliderImages.length > 0
        ? prev === 0
          ? sliderImages.length - 1
          : prev - 1
        : 0
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      sliderImages.length > 0
        ? prev === sliderImages.length - 1
          ? 0
          : prev + 1
        : 0
    );
  };

  const handleThumbnailClick = (index) => {
    const clickedImage = allImages[index];
    setSelectedColor(clickedImage.colorName);
    const newIndex = sliderImages.findIndex((img) => img === clickedImage.url);
    setSelectedImageIndex(newIndex >= 0 ? newIndex : 0);
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleLinearFootageChange = (e) => {
    const value = Number.parseInt(e.target.value);
    setLinearFootage(value);
  };

  const handleFenceHeightChange = (e) => {
    setFenceHeight(e.target.value);
  };

  const selected =
    colorOptions.find((c) => c.name === selectedColor) || colorOptions[0];

  const handleAddToCart = () => {
    if (!linearFootage) {
      alert("Enter Linear Footage ");
    } else {
      const item = {
        productId: product.id,
        name: product.name,
        selectedColor,
        colorHex: selected?.hex || "#000000",
        quantity,
        unitPrice: unitPriceNumber.toFixed(2),
        totalPrice: (quantity * unitPriceNumber).toFixed(2),
        image:
          sliderImages[selectedImageIndex] ||
          "/placeholder.svg?height=400&width=400",
        linearFootage: L,
        fenceHeight,
        boards: Boards,
        posts: Posts,
        bottomRails: BottomRails,
        topRails: TopRails,
        stops: Stops,
        caps: Caps,
      };

      dispatch(addToCart(item));
      navigate("/cart");
    }
  };

  // Calculate materials based on linear footage (L)
  const L = Number.isFinite(linearFootage) ? Math.max(1, linearFootage) : 1;
  const N = Math.ceil(L / 6);
  const Boards = 12 * N;
  const Posts = N + 1;
  const BottomRails = N;
  const TopRails = N;
  const Stops = 2 * N;
  const Caps = N + 1;

  return (
    <div className="max-w-7xl mx-auto p-6 text-[#3F4919]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
            <img
              src={
                sliderImages[selectedImageIndex] ||
                "/placeholder.svg?height=400&width=400"
              }
              alt={`${product.name} - ${selectedColor}`}
              className="w-full h-full object-cover"
            />
            {/* <button
              onClick={handlePreviousImage}
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#94B3165E] hover:bg-[#94b31677] text-white p-2 rounded-full transition-colors ${
                sliderImages.length <= 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={sliderImages.length <= 1}
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#94B3165E] hover:bg-[#94b31677] text-white p-2 rounded-full transition-colors ${
                sliderImages.length <= 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={sliderImages.length <= 1}
            >
              <FaChevronRight className="w-4 h-4" />
            </button> */}
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-3 gap-2">
            {allImages.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`h-[60%] hover:cursor-pointer rounded-lg overflow-hidden border-2 transition-colors ${
                  index === currentImageIndex
                    ? "border-green-500"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <img
                  src={image.url || "/placeholder.svg?height=150&width=150"}
                  alt={`${product.name} - ${image.colorName}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div className="flex gap-5">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <span className="flex items-center justify-center font-bold text-[#94B316] text-sm px-3 py-1 rounded-full">
              In Stock
            </span>
          </div>

          {/* Color Picker */}
          <div className="relative w-full">
            <p className="block text-sm font-medium mb-2">Choose Color</p>
            <button
              onClick={() => setOpen(!open)}
              className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm text-left"
            >
              <div className="flex items-center space-x-2">
                <span
                  className="w-8 h-8 rounded-md border border-gray-300"
                  style={{ backgroundColor: selected?.hex || "#000000" }}
                />
                <span className="text-sm font-medium">
                  {selected?.name || "Select color"}
                </span>
              </div>
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {open && (
              <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                {colorOptions.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColor(color.name);
                      setOpen(false);
                    }}
                    className="w-full flex items-center px-4 py-2 hover:bg-gray-100 space-x-2"
                  >
                    <span
                      className="w-8 h-8 rounded-md border border-gray-300"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-sm">{color.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Linear Footage */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Enter Linear Footage <span className="text-gray-500">(Feet)</span>
            </label>
            <input
              type="number"
              value={linearFootage}
              onChange={handleLinearFootageChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              // min="1"
            />
          </div>

          {/* Fence Height */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Choose Fence Height <span className="text-gray-500">(Feet)</span>
            </label>
            <select
              value={fenceHeight}
              onChange={handleFenceHeightChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="6">6 ft</option>
              <option value="8">8 ft</option>
              <option value="10">10 ft</option>
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Quantity of Fence{" "}
              <span className="text-gray-500">(simulator calculated)</span>
            </label>
            <div className="flex items-center gap-x-5">
              <div className="border border-gray-300 rounded-lg flex items-center">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-2 hover:bg-gray-50"
                >
                  <FaMinus />
                </button>
                <span className="text-lg font-medium w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 hover:bg-gray-50"
                >
                  <FaPlus />
                </button>
              </div>
              <span>${unitPriceNumber.toFixed(2)}/each</span>
            </div>
          </div>

          {/* Material Breakdown */}
          <div className="space-y-2">
            <p>
              <strong>Material Breakdown:</strong>
            </p>
            <p>Panels: {N}</p>
            <p>Boards: {Boards}</p>
            <p>Posts: {Posts}</p>
            <p>Bottom Rails: {BottomRails}</p>
            <p>Top Rails: {TopRails}</p>
            <p>Stops: {Stops}</p>
            <p>Caps: {Caps}</p>
          </div>

          {/* Total Price */}
          <div className="border-t pt-4">
            <div className="text-2xl font-bold mb-4">
              Total: ${totalPrice.toLocaleString()}
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 mb-6">
              <Button label="Shop Now" />
              <Button
                label="Add to Cart"
                variant="outline"
                onClick={handleAddToCart}
              />
            </div>

            {/* Social Share */}
            <div className="flex items-center space-x-3">
              <span className="text-md font-bold text-gray-600">Share:</span>
              <button className="p-2 text-gray-500 bg-gray-200 hover:bg-blue-50 rounded-full">
                <FaFacebookF className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-500 bg-gray-200 hover:bg-blue-50 rounded-full">
                <FaTwitter className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-500 bg-gray-200 hover:bg-blue-50 rounded-full">
                <FaInstagramSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
