import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa"; // Importing icons from react-icons
import { RiInstagramFill } from "react-icons/ri";

export default function TopBar() {
  return (
    <div className="bg-black interFont text-white py-2 px-4 md:px-20 flex items-center justify-between w-full">
      {/* Left: Social Media Icons */}
      <div className="flex space-x-3">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF className="text-white hover:text-gray-400 transition duration-300" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RiInstagramFill className="text-white hover:text-gray-400 transition duration-300" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-white hover:text-gray-400 transition duration-300" />
        </a>
      </div>

      {/* Right: Language Dropdown */}
      <div className="flex gap-2">
        {/* Center-Right: Need Help Section */}
        <div className="flex items-center space-x-2 text-sm px-2 border-r">
          <span>Need help? (207) 555-0119</span>
        </div>
        <select
          className="bg-black text-white border-none focus:outline-none text-sm"
          defaultValue="English"
        >
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
        </select>
      </div>
    </div>
  );
}
