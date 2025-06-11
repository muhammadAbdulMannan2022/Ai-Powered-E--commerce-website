import React from "react";
import Title from "../../helpers/Title";

export default function Mission() {
  return (
    <section className="py-20 px-5 md:px-16 lg:px-32 bg-[#F7F8F2]">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Text Section */}
        <div className="w-full lg:w-1/2">
          <Title
            title={
              <>
                We are <span className="text-[#94B316]">committed</span>
              </>
            }
          />
          <p className="text-[#6F706A] text-lg leading-relaxed mt-6 mb-4">
            Our mission is to redefine outdoor living through innovative,
            sustainable, and long-lasting fencing solutions that incorporate
            upcycled components. We aim to provide customers with products that
            combine aesthetic appeal, unrivaled durability, and environmental
            responsibility. Guided by quality and driven by customer
            satisfaction, we strive to be the trusted choice for modern fencing.
          </p>
          <p className="text-[#6F706A] text-lg leading-relaxed">
            Our vision is to revolutionize the way quality and durability are
            delivered in the marketplace. We aim to become a leading force in
            the composite product industry by setting new benchmarks for
            performance, reliability, and customer satisfaction.
          </p>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <img
            src="/mission.png"
            alt="Mission"
            className="w-full h-full max-h-[500px] object-cover rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
