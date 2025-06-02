import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({ label, id, type = "text", placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm font-medium text-[#60701E] mb-1">
        {label}
      </label>
      <div className="relative w-full">
        <input
          type={inputType}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`p-2 pr-10 bg-[#E8EECE] border border-[#E0EDAD] rounded-md w-full focus:outline-none text-[#A8A8A8]`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#90A53A] hover:cursor-pointer border-l ps-2 border-[#90A53A]"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
