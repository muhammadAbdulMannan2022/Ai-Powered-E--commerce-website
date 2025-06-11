import React from "react";
import Title from "../../helpers/Title";
import Button from "../../helpers/Button";

export default function CostExp() {
  return (
    <div className="py-20 px-5 md:px-16 lg:px-32">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row gap-10 mb-12">
        <div className="w-full lg:w-1/2">
          <Title
            title={
              <>
                Why{" "}
                <span className="text-[#94B316]">
                  Horizon <br /> Composite
                </span>
              </>
            }
          />
        </div>
        <div className="w-full lg:w-1/2">
          <h1 className="text-[#688301] text-2xl mb-4">
            Innovative and Durable Fencing Solutions
          </h1>
          <p className="text-[#6D6D6D] text-lg">
            We blend innovation with reliability to bring you fencing solutions
            that elevate every space. Our products are engineered for
            durability, crafted from recycled materials, and designed to
            withstand harsh weather without fading, warping, or rotting.
          </p>
        </div>
      </div>

      {/* Full-width Image Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full mb-10">
        <img
          src="/costE1.png"
          alt="Cost 1"
          className="w-full h-64 object-cover rounded-xl"
        />
        <img
          src="/costE2.png"
          alt="Cost 2"
          className="w-full h-64 object-cover rounded-xl"
        />
        <img
          src="/costE3.png"
          alt="Cost 3"
          className="w-full h-64 object-cover rounded-xl"
        />
      </div>

      {/* Button */}
      <div className="flex justify-center">
        <Button label="Explore Cost" />
      </div>
    </div>
  );
}
