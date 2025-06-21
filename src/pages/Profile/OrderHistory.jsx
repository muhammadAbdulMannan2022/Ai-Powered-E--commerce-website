import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAllComplitedOrderQuery } from "../../redux/Profile/ProfileGetSlice";
import { FaArrowLeftLong } from "react-icons/fa6";

// Function to format date as MM/dd/yyyy
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

export default function OrderHistory() {
  const { data: orders, isLoading, error } = useAllComplitedOrderQuery();
  const [expandedOrder, setExpandedOrder] = useState(null); // Track expanded order for mobile view
  const navigate = useNavigate(); // Initialize navigate hook

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (isLoading) return <div className="p-4 text-center">Loading...</div>;
  if (error)
    return (
      <div className="p-4 text-center text-red-500">Error loading orders</div>
    );
  if (!orders || orders.length === 0)
    return <div className="p-4 text-center">No orders found</div>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex items-center mb-4">
        <Link
          to={"/profile"}
          className="text-white flex items-center gap-4 font-medium transition-colors text-sm sm:text-base bg-[#90A53A] py-2 rounded-full hover:cursor-pointer px-3"
        >
          {" "}
          <FaArrowLeftLong />
          <span>Back to Profile</span>
        </Link>
      </div>
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left text-sm sm:text-base">
                Order Number
              </th>
              <th className="border border-gray-300 p-2 text-left text-sm sm:text-base">
                Date
              </th>
              <th className="border border-gray-300 p-2 text-left text-sm sm:text-base">
                Status
              </th>
              <th className="hidden sm:table-cell border border-gray-300 p-2 text-left text-sm sm:text-base">
                Items
              </th>
              <th className="border border-gray-300 p-2 text-left text-sm sm:text-base">
                Total
              </th>
              <th className="sm:hidden border border-gray-300 p-2 text-left text-sm">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2 text-sm sm:text-base">
                    {order.order_number}
                  </td>
                  <td className="border border-gray-300 p-2 text-sm sm:text-base">
                    {formatDate(order.created_at)}
                  </td>
                  <td className="border border-gray-300 p-2 text-sm sm:text-base">
                    {order.status}
                  </td>
                  <td className="hidden sm:table-cell border border-gray-300 p-2 text-sm sm:text-base">
                    <ul className="list-disc list-inside">
                      {order.items.map((item) => (
                        <li key={item.id}>
                          {item.wood_type_details.name} (
                          {item.color_option_details.name},{" "}
                          {item.fence_height_details.height_ft} ft,{" "}
                          {item.linear_footage} ft) - ${item.line_total}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="border border-gray-300 p-2 text-sm sm:text-base">
                    ${order.total_amount}
                  </td>
                  <td className="sm:hidden border border-gray-300 p-2 text-sm">
                    <button
                      onClick={() => toggleOrderDetails(order.id)}
                      className="text-blue-500 hover:underline"
                    >
                      {expandedOrder === order.id ? "Hide" : "Show"}
                    </button>
                  </td>
                </tr>
                {expandedOrder === order.id && (
                  <tr className="sm:hidden">
                    <td
                      colSpan="5"
                      className="border border-gray-300 p-2 bg-gray-50"
                    >
                      <ul className="list-disc list-inside text-sm">
                        {order.items.map((item) => (
                          <li key={item.id}>
                            {item.wood_type_details.name} (
                            {item.color_option_details.name},{" "}
                            {item.fence_height_details.height_ft} ft,{" "}
                            {item.linear_footage} ft) - ${item.line_total}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
