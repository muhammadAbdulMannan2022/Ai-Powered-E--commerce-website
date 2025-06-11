import React from "react";
import ReHero from "../../Shared/Hero/ReHero";
import { FaEnvelope, FaShoppingCart } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
import CostExp from "./CostExp";
import Mission from "./Mission";
import WhyUs from "./WhyUs";

export default function About() {
  return (
    <div className="interFont">
      <div className="relative">
        <ReHero
          backgroundImage="/aboutB.png"
          title={
            <>
              <span>
                Driving Quality{" "}
                <span className="text-[#C7E44E]">Durability,</span> <br />
              </span>
              <span>
                and Customer{" "}
                <span className="text-[#C7E44E]">Satisfaction</span>
              </span>
            </>
          }
          // subtitle="Delivered to Your Door"
          description="we’re committed to delivering premium fencing solutions that stand the test of time. Our focus on superior materials, expert craftsmanship, and customer-first service ensures"
          primaryButtonText="Shop Now"
          secondaryButtonText="Order Free Sample"
          primaryButtonAction={() => {}}
          secondaryButtonAction={() => {}}
          primaryButtonIcon={<FaShoppingCart className="mr-2" />}
          secondaryButtonIcon={<FaEnvelope className="mr-2" />}
        />
        <div className="absolute bottom-[-15px] right-3 md:right-32 bg-[#94B316] text-white text-3xl p-1 rounded-full">
          <MdOutlineSupportAgent />
        </div>
      </div>
      <CostExp />
      <Mission />
      <WhyUs />
    </div>
  );
}
