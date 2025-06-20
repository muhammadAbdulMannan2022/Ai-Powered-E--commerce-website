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
  FaCartPlus,
} from "react-icons/fa";
import Button from "../../helpers/Button";
import { useAddItemsToCartMutation } from "../../redux/Profile/ProfileGetSlice";
import { useGetHeightOptionsQuery } from "../../redux/features/Products/ProductsSlice";

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
  const [errorMessage, setErrorMessage] = useState(""); // For error feedback
  const navigate = useNavigate();
  const [fenceHeightId, setFenceHeightId] = useState(null);
  const [addItemsToCart, { isLoading, error }] = useAddItemsToCartMutation(); // RTK Query mutation hook
  const { data: heights, isLoading: heightIsLoading } =
    useGetHeightOptionsQuery();

  // Parse unit price with fallback
  const unitPriceNumber = Number.parseFloat(product.actual_price) || 0;
  const totalPrice = quantity * (unitPriceNumber * linearFootage);

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
  // height
  useEffect(() => {
    if (!heightIsLoading && heights?.length && !fenceHeightId) {
      setFenceHeightId(heights[0].id);
    }
  }, [heightIsLoading, heights]);

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
    const value = e.target.value;
    setLinearFootage(Number.parseInt(value));
  };

  const handleFenceHeightChange = (e) => {
    setFenceHeightId(Number(e.target.value));
  };

  const selected =
    colorOptions.find((c) => c.name === selectedColor) || colorOptions[0];

  const handleAddToCart = async () => {
    if (!linearFootage) {
      setErrorMessage("Enter Linear Footage");
      return;
    }

    // Find the selected color's color_option object to get color_option_id
    const selectedColorOption = product.color_images?.find(
      (item) => item.color_option.name === selectedColor
    )?.color_option;

    // Prepare cart data
    const cartData = {
      wood_type_id: product.id,
      linear_footage: linearFootage,
      num_sets: quantity,
      color_option_id: selectedColorOption?.id || null,
      fence_height_id: fenceHeightId,
    };
    console.log(cartData);
    try {
      // Trigger the mutation
      await addItemsToCart(cartData).unwrap();
      setErrorMessage(""); // Clear any previous errors
      navigate("/cart"); // Navigate to cart on success
    } catch (err) {
      // Handle error
      setErrorMessage(
        err?.data?.message || "Failed to add items to cart. Please try again."
      );
      console.error("Add to cart error:", err);
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
              Enter Linear Footage{" "}
              <span className="text-gray-500">
                (Feet) - Per Feet ${unitPriceNumber}
              </span>
            </label>
            <input
              type="number"
              value={linearFootage}
              onChange={handleLinearFootageChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Fence Height */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Choose Fence Height <span className="text-gray-500">(Feet)</span>
            </label>
            <select
              value={fenceHeightId || ""}
              onChange={handleFenceHeightChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              {!heightIsLoading &&
                heights.map((height) => (
                  <option value={height.id}>{height.height_ft} ft</option>
                ))}
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
              <span>
                ${unitPriceNumber.toFixed(2) * linearFootage || 0}/each
              </span>
            </div>
          </div>

          {/* Material Breakdown */}
          <div className="space-y-2">
            <p>
              <strong>Material Breakdown:</strong>
            </p>
            <p>Panels: {N * quantity}</p>
            <p>Boards: {Boards * quantity}</p>
            <p>Posts: {Posts * quantity}</p>
            <p>Bottom Rails: {BottomRails * quantity}</p>
            <p>Top Rails: {TopRails * quantity}</p>
            <p>Stops: {Stops * quantity}</p>
            <p>Caps: {Caps * quantity}</p>
          </div>

          {/* Total Price */}
          <div className="border-t pt-4">
            <div className="text-2xl font-bold mb-4">
              Total: ${isNaN(totalPrice) ? "0" : totalPrice.toLocaleString()}
            </div>
            {/* Error */}
            {errorMessage && (
              <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
            )}
            {/* Buttons */}
            <div className="flex space-x-4 mb-6">
              {/* <Button label="Shop Now" /> */}
              <Button
                label={isLoading ? "Adding..." : "Add to Cart"}
                variant="outline"
                onClick={handleAddToCart}
                disabled={isLoading}
                icon={<FaCartPlus />}
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
