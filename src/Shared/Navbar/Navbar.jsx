import React, { useState, useCallback } from "react";
import {
  FaBars,
  FaSearch,
  FaTimes,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router";
import { debounce } from "lodash";
import logo from "/icons/logo.svg";
import { useSearchQuery } from "../../redux/features/Products/ProductsSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  // Debug: Log searchTerm
  console.log("Search Term:", searchTerm, "Type:", typeof searchTerm);

  // Use useSearchQuery hook to fetch search results
  const {
    data: searchResults,
    isLoading,
    isFetching,
    error,
  } = useSearchQuery(searchTerm, {
    skip: !searchTerm, // Skip query if searchTerm is empty
  });

  // Debug: Log query status
  console.log("Search Query Status:", {
    isLoading,
    isFetching,
    error: error ? { message: error.message, status: error.status } : null,
    searchResults,
  });

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((value) => {
      console.log("Debounced Search Triggered with Value:", value);
      setSearchTerm(value);
      setShowResults(!!value);
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    console.log("Input Change:", value);
    debouncedSearch(value);
  };

  // Fallback: Test query without debounce for debugging
  const handleSearchChangeImmediate = (e) => {
    const value = e.target.value;
    console.log("Immediate Search:", value);
    setSearchTerm(value);
    setShowResults(!!value);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleResultClick = (id, slug) => {
    setSearchTerm("");
    setShowResults(false);
    navigate("/free_samples", { state: { id: slug } });
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
                <div className="absolute left-0 z-40 mt-2 w-48 bg-white shadow-lg rounded-md">
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
                onChange={handleSearchChange} // Use handleSearchChangeImmediate for debugging
                onFocus={() => setShowResults(!!searchTerm)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
              />
              <FaSearch className="absolute right-3 top-2 text-[#3F4919]" />
              {showResults && (
                <div className="absolute z-50 mt-2 w-64 bg-white shadow-lg rounded-md max-h-80 overflow-y-auto">
                  {isLoading || isFetching ? (
                    <div className="px-4 py-2 text-[#3F4919]">Loading...</div>
                  ) : error ? (
                    <div className="px-4 py-2 text-[#3F4919]">
                      Error: {error.message || "Failed to fetch results"}
                    </div>
                  ) : searchResults && searchResults.length > 0 ? (
                    searchResults.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center px-4 py-2 hover:bg-[#94B316] hover:text-white cursor-pointer"
                        onClick={() =>
                          handleResultClick(result.id, result.slug)
                        }
                      >
                        <img
                          src={result.image_url}
                          alt={result.name}
                          className="w-12 h-12 object-cover mr-3 rounded"
                        />
                        <span className="text-[#3F4919] hover:text-white">
                          {result.name}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-[#3F4919]">
                      No results found
                    </div>
                  )}
                </div>
              )}
            </div>
            <Link to="/cart">
              <FaShoppingCart
                className="text-[#94B316] cursor-pointer"
                size={20}
              />
            </Link>
            <Link to="/profile">
              <FaUser className="text-[#94B316] cursor-pointer" size={20} />
            </Link>
          </div>

          {/* Hamburger and Search for small screens */}
          <div className="flex md:hidden items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="border rounded-full py-1 px-3 text-[#3F4919] focus:outline-none focus:ring-2 focus:ring-[#94B316]"
                onChange={handleSearchChange} // Use handleSearchChangeImmediate for debugging
                onFocus={() => setShowResults(!!searchTerm)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
              />
              <FaSearch className="absolute right-3 top-2 text-[#3F4919]" />
              {showResults && (
                <div className="absolute z-50 mt-2 w-64 bg-white shadow-lg rounded-md max-h-80 overflow-y-auto">
                  {isLoading || isFetching ? (
                    <div className="px-4 py-2 text-[#3F4919]">Loading...</div>
                  ) : error ? (
                    <div className="px-4 py-2 text-[#3F4919]">
                      Error: {error.message || "Failed to fetch results"}
                    </div>
                  ) : searchResults && searchResults.length > 0 ? (
                    searchResults.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center px-4 py-2 hover:bg-[#94B316] hover:text-white cursor-pointer"
                        onClick={() =>
                          handleResultClick(result.id, result.slug)
                        }
                      >
                        <img
                          src={result.image_url}
                          alt={result.name}
                          className="w-12 h-12 object-cover mr-3 rounded"
                        />
                        <span className="text-[#3F4919] hover:text-white">
                          {result.name}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-[#3F4919]">
                      No results found
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={toggleMenu}
              className="text-[#3F4919] focus:outline-none hover:cursor-pointer"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar for small screens */}
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
            <div className="mb-8 flex justify-center">
              <img src={logo} alt="Logo" className="w-28" />
            </div>
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
                  <div className="absolute left-0 z-40 mt-2 w-48 bg-white shadow-lg rounded-md">
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
            <Link to="/cart">
              <FaShoppingCart
                className="text-[#94B316] cursor-pointer"
                size={30}
              />
            </Link>
            <div className="h-6 w-[1px] bg-[#3F4919]" />
            <Link to="/profile">
              <FaUser className="text-[#94B316] cursor-pointer" size={30} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
