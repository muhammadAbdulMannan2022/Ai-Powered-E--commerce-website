import React, { useState, useEffect } from "react";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ImageGallery({ projects }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Disable page scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const openModal = (project, index) => {
    setActiveProject(project);
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setActiveProject(null);
    setCurrentIndex(0);
  };

  const nextSlide = () => {
    if (!activeProject) return;
    setCurrentIndex((currentIndex + 1) % activeProject.images.length);
  };

  const prevSlide = () => {
    if (!activeProject) return;
    setCurrentIndex(
      (currentIndex - 1 + activeProject.images.length) %
        activeProject.images.length
    );
  };

  return (
    <div className="px-4 md:px-16 py-16">
      {projects.map((project, i) => {
        const showButton = project.images.length > 7;
        const previewImages = project.images.slice(0, 7);
        const remaining = project.images.length - 7;

        return (
          <div key={i} className="mb-20">
            <h2 className="text-5xl font-bold mb-10 text-[#688301] text-center">
              {project.title}
            </h2>

            <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
              {previewImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => openModal(project, index)}
                  className="w-full mb-4 cursor-pointer rounded-lg hover:opacity-90 transition-all duration-200 break-inside-avoid"
                  alt={`Project ${i} image ${index}`}
                />
              ))}

              {/* Show "+X More" as the last image card if >7 */}
              {showButton && (
                <div
                  onClick={() => openModal(project, 7)}
                  className="relative w-full h-auto aspect-[4/3] bg-gray-200 cursor-pointer rounded-lg flex items-center justify-center text-white text-xl font-bold hover:opacity-90 transition-all duration-200"
                >
                  <img
                    src={project.images[7]}
                    alt="more images"
                    className="absolute w-full h-full object-cover rounded-lg opacity-60"
                  />
                  <span className={`${isOpen ? "" : "z-10"}`}>
                    +{remaining} More
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Fullscreen Modal */}
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-70"
      >
        {activeProject && (
          <div className="relative w-full max-w-5xl mx-auto text-white">
            <button
              onClick={closeModal}
              className="absolute hover:cursor-pointer top-4 right-4 text-3xl text-white z-50 bg-black/80 p-2 rounded-full"
            >
              <FaX />
            </button>
            <button
              onClick={prevSlide}
              className="absolute hover:cursor-pointer left-4 top-1/2 transform -translate-y-1/2 text-4xl z-50"
            >
              <FaLessThan />
            </button>
            <button
              onClick={nextSlide}
              className="absolute hover:cursor-pointer right-4 top-1/2 transform -translate-y-1/2 text-4xl z-50"
            >
              <FaGreaterThan />
            </button>
            <img
              src={activeProject.images[currentIndex]}
              alt={`Slide ${currentIndex}`}
              className="w-full max-h-[80vh] object-contain mx-auto"
            />
            <p className="text-center mt-4 text-lg">{activeProject.title}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
