export default function WhyUsCard({ text, icon }) {
  return (
    <div className="bg-[#94B3161A] flex flex-col items-center justify-center h-60 w-full p-4 interFont">
      <div className="text-[#94B316] text-7xl mb-2">{icon}</div>
      <p className="line-clamp-4 text-[#3F4919] text-center">{text}</p>
    </div>
  );
}
