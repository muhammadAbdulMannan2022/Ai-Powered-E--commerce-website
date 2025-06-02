import { useState, useRef, useEffect } from "react";
import { IoArrowBack, IoShieldCheckmarkSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router";

export default function VerifyMail() {
  const [code, setCode] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/, "");
    const newCode = [...code];

    if (val) {
      newCode[index] = val.charAt(0);
      setCode(newCode);

      if (index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newCode = [...code];
      if (code[index]) {
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0) {
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
    navigate("/new-password");
  };

  const handleResend = () => {
    console.log("Resending code...");
    setTimeLeft(60);
    setCanResend(false);
    setCode(["", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fbed] flex items-center justify-center relative px-4 py-8">
      <button
        type="button"
        onClick={() => navigate("/login")}
        className="absolute top-4 left-4 text-[#94B316] text-2xl hover:scale-110 transition"
      >
        <IoArrowBack />
      </button>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white/0 p-6 rounded-lg flex flex-col items-center"
      >
        <div className="flex flex-col items-center text-[#94B316] mb-6 text-center">
          <IoShieldCheckmarkSharp className="text-6xl md:text-8xl mb-2" />
          <h1 className="text-[#90A53A] text-2xl md:text-4xl font-bold mb-2">
            Verify Your Mail!
          </h1>
          <p className="text-[#53640F] text-base md:text-lg">
            We’ve sent a verification code to{" "}
            <span className="font-semibold text-[#94B316]">
              {location.state?.email || "your email"}
            </span>
          </p>
        </div>

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

        <button
          type="submit"
          className="w-full py-2 mt-2 bg-[#94B316] text-white font-semibold rounded-full hover:bg-[#94b316e7] transition"
        >
          Confirm
        </button>

        {/* Countdown and Resend Info */}
        <p className="text-[#53640F] text-sm text-center mt-4">
          Didn’t receive an email? Please check your spam folder or{" "}
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              className="underline text-[#94B316] hover:text-[#6f8f0f] transition"
            >
              request another code
            </button>
          ) : (
            <>
              request another code in {timeLeft} second{timeLeft !== 1 && "s"}.
            </>
          )}
        </p>
      </form>
    </div>
  );
}
