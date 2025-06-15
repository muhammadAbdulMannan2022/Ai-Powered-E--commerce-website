import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export function OrderSummary() {
  const cartItems = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();

  console.log("Cart Items:", cartItems);

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      console.log("Cart is empty, redirecting...");
      navigate("/products/fencing_list");
    }
  }, [cartItems, navigate]);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  // Use totalPrice from each item, or calculate from unitPrice * quantity (parseFloat unitPrice)
  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + (item.totalPrice || parseFloat(item.unitPrice) * item.quantity),
    0
  );

  const shippingCost = 0;
  const gstTax = 0;
  const ostTax = 0;
  const total = subtotal + shippingCost + gstTax + ostTax;

  return (
    <div className="bg-[#F5F5DC] min-h-full p-6 interFont">
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.productId} className="flex gap-4 p-4 rounded-lg">
            <div className="flex-shrink-0">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg bg-[#8B4513]"
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
