"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  updateCartItem,
  removeCartItem,
} from "../../redux/features/cart/cartSlice";
import { FaPlus, FaMinus, FaTrash, FaChevronUp } from "react-icons/fa";
import { FaTicket } from "react-icons/fa6";
import { useState } from "react";

export default function CartPage({ currentStep, setCurrentStep }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);

  const handleQuantityChange = (productId, selectedColor, change) => {
    const item = cartItems.find(
      (item) =>
        item.productId === productId && item.selectedColor === selectedColor
    );
    if (!item) return;

    const newQuantity = item.quantity + change;
    if (newQuantity < 1) return;

    dispatch(
      updateCartItem({
        productId,
        selectedColor,
        key: "quantity",
        value: newQuantity,
      })
    );
  };

  const handleRemove = (productId, selectedColor) => {
    dispatch(removeCartItem({ productId, selectedColor }));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.totalPrice),
    0
  );

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-40 w-full py-10 flex flex-col md:flex-row gap-8">
      {/* Cart Items Section */}
      <div className="flex-1">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            {/* Desktop Table */}
            <table className="w-full border-collapse hidden md:table">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-3 px-4">Product</th>
                  <th className="text-center py-3 px-4">Quantity</th>
                  <th className="text-center py-3 px-4">Price Each</th>
                  <th className="text-right py-3 px-4">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr
                    key={`${item.productId}-${item.selectedColor}`}
                    className="border-b border-gray-200"
                  >
                    {/* Product Cell */}
                    <td className="py-4 px-4 flex items-center gap-4 max-w-[250px]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <h2 className="text-base font-semibold truncate">
                          {item.name}
                        </h2>
                        <p className="text-sm text-gray-500 truncate">
                          Color: {item.selectedColor}
                        </p>
                        <button
                          onClick={() =>
                            handleRemove(item.productId, item.selectedColor)
                          }
                          className="text-red-600 text-sm mt-1 flex items-center gap-1 hover:underline"
                        >
                          <FaTrash className="w-3 h-3" />
                          Remove
                        </button>
                      </div>
                    </td>

                    {/* Quantity Cell */}
                    <td className="py-4 px-4 text-center">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.productId,
                              item.selectedColor,
                              -1
                            )
                          }
                          className="p-2 border rounded hover:bg-gray-100"
                          aria-label="Decrease quantity"
                        >
                          <FaMinus />
                        </button>
                        <span className="min-w-[20px]">{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.productId,
                              item.selectedColor,
                              1
                            )
                          }
                          className="p-2 border rounded hover:bg-gray-100"
                          aria-label="Increase quantity"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </td>

                    {/* Price Each Cell */}
                    <td className="py-4 px-4 text-center">${item.unitPrice}</td>

                    {/* Subtotal Cell */}
                    <td className="py-4 px-4 text-right font-bold">
                      ${item.totalPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Card List */}
            <div className="flex flex-col gap-6 md:hidden">
              {cartItems.map((item) => (
                <div
                  key={`${item.productId}-${item.selectedColor}`}
                  className="border rounded p-4 flex flex-col sm:flex-row gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded object-cover flex-shrink-0 mx-auto sm:mx-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-sm text-gray-500 mb-2">
                        Color: {item.selectedColor}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.productId,
                              item.selectedColor,
                              -1
                            )
                          }
                          className="p-2 border rounded hover:bg-gray-100"
                          aria-label="Decrease quantity"
                        >
                          <FaMinus />
                        </button>
                        <span className="min-w-[20px]">{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.productId,
                              item.selectedColor,
                              1
                            )
                          }
                          className="p-2 border rounded hover:bg-gray-100"
                          aria-label="Increase quantity"
                        >
                          <FaPlus />
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          handleRemove(item.productId, item.selectedColor)
                        }
                        className="text-red-600 text-sm flex items-center gap-1 hover:underline"
                      >
                        <FaTrash className="w-3 h-3" />
                        Remove
                      </button>
                    </div>

                    <div className="flex justify-between mt-2 text-sm sm:text-base font-semibold">
                      <span>Price: ${item.unitPrice}</span>
                      <span>Subtotal: ${item.totalPrice}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Summary Section */}
      <div className="p-6 bg-[#94B3161A] rounded-lg shadow-md border border-[#9EB24B] w-full md:w-80 flex-shrink-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#3F4919]">
            Order Summary
          </h2>
          <FaChevronUp className="text-[#3F4919]" />
        </div>
        <div className="mb-4">
          <label className="block text-[#3F4919] mb-2">
            Add Additional order note
          </label>
          <textarea
            className="w-full p-2 border border-[#9EB24B] rounded bg-[#94B3161A] text-[#9EB24B] placeholder-[#9EB24B] outline-none focus:outline-[#3F4919] resize-none"
            placeholder="Enter here..."
            rows={4}
          ></textarea>
        </div>
        <p className="text-[#3F4919] mb-4">
          Taxes and Shipping calculated at checkout.
        </p>
        <div className="mb-4 flex items-center gap-4">
          <p className="text-[#3F4919] font-semibold">Subtotal :</p>
          <p className="text-[#94B316] text-xl">${subtotal.toFixed(2)}</p>
        </div>
        <div className="mb-4">
          <p className="text-[#3F4919] mb-2">
            Have a coupon? Add your code for an instant cart discount
          </p>
          <div className="flex border border-[#9EB24B] rounded overflow-hidden">
            <div className="relative w-full">
              <input
                type="text"
                className="w-full p-2 rounded-l bg-transparent text-[#9EB24B] placeholder-[#9EB24B] outline-none focus:outline-[#9EB24B] pl-10"
                placeholder="Enter coupon code"
              />
              <FaTicket className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9EB24B] -rotate-45" />
            </div>
            <button className="bg-[#94B316] text-white p-2 rounded-r font-semibold hover:cursor-pointer whitespace-nowrap">
              Apply
            </button>
          </div>
        </div>
        <button
          className="w-full bg-[#9EB24B] text-white p-3 rounded-full font-semibold border border-[#9EB24B] hover:cursor-pointer"
          onClick={() => setCurrentStep(2)}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
