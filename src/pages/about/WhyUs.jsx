import React from "react";
import Title from "../../helpers/Title";
import WhyUsCard from "../../helpers/WhyUsCard";
import { FaShield } from "react-icons/fa6";
import { ImLeaf } from "react-icons/im";
import { GiMetalBar } from "react-icons/gi";
import { FiSun } from "react-icons/fi";
import Button from "../../helpers/Button";
import CustomerReviewSlider from "../Landing/Sections/CustomerReviewSlider";
import ContactSection from "../Landing/Sections/ContactUs";
const whyusCardData = [
  {
    text: "Never paint, stain, seal",
    icon: <GiMetalBar />,
  },
  {
    text: "Fade & stain resistant with 20 year limited warranty",
    icon: <FiSun />,
  },
  {
    text: "Product made of 60% wood powder, 34% plastic(10% vergine plastic for Cap) 6% additives & recycled materials",
    icon: <ImLeaf />,
  },
  {
    text: "More durable than other composite boards",
    icon: <FaShield />,
  },
];
export default function WhyUs() {
  return (
    <>
      <div className="flex flex-col items-center justify-center px-5 md:px-16 lg:px-40 py-20">
        <div className="flex items-center justify-center flex-col mb-10">
          <Title
            title={
              <>
                Why <span className="text-[#94B316]">we are the best</span>
              </>
            }
          />
          <p className="text-[#6F706A] text-center px-10">
            we are ensuring premium materials and a deep commitment to customer
            satisfaction. Our focus on quality, durability, aesthetic appeal and
            innovation ensures products that stand the test of time making us
            the trusted choice for those who demand the best.
          </p>
        </div>
        <div className="flex-1/2 grid grid-cols-2 gap-5 justify-center items-center">
          {whyusCardData.map((card, index) => (
            <WhyUsCard key={index} text={card.text} icon={card.icon} />
          ))}
        </div>
        <Button label="Explore products" className="mt-5 mb-20" />
      </div>
      <CustomerReviewSlider />
      <div className="w-full">
        <ContactSection />
      </div>
    </>
  );
}
