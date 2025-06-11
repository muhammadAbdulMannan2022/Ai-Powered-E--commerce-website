import React from "react";
import ReHero from "../../Shared/Hero/ReHero";
import { FaShoppingCart } from "react-icons/fa";
import { Outlet } from "react-router";

export default function Products() {
  return (
    <div className="interFont">
      <ReHero
        backgroundImage="/product.png"
        title={
          <>
            Fencing
            <span className="text-[#C7E44E]">List</span>
          </>
        }
        // subtitle="Delivered to Your Door"
        description="Our horizontal, double-sided fence system was specifically designed to be the last fence you'll ever need. It provides the strength and endurance of aluminum with the durability and low Our horizontal, double-sided fence system was specifically designed to be the last fence you'll ever need. It provides the strength and endurance of aluminum with the durability and low aluminum “U” Channels, the TruNorth composite fence boards and composite fence panels slip easily down the channels attached to the aluminum fence posts. Available in Canada and the USA."
        primaryButtonText="Shop Now"
        primaryButtonAction={() => {}}
        primaryButtonIcon={<FaShoppingCart className="mr-2" />}
      />
      <Outlet />
    </div>
  );
}
