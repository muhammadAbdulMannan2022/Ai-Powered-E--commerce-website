import React, { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

export default function TopBar() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Inject Google Translate script only once
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,fr",
            autoDisplay: false,
          },
          "google_translate_element"
        );
        setReady(true); // ✅ mark ready once init is done
      };
    }
  }, []);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    const googleSelect = document.querySelector(".goog-te-combo");

    if (googleSelect) {
      googleSelect.value = lang;
      googleSelect.dispatchEvent(new Event("change"));
    }
  };

  return (
    <div className="bg-black interFont text-white py-2 px-4 md:px-20 flex items-center justify-between w-full">
      {/* Left: Social Media Icons */}
      <div className="flex space-x-3">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF className="text-white hover:text-gray-400 transition duration-300" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <RiInstagramFill className="text-white hover:text-gray-400 transition duration-300" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-white hover:text-gray-400 transition duration-300" />
        </a>
      </div>

      {/* Right: Language Dropdown */}
      <div className="flex gap-2">
        <div className="flex items-center space-x-2 text-sm px-2 border-r">
          <span>Need help? (207) 555-0119</span>
        </div>
        <select
          className="bg-black text-white border-none focus:outline-none text-sm"
          defaultValue="en"
          onChange={handleLanguageChange}
          disabled={!ready} // ✅ disabled until ready
        >
          <option value="en">English</option>
          <option value="fr">French</option>
        </select>
      </div>

      {/* Hidden Google Translate container */}
      <div id="google_translate_element" style={{ display: "none" }}></div>
    </div>
  );
}
