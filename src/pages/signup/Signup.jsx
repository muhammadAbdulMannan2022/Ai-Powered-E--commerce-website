import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import Input from "../../helpers/Input";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <div className="min-h-screen bg-[#f8fbed] flex flex-col lg:flex-row">
      {/* Image Section */}
      <div className="w-full lg:w-1/2 h-64 lg:h-screen">
        <img
          src="/signup.png"
          alt="Sign up"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <img src="/icons/formLogo.png" alt="Logo" className="h-24" />
          </div>

          {/* Title */}
          <h2 className="text-center text-2xl font-semibold text-green-800">
            REGISTER NOW!
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              id="fullName"
              type="text"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
            />
            <Input
              label="Email"
              id="email"
              type="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="@#*%"
              value={formData.password}
              onChange={handleChange}
            />
            <Input
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              placeholder="@#*%"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-full py-2 bg-[#94B316] text-white font-semibold rounded-full hover:bg-[#94b316e7] transition hover:cursor-pointer"
            >
              Register
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center w-full my-4">
            <hr className="flex-1 border-[#94B316]" />
            <span className="mx-2 text-[#94B316]">OR</span>
            <hr className="flex-1 border-[#94B316]" />
          </div>

          {/* Google Button */}
          <button
            type="button"
            className="flex items-center justify-center w-full py-2 border border-[#94B316] rounded-full hover:bg-[#eaf1cc] transition gap-3 hover:cursor-pointer"
          >
            <img src="/icons/google.png" alt="Google" className="w-5 h-5" />
            <span className="text-[#53640F]">Continue with Google</span>
          </button>

          {/* Login Link */}
          <p className="text-sm text-center text-[#53640F]">
            Already have an account?{" "}
            <a href="/login" className="text-[#748b15] hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
