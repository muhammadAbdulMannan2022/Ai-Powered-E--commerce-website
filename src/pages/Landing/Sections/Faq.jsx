import React from "react";
import Title from "../../../helpers/Title";

export default function Faq() {
  return (
    <div className="bg-[#F5F8E8] flex flex-col items-center justify-center">
      <div>
        <Title
          title={
            <>
              Have any <span className="text-[#94B316]">Questions?</span>
            </>
          }
        />
      </div>
    </div>
  );
}
