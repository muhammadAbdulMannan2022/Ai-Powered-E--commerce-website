import { FaCircle } from "react-icons/fa";
import { Link } from "react-router";

const Card = ({
  id,
  name,
  tagline,
  secondary_tagline,
  price_display,
  actual_price,
  available_colors,
  cover_image_url,
  altText = "Product image",
}) => {
  return (
    <div className="w-[90%] sm:w-[85%] md:w-[90%] lg:w-[95%] xl:w-[90%] max-w-sm border border-gray-200 rounded-xl overflow-hidden bg-white shadow-md flex flex-col interFont">
      <div className="relative h-48 md:h-56 w-full">
        <img
          src={cover_image_url || "/placeholder.svg"}
          alt={altText}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-green-800 font-semibold text-lg line-clamp-1">
          {name}
        </h3>
        {tagline && <p className="text-sm text-gray-700">{tagline}</p>}
        {secondary_tagline && (
          <p className="text-sm text-gray-600 italic line-clamp-2">
            {secondary_tagline}
          </p>
        )}

        <div className="flex items-center gap-2 mt-2">
          <p className="font-bold text-base">${price_display} / Sq.Ft</p>
          <p className="text-xs text-gray-500 line-through">${actual_price}</p>
        </div>

        <div className="mt-3">
          <p className="text-sm text-gray-600 mb-1">Available Colors:</p>
          <div className="flex gap-1">
            {available_colors.map((color) => (
              <FaCircle
                key={color.id}
                className="text-lg"
                style={{ color: color.hex_code }}
              />
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
          <Link
            to={`/products/fencing_list`}
            className="border border-gray-300 px-4 py-1.5 rounded text-sm font-medium hover:bg-gray-100 transition-colors w-full sm:w-auto"
          >
            Explore More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
