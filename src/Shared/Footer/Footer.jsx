import React from "react";
// Importing icons from react-icons
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-[#2E3A2F] text-white py-8 px-4 mt-5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Horizon Composite */}
        <div>
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold">HC</span>
            <div className="ml-2">
              <h2 className="text-lg font-semibold">HORIZON COMPOSITE</h2>
              <p className="text-xs">LABORATORY & TESTING SERVICE</p>
            </div>
          </div>
          <p className="text-sm mb-4">
            Lorem ipsum dolor sit amet consectetur. Nibh sollicitudin habitasse
            pharetra amet quam ut eu. Sed nisi auctor nunc ante nam neque
            consequat commodo ullamcorper.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="bg-green-500 p-2 rounded-full">
              <FaFacebookF className="w-5 h-5 text-white" />
            </a>
            <a href="#" className="bg-green-500 p-2 rounded-full">
              <FaInstagram className="w-5 h-5 text-white" />
            </a>
            <a href="#" className="bg-green-500 p-2 rounded-full">
              <FaTwitter className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>

        {/* Quick Access */}
        <div className="pl-20">
          <h3 className="text-lg font-semibold mb-4">QUICK ACCESS</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Products
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Gallery
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">CONTACT INFO</h3>
          <ul className="space-y-4">
            <li className="flex items-center">
              <MdLocationOn className="w-5 h-5 mr-2 text-green-500" />
              <span>2972 Westheimer Rd. Santa Ana, Illinois 85486</span>
            </li>
            <li className="flex items-center">
              <MdEmail className="w-5 h-5 mr-2 text-green-500" />
              <span>willie.jennings@exa...</span>
            </li>
            <li className="flex items-center">
              <MdPhone className="w-5 h-5 mr-2 text-green-500" />
              <span>(207) 555-0119</span>
            </li>
          </ul>
        </div>

        {/* Join Our Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">JOIN OUR NEWSLETTER</h3>
          <form className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-[#4A5A4B] text-white placeholder-gray-400 p-3 rounded-md focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#A3C93B] text-white py-[11px] rounded-full hover:bg-[#8BB32F] font-medium transition"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
