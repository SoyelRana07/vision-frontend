import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import plt from '../Pictures/plotter_files/1-V-48-PLOTTER-1200x1200.jpg';
import plt2 from '../Pictures/plotter_files/v-24.jpg';
import plt3 from '../Pictures/plotter_files/v-24 2.jpg';
import dplt from '../Pictures/plotter_files/d-24.jpg';
import dplt2 from '../Pictures/plotter_files/d-24 2.jpg';
import vh48 from '../Pictures/plotter_files/optical.jpg';
import vh482 from '../Pictures/plotter_files/optical 2.jpg';

const Sliders = () => {
  const slider1Products = [
    { name: "Plotter V-48", price: "₹72,000.00", image: plt },
    { name: "Plotter V-49", price: "₹45,000.00", image: plt2 },
    { name: "Plotter V-50", price: "₹45,000.00", image: plt3 },
  ];

  const slider2Products = [
    { name: "Plotter D-48", price: "₹55,000.00", image: dplt },
    { name: "Plotter D-49", price: "₹55,000.00", image: dplt2 },
  ];

  const slider3Products = [
    { name: "Plotter VH-48", price: "₹98,000.00", image: vh48 },
    { name: "Plotter VH-49", price: "₹98,000.00", image: vh482 },
  ];

  const renderSlider = (products) => (
    <Swiper
      navigation={true}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Navigation, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      className="w-full"
    >
      {products.map((product, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative w-full"
            style={{
              paddingTop: "100%", /* 1:1 aspect ratio */
              position: "relative",
            }}
          >
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
              <button className="bg-red-500 text-white px-1 py-1 text-sm rounded-lg hover:bg-red-600 sm:px-6 sm:py-2 sm:text-base">
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

export default Sliders;
