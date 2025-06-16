"use client";

import React, { useState, useRef, useEffect } from "react";
import { Edit, Mail } from "lucide-react";
import Input from "../../helpers/Input";
import Select from "./Select";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpInputs = useRef([]);

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdate = () => {
    // Simulate API call to update profile
    console.log("Updating profile with:", formData);
    setIsEditing(false);
  };

  const handleUpdateEmail = () => {
    setIsUpdatingEmail(true);
  };

  const handleSendCode = () => {
    if (newEmail) {
      // Simulate sending OTP
      console.log("Sending OTP to:", newEmail);
      setIsVerifyingOTP(true);
      setOtp(["", "", "", ""]);
    }
  };

  const handleVerifyOTP = () => {
    const fullOtp = otp.join("");
    if (fullOtp.length === 4) {
      // Simulate OTP verification
      console.log("Verifying OTP:", fullOtp);
      setFormData((prev) => ({ ...prev, email: newEmail }));
      setIsUpdatingEmail(false);
      setIsVerifyingOTP(false);
      setNewEmail("");
      setOtp(["", "", "", ""]);
    }
  };

  const handleOtpChange = (index) => (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 3) {
        otpInputs.current[index + 1].focus();
      }
    }
  };

  const handleOtpKeyDown = (index) => (e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputs.current[index - 1].focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, 4);
    const newOtp = ["", "", "", ""];
    pastedData.split("").forEach((char, i) => {
      if (i < 4) newOtp[i] = char;
    });
    setOtp(newOtp);
    if (pastedData.length > 0) {
      otpInputs.current[Math.min(pastedData.length, 3)].focus();
    }
  };

  const [formData, setFormData] = useState({
    fullName: "David Leclair",
    gender: "",
    country: "",
    language: "",
    email: "david@gmail.com",
  });

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const countryOptions = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "fr", label: "France" },
    { value: "de", label: "Germany" },
  ];

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "fr", label: "French" },
    { value: "es", label: "Spanish" },
    { value: "de", label: "German" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-8 lg:px-40">
      <div className="p-6">
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src="/profile.png"
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border border-[#90a53a9f]"
              />
              <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md border border-gray-200">
                <Edit className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
                {formData.fullName}
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                {formData.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleEditToggle}
            className="bg-[#90A53A] text-white px-4 py-2 rounded-md hover:bg-[#7a8f32] transition-colors flex items-center space-x-2"
          >
            <Edit className="w-4 h-4" />
            <span>{isEditing ? "Cancel" : "Edit Information"}</span>
          </button>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto rounded-lg">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Input
              label="Full Name"
              id="fullName"
              placeholder="Enter here..."
              value={formData.fullName}
              onChange={handleInputChange("fullName")}
              disabled={!isEditing}
            />
            <Select
              label="Gender"
              id="gender"
              placeholder="Enter here..."
              value={formData.gender}
              onChange={handleInputChange("gender")}
              options={genderOptions}
              disabled={!isEditing}
            />
            <Select
              label="Country"
              id="country"
              placeholder="Enter here..."
              value={formData.country}
              onChange={handleInputChange("country")}
              options={countryOptions}
              disabled={!isEditing}
            />
            <Select
              label="Language"
              id="language"
              placeholder="Enter here..."
              value={formData.language}
              onChange={handleInputChange("language")}
              options={languageOptions}
              disabled={!isEditing}
            />
          </div>
          {isEditing && (
            <button
              onClick={handleUpdate}
              className="bg-[#90A53A] text-white px-6 py-2 rounded-md hover:bg-[#7a8f32] transition-colors mb-6"
            >
              Update Profile
            </button>
          )}

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg sm:text-xl font-medium text-gray-800 mb-4">
              My Email Address
            </h2>
            <div className="rounded-md p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {!isUpdatingEmail ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#90A53A] p-2 rounded">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-700 text-sm sm:text-base">
                      {formData.email}
                    </span>
                  </div>
                  <button
                    onClick={handleUpdateEmail}
                    className="text-white font-medium transition-colors text-sm sm:text-base bg-[#90A53A] py-2 rounded-full hover:cursor-pointer px-3"
                  >
                    Update Email
                  </button>
                </div>
              ) : isVerifyingOTP ? (
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter 4-digit OTP
                  </label>
                  <div className="flex space-x-2" onPaste={handleOtpPaste}>
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (otpInputs.current[index] = el)}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={handleOtpChange(index)}
                        onKeyDown={handleOtpKeyDown(index)}
                        className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#90A53A] bg-[#90A53A] text-white text-2xl font-bold"
                      />
                    ))}
                  </div>
                  <button
                    onClick={handleVerifyOTP}
                    className="mt-4 bg-[#90A53A] text-white px-4 py-2 rounded-md hover:bg-[#7a8f32] transition-colors hover:cursor-pointer"
                    disabled={otp.join("").length !== 4}
                  >
                    Verify OTP
                  </button>
                </div>
              ) : (
                <div className="w-full">
                  <Input
                    label="New Email"
                    id="newEmail"
                    placeholder="Enter new email..."
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    type="email"
                  />
                  <button
                    onClick={handleSendCode}
                    className="mt-4 bg-[#90A53A] text-white px-4 py-2 rounded-md hover:bg-[#7a8f32] transition-colors hover:cursor-pointer"
                    disabled={!newEmail}
                  >
                    Send Code
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
