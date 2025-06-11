import React from "react";
import ReHero from "../../Shared/Hero/ReHero";
import { FaEnvelope, FaPhone, FaShoppingCart } from "react-icons/fa";
import WhyUsCard from "../../helpers/WhyUsCard";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import ContactForm from "./Form";
import Title from "../../helpers/Title";

export default function ContactUs() {
  return (
    <div>
      <ReHero
        backgroundImage="/contact.jpg"
        title={
          <>
            Contact
            <span className="text-[#C7E44E]">Us</span>
          </>
        }
        // subtitle="Delivered to Your Door"
        description="Please our FAQ for answers to some of the most commonly asked questions"
        primaryButtonText="Shop Now"
        secondaryButtonText="Order Free Sample"
        primaryButtonAction={() => {}}
        secondaryButtonAction={() => {}}
        primaryButtonIcon={<FaShoppingCart className="mr-2" />}
        secondaryButtonIcon={<FaEnvelope className="mr-2" />}
      />
      <div className="flex gap-4 px-5 lg:px-20 py-4 flex-col md:flex-row">
        <WhyUsCard
          icon={
            <>
              <FaLocationDot />
            </>
          }
          text={`2972 Westheimer Rd. Santa Ana Illinois 85486 `}
        />
        <WhyUsCard
          icon={
            <>
              <FaPhone />
            </>
          }
          text={`(207) 555-0119`}
        />
        <WhyUsCard
          icon={
            <>
              <MdEmail />
            </>
          }
          text={`david@gmail.com`}
        />
      </div>
      <ContactForm />
      <div className="flex flex-col items-center justify-center">
        <Title
          title={
            <span className="text-5xl">
              Our Live <span className="text-[#94B316]">Location</span>
            </span>
          }
        />
        <div className="w-full mt-10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.06330778307!2d90.25522363009236!3d23.780753398599362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1749651331337!5m2!1sen!2sbd"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            className="w-full h-[400px]"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
