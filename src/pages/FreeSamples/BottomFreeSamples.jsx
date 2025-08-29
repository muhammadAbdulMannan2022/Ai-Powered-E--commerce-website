import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaFilePdf } from "react-icons/fa";
import { Link } from "react-router"; // Correct import for react-router-dom

// Sample data (replace this with your actual data source, e.g., props or API)
const rawData = {
  id: 3,
  category: 2,
  category_name: "Brulee-wood Grain",
  name: "Brulee-wood Grain (Light Tone)",
  slug: "brulee-wood-grain-light-tone",
  tagline: "20 Year limited residential warranty",
  secondary_tagline: "Linear grain pattern with refined streaking",
  full_description: "",
  price_display: "2.00",
  actual_price: "5.00",
  key_features: [
    "No warping, cracking or rotting",
    "75” On-Center Spacing Between Posts",
    "Same Color/Pattern on Both Sides",
    "1” Thick Boards (Same as Decking)",
    "Gate Kits available",
    "Maximum gate width: 4’6”",
  ],
  color_images: [
    {
      id: 1,
      color_option: {
        id: 3,
        name: "Cherry Red",
        hex_code: "#9B111E",
        is_active: true,
      },
      image:
        "image/upload/v1750250767/wood_type_color_images/oojb9voag2ud7edh7xoq.png",
      image_url:
        "http://res.cloudinary.com/dze2kofvs/image/upload/v1750250767/wood_type_color_images/oojb9voag2ud7edh7xoq.png",
      order: 1,
    },
    {
      id: 2,
      color_option: {
        id: 4,
        name: "Ebony Black",
        hex_code: "#0A0A0A",
        is_active: true,
      },
      image:
        "image/upload/v1750250768/wood_type_color_images/jqtjjyvvnc6ucwozrei1.png",
      image_url:
        "http://res.cloudinary.com/dze2kofvs/image/upload/v1750250768/wood_type_color_images/jqtjjyvvnc6ucwozrei1.png",
      order: 2,
    },
    {
      id: 3,
      color_option: {
        id: 5,
        name: "Maple Gold",
        hex_code: "#E6BE8A",
        is_active: true,
      },
      image:
        "image/upload/v1750250769/wood_type_color_images/jfxrqxgchdnqin9laomo.png",
      image_url:
        "http://res.cloudinary.com/dze2kofvs/image/upload/v1750250769/wood_type_color_images/jfxrqxgchdnqin9laomo.png",
      order: 3,
    },
  ],
  is_featured: true,
  created_at: "2025-06-18T12:46:01.874755Z",
  updated_at: "2025-06-18T13:04:08.595110Z",
};

// Transform raw data to match the component's expected product prop
const transformProductData = (rawData) => ({
  description:
    rawData.full_description ||
    `${rawData.tagline}. ${rawData.secondary_tagline}.`,
  keyFeatures: Array.isArray(rawData.key_features) ? rawData.key_features : [],
  installationGuide: [], // Empty since not provided in data
  warranty: rawData.tagline || "No warranty information available.",
});

export default function BottomFreeSamples({ product: rawProduct }) {
  // Use transformed data, fallback to rawData if no product prop is passed
  const product = rawProduct
    ? transformProductData(rawProduct)
    : transformProductData(rawData);

  const [expandedSections, setExpandedSections] = useState({
    description: true,
    keyFeatures: false,
    shipping: false,
    installation: false,
    warranty: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Description Section */}
      <div className="border-b border-gray-200 pb-4 mb-6">
        <button
          onClick={() => toggleSection("description")}
          className="flex items-center justify-between w-full text-left"
        >
          <h2 className="text-xl font-semibold text-gray-800">Description</h2>
          {expandedSections.description ? (
            <FaChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <FaChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>

        {expandedSections.description && (
          <div className="mt-4">
            <p className="text-gray-600 leading-relaxed text-sm">
              {product.description}
            </p>
          </div>
        )}
      </div>

      {/* Key Features Section */}
      <div className="border-b border-gray-200 pb-4 mb-6">
        <button
          onClick={() => toggleSection("keyFeatures")}
          className="flex items-center justify-between w-full text-left"
        >
          <h2 className="text-xl font-semibold text-gray-800">Key Features</h2>
          {expandedSections.keyFeatures ? (
            <FaChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <FaChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>

        {expandedSections.keyFeatures && (
          <div className="mt-4 space-y-3">
            {product.keyFeatures.length > 0 ? (
              <ul className="space-y-2">
                {product.keyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-sm">
                No key features available.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Shipping & Return Section */}
      <div className="border-b border-gray-200 pb-4 mb-6">
        <button
          onClick={() => toggleSection("shipping")}
          className="flex items-center justify-between w-full text-left"
        >
          <h2 className="text-xl font-semibold text-gray-800">
            Shipping & Return
          </h2>
          {expandedSections.shipping ? (
            <FaChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <FaChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>

        {expandedSections.shipping && (
          <div className="mt-4 space-y-2">
            <Link
              to="/policy"
              state={{ policyType: "shipping" }}
              className="text-blue-600 hover:text-blue-800 underline text-sm"
            >
              Shipping Policy
            </Link>
            <br />
            <Link
              to="/policy"
              state={{ policyType: "returns" }}
              className="text-blue-600 hover:text-blue-800 underline text-sm"
            >
              Returns Policy
            </Link>
          </div>
        )}
      </div>

      {/* Installation Guide Section */}
      {product.installationGuide.length > 0 && (
        <div className="border-b border-gray-200 pb-4 mb-6">
          <button
            onClick={() => toggleSection("installation")}
            className="flex items-center justify-between w-full text-left"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              Installation Guide
            </h2>
            {expandedSections.installation ? (
              <FaChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <FaChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>

          {expandedSections.installation && (
            <div className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {product.installationGuide.map((guide, index) => (
                  <div key={index} className="text-center">
                    <p className="text-sm text-gray-600 mb-2">
                      Guide {String(index + 1).padStart(2, "0")}
                    </p>
                    <a
                      href={guide.file}
                      download
                      className="flex flex-col items-center space-y-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <FaFilePdf className="w-12 h-12 text-red-600" />
                      <span className="text-xs text-gray-600">
                        {guide.fileName ||
                          `Guide ${String(index + 1).padStart(2, "0")}.pdf`}
                      </span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Warranty Section */}
      <div className="pb-4">
        <button
          onClick={() => toggleSection("warranty")}
          className="flex items-center justify-between w-full text-left"
        >
          <h2 className="text-xl font-semibold text-gray-800">Warranty</h2>
          {expandedSections.warranty ? (
            <FaChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <FaChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>

        {expandedSections.warranty && (
          <div className="mt-4">
            <p className="text-gray-600 text-sm">{product.warranty}</p>
          </div>
        )}
      </div>
    </div>
  );
}
