import React, { useState } from "react";
import {
  FaBars,
  FaSearch,
  FaTimes,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import { NavLink } from "react-router"; // Corrected import from react-router-dom
import logo from "/icons/logo.svg"; // Updated logo path as provided

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white shadow-md interFont">
      <div className="mx-4 md:mx-16 px-4 md:px-20 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section (Links on large screens, hidden on small) */}
          <div className="hidden md:flex space-x-8 items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-[#94B316] ${
                  isActive
                    ? "text-[#94B316] border-b-2 border-[#94B316]"
                    : "text-[#3F4919]"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `hover:text-[#94B316] ${
                  isActive
                    ? "text-[#94B316] border-b-2 border-[#94B316]"
                    : "text-[#3F4919]"
                }`
              }
            >
              About Us
            </NavLink>

            {/* Products Dropdown */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className={`hover:text-[#94B316] ${
                  isDropdownOpen ? "text-[#94B316]" : "text-[#3F4919]"
                } focus:outline-none flex items-center`}
              >
                Products
                <svg
                  className={`ml-1 w-4 h-4 transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute left-0 z-40 mt-2 w-48 bg-white shadow-lg rounded-md ">
                  <NavLink
                    to="/products/fencing_list"
                    className={({ isActive }) =>
                      `block px-4 py-2 hover:bg-[#94B316] hover:text-white ${
                        isActive ? "text-[#94B316]" : "text-[#3F4919]"
                      }`
                    }
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Fencing List
                  </NavLink>
                  <NavLink
                    to="/free_samples"
                    className={({ isActive }) =>
                      `block px-4 py-2 hover:bg-[#94B316] hover:text-white ${
                        isActive ? "text-[#94B316]" : "text-[#3F4919]"
                      }`
                    }
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Free Samples
                  </NavLink>
                </div>
              )}
            </div>

            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                `hover:text-[#94B316] ${
                  isActive
                    ? "text-[#94B316] border-b-2 border-[#94B316]"
                    : "text-[#3F4919]"
                }`
              }
            >
              Gallery
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `hover:text-[#94B316] ${
                  isActive
                    ? "text-[#94B316] border-b-2 border-[#94B316]"
                    : "text-[#3F4919]"
                }`
              }
            >
              Contact
            </NavLink>
          </div>

          {/* Centered Logo */}
          <div className="">
            <img src={logo} alt="Logo" className="w-20" />
          </div>

          {/* Right Section (Search, Cart, Profile on large screens only) */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="border rounded-full py-1 px-3 text-[#3F4919] focus:outline-none focus:ring-2 focus:ring-[#94B316]"
              />
              <FaSearch className="absolute right-3 top-2 text-[#3F4919]" />
            </div>
            <FaShoppingCart
              className="text-[#94B316] cursor-pointer" // Always active color
              size={20}
            />
            <FaUser
              className="text-[#94B316] cursor-pointer" // Always active color
              size={20}
            />
          </div>

          {/* Hamburger and Search for small screens */}
          <div className="flex md:hidden items-center space-x-4">
            {/* Search Bar for small screens */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="border rounded-full py-1 px-3 text-[#3F4919] focus:outline-none focus:ring-2 focus:ring-[#94B316]"
              />
              <FaSearch className="absolute right-3 top-2 text-[#3F4919]" />
            </div>

            {/* Hamburger Icon */}
            <button
              onClick={toggleMenu}
              className="text-[#3F4919] focus:outline-none hover:cursor-pointer"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar for small screens - Slide from right */}
      <div
        className={`fixed inset-0 bg-[#3f49196c] backdrop-blur-xs z-50 transition-opacity md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      >
        <div
          className={`fixed right-0 top-0 w-64 bg-white h-full shadow-lg transform transition-transform flex flex-col justify-between ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4">
            <button
              onClick={toggleMenu}
              className="text-[#3F4919] focus:outline-none hover:cursor-pointer absolute top-4 right-4"
            >
              <FaTimes size={24} />
            </button>
            {/* Logo in Sidebar */}
            <div className="mb-8 flex justify-center">
              <img src={logo} alt="Logo" className="w-28" />
            </div>
            {/* Links in Sidebar */}
            <div className="flex flex-col space-y-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `hover:text-[#94B316] ${
                    isActive ? "text-[#94B316] font-bold" : "text-[#3F4919]"
                  }`
                }
                onClick={toggleMenu}
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `hover:text-[#94B316] ${
                    isActive ? "text-[#94B316] font-bold" : "text-[#3F4919]"
                  }`
                }
                onClick={toggleMenu}
              >
                About Us
              </NavLink>

              {/* Products Dropdown in Sidebar */}
              <div>
                <button
                  onClick={toggleDropdown}
                  className={`hover:text-[#94B316] ${
                    isDropdownOpen ? "text-[#94B316]" : "text-[#3F4919]"
                  } flex items-center`}
                >
                  Products
                  <svg
                    className={`ml-1 w-4 h-4 transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="ml-4 mt-2">
                    <NavLink
                      to="/products/multiple"
                      className={({ isActive }) =>
                        `block hover:text-[#94B316] ${
                          isActive
                            ? "text-[#94B316] font-bold"
                            : "text-[#3F4919]"
                        }`
                      }
                      onClick={toggleMenu}
                    >
                      Multiple
                    </NavLink>
                  </div>
                )}
              </div>

              <NavLink
                to="/gallery"
                className={({ isActive }) =>
                  `hover:text-[#94B316] ${
                    isActive ? "text-[#94B316] font-bold" : "text-[#3F4919]"
                  }`
                }
                onClick={toggleMenu}
              >
                Gallery
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `hover:text-[#94B316] ${
                    isActive ? "text-[#94B316] font-bold" : "text-[#3F4919]"
                  }`
                }
                onClick={toggleMenu}
              >
                Contact
              </NavLink>
            </div>
          </div>
          <div className="flex justify-between px-10 items-center space-x-4 mt-8 py-4 border-t border-[#3F4919]">
            <FaShoppingCart
              className="text-[#94B316] cursor-pointer" // Always active color
              size={30}
            />
            <div className="h-6 w-[1px] bg-[#3F4919]" />{" "}
            {/* Vertical divider */}
            <FaUser
              className="text-[#94B316] cursor-pointer" // Always active color
              size={30}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
