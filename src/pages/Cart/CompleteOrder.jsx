"use client";

import {
  FaArrowLeft,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { Link, useLocation } from "react-router"; // Updated import for React Router v6
import { useGetOrderDetailsQuery } from "../../redux/Profile/ProfileGetSlice";

export default function CompleteOrder() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("order_id");

  // Fetch order details using RTK Query
  const {
    data: orderData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId);

  // Map API response to cartItems format
  const cartItems =
    orderData?.items?.map((item) => ({
      id: item.id,
      name: item.wood_type_details.name,
      description:
        item.wood_type_details.full_description ||
        item.wood_type_details.tagline ||
        "No description provided.",
      image: item.wood_type_details.color_images.find(
        (img) => img.color_option.id === item.color_option
      )?.image_url,
      selectedColor: item.color_option_details.name,
      colorHex: item.color_option_details.hex_code,
      quantity: item.quantity_panels, // Using quantity_panels as the quantity
      totalPrice: parseFloat(item.line_total),
    })) || [];

  // Map API response to orderData format
  const mappedOrderData = orderData
    ? {
        orderDetails: {
          orderDate: new Date(orderData.created_at).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          ),
          paymentMethod: orderData.payment_method,
        },
        shippingInfo: {
          name: orderData.shipping_address.full_name,
          phone: orderData.shipping_address.phone_number,
          email: orderData.shipping_address.email,
          address: orderData.shipping_address.street_address,
          apartment: "", // API doesn't provide apartment, set as empty
          city: `${orderData.shipping_address.city}, ${orderData.shipping_address.state_province} ${orderData.shipping_address.zip_code}`,
          country: orderData.shipping_address.country,
        },
        costs: {
          shippingCost: parseFloat(orderData.shipping_cost),
          tax: parseFloat(orderData.tax_amount),
        },
      }
    : {
        orderDetails: { orderDate: "", paymentMethod: "" },
        shippingInfo: {
          name: "",
          phone: "",
          email: "",
          address: "",
          apartment: "",
          city: "",
          country: "",
        },
        costs: { shippingCost: 0.0, tax: 0.0 },
      };

  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const total =
    subtotal + mappedOrderData.costs.shippingCost + mappedOrderData.costs.tax;

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#94B316]"></div>
          <p className="text-gray-500 text-lg">Loading your order details...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    // Determine error type and message
    let errorMessage = "Something went wrong while loading your order.";
    let errorDetails = null;

    if (error?.status === 404) {
      errorMessage = `Order #${orderId} not found.`;
      errorDetails =
        "It looks like this order doesn't exist or may have been removed.";
    } else if (error?.status === "FETCH_ERROR") {
      errorMessage = "Network Issue";
      errorDetails =
        "We couldn't connect to the server. Please check your internet connection.";
    } else if (error?.status >= 500) {
      errorMessage = "Server Error";
      errorDetails =
        "Our servers are experiencing issues. We're working to fix this as soon as possible.";
    } else if (error?.data?.message) {
      errorMessage = "Error";
      errorDetails = error.data.message;
    }

    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#94B3161A] px-4">
        <div className="max-w-lg bg-white rounded-lg shadow-sm p-6 sm:p-8 text-center">
          <div className="text-red-500 text-6xl mb-4">
            <FaExclamationTriangle />
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#3F4919] mb-2">
            {errorMessage}
          </h2>
          {errorDetails && (
            <p className="text-gray-500 text-sm sm:text-base mb-6">
              {errorDetails}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={refetch}
              className="bg-[#94B316] text-white px-6 py-2 rounded-full text-base flex items-center justify-center gap-2 hover:bg-[#7A9312] transition"
            >
              <span>Try Again</span>
            </button>
            <Link
              to="/products/fencing_list"
              className="bg-gray-200 text-[#3F4919] px-6 py-2 rounded-full text-base flex items-center justify-center gap-2 hover:bg-gray-300 transition"
            >
              <FaArrowLeft /> Back to Shop
            </Link>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            Still having issues?{" "}
            <a
              href="mailto:support@yourcompany.com"
              className="text-[#94B316] hover:underline"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    );
  }

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
          #{orderData.order_number}
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
                    {mappedOrderData.orderDetails.orderDate}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Payment Method</span>
                  <p className="font-medium">
                    {mappedOrderData.orderDetails.paymentMethod}
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
                          {item.description}
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
                        <span>Subtotal: ${item.totalPrice.toFixed(2)}</span>
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
                    ${mappedOrderData.costs.shippingCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">
                    ${mappedOrderData.costs.tax.toFixed(2)}
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
                <p className="font-medium">
                  {mappedOrderData.shippingInfo.name}
                </p>
                <p className="text-gray-500">
                  {mappedOrderData.shippingInfo.phone}
                </p>
                <p className="text-gray-500">
                  {mappedOrderData.shippingInfo.email}
                </p>
                <div className="pt-2 space-y-1">
                  <p>{mappedOrderData.shippingInfo.address}</p>
                  <p>{mappedOrderData.shippingInfo.apartment}</p>
                  <p>{mappedOrderData.shippingInfo.city}</p>
                  <p>{mappedOrderData.shippingInfo.country}</p>
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
