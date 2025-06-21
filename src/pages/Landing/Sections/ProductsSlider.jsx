import React from "react";
import Title from "../../../helpers/Title";
import Slider from "../../../helpers/Slider";
import Button from "../../../helpers/Button";
import { Link } from "react-router";

export default function ProductsSlider() {
  return (
    <div>
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col items-center justify-center gap-4 py-10 max-w-6xl">
          <Title
            className="text-center"
            title={
              <>
                Discover{" "}
                <span className="text-[#94B316]">authentic wood finishes</span>{" "}
                you <br /> won’t find{" "}
                <span className="text-[#94B316]">anywhere</span> else
              </>
            }
          />
          <p className="text-[#6F706A] text-lg interFont text-center max-w-3xl px-4">
            Our wood finishes are not mass-produced imitations — they’re
            carefully curated to bring out the natural beauty, texture, and
            character of real wood
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center overflow-hidden">
        <div className="w-7xl">
          <Slider />
        </div>
        <Link to={"/products/fencing_list"}>
          <Button label="View All Products" className="mt-8" />
        </Link>
      </div>
    </div>
  );
}
