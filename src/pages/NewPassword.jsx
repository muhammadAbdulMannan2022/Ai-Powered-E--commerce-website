import { useState } from "react";
import { IoArrowBack, IoShieldCheckmarkSharp } from "react-icons/io5";
import Input from "../helpers/Input";
import { useLocation, useNavigate } from "react-router";
import { useResetPasswordMutation } from "../redux/features/auth/AuthSlice";
import toast, { Toaster } from "react-hot-toast";

export default function NewPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // For error display
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {}; // Safely destructure email

  // Initialize the mutation hook
  const [resetPassword, { loading }] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    // Validate inputs
    if (!newPassword || !confirmPassword) {
      setErrorMessage("Please fill in both password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!email) {
      setErrorMessage("Email is missing. Please try the reset process again.");
      return;
    }

    try {
      // Send mutation with required data format
      const { data } = await resetPassword({
        email,
        password: newPassword,
      });

      // Handle success (adjust based on your mutation response)
      if (data?.message) {
        toast.success("Password reset successfully!");
        navigate("/login");
      } else {
        setErrorMessage(
          data?.resetPassword?.message || "Password reset failed."
        );
      }
    } catch (error) {
      // Handle network or server errors
      setErrorMessage(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fbed] flex items-center justify-center relative px-4 py-8">
      {/* Back Button */}
      <Toaster />
      <button
        type="button"
        onClick={() => navigate("/login")}
        className="absolute top-4 left-4 text-[#94B316] text-2xl hover:scale-110 transition"
      >
        <IoArrowBack />
      </button>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white/0 p-6 rounded-lg flex flex-col items-center"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-[#94B316] mb-6 text-center">
          <IoShieldCheckmarkSharp className="text-6xl md:text-8xl mb-2" />
          <h1 className="text-[#90A53A] text-2xl md:text-4xl font-bold mb-2">
            Hello
          </h1>
          <p className="text-[#53640F] text-base md:text-lg">Welcome Back!</p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="w-full mb-4 text-red-500 text-center">
            {errorMessage}
          </div>
        )}

        {/* Input Fields */}
        <div className="w-full">
          <Input
            id="newPass"
            label="Enter New Password"
            type="password"
            placeholder="@#*%"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            id="confirmNewPass"
            label="Confirm Password"
            type="password"
            placeholder="@#*%"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="flex items-center gap-2 mt-4 text-[#53640F]">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="accent-[#94B316]"
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 mt-6 bg-[#94B316] text-white font-semibold rounded-full hover:bg-[#94b316e7] transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Processing..." : "Done"}
        </button>
      </form>
    </div>
  );
}
