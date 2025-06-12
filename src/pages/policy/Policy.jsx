import React, { useState } from "react";
import { useLocation } from "react-router";

export default function Policy() {
  const location = useLocation();
  const { policyType } = location.state || {};

  const [shippingPolicy] = useState({
    title: "SHIPPING POLICY",
    sections: [
      {
        title: "Processing Time",
        description:
          "All orders are processed within 2-3 business days. Orders are not shipped or delivered on weekends or holidays unless otherwise noted.",
      },
      {
        title: "Shipping Details",
        description:
          "We ship via major carriers including FedEx, UPS, and regional freight services. A tracking number will be provided once your order ships.",
      },
      {
        title: "Shipping Rates & Estimates for Decking/Fencing Boards",
        description:
          "Shipping costs for large items like decking and fencing boards are calculated based on weight, dimensions, and delivery location. Estimates are shown at checkout.",
      },
      {
        title: "Restrictions",
        description:
          "We currently do not ship to P.O. Boxes, APO/FPO addresses, or certain remote areas. Additional restrictions may apply based on carrier policies.",
      },
      {
        title: "Customs, Duties, & Taxes",
        description:
          "We are not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer.",
      },
      {
        title: "Damaged Orders",
        description:
          "If you received your order damaged, please contact us immediately with photos of the damage. We’ll coordinate a replacement or refund as appropriate.",
      },
      {
        title: "Customer Pickups",
        description:
          "Customers may choose to pick up their orders from our local warehouse. Please wait for confirmation that your order is ready before arriving.",
      },
      {
        title: "Customer Pickups",
        description:
          "At this time, we only ship within North America. For more details or questions, email us at support@dleclair.com.",
      },
    ],
  });

  const [returnsPolicy] = useState({
    title: "RETURNS POLICY",
    sections: [
      {
        title: "Return Eligibility",
        description:
          "Items must be returned within 30 days of delivery in their original condition and packaging. Certain types of items are exempt from being returned.",
      },
      {
        title: "Non-Returnable Items",
        description:
          "Custom-cut products, special orders, clearance items, and used products cannot be returned unless they arrive damaged or defective.",
      },
      {
        title: "Return Process",
        description:
          "To initiate a return, contact our support team with your order number and reason for return. We’ll provide a return authorization and instructions.",
      },
      {
        title: "Refunds",
        description:
          "Once your return is received and inspected, we will notify you of the approval or rejection of your refund. Approved refunds are processed within 5–7 business days.",
      },
      {
        title: "Return Shipping Costs",
        description:
          "Customers are responsible for paying return shipping costs unless the item was incorrect, damaged, or defective upon arrival.",
      },
      {
        title: "Exchanges",
        description:
          "If you need to exchange an item for the same one due to defect or damage, contact us to arrange a replacement at no additional cost.",
      },
      {
        title: "Restocking Fees",
        description:
          "A restocking fee of up to 20% may apply to returns depending on the product type and condition.",
      },
      {
        title: "Customer Pickups - Returns",
        description:
          "Items picked up from our warehouse must also be returned to the same location. Please bring proof of purchase when returning in person.",
      },
    ],
  });

  const policy = policyType === "returns" ? returnsPolicy : shippingPolicy;

  return (
    <div className="px-6 py-8 max-w-4xl mx-auto interFont">
      <h1 className="text-3xl font-bold mb-6">{policy.title}</h1>
      <div className="space-y-6">
        {policy.sections.map((section, index) => (
          <div key={index} className="pb-4">
            <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
            <p className="text-[#667085] leading-relaxed">
              {section.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
