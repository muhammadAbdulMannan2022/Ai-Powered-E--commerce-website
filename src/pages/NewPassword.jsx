import { useState } from "react";
import { IoArrowBack, IoShieldCheckmarkSharp } from "react-icons/io5";
import Input from "../helpers/Input";
import { useNavigate } from "react-router";

export default function NewPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!newPassword || !confirmPassword) {
      alert("Please fill in both password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Submit logic
    console.log("New password:", newPassword);
    console.log("Confirm password:", confirmPassword);
    console.log("Remember me:", rememberMe);

    navigate("/");
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fbed] flex items-center justify-center relative px-4 py-8">
      {/* Back Button */}
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
            Hi Devid
          </h1>
          <p className="text-[#53640F] text-base md:text-lg">Welcome Back!</p>
        </div>

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
          className="w-full py-2 mt-6 bg-[#94B316] text-white font-semibold rounded-full hover:bg-[#94b316e7] transition"
        >
          Done
        </button>
      </form>
    </div>
  );
}
