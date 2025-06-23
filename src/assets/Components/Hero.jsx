import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useSwipeable } from "react-swipeable";
import dtf from "../Pictures/dtf.jpg";
import vin from "../Pictures/optical vinyl.jpg";
import Fiber from "../Pictures/fiber.jpg";
import engraving from "../Pictures/engraving.jpg";

const HeroSection = () => {
  const slides = [
    {
      title: "DTF PRINTER",
      buttonText: "Read More",
      image: dtf,
    },
    {
      title: "Optical Vinyl Cutting Plotter",
      buttonText: "Read More",
      image: vin,
    },
    {
      title: "Fiber Metal Marker",
      buttonText: "Read More",
      image: Fiber,
    },
    {
      title: "Engraving Cutter",
      buttonText: "Read More",
      image: engraving,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Swipe Handlers
  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    trackMouse: true, // Allow mouse swipes as well
  });

  return (
    <div
      className="relative h-[500px] w-screen lg:w-full left-0 right-0 overflow-hidden bg-gradient-to-r from-gray-200 to-white flex items-center justify-center"
      {...handlers} // Attach swipe handlers
    >
      {/* Left Arrow (Visible only on large screens) */}
      <button
        onClick={prevSlide}
        className="hidden lg:block absolute left-5 z-10 bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition"
      >
        <FiChevronLeft size={24} />
      </button>

      {/* Slides */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative flex items-center justify-between w-full lg:w-[90%] h-auto lg:h-[80%] bg-black shadow-2xl rounded-lg overflow-hidden">
          {/* Image Section */}
          <div className="relative w-full h-full flex items-center justify-center group">
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-[200px] md:h-[500px] object-cover"
            />
            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                {slides[currentSlide].title}
              </h1>
              <button className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition">
                {slides[currentSlide].buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Arrow (Visible only on large screens) */}
      <button
        onClick={nextSlide}
        className="hidden lg:block absolute right-5 bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition"
      >
        <FiChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full ${currentSlide === index ? "bg-red-600" : "bg-gray-400"
              }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
