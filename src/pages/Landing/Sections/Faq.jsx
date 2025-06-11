import React, { useState } from "react";
import Title from "../../../helpers/Title";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function Faq() {
  const [faqs, setFaqs] = useState([
    {
      question: "What is the best material for a deck fence?",
      answer:
        "The best material depends on your preferences for aesthetics, durability, and maintenance. Common choices include wood for its natural look, composite for low maintenance, and metal (like aluminum or steel) for strength and longevity.",
    },
    {
      question: "How tall should my deck fence be?",
      answer:
        "The ideal height for a deck fence typically ranges from 36 to 42 inches, depending on local building codes and the deck's elevation. Always check with your local regulations before building.",
    },
    {
      question: "How much does a deck fence installation typically cost?",
      answer:
        "The cost can vary widely based on materials, design, and labor, but a typical deck fence installation ranges from $25 to $60 per linear foot. Custom designs or premium materials may increase the price.",
    },
    {
      question:
        "What is the maintenance required for wood vs. composite deck fences?",
      answer:
        "Wood deck fences require regular maintenance to preserve their appearance and structural integrity. This includes annual cleaning to remove dirt, mold, or mildew, as well as staining or sealing every 1-2 years to protect against moisture and UV damage. Composite fences, on the other hand, require minimal upkeep—just occasional cleaning with soap and water.",
    },
    {
      question: "Are your deck fences code-compliant and safe for children?",
      answer:
        "Yes, our deck fences are designed to meet or exceed local building codes and include safety features such as appropriate height, picket spacing, and sturdy construction to ensure they are safe for children and pets.",
    },
    {
      question: "How long does it take to complete a deck fence installation?",
      answer:
        "Installation typically takes 1 to 3 days, depending on the size of the deck, the complexity of the design, weather conditions, and material availability.",
    },
    {
      question: "Can you customize the design of my deck fence?",
      answer:
        "Absolutely. We offer a range of customization options including materials, colors, railing styles, post caps, and decorative elements to match your home's style and your personal preferences.",
    },
  ]);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="bg-[#F5F8E8] flex flex-col items-center justify-center py-10">
      <div>
        <Title
          title={
            <>
              Have any <span className="text-[#94B316]">Questions?</span>
            </>
          }
        />
      </div>
      <div className="max-w-2xl mx-auto p-6 rounded-lg">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-1 hover:cursor-pointer">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left p-4 bg-white hover:cursor-pointer rounded-lg shadow-sm flex justify-between items-center focus:outline-none"
            >
              <span className="text-lg font-medium">{faq.question}</span>
              {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {openIndex === index && faq.answer && (
              <div className="p-4 bg-gray-50 text-gray-700 rounded-b-lg">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
