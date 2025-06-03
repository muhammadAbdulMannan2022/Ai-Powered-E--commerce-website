export default function Title({ title, className }) {
  return (
    <h1
      className={`interFont text-4xl md:text-6xl font-bold italic text-[#3F4919] ${className}`}
    >
      {title}
    </h1>
  );
}
