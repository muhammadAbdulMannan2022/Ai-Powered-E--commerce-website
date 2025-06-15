"use client";

import { useState } from "react";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router";

export default function CompleteOrder() {
  const cartItems = useSelector((state) => state.cart.cart);

  const [orderData] = useState({
    orderDetails: {
      orderDate: "May 20, 2025",
      paymentMethod: "Debit Card",
    },
    shippingInfo: {
      name: "David",
      phone: "0193956477",
      email: "david@gmail.com",
      address: "123 Main Street",
      apartment: "Apt 4B",
      city: "New York, NY 10001",
      country: "United States",
    },
    costs: {
      shippingCost: 0.0,
      tax: 0.0,
    },
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const total = subtotal + orderData.costs.shippingCost + orderData.costs.tax;

  return (
    <div className="w-full">
      {/* Order Confirmation Banner */}
      <div className="flex py-16 sm:py-20 flex-col items-center justify-center bg-white text-center px-4">
        <div className="text-green-500 text-8xl mb-3">
          <FaCheckCircle />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mb-3">
          Thank you for your purchase. We've received your order and will send
          you a confirmation email shortly.
        </p>
        <p className="text-gray-600 font-semibold text-sm">
          #
          {Math.floor(Math.random() * 123456789) +
            "_" +
            Math.floor(Math.random() * 123456789)}
        </p>
      </div>

      {/* Main Content */}
      <div className="w-full bg-[#94B3161A] py-8 sm:py-10 px-4 text-[#3F4919]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="flex-1 space-y-8">
            {/* Order Details */}
            <div className="rounded-lg bg-white p-5 sm:p-6 shadow-sm">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-[#3F4919]">
                Order Details
              </h2>
              <div className="flex gap-10 flex-col md:flex-row text-sm">
                <div>
                  <span className="text-gray-500">Order Date</span>
                  <p className="font-medium">
                    {orderData.orderDetails.orderDate}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Payment Method</span>
                  <p className="font-medium">
                    {orderData.orderDetails.paymentMethod}
                  </p>
                </div>
              </div>
            </div>

            {/* Items Ordered */}
            <div className="rounded-lg bg-white p-5 sm:p-6 shadow-sm">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Items Ordered
              </h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-4 border border-gray-200 p-3 rounded-md"
                  >
                    <div className="w-full sm:w-20 h-40 sm:h-20 bg-gradient-to-br from-amber-600 to-amber-800 rounded-md overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-amber-600 opacity-80" />
                      )}
                    </div>
                    <div className="flex-1 space-y-2 text-sm flex justify-between items-start px-2 sm:items-center sm:flex-row sm:gap-4">
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-gray-500 text-xs line-clamp-2">
                          {item.description || "No description provided."}
                        </p>
                        <div className="flex gap-2 pt-2 items-center">
                          <p>{item.selectedColor}</p>
                          <span
                            className="w-4 h-4 rounded-full block border"
                            style={{ backgroundColor: item.colorHex }}
                          ></span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 font-bold text-right">
                        <span>QTY: {item.quantity}</span>
                        <span>Subtotal: ${item.totalPrice}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Section */}
              <hr className="my-4 border-gray-300" />
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping Cost</span>
                  <span className="font-medium">
                    ${orderData.costs.shippingCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">
                    ${orderData.costs.tax.toFixed(2)}
                  </span>
                </div>
                <hr className="my-2 border-gray-300" />
                <div className="flex justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="rounded-lg bg-white p-5 sm:p-6 shadow-sm">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Shipping Information
              </h2>
              <div className="space-y-1 text-sm">
                <p className="font-medium">{orderData.shippingInfo.name}</p>
                <p className="text-gray-500">{orderData.shippingInfo.phone}</p>
                <p className="text-gray-500">{orderData.shippingInfo.email}</p>
                <div className="pt-2 space-y-1">
                  <p>{orderData.shippingInfo.address}</p>
                  <p>{orderData.shippingInfo.apartment}</p>
                  <p>{orderData.shippingInfo.city}</p>
                  <p>{orderData.shippingInfo.country}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center pt-20">
        <Link
          className="bg-[#94B316] text-white px-6 py-1 rounded-full text-xl flex items-center justify-center gap-4"
          to="/products/fencing_list"
        >
          <FaArrowLeft /> Back
        </Link>
      </div>
    </div>
  );
}
