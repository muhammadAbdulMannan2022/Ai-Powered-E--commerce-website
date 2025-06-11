import React from "react";
import { FaShoppingCart, FaEnvelope } from "react-icons/fa";

const ReHero = ({
  backgroundImage = "/banner/1.png",
  title = "",
  subtitle = "",
  description = "",
  primaryButtonText = "",
  secondaryButtonText = "",
  primaryButtonAction = () => {},
  secondaryButtonAction = () => {},
  primaryButtonIcon = "",
  secondaryButtonIcon = "",
}) => {
  return (
    <div
      className="relative w-full h-[60vh] min-h-[400px] max-h-[600px] bg-cover bg-center interFont flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 sm:px-6 md:px-8">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 italic">
          {title}
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 italic">
          {subtitle}
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-md sm:max-w-lg md:max-w-2xl">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={primaryButtonAction}
            className="bg-[#94B316] text-white px-4 sm:px-6 py-2 rounded-full flex items-center justify-center hover:bg-[#94b316f1] transition-colors duration-300 text-sm sm:text-base hover:cursor-pointer"
            aria-label={primaryButtonText}
          >
            {primaryButtonIcon}
            {primaryButtonText}
          </button>
          <button
            onClick={secondaryButtonAction}
            className="bg-transparent border-2 border-[#94B316] text-[#94B316] px-4 sm:px-6 py-2 rounded-full flex items-center justify-center hover:bg-[#94B316] hover:text-white hover:border-[#94B316] transition-colors duration-300 text-sm sm:text-base hover:cursor-pointer"
            aria-label={secondaryButtonText}
          >
            {secondaryButtonIcon}
            {secondaryButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReHero;
