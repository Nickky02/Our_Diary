import React, { useState } from "react";
import "./App.css";
import cupcakeImage from "./assets/cupcake.png"; // Import cupcake image
import { screenshots } from "./imageImports";
import musicFile from "./music/Still_Corners.mp3";

const audio = new Audio(musicFile);

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClicking, setIsClicking] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Toggle gallery
  const toggleGallery = () => {
    setIsOpen(!isOpen);
  };

  const closeGallery = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      audio.pause(); // Stop music
      setIsPlaying(false);
    }, 600);
  };

  // Handle cupcake click animation
  const handleCupcakeClick = () => {
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 300); // Reset after animation
    toggleGallery();

    if (audio.paused) {
      audio.play(); // Play music 
    } else {
      audio.pause(); 
      audio.currentTime = 0;
    }
  };

  // Navigate to next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % screenshots.length);
  };

  // Navigate to previous image
  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? screenshots.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={`app ${isOpen ? "dark-bg" : ""}`}>
      {/* Cupcake */}
      <div
        className={`cupcake ${isClicking ? "clicking" : ""}`}
        onClick={handleCupcakeClick}
      >
        <img src={cupcakeImage} alt="Cupcake" className="cupcake-image" />
      </div>

      {/* Gallery Slider */}
      {isOpen && (
        <div className={`slider ${isClosing ? "closing" : ""}`}>
          <button className="close-btn" onClick={closeGallery}>
            ✖
          </button>
          <button className="nav-btn prev" onClick={prevImage}>
            &#8249;
          </button>
          <div className="slides">
            {screenshots.map((src, index) => {
              let position;

              if (index === currentIndex) {
                position = "active"; // Current image
              } else if (
                index ===
                (currentIndex - 1 + screenshots.length) % screenshots.length
              ) {
                position = "prev"; // Previous image
              } else if (index === (currentIndex + 1) % screenshots.length) {
                position = "next"; // Next image
              } else {
                position = "hidden"; // All other images
              }

              return (
                <img
                  key={index}
                  src={src}
                  alt={`Screenshot ${index + 1}`}
                  className={`slide ${position}`}
                />
              );
            })}
          </div>
          <button className="nav-btn next" onClick={nextImage}>
            &#8250;
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
