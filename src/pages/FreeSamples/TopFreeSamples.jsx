"use client";

import React, { useState } from "react";
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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    product.colorOptions[0]?.name || ""
  );
  const [linearFootage, setLinearFootage] = useState(
    product.dimensions.enterLinearFootage
  );
  const [quantity, setQuantity] = useState(product.dimensions.quantity);
  const [fenceHeight, setFenceHeight] = useState("6"); // Default height in feet

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const unitPriceNumber = Number.parseFloat(
    product.dimensions.unitPrice.replace("$", "")
  );
  const totalPrice = quantity * unitPriceNumber;

  // Calculate materials based on linear footage (L)
  const L = linearFootage;
  const N = Math.ceil(L / 6); // Number of panels
  const Boards = 12 * N; // Total boards
  const Posts = N + 1; // Total posts
  const BottomRails = N; // Total bottom rails
  const TopRails = N; // Total top rails
  const Stops = 2 * N; // Total fence-stop parts
  const Caps = N + 1; // Total plastic post caps

  const handlePreviousImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleLinearFootageChange = (e) => {
    const value = Number.parseInt(e.target.value) || 0;
    setLinearFootage(value);
  };

  const handleFenceHeightChange = (e) => {
    setFenceHeight(e.target.value);
  };

  const selected = product.colorOptions.find((c) => c.name === selectedColor);

  const handleAddToCart = () => {
    const item = {
      productId: product.id,
      name: product.name,
      selectedColor,
      colorHex: selected?.hex,
      quantity,
      unitPrice: unitPriceNumber.toFixed(2),
      totalPrice: (quantity * unitPriceNumber).toFixed(2),
      image: product.images[0],
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
  };

  return (
    <div className="max-w-7xl mx-auto p-6 text-[#3F4919]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
            <img
              src={
                product.images[selectedImageIndex] ||
                "/placeholder.svg?height=400&width=400"
              }
              alt={`${product.name} - ${selectedColor}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={handlePreviousImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#94B3165E] hover:bg-[#94b31677] text-white p-2 rounded-full transition-colors"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#94B3165E] hover:bg-[#94b31677] text-white p-2 rounded-full transition-colors"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-3 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`h-[60%] rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImageIndex === index
                    ? "border-green-500"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <img
                  src={image || "/placeholder.svg?height=150&width=150"}
                  alt={`${product.name} view ${index + 1}`}
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
                  style={{ backgroundColor: selected?.hex }}
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
                {product.colorOptions.map((color) => (
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
              min="1"
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
              <span>{product.dimensions.unitPrice}/each</span>
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
              {product.shareOptions.includes("Shop") && (
                <Button label="Shop Now" />
              )}
              {product.addToCart && (
                <Button
                  label="Add to Cart"
                  variant="outline"
                  onClick={handleAddToCart}
                />
              )}
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
