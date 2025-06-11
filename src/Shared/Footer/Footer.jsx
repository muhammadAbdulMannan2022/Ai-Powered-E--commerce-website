import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-[#2E3A2F] text-white py-10 px-4 mt-5">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <div className="flex items-center mb-4">
            <img src="/logoW.png" alt="Logo" className="h-20 w-auto" />
          </div>
          <p className="text-sm mb-4">
            Lorem ipsum dolor sit amet consectetur. Nibh sollicitudin habitasse
            pharetra amet quam ut eu. Sed nisi auctor nunc ante nam neque
            consequat commodo ullamcorper.
          </p>
          <div className="flex space-x-3 mt-4">
            <a
              href="#"
              className="bg-[#a4be39] p-2 rounded-full hover:bg-[#8bb32f] transition"
            >
              <FaFacebookF className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="bg-[#a4be39] p-2 rounded-full hover:bg-[#8bb32f] transition"
            >
              <FaInstagram className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="bg-[#a4be39] p-2 rounded-full hover:bg-[#8bb32f] transition"
            >
              <FaTwitter className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>

        {/* Quick Access */}
        <div>
          <h3 className="text-lg font-semibold mb-4">QUICK ACCESS</h3>
          <ul className="space-y-2 text-sm">
            {["Home", "About Us", "Products", "Gallery", "Contact", "FAQ"].map(
              (item) => (
                <li key={item}>
                  <a href="#" className="hover:underline">
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">CONTACT INFO</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start">
              <MdLocationOn className="w-5 h-5 mr-2 mt-1 text-[#a4be39]" />
              <span>2972 Westheimer Rd. Santa Ana, Illinois 85486</span>
            </li>
            <li className="flex items-center">
              <MdEmail className="w-5 h-5 mr-2 text-[#a4be39]" />
              <span>willie.jennings@example.com</span>
            </li>
            <li className="flex items-center">
              <MdPhone className="w-5 h-5 mr-2 text-[#a4be39]" />
              <span>(207) 555-0119</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">JOIN OUR NEWSLETTER</h3>
          <form className="flex flex-col space-y-4 text-sm">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-[#4A5A4B] text-white placeholder-gray-400 p-3 rounded-md focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#A3C93B] text-white py-3 rounded-full hover:bg-[#8BB32F] font-medium transition"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
