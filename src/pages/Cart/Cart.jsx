"use client";

import { useState, useEffect, useCallback } from "react";
import { FaPlus, FaMinus, FaTrash, FaChevronUp } from "react-icons/fa";
import { FaTicket } from "react-icons/fa6";
import {
  useGetCartQuery,
  useRemoveCartItemMutation,
  useUpdateCartItemDataMutation,
} from "../../redux/Profile/ProfileGetSlice";
import debounce from "lodash/debounce";

export default function CartPage({ currentStep, setCurrentStep }) {
  // Fetch cart data using RTK Query
  const {
    data: cartData,
    isLoading,
    isError,
    refetch,
  } = useGetCartQuery(undefined, {
    refetchOnMountOrArgChange: true, // Ensure refetch on mount
  });
  const [updateCartItem] = useUpdateCartItemDataMutation();
  const [deleteCartItem] = useRemoveCartItemMutation();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Local state for cart items and pending updates
  const [localCartItems, setLocalCartItems] = useState([]);
  const [pendingUpdates, setPendingUpdates] = useState(new Map());

  // Initialize localCartItems when cartData is fetched
  useEffect(() => {
    if (cartData?.items) {
      setLocalCartItems(
        cartData.items.map((item) => {
          const unitPriceNum = parseFloat(item.unit_price) || 0;
          const linearFootageNum = parseFloat(item.linear_footage) || 0;
          const calculatedUnitPrice = (unitPriceNum * linearFootageNum).toFixed(
            2
          );

          return {
            productId: item.id,
            name: item.wood_type_details.name,
            selectedColor: item.color_option_details.name,
            image:
              item.wood_type_details.color_images.find(
                (img) => img.color_option.id === item.color_option
              )?.image_url || "/fallback-image.png",
            quantity: item.num_sets,
            unitPrice: calculatedUnitPrice,
            totalPrice: parseFloat(item.line_total).toFixed(2),
          };
        })
      );
      setPendingUpdates(new Map());
    } else if (!isLoading) {
      // Clear localCartItems if cartData is empty or undefined
      setLocalCartItems([]);
    }
  }, [cartData, isLoading]);

  // Debounced sync function
  const syncCart = useCallback(
    debounce(async () => {
      if (pendingUpdates.size === 0) return;

      try {
        setErrorMessage(null);
        const updatePromises = Array.from(pendingUpdates.entries()).map(
          async ([productId, newQuantity]) => {
            const response = await updateCartItem({
              itemId: productId,
              data: { num_sets: newQuantity },
            }).unwrap();
            return { productId, response };
          }
        );

        const results = await Promise.all(updatePromises);

        setLocalCartItems((prevItems) =>
          prevItems.map((item) => {
            const result = results.find((r) => r.productId === item.productId);
            if (result && result.response) {
              const unitPriceNum = parseFloat(result.response.unit_price) || 0;
              const linearFootageNum =
                parseFloat(result.response.linear_footage) || 0;
              const calculatedUnitPrice = (
                unitPriceNum * linearFootageNum
              ).toFixed(2);

              return {
                ...item,
                quantity: result.response.num_sets,
                unitPrice: calculatedUnitPrice,
                totalPrice: parseFloat(result.response.line_total).toFixed(2),
              };
            }
            return item;
          })
        );

        setPendingUpdates(new Map());
      } catch (error) {
        console.error("Failed to sync cart:", error);
        setErrorMessage("Failed to sync cart changes. Please try again.");
        refetch();
      }
    }, 2000),
    [pendingUpdates, updateCartItem, refetch]
  );

  // Sync pending updates on page unmount
  useEffect(() => {
    return () => {
      syncCart.flush();
    };
  }, [syncCart]);

  // Handle quantity change
  const handleQuantityChange = async (productId, selectedColor, change) => {
    const item = localCartItems.find(
      (i) => i.productId === productId && i.selectedColor === selectedColor
    );
    if (!item) return;

    const newQuantity = parseInt(item.quantity) + change;
    if (newQuantity < 1) return;

    setLocalCartItems((prevItems) =>
      prevItems.map((i) =>
        i.productId === productId && i.selectedColor === selectedColor
          ? {
              ...i,
              quantity: newQuantity,
              totalPrice: (newQuantity * parseFloat(i.unitPrice)).toFixed(2),
            }
          : i
      )
    );

    setPendingUpdates((prev) => new Map([...prev, [productId, newQuantity]]));

    try {
      setErrorMessage(null);
      const response = await updateCartItem({
        itemId: productId,
        data: { num_sets: newQuantity },
      }).unwrap();

      setLocalCartItems((prevItems) =>
        prevItems.map((i) =>
          i.productId === productId
            ? {
                ...i,
                quantity: response.num_sets,
                unitPrice: (
                  parseFloat(response.unit_price) *
                  parseFloat(response.linear_footage)
                ).toFixed(2),
                totalPrice: parseFloat(response.line_total).toFixed(2),
              }
            : i
        )
      );

      setPendingUpdates((prev) => {
        const newMap = new Map(prev);
        newMap.delete(productId);
        return newMap;
      });
    } catch (error) {
      console.error("Failed to update quantity:", error);
      setErrorMessage("Failed to update quantity. Please try again.");
      refetch();
    }

    syncCart();
  };

  // Handle item removal
  const handleRemove = async (productId, selectedColor) => {
    setPendingUpdates((prev) => new Map([...prev, [productId, 0]]));

    try {
      setErrorMessage(null);
      await deleteCartItem(productId).unwrap();

      setPendingUpdates((prev) => {
        const newMap = new Map(prev);
        newMap.delete(productId);
        return newMap;
      });

      setLocalCartItems((prevItems) =>
        prevItems.filter(
          (i) =>
            !(i.productId === productId && i.selectedColor === selectedColor)
        )
      );
    } catch (error) {
      console.error("Failed to remove item:", error);
      setErrorMessage("Failed to remove item. Please try again.");
      refetch();
    }

    syncCart();
  };

  // Handle checkout
  const handleCheckout = async () => {
    if (localCartItems.length == 0) {
      setErrorMessage("Your cart is empty.....");
      return;
    }
    setIsCheckingOut(true);
    setErrorMessage(null);

    try {
      await syncCart.flush();
      await refetch();
      const latestCart = cartData?.items || [];

      const discrepancies = localCartItems.filter((localItem) => {
        const serverItem = latestCart.find((i) => i.id === localItem.productId);
        return (
          !serverItem ||
          serverItem.num_sets !== localItem.quantity ||
          parseFloat(serverItem.line_total).toFixed(2) !== localItem.totalPrice
        );
      });

      if (discrepancies.length > 0) {
        setErrorMessage(
          "Cart has changed (e.g., stock or price updates). Please review and try again."
        );
        setLocalCartItems(
          latestCart.map((item) => {
            const unitPriceNum = parseFloat(item.unit_price) || 0;
            const linearFootageNum = parseFloat(item.linear_footage) || 0;
            return {
              productId: item.id,
              name: item.wood_type_details.name,
              selectedColor: item.color_option_details.name,
              image:
                item.wood_type_details.color_images.find(
                  (img) => img.color_option.id === item.color_option
                )?.image_url || "/fallback-image.png",
              quantity: item.num_sets,
              unitPrice: (unitPriceNum * linearFootageNum).toFixed(2),
              totalPrice: parseFloat(item.line_total).toFixed(2),
            };
          })
        );
        setPendingUpdates(new Map());
        setIsCheckingOut(false);
        return;
      }

      setCurrentStep(2);
    } catch (error) {
      console.error("Failed to validate cart:", error);
      setErrorMessage("Failed to validate cart. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  // Calculate subtotal
  const subtotal = localCartItems
    .reduce((acc, item) => acc + parseFloat(item.totalPrice), 0)
    .toFixed(2);

  // Loading and error states
  if (isLoading) return <p>Loading cart...</p>;
  if (isError)
    return (
      <div>
        <p>Error loading cart. Please try again.</p>
        <button
          onClick={refetch}
          className="mt-2 bg-[#9EB24B] text-white p-2 rounded"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-40 w-full py-10 flex flex-col md:flex-row gap-8">
      {/* Cart Items Section */}
      <div className="flex-1">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8">Shopping Cart</h1>

        {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

        {localCartItems.length === 0 ? (
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
                {localCartItems.map((item) => (
                  <tr
                    key={`${item.productId}-${item.selectedColor}`}
                    className="border-b border-gray-200"
                  >
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
                    <td className="py-4 px-4 text-center">${item.unitPrice}</td>
                    <td className="py-4 px-4 text-right font-bold">
                      ${item.totalPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Card List */}
            <div className="flex flex-col gap-6 md:hidden">
              {localCartItems.map((item) => (
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
                        className="text-red-600 hover:cursor-pointer text-sm flex items-center gap-1 hover:underline"
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
          <p className="text-[#94B316] text-xl">${subtotal}</p>
        </div>
        <button
          className="w-full bg-[#9EB24B] text-white p-3 rounded-full font-semibold border border-[#9EB24B] hover:cursor-pointer"
          onClick={handleCheckout}
          disabled={isCheckingOut}
        >
          {isCheckingOut ? "Processing..." : "Checkout"}
        </button>
      </div>
    </div>
  );
}
