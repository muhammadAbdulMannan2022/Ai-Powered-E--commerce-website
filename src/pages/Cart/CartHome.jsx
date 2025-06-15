import React, { useState } from "react";
import CartPage from "./Cart";
import Checkout from "./Checkout";

function StepThree() {
  return <div>Step 3: Order Complete</div>;
}

export default function CartHome() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { label: "Shopping Cart" },
    { label: "Checkout Details" },
    { label: "Order Complete" },
  ];

  const getProgressWidth = () => {
    switch (currentStep) {
      case 1:
        return "33.33%";
      case 2:
        return "66.66%";
      case 3:
        return "100%";
      default:
        return "0%";
    }
  };

  const renderComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <CartPage currentStep={currentStep} setCurrentStep={setCurrentStep} />
        );
      case 2:
        return <Checkout setCurrentStep={setCurrentStep} />;
      case 3:
        return <StepThree />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 mx-auto interFont">
      {/* Title */}
      <div className="w-full flex items-center justify-center">
        <div className="bg-[#D9E0BC] w-fit text-2xl text-[#3F4919] px-6 py-1 rounded-full mb-4">
          Your Cart
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex flex-col items-center justify-center">
        <div className="w-sm md:w-3xl">
          <div className="flex justify-between mb-4 max-w-3xl">
            {steps.map((data, index) => (
              <div
                key={index}
                className="flex gap-3 items-center justify-center w-full"
              >
                <span
                  className={`w-8 h-8 rounded-full ${
                    currentStep < index + 1 ? "bg-[#94B3161A]" : "bg-[#99BA14]"
                  } flex items-center justify-center text-base ${
                    currentStep < index + 1 ? "text-[#99BA14]" : "text-white"
                  }`}
                >
                  {index + 1}
                </span>
                <p className="text-sm text-[#99BA14]">{data.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-1.5 bg-[#94B3161A] rounded-full mb-6 w-full max-w-3xl">
          <div
            className="absolute top-0 left-0 h-1.5 bg-[#99BA14] rounded-full transition-all duration-300"
            style={{ width: getProgressWidth() }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div>
        <div className="mb-4 flex flex-col items-center justify-center">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}
