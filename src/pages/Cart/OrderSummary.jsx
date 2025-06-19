import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useGetCartQuery } from "../../redux/Profile/ProfileGetSlice";

export function OrderSummary() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Fetch cart data using RTK Query
  const { data: cartData, isLoading, isError, refetch } = useGetCartQuery();

  // Map cartData to cartItems
  useEffect(() => {
    if (cartData?.items) {
      const mappedItems = cartData.items.map((item) => {
        // Calculate unitPrice as unit_price * linear_footage
        const unitPriceNum = parseFloat(item.unit_price) || 0;
        const linearFootageNum = parseFloat(item.linear_footage) || 0;
        const calculatedUnitPrice = (unitPriceNum * linearFootageNum).toFixed(
          2
        );

        // Find the correct image
        const imageObj = item.wood_type_details.color_images.find(
          (img) => img.color_option.id === item.color_option
        );
        const imageUrl = imageObj?.image_url || "/placeholder.svg";

        // Debug image selection
        console.log(
          `Item ${item.id} Image URL:`,
          imageUrl,
          `Color Option:`,
          item.color_option
        );

        return {
          productId: item.id,
          name: item.wood_type_details.name,
          selectedColor: item.color_option_details.name,
          colorHex: item.color_option_details.hex_code || "#000000", // Fallback hex code
          image: imageUrl,
          quantity: item.num_sets,
          unitPrice: calculatedUnitPrice,
          totalPrice: parseFloat(item.line_total),
        };
      });
      setCartItems(mappedItems);
      console.log("Cart Data:", cartData);
    } else {
      setCartItems([]);
    }
  }, [cartData]);

  console.log("Cart Items:", cartItems);

  // Redirect if cart is empty
  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      console.log("Cart is empty, redirecting...");
      // navigate("/products/fencing_list"); // TODO: Uncomment when ready
    }
  }, [cartItems, navigate]);

  // Calculate total quantity and subtotal
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + (item.totalPrice || parseFloat(item.unitPrice) * item.quantity),
    0
  );

  const shippingCost = 0;
  const gstTax = 0;
  const ostTax = 0;
  const total = subtotal + shippingCost + gstTax + ostTax;

  // Loading and error states
  if (isLoading)
    return (
      <div className="bg-[#F5F5DC] min-h-full p-6 interFont">
        Loading cart...
      </div>
    );
  if (isError)
    return (
      <div className="bg-[#F5F5DC] min-h-full p-6 interFont">
        <p className="text-red-600">Error loading cart. Please try again.</p>
        <button
          onClick={refetch}
          className="mt-2 bg-[#8B4513] text-white p-2 rounded"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="bg-[#F5F5DC] min-h-full p-6 interFont">
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.productId} className="flex gap-4 p-4 rounded-lg">
            <div className="flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg bg-[#8B4513]"
                onError={(e) => {
                  console.log(
                    `Image failed to load for ${item.name}: ${item.image}`
                  );
                  e.target.src = "/placeholder.svg"; // Fallback on load error
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm mb-1">
                {item.name}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-1">
                Color: {item.selectedColor}{" "}
                <span
                  style={{
                    backgroundColor: item.colorHex,
                    display: "inline-block",
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    marginLeft: 6,
                  }}
                ></span>
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Qty: {item.quantity}
                </span>
                <span className="font-semibold text-sm">
                  ${parseFloat(item.unitPrice).toFixed(2)}/unit
                </span>
              </div>
              <div className="text-xs text-gray-700 mt-1 font-semibold">
                Total: ${item.totalPrice.toFixed(2)}
              </div>
            </div>
          </div>
        ))}

        <div className="bg-white rounded-lg shadow-sm p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Quantity:</span>
            <span className="font-medium">{totalQuantity} Items</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping Cost:</span>
            <span className="font-medium">${shippingCost.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">GST Tax:</span>
            <span className="font-medium">${gstTax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">OST Tax:</span>
            <span className="font-medium">${ostTax.toFixed(2)}</span>
          </div>

          <hr className="my-3 border-t border-gray-200" />

          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
