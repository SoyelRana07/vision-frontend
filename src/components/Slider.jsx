import React, { useState, useEffect } from "react";

function Slider({ images }) {
  console.log("image array", images);
  const [image, setImage] = useState(null);

  // Disable body scroll when modal opens
  useEffect(() => {
    if (image !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [image]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (image !== null) {
        if (e.key === "ArrowLeft") sliderbtn("left");
        if (e.key === "ArrowRight") sliderbtn("right");
        if (e.key === "Escape") setImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [image]);

  const sliderbtn = (dir) => {
    const len = images.length;
    if (dir === "left") {
      setImage((prevImage) => (prevImage - 1 + len) % len);
    } else {
      setImage((prevImage) => (prevImage + 1) % len);
    }
  };

  return (
    <div className="flex">
      <div className="relative">
        {image !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-between p-5 z-50">
            {/* Left arrow */}
            <div
              className="cursor-pointer p-5 text-white text-4xl select-none hover:bg-white/10 rounded-full"
              onClick={() => sliderbtn("left")}
            >
              ←
            </div>

            {/* Full-screen image */}
            <div className="flex-grow flex justify-center items-center md:p-10 md:m-10">
              <img
                src={images[image]}
                className="max-w-full max-h-full object-contain"
                alt="Full Screen"
              />
            </div>

            {/* Close button */}
            <div
              className="absolute top-5 right-5 text-white text-4xl cursor-pointer p-2 hover:bg-white/10 rounded-full select-none"
              onClick={() => setImage(null)}
            >
              ✕
            </div>

            {/* Right arrow */}
            <div
              className="cursor-pointer p-5 text-white text-4xl select-none hover:bg-white/10 rounded-full"
              onClick={() => sliderbtn("right")}
            >
              →
            </div>

            {/* Image counter */}
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded">
              {image + 1} / {images.length}
            </div>
          </div>
        )}
      </div>

      <div className="big w-[70%] cursor-pointer">
        <img
          src={images[0]}
          className="rounded-lg w-full h-auto"
          alt="Main product"
          onClick={() => setImage(0)}
        />
      </div>
      <div className="small flex flex-col gap-2 ml-2 w-[30%]">
        {images.slice(1).map((img, i) => (
          <img
            className="rounded-md cursor-pointer h-[85px] w-[120px] object-cover hover:opacity-80 transition-opacity"
            src={img}
            key={i}
            onClick={() => setImage(i + 1)}
            alt={`Product view ${i + 2}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
