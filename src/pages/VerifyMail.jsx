import { useState, useRef, useEffect } from "react";
import { IoArrowBack, IoShieldCheckmarkSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router";
import { toast, Toaster } from "react-hot-toast";
import {
  useReSendOtpMutation,
  useVerifyOtpMutation,
  useResetPasswordOtpMutation, // Import the new mutation
} from "../redux/features/auth/AuthSlice";

export default function VerifyMail() {
  const [code, setCode] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const isFromSignup = location.state?.from === "signup";
  const redirectUrl = isFromSignup ? "/" : "/new-password";
  const email = location.state?.email || "your email";

  // Mutations
  const [
    verifyOtp,
    { isLoading: isVerifyingSignup, error: verifyErrorSignup },
  ] = useVerifyOtpMutation();
  const [
    resetPasswordOtp,
    { isLoading: isVerifyingReset, error: verifyErrorReset },
  ] = useResetPasswordOtpMutation();
  const [resendOtp, { isLoading: isResending, error: resendError }] =
    useReSendOtpMutation();

  // Determine which mutation to use based on the condition
  const isVerifying = isFromSignup ? isVerifyingSignup : isVerifyingReset;
  const verifyError = isFromSignup ? verifyErrorSignup : verifyErrorReset;

  // Timer for resend OTP
  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Handle input change for OTP digits
  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/, "");
    const newCode = [...code];

    if (val) {
      newCode[index] = val.charAt(0);
      setCode(newCode);
      setErrorMessage("");

      if (index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace for OTP inputs
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

  // Handle paste for OTP
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
    setErrorMessage("");
    inputRefs.current[Math.min(pasted.length, 3)]?.focus();
  };

  // Handle OTP verification submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullCode = code.join("");
    if (fullCode.length !== 4) {
      setErrorMessage("Please enter a 4-digit code.");
      toast("Please enter a 4-digit code.", { icon: "❌" });
      return;
    }

    try {
      if (isFromSignup) {
        // Use verifyOtp for signup flow
        const response = await verifyOtp({
          email, // Use the email from location.state
          otp: fullCode,
        }).unwrap();

        // Log response to verify structure
        console.log("API Response:", response);

        // Extract the required data
        const {
          access: access_token,
          refresh: refresh_token,
          profile_data,
        } = response;

        // Verify profile_data and user field exist
        if (!profile_data || !profile_data.user) {
          throw new Error("Invalid response structure: user email not found");
        }

        // Use a different variable to avoid shadowing 'email'
        const userEmail = profile_data.user;

        // Store in local storage
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("email", userEmail);
      } else {
        // Use resetPasswordOtp for password reset flow
        await resetPasswordOtp({
          email, // Use the email from location.state
          otp: fullCode,
        }).unwrap();
      }

      toast("OTP verified successfully!", { icon: "✅" });
      navigate(redirectUrl, { state: { email } });
    } catch (err) {
      console.error("Error:", err);
      const errorMsg = err?.data?.message || "Invalid OTP. Please try again.";
      setErrorMessage(errorMsg);
      toast(errorMsg, { icon: "❌" });
    }
  };

  // Handle OTP resend
  const handleResend = async () => {
    try {
      await resendOtp({ email }).unwrap();
      toast("New OTP sent to your email!", { icon: "✅" });
      setTimeLeft(60);
      setCanResend(false);
      setCode(["", "", "", ""]);
      setErrorMessage("");
      inputRefs.current[0]?.focus();
    } catch (err) {
      const errorMsg =
        err?.data?.message || "Failed to resend OTP. Please try again.";
      setErrorMessage(errorMsg);
      toast(errorMsg, { icon: "❌" });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fbed] flex items-center justify-center relative px-4 py-8">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

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
            <span className="font-semibold text-[#94B316]">{email}</span>
          </p>
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}

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
          disabled={isVerifying || code.join("").length !== 4}
          className={`w-full py-2 mt-2 bg-[#94B316] text-white font-semibold rounded-full hover:bg-[#94b316e7] transition ${isVerifying || code.join("").length !== 4
            ? "opacity-50 cursor-not-allowed"
            : ""
            }`}
        >
          {isVerifying ? "Verifying..." : "Confirm"}
        </button>

        <p className="text-[#53640F] text-sm text-center mt-4">
          Didn’t receive an email? Please check your spam folder or{" "}
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className={`underline text-[#94B316] hover:text-[#6f8f0f] transition ${isResending ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {isResending ? "Resending..." : "request another code"}
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
