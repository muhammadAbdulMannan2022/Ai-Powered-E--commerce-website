import { Link, Outlet } from "react-router";
import TopBar from "./Shared/Navbar/TopBar";
import Navbar from "./Shared/Navbar/Navbar";
import Footer from "./Shared/Footer/Footer";
import { useEffect, useState } from "react";

export default function App() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    try {
      const choice = localStorage.getItem("cookieConsent");
      if (!choice) setShowConsent(true); // show only if not decided
    } catch {
      // noop (private mode/localStorage blocked)
      setShowConsent(true);
    }
  }, []);

  const handleChoice = (accepted) => {
    try {
      localStorage.setItem("cookieConsent", accepted ? "accepted" : "declined");
      localStorage.setItem("cookieConsentAt", String(Date.now())); // optional metadata
      window.dispatchEvent(
        new CustomEvent("cookie-consent", { detail: { accepted } })
      ); // optional: other parts of app can listen
    } finally {
      setShowConsent(false);
    }
  };

  return (
    <div>
      <TopBar />
      <Navbar />
      {/* all the content will be here */}
      <Outlet />
      <Footer />

      {/* ✅ Only the banner is conditional, not the whole App */}
      {showConsent && (
        <div
          role="dialog"
          aria-live="polite"
          className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex flex-col sm:flex-row items-center justify-between z-50 shadow-lg"
        >
          <p className="text-sm mb-2 sm:mb-0">
            We use cookies to improve your experience. By continuing, you agree
            to our{" "}
            <Link to="/policy" className="underline">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => handleChoice(true)}
              className="bg-[#91a739] hover:bg-[#b7d348] px-4 py-1 rounded-md text-sm hover:cursor-pointer"
            >
              Accept
            </button>
            <button
              onClick={() => handleChoice(false)}
              className="border border-[#C7E44E] hover:cursor-pointer px-4 py-1 rounded-md text-sm"
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
