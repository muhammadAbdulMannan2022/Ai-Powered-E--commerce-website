import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaFilePdf } from "react-icons/fa";
import { Link } from "react-router";

export default function BottomFreeSamples({ product }) {
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

  const gateKitDetails = [
    "Maximum gate width: 4'0\"",
    "For gates wider than 4', a gate wheel (available at your local hardware store) is recommended to support weight.",
    "Consider adding an extra hinge kit (available in the accessory section).",
  ];

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
          <h2 className="text-xl font-semibold text-gray-800">Key Features:</h2>
          {expandedSections.keyFeatures ? (
            <FaChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <FaChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>

        {expandedSections.keyFeatures && (
          <div className="mt-4 space-y-3">
            <ul className="space-y-2">
              {product.keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-600 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
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
                    href={guide.file} // Assuming guide.file is the URL or path to the PDF
                    download // Prompts download
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
