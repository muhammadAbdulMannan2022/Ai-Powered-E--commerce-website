import React, { useState } from "react";
import { CustomInput } from "./Custom-input";

export default function CheckoutForm({ setCurrentStep }) {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    streetAddress: "",
    country: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expirationDate: "",
    securityCode: "",
    nameOnCard: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Contact Information Validation
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone))
      newErrors.phone = "Please enter a valid phone number";

    // Shipping Address Validation
    if (!formData.streetAddress.trim())
      newErrors.streetAddress = "Street address is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
    else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode))
      newErrors.zipCode = "Please enter a valid ZIP code";

    // Credit Card Validation (only if credit-card is selected)
    if (paymentMethod === "credit-card") {
      if (!formData.cardNumber.trim())
        newErrors.cardNumber = "Card number is required";
      else if (!/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(formData.cardNumber))
        newErrors.cardNumber = "Please enter a valid 16-digit card number";

      if (!formData.expirationDate.trim())
        newErrors.expirationDate = "Expiration date is required";
      else if (!/^(0[1-9]|1[0-2])\/20\d{2}$/.test(formData.expirationDate))
        newErrors.expirationDate =
          "Please enter a valid expiration date (MM/YYYY)";
      else {
        const [month, year] = formData.expirationDate.split("/").map(Number);
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;
        if (
          year < currentYear ||
          (year === currentYear && month < currentMonth)
        )
          newErrors.expirationDate = "Card has expired";
      }

      if (!formData.securityCode.trim())
        newErrors.securityCode = "Security code is required";
      else if (!/^\d{3,4}$/.test(formData.securityCode))
        newErrors.securityCode =
          "Please enter a valid 3 or 4-digit security code";

      if (!formData.nameOnCard.trim())
        newErrors.nameOnCard = "Name on card is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
    }
    setCurrentStep(3);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 space-y-6 interFont"
    >
      {/* Contact Information */}
      <section className="rounded-lg p-4 space-y-4">
        <h2 className="text-xl font-semibold text-[#3F4919]">
          Contact Information
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <CustomInput
            label="First Name"
            placeholder="Enter here"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            error={errors.firstName}
            required
          />
          <CustomInput
            label="Last Name"
            placeholder="Enter here"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            error={errors.lastName}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <CustomInput
            label="Phone Number"
            placeholder="Enter here"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            error={errors.phone}
            required
          />
          <CustomInput
            label="Email Address"
            placeholder="Enter here"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            error={errors.email}
            required
          />
        </div>
      </section>

      {/* Shipping Address */}
      <section className="rounded-lg p-4 space-y-4">
        <h2 className="text-xl font-semibold text-[#3F4919]">
          Shipping Address
        </h2>
        <CustomInput
          label="Street Address"
          placeholder="Enter here"
          value={formData.streetAddress}
          onChange={(e) => handleInputChange("streetAddress", e.target.value)}
          error={errors.streetAddress}
          helperText="Include apartment, suite, or unit number if applicable"
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="country"
              className="text-sm font-medium text-[#6C7275]"
            >
              Country <span className="text-red-500">*</span>
            </label>
            <select
              id="country"
              value={formData.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
              className={`
                border border-gray-300 px-3 py-2 rounded-md w-full mt-2
                placeholder:text-gray-400 placeholder:font-normal
                hover:border-gray-400
                transition-all duration-200 ease-in-out transform focus:scale-[1.01]
                focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-[#94B316]
                focus-visible:ring-1 focus-visible:ring-offset-1
                ${errors.country ? "border-red-500" : ""}
              `}
              required
            >
              <option value="">Select a country</option>
              <option value="us">United States</option>
              <option value="ca">Canada</option>
              <option value="uk">United Kingdom</option>
              <option value="au">Australia</option>
            </select>
            {errors.country && (
              <p className="text-red-500 text-xs mt-1">{errors.country}</p>
            )}
          </div>

          <CustomInput
            label="Town/City"
            placeholder="Enter here"
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            error={errors.city}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <CustomInput
            label="State"
            placeholder="Enter here"
            value={formData.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
            error={errors.state}
            required
          />
          <CustomInput
            label="ZIP Code"
            placeholder="Enter here"
            type="text"
            value={formData.zipCode}
            onChange={(e) => handleInputChange("zipCode", e.target.value)}
            error={errors.zipCode}
            required
          />
        </div>
      </section>

      {/* Payment Method */}
      <section className="rounded-lg p-4 space-y-4">
        <h2 className="text-xl font-semibold text-[#3F4919]">Payment Method</h2>
        <div className="space-y-2">
          <label
            className={`flex items-center p-3 rounded-lg space-x-2 cursor-pointer transition 
              ${
                paymentMethod === "credit-card"
                  ? "bg-[#94B3161A] border border-[#94B316] text-[#3F4919]"
                  : "border border-gray-200 hover:bg-gray-50 text-gray-700"
              }
            `}
          >
            <input
              type="radio"
              value="credit-card"
              checked={paymentMethod === "credit-card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="accent-[#94B316]"
            />
            <span className="text-sm font-medium">Pay With Credit Card</span>
          </label>

          <label
            className={`flex items-center p-3 rounded-lg space-x-2 cursor-pointer transition 
              ${
                paymentMethod === "stripe"
                  ? "bg-[#94B3161A] border border-[#94B316] text-[#3F4919]"
                  : "border border-gray-200 hover:bg-gray-50 text-gray-700"
              }
            `}
          >
            <input
              type="radio"
              value="stripe"
              checked={paymentMethod === "stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="accent-gray-600"
            />
            <span className="text-sm font-medium">Stripe</span>
          </label>
        </div>

        {paymentMethod === "credit-card" && (
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <CustomInput
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={(e) => {
                const formatted = e.target.value
                  .replace(/\s/g, "")
                  .replace(/(.{4})/g, "$1 ")
                  .trim();
                handleInputChange("cardNumber", formatted);
              }}
              maxLength={19}
              error={errors.cardNumber}
              helperText="Enter your 16-digit card number"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <CustomInput
                label="Expiration Date"
                placeholder="MM/YYYY"
                value={formData.expirationDate}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, "");
                  if (value.length >= 2) {
                    value = value.substring(0, 2) + "/" + value.substring(2, 6);
                  }
                  handleInputChange("expirationDate", value);
                }}
                maxLength={7}
                error={errors.expirationDate}
                required
              />
              <CustomInput
                label="Security Code"
                placeholder="123"
                type="password"
                value={formData.securityCode}
                onChange={(e) =>
                  handleInputChange(
                    "securityCode",
                    e.target.value.replace(/\D/g, "")
                  )
                }
                maxLength={4}
                error={errors.securityCode}
                helperText="3-4 digits on back of card"
                required
              />
            </div>
            <CustomInput
              label="Name on Card"
              placeholder="Enter full name as shown on card"
              value={formData.nameOnCard}
              onChange={(e) => handleInputChange("nameOnCard", e.target.value)}
              error={errors.nameOnCard}
              required
            />
          </div>
        )}
      </section>

      {/* Remember Me */}
      <section className="rounded-lg p-4 space-y-2">
        <h2 className="text-xl font-semibold text-[#3F4919]">Remember Me</h2>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="accent-[#94B316]"
          />
          <span className="text-sm text-[#94B316]">
            Save My Information For A Faster Checkout
          </span>
        </label>
      </section>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#99BA14] hover:bg-[#94B316] text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:cursor-pointer"
      >
        Place Order
      </button>
    </form>
  );
}
