import React, { useState } from "react";
import Input from "../../helpers/Input";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    console.log("Login submitted:", formData);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center bg-[#f8fbed]">
      {/* Image Section */}
      <div className="w-full lg:w-1/2 h-64 lg:h-screen">
        <img
          src="/login.png"
          className="w-full h-full object-cover"
          alt="Login"
        />
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-10 items-center">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src="/icons/formLogo.png" alt="Logo" className="h-20" />
        </div>

        {/* Welcome Back */}
        <h2 className="text-2xl text-center font-semibold text-green-800 mb-6">
          Welcome Back!
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
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
          <button
            type="submit"
            className="w-full py-2 bg-[#94B316] text-white font-semibold rounded-full hover:bg-[#94b316e7] transition"
          >
            Log In
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
          onClick={() => console.log("Google login clicked")}
          className=" flex items-center justify-center py-2 px-10 hover:cursor-pointer border border-[#94B316] rounded-full hover:bg-[#eaf1cc] transition gap-3"
        >
          <img src="/icons/google.png" alt="Google" className="w-5 h-5" />
          <span className="text-[#53640F]">Continue with Google</span>
        </button>

        {/* Register Link */}
        <p className="mt-4 text-sm text-center text-[#53640F]">
          Don’t have an account?{" "}
          <a href="/signup" className="text-[#748b15] hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
