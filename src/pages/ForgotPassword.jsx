import { useState } from "react";
import { GiMailbox } from "react-icons/gi";
import { IoArrowBack } from "react-icons/io5";
import Input from "../helpers/Input";
import { useNavigate } from "react-router";
import { useForgotPasswordMutation } from "../redux/features/auth/AuthSlice";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  // Initialize the mutation hook
  const [forgotPassword, { loading }] = useForgotPasswordMutation();

  const handleChange = (e) => {
    setEmail(e.target.value);
    setErrorMsg(""); // Clear error on input change
    setSuccessMsg(""); // Clear success message on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    try {
      const response = await forgotPassword({
        email: email,
      });

      // Check if the mutation was successful
      if (response.data?.message) {
        setSuccessMsg("A reset PIN has been sent to your email.");
        setEmail(""); // Clear the input
        // Navigate to VerifyMail after a short delay to show success message
        setTimeout(() => {
          navigate("/verify-mail", { state: { email } });
        }, 2000);
      } else {
        setErrorMsg(
          response.data?.forgotPassword?.message || "Something went wrong."
        );
      }
    } catch (err) {
      // Handle network or other errors
      setErrorMsg(
        err.message || "Failed to send reset email. Please try again."
      );
    }
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
          <GiMailbox className="text-6xl md:text-8xl mb-2" />
          <h1 className="text-[#90A53A] text-2xl md:text-4xl font-bold mb-2">
            Forgot Your Password
          </h1>
          <p className="text-[#53640F] text-base md:text-lg">
            Enter your mail and we'll send you a reset PIN
          </p>
        </div>

        {/* Messages */}
        {errorMsg && (
          <p className="w-full text-red-500 text-sm mb-4 text-center">
            {errorMsg}
          </p>
        )}
        {successMsg && (
          <p className="w-full text-green-500 text-sm mb-4 text-center">
            {successMsg}
          </p>
        )}

        {/* Input */}
        <div className="w-full">
          <Input
            id="forgotPass"
            label="Email"
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={handleChange}
            disabled={loading} // Disable input during loading
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-2 mt-4 bg-[#94B316] text-white font-semibold rounded-full transition ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#94b316e7]"
          }`}
          disabled={loading} // Disable button during loading
        >
          {loading ? "Sending..." : "Send Mail"}
        </button>
      </form>
    </div>
  );
}
