import { FaCircle } from "react-icons/fa";
import { Link } from "react-router";

const Card = ({
  id,
  image,
  title,
  price,
  features,
  colors,
  altText = "Product image",
}) => {
  return (
    <div className="w-[90%] sm:w-[85%] md:w-[90%] lg:w-[95%] xl:w-[90%] max-w-sm border border-gray-200 rounded-xl overflow-hidden bg-white shadow-md flex flex-col interFont">
      <div className="relative h-48 md:h-56 w-full">
        <img
          src={image || "/placeholder.svg"}
          alt={altText}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-green-800 font-semibold text-lg">{title}</h3>
        <p className="font-bold mt-1 text-base">{price}</p>
        <div className="mt-2 space-y-1 text-sm text-gray-600 flex-grow">
          {features.map((feature, index) => (
            <p key={index}>• {feature}</p>
          ))}
        </div>
        <div className="mt-3">
          <p className="text-sm text-gray-600 mb-1">Color:</p>
          <div className="flex gap-1">
            {colors.map((color, index) => (
              <FaCircle key={index} className="text-lg" style={{ color }} />
            ))}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            to="/free_samples"
            state={{ id }}
            className="bg-green-800 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-green-900 transition-colors w-full sm:w-auto"
          >
            Shop Now
          </Link>
          <button className="border border-gray-300 px-4 py-1.5 rounded text-sm font-medium hover:bg-gray-100 transition-colors w-full sm:w-auto">
            Explore More
          </button>
        </div>
      </div>
    </div>
  );
};
export default Card;
