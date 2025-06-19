import React, { useState } from "react";
import { CustomInput } from "./Custom-input";
import { useCheckoutMutation } from "../../redux/Profile/ProfileGetSlice";

export default function CheckoutForm({ setCurrentStep }) {
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
  });
  const [errors, setErrors] = useState({});
  const [checkout, { isLoading, error }] = useCheckoutMutation();

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
    // else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode))
    //   newErrors.zipCode = "Please enter a valid ZIP code";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      try {
        const checkoutData = {
          shipping_address: {
            full_name: `${formData.firstName} ${formData.lastName}`,
            phone_number: formData.phone,
            email: formData.email,
            street_address: formData.streetAddress,
            city: formData.city,
            state_province: formData.state,
            zip_code: formData.zipCode,
            country: formData.country,
          },
        };
        const responce = await checkout(checkoutData).unwrap();
        console.log(responce);
        if (responce.session_url) {
          window.location.href = responce.session_url;
        }
      } catch (error) {
        setErrors(error);
        console.log(error, "error on checkout");
      }
    }
    // setCurrentStep(3); // TODO: Change this
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
