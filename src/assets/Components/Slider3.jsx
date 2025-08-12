import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import plt from '../Pictures/plotter_files/1-V-48-PLOTTER-1200x1200.jpg';

function Slider3() {
  const slider1Products = [
    { name: "Plotter V-48", price: "₹72,000.00", image: plt },
    { name: "Plotter V-49", price: "₹75,000.00", image: "https://via.placeholder.com/300" },
    { name: "Plotter V-50", price: "₹78,000.00", image: "https://via.placeholder.com/300" },
  ];

  const slider2Products = [
    { name: "Plotter D-48", price: "₹86,000.00", image: "https://via.placeholder.com/300" },
    { name: "Plotter D-49", price: "₹89,000.00", image: "https://via.placeholder.com/300" },
    { name: "Plotter D-50", price: "₹92,000.00", image: "https://via.placeholder.com/300" },
  ];

  const slider3Products = [
    { name: "Plotter VH-48", price: "₹98,000.00", image: "https://via.placeholder.com/300" },
    { name: "Plotter VH-49", price: "₹1,00,000.00", image: "https://via.placeholder.com/300" },
    { name: "Plotter VH-50", price: "₹1,02,000.00", image: "https://via.placeholder.com/300" },
  ];

  // Reusable Slider Component
  const renderSlider = (products) => (
    <Swiper
      navigation={true}          // Enable navigation arrows
      loop={true}                // Loop back to the first slide
      autoplay={{
        delay: 3000,             // Autoplay delay in milliseconds (3 seconds)
        disableOnInteraction: false, // Continue autoplay even after user interaction
      }}
      modules={[Navigation, Autoplay]} // Import required modules
      spaceBetween={20}         // Reduced space between slides
      slidesPerView={1}
      className="w-full"
    >
      {products.map((product, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full" style={{ paddingTop: '100%' /* 1:1 aspect ratio */, position: 'relative' }}>
            <img
              src={product.image}
              alt={product.name}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />

            {/* Price Box in Center */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <span className="bg-black text-red-600 text-2xl font-bold px-4 py-2">
                {product.price}
              </span>
            </div>

            {/* Button at the Bottom */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600">
                Add To Cart
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );

  return (
    <div></div>
    // <div className="flex flex-wrap justify-center gap-6 p-4">
    //   {/* Slider 1 */}
    //   <div className="w-full sm:w-1/4 mb-6 sm:mb-0">
    //     <h2 className="text-center font-bold text-2xl mb-4"></h2>
    //     {renderSlider(slider1Products)}
    //   </div>

    //   {/* Slider 2 */}
    //   <div className="w-full sm:w-1/4 mb-6 sm:mb-0">
    //     <h2 className="text-center font-bold text-2xl mb-4"></h2>
    //     {renderSlider(slider2Products)}
    //   </div>

    //   {/* Slider 3 */}
    //   <div className="w-full sm:w-1/4">
    //     <h2 className="text-center font-bold text-2xl mb-4"></h2>
    //     {renderSlider(slider3Products)}
    //   </div>
    // </div>
  );
};

export default Slider3;
