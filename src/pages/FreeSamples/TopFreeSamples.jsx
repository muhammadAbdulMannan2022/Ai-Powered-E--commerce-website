"use client";

import React from "react";

import { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaMinus,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
  FaCheck,
  FaInstagramSquare,
} from "react-icons/fa";
import Button from "../../helpers/Button";

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

  const unitPriceNumber = Number.parseFloat(
    product.dimensions.unitPrice.replace("$", "")
  );
  const totalPrice = quantity * unitPriceNumber;

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
  const selected = product.colorOptions.find((c) => c.name === selectedColor);
  return (
    <div className="max-w-7xl mx-auto p-6 text-[#3F4919]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
            <img
              src={
                product.images[selectedImageIndex] ||
                "/placeholder.svg?height=400&width=400"
              }
              alt={`${product.name} - ${selectedColor}`}
              className="w-full h-full object-cover"
            />

            {/* Navigation Arrows */}
            <button
              onClick={handlePreviousImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#94B3165E] hover:bg-[#94b31677] text-white p-2 rounded-full transition-colors hover:cursor-pointer"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#94B3165E] hover:bg-[#94b31677] text-white p-2 rounded-full transition-colors hover:cursor-pointer"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-3 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`h-[60%] rounded-lg overflow-hidden border-2 transition-colors hover:cursor-pointer ${
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

        {/* Product Details Section */}
        <div className="space-y-6">
          {/* Product Title and Category */}
          <div className="flex gap-5">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <span className="flex items-center justify-center font-bold text-[#94B316] text-sm px-3 py-1 rounded-full">
              In Stock
            </span>
          </div>

          {/* Color Selection */}
          <div className="relative w-full">
            <div>
              <p className="block text-sm font-medium mb-2">Choose Color</p>
            </div>
            <button
              onClick={() => setOpen(!open)}
              className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm text-left hover:cursor-pointer"
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
              <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg ">
                {product.colorOptions.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColor(color.name);
                      setOpen(false);
                    }}
                    className="w-full flex items-center px-4 py-2 hover:bg-gray-100 space-x-2 hover:cursor-pointer"
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              min="1"
            />
          </div>

          {/* Quantity Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Quantity of Fence{" "}
              <span className="text-gray-500">(simulator calculated)</span>
            </label>
            <div className="flex items-center gap-x-5">
              <div className="border border-gray-300">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-2 hover:bg-gray-50 transition-colors hover:cursor-pointer"
                >
                  <FaMinus className="w-4 h-4" />
                </button>
                <span className="text-lg font-medium min-w-[3rem] text-center border-l border-r border-gray-300 px-4">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 rounded-e-lg hover:bg-gray-50 transition-colors hover:cursor-pointer"
                >
                  <FaPlus className="w-4 h-4" />
                </button>
              </div>
              <span className="">{product.dimensions.unitPrice}/each</span>
            </div>
          </div>

          {/* Total Price */}
          <div className="border-t pt-4">
            <div className="text-2xl font-bold mb-4">
              Total: ${totalPrice.toLocaleString()}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-6">
              {product.shareOptions.includes("Shop") && (
                <Button label="Shop Now" />
              )}
              {product.addToCart && (
                <Button label="Add to Cart" variant="outline" />
              )}
            </div>

            {/* Social Share */}
            <div className="flex items-center space-x-3">
              <span className="text-md font-bold text-gray-600">Share:</span>
              <button className="p-2 text-gray-500 bg-gray-200 hover:cursor-pointer hover:bg-blue-50 rounded-full transition-colors">
                <FaFacebookF className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-500 bg-gray-200 hover:cursor-pointer hover:bg-blue-50 rounded-full transition-colors">
                <FaTwitter className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-500 bg-gray-200 hover:cursor-pointer hover:bg-blue-50 rounded-full transition-colors">
                <FaInstagramSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
