import { FaCircle } from "react-icons/fa";
import { Link } from "react-router";
import { useRecientViewsMutation } from "../redux/Profile/ProfileGetSlice";

const Card = ({
  id,
  name,
  tagline,
  secondary_tagline,
  price_display,
  actual_price,
  available_colors,
  image_url,
  altText = "Product image",
  slug,
}) => {
  const [addRecent, { isError }] = useRecientViewsMutation();
  const token = localStorage.getItem("access_token");
  const handleClick = async (id) => {
    if (token) {
      const res = await addRecent({ wood_type_id: id }).unwrap();
      console.log(id, res);
    }
    console.log("you are not logged in");
  };
  return (
    <div className="w-[90%] sm:w-[85%] md:w-[90%] lg:w-[95%] xl:w-[90%] max-w-sm border border-gray-200 rounded-xl overflow-hidden bg-white shadow-md flex flex-col interFont">
      <div className="relative h-48 md:h-56 w-full">
        <img
          src={image_url || "/placeholder.svg"}
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
          <p className="font-bold text-base">${actual_price} / Sq.Ft</p>
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
            onClick={() => handleClick(id)}
            state={{ id: slug }}
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
