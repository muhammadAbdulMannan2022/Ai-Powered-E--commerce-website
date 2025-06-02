import { useState, useRef } from "react";
import { IoArrowBack, IoShieldCheckmarkSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router";

export default function VerifyMail() {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/, ""); // Allow only digits
    const newCode = [...code];

    if (val) {
      newCode[index] = val.charAt(0);
      setCode(newCode);

      // Move to next input
      if (index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newCode = [...code];

      if (code[index]) {
        // Clear current box if not empty
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0) {
        // Move to previous input and clear
        inputRefs.current[index - 1]?.focus();
        newCode[index - 1] = "";
        setCode(newCode);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("Text")
      .replace(/\D/g, "")
      .slice(0, 4);
    if (pasted.length < 1) return;

    const newCode = [...code];
    pasted.split("").forEach((digit, idx) => {
      if (idx < 4) newCode[idx] = digit;
    });
    setCode(newCode);
    inputRefs.current[Math.min(pasted.length, 3)]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullCode = code.join("");
    console.log("Verification code submitted:", fullCode);
    // You can add logic to verify the code here
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
            Verify Your Mail!
          </h1>
          <p className="text-[#53640F] text-base md:text-lg">
            We’ve sent a verification code to{" "}
            <span className="font-semibold text-[#94B316]">
              {location.state?.email}
            </span>
          </p>
        </div>

        {/* Code Inputs */}
        <div
          className="w-full flex justify-between gap-3 mb-4"
          onPaste={handlePaste}
        >
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-14 h-14 text-center text-xl border border-[#E0EDAD] bg-[#E8EECE] text-[#53640F] rounded-md focus:outline-none focus:ring-2 focus:ring-[#94B316]"
            />
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 mt-2 bg-[#94B316] text-white font-semibold rounded-full hover:bg-[#94b316e7] transition"
        >
          Confirm
        </button>
      </form>
    </div>
  );
}
