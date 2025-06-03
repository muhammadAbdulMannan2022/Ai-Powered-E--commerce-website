import React from "react";
import Title from "../../../helpers/Title";
import Button from "../../../helpers/Button";
import WhyUsCard from "../../../helpers/WhyUsCard";
import { GiMetalBar } from "react-icons/gi";
import { IoFolderOpenOutline } from "react-icons/io5";
import { ImLeaf } from "react-icons/im";
import { FaShield } from "react-icons/fa6";
const whyusCardData = [
  {
    text: "Never paint, stain, seal",
    icon: <GiMetalBar />,
  },
  {
    text: "Tough, Beautiful, and Easy to Install",
    icon: <IoFolderOpenOutline />,
  },
  {
    text: "Product made of 60% wood powder 34% plastic(10% verging plastic for Cap) 6% additives & recycled materials",
    icon: <ImLeaf />,
  },
  {
    text: "More durable than other composite boards",
    icon: <FaShield />,
  },
];

export default function WhyUs() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex px-10 flex-col md:flex-row gap-10 items-center justify-between py-20 max-w-7xl">
        <div className="flex-1/2">
          <Title
            title={
              <>
                Why <span className="text-[#94B316]">Choose</span> Us
              </>
            }
          />
          <p className="interFont text-sm md:text-lg text-[#6F706A] my-5">
            Enjoy the perfect balance of beauty, durability, and low maintenance
            with our premium composite fencing solutions. Crafted to withstand
            the harshest weather while maintaining a rich
          </p>
          <Button label="Explore more" />
        </div>
        <div className="flex-1/2 grid grid-cols-2 gap-5 justify-center items-center">
          {whyusCardData.map((card, index) => (
            <WhyUsCard key={index} text={card.text} icon={card.icon} />
          ))}
        </div>
      </div>
    </div>
  );
}
