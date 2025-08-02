import React from "react";
import ReHero from "../../Shared/Hero/ReHero";
import { FaEnvelope, FaShoppingCart } from "react-icons/fa";
import WhyUs from "./Sections/WhyUs";
import ProductsSlider from "./Sections/ProductsSlider";
import DesignIdea from "./Sections/DesignIdea";
import Faq from "./Sections/Faq";
import CustomerReviewSlider from "./Sections/CustomerReviewSlider";
import ContactSection from "./Sections/ContactUs";

// backgroundImage = "/banner/1.png",
//   title = "Premium Composite Fences",
//   subtitle = "Delivered to Your Door",
//   description = "Enjoy the perfect balance of beauty, durability, and low maintenance with our composite decking solutions. Crafted to withstand the harshest weather while maintaining a rich composite decking solution.",
//   primaryButtonText = "Shop Now",
//   secondaryButtonText = "Order Free Sample",
//   primaryButtonAction = () => {},
//   secondaryButtonAction = () => {},
//   primaryButtonIcon = <FaShoppingCart className="mr-2" />,
//   secondaryButtonIcon = <FaEnvelope className="mr-2" />,
export default function Landing() {
  return (
    <div>
      <ReHero
        backgroundImage="/banner/1.png"
        title={
          <span>
            Premium <span className="text-[#C7E44E]">Composite Fences</span>
          </span>
        }
        subtitle="Delivered to Your Door"
        description="Enjoy the perfect balance of beauty, durability, and low maintenance with our premium composite decking solutions. Crafted to withstand the harshest weather while maintaining a rich"
        primaryButtonText="Shop Now"
        secondaryButtonText="Order Free Sample"
        primaryButtonAction={() => { }}
        secondaryButtonAction={() => { }}
        primaryButtonIcon={<FaShoppingCart className="mr-2" />}
        secondaryButtonIcon={<FaEnvelope className="mr-2" />}

      />
      <WhyUs />
      <ProductsSlider />
      <DesignIdea />
      <Faq />
      <CustomerReviewSlider />
      <ContactSection />
    </div>
  );
}
