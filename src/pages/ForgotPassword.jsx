import { useState } from "react";
import { GiMailbox } from "react-icons/gi";
import { IoArrowBack } from "react-icons/io5";
import Input from "../helpers/Input";
import { useNavigate } from "react-router"; // If using React Router

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // Use only if you're using react-router

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Forgot Password submitted:", email);

    navigate("/verify-mail", { state: { email } }); // Navigate to VerifyMail with email state
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fbed] flex items-center justify-center relative px-4 py-8">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => navigate("/login")} // or use window.location.href = "/login";
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

        {/* Input */}
        <div className="w-full">
          <Input
            id="forgotPass"
            label="Email"
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-[#94B316] text-white font-semibold rounded-full hover:bg-[#94b316e7] transition"
        >
          Send Mail
        </button>
      </form>
    </div>
  );
}
