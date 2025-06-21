"use client";

import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Edit, Mail } from "lucide-react";
import Input from "../../helpers/Input";
import Select from "./Select";
import { FiLogOut } from "react-icons/fi";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangeEmailMutation,
  useEmailOtpVerifyMutation,
} from "../../redux/Profile/ProfileGetSlice";
import { setProfile } from "../../redux/Profile/ProfileSlice";
import { Link, useNavigate } from "react-router";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const navigate = useNavigate();

  const {
    data: profileData,
    isLoading: lodingProfileInfo,
    isError: profileInfoErr,
  } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [changeEmail, { isLoading: isSendingEmail, error: emailError }] =
    useChangeEmailMutation();
  const [verifyEmailOtp, { isLoading: isVerifyingOtp, error: otpError }] =
    useEmailOtpVerifyMutation();

  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (profileData) {
      dispatch(setProfile(profileData));
    }
  }, [profileData, dispatch]);

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    country: "",
    language: "",
    email: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpInputs = useRef([]);
  const [errorMessage, setErrorMessage] = useState(""); // For error feedback

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.full_name || "",
        gender: profile.gender || "",
        country: profile.country || "",
        language: profile.language || "",
        email: profile.user || "",
      });
      if (profile.image) {
        setPreviewImage(profile.image);
      }
    }
  }, [profile]);

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setFormData({
        fullName: profile.full_name || "",
        gender: profile.gender || "",
        country: profile.country || "",
        language: profile.language || "",
        email: profile.user || "",
      });
    }
    setIsEditing(!isEditing);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    const form = new FormData();
    form.append("full_name", formData.fullName);
    form.append("gender", formData.gender);
    form.append("country", formData.country);
    form.append("language", formData.language);
    if (selectedImage) {
      form.append("image", selectedImage);
    }

    try {
      const res = await updateProfile(form).unwrap();
      dispatch(setProfile(res));
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  const handleUpdateEmail = () => {
    setIsUpdatingEmail(true);
    setErrorMessage("");
  };

  const handleSendCode = async () => {
    if (newEmail) {
      try {
        console.log("new email", newEmail);

        await changeEmail({ new_email: newEmail }).unwrap();
        setIsVerifyingOTP(true);
        setOtp(["", "", "", ""]);
        setErrorMessage("");
      } catch (err) {
        setErrorMessage(
          err?.data?.message || "Failed to send OTP. Please try again."
        );
        console.error("Failed to send email OTP:", err);
      }
    }
  };

  const handleVerifyOTP = async () => {
    const fullOtp = otp.join("");
    // console.log(fullOtp);
    if (fullOtp.length === 4) {
      try {
        const res = await verifyEmailOtp({
          new_email: newEmail,
          otp: fullOtp,
        }).unwrap();
        setFormData((prev) => ({ ...prev, email: newEmail }));
        dispatch(setProfile({ ...profile, user: newEmail })); // Update Redux store
        setIsUpdatingEmail(false);
        setIsVerifyingOTP(false);
        setNewEmail("");
        setOtp(["", "", "", ""]);
        setErrorMessage("");
      } catch (err) {
        setErrorMessage(err?.data?.message || "Invalid OTP. Please try again.");
        console.error("Failed to verify OTP:", err);
      }
    }
  };

  const handleOtpChange = (index) => (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
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

  const logOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_email");
    navigate("/");
  };

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
    <div className=" bg-gray-50 px-4 sm:px-6 py-8 lg:px-40">
      <div className="p-6 w-full  flex items-center justify-center">
        <div className="flex flex-row items-center justify-between gap-4 lg:max-w-screen-xl  w-full">
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <img
                src={previewImage || "/profile.png"}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border border-[#90a53a9f]"
              />
              {isEditing && (
                <>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md border border-gray-200 hover:cursor-pointer"
                  >
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </>
              )}
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
              className="bg-[#90A53A] text-white px-6 py-2 rounded-md hover:bg-[#7a8f32] hover:cursor-pointer transition-colors mb-6"
            >
              Update Profile
            </button>
          )}

          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-medium text-gray-800 mb-4">
                My Email Address
              </h2>
              <Link
                to={"/profile/orders"}
                className="text-white font-medium transition-colors text-sm sm:text-base bg-[#90A53A] py-2 rounded-full hover:cursor-pointer px-3"
              >
                View orders
              </Link>
            </div>
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
                  {errorMessage && (
                    <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
                  )}
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
                    disabled={otp.join("").length !== 4 || isVerifyingOtp}
                  >
                    {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
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
                  {errorMessage && (
                    <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                  )}
                  <button
                    onClick={handleSendCode}
                    className="mt-4 bg-[#90A53A] text-white px-4 py-2 rounded-md hover:bg-[#7a8f32] transition-colors hover:cursor-pointer"
                    disabled={!newEmail || isSendingEmail}
                  >
                    {isSendingEmail ? "Sending..." : "Send Code"}
                  </button>
                </div>
              )}
            </div>
          </div>
          <div>
            <button
              onClick={logOut}
              className="flex items-center gap-2 bg-[#90A53A] text-white px-6 py-2 rounded-md hover:bg-[#7a8f32] hover:cursor-pointer transition-colors mb-6 focus:outline-none focus:ring-2 focus:ring-[#90A53A] focus:ring-offset-2"
            >
              <FiLogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
