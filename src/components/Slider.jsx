import React, { useState, useEffect, useRef } from "react";

function Slider({ images }) {
  console.log("image array", images);
  const [image, setImage] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const scrollStartRef = useRef({ left: 0, top: 0 });
  const lastTouchDistance = useRef(0);

  // Disable body scroll when modal opens and manage focus
  useEffect(() => {
    if (image !== null) {
      document.body.style.overflow = "hidden";
      // Focus the modal for accessibility
      const modal = document.querySelector('[data-modal="image-viewer"]');
      if (modal) {
        modal.focus();
      }
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
      setIsZoomed(false);
      setZoomLevel(1);
      setImage((prevImage) => (prevImage - 1 + len) % len);
    } else {
      setIsZoomed(false);
      setZoomLevel(1);
      setImage((prevImage) => (prevImage + 1) % len);
    }
  };

  // Drag to pan when zoomed
  const handleMouseDown = (e) => {
    if (!isZoomed || !containerRef.current) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    scrollStartRef.current = {
      left: containerRef.current.scrollLeft,
      top: containerRef.current.scrollTop,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    containerRef.current.scrollTo({
      left: scrollStartRef.current.left - deltaX,
      top: scrollStartRef.current.top - deltaY,
    });
  };

  const endDrag = () => setIsDragging(false);

  // Zoom functions
  const handleZoom = (delta, centerX = 0, centerY = 0) => {
    const newZoom = Math.max(0.5, Math.min(5, zoomLevel + delta));
    setZoomLevel(newZoom);
    setIsZoomed(newZoom > 1);

    if (containerRef.current && newZoom > 1) {
      // Center zoom on the point where user zoomed
      const rect = containerRef.current.getBoundingClientRect();
      const scrollLeft = centerX - rect.width / 2;
      const scrollTop = centerY - rect.height / 2;
      containerRef.current.scrollTo({
        left: Math.max(0, scrollLeft),
        top: Math.max(0, scrollTop),
        behavior: 'smooth'
      });
    }
  };

  // Wheel zoom (Ctrl + wheel)
  const handleWheel = (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const rect = containerRef.current?.getBoundingClientRect();
      const centerX = e.clientX - (rect?.left || 0);
      const centerY = e.clientY - (rect?.top || 0);
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      handleZoom(delta, centerX, centerY);
    }
  };

  // Touch pinch zoom
  const getTouchDistance = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      lastTouchDistance.current = getTouchDistance(e.touches);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const currentDistance = getTouchDistance(e.touches);
      const delta = (currentDistance - lastTouchDistance.current) / 100;

      if (Math.abs(delta) > 0.01) {
        const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        const rect = containerRef.current?.getBoundingClientRect();
        const relativeX = centerX - (rect?.left || 0);
        const relativeY = centerY - (rect?.top || 0);

        handleZoom(delta, relativeX, relativeY);
        lastTouchDistance.current = currentDistance;
      }
    }
  };

  return (
    <div className="flex">
      <div className="relative">
        {image !== null && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-5 z-50"
            data-modal="image-viewer"
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            onClick={(e) => {
              // Close modal when clicking on backdrop (not on image or controls)
              if (e.target === e.currentTarget) {
                setIsZoomed(false);
                setZoomLevel(1);
                setImage(null);
              }
            }}
          >
            <div className="flex items-center gap-4 w-full justify-center">
              {/* Left arrow */}
              <button
                className="cursor-pointer p-5 text-white text-4xl select-none hover:bg-white/10 rounded-full transition-colors border-none bg-transparent"
                onClick={() => sliderbtn("left")}
                aria-label="Previous image"
              >
                ←
              </button>

              {/* Centered window */}
              <div className="relative max-w-[90vw] max-h-[80vh] w-full h-full">
                {/* Close button */}
                <button
                  className="absolute top-2 right-2 text-white text-3xl cursor-pointer p-2 hover:bg-white/10 rounded-full select-none transition-colors border-none bg-transparent z-10"
                  onClick={() => {
                    setIsZoomed(false);
                    setZoomLevel(1);
                    setImage(null);
                  }}
                  aria-label="Close image viewer"
                >
                  ✕
                </button>

                {/* Image area */}
                <div
                  ref={containerRef}
                  className={`w-full h-full ${isZoomed
                    ? "overflow-auto cursor-grab active:cursor-grabbing"
                    : "flex justify-center items-center"
                    }`}
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={endDrag}
                  onMouseLeave={endDrag}
                  onWheel={handleWheel}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                >
                  <img
                    ref={imageRef}
                    src={images[image]}
                    alt="Full Screen"
                    className={
                      isZoomed
                        ? "max-w-none max-h-none w-auto h-auto"
                        : "max-w-full max-h-full object-contain"
                    }
                    style={{
                      transform: isZoomed ? `scale(${zoomLevel})` : 'scale(1)',
                      transformOrigin: 'center center',
                      transition: isZoomed ? 'none' : 'transform 0.2s ease'
                    }}
                    onClick={() => {
                      if (zoomLevel === 1) {
                        setZoomLevel(2);
                        setIsZoomed(true);
                      } else {
                        setZoomLevel(1);
                        setIsZoomed(false);
                      }
                    }}
                  />
                </div>

                {/* Image counter */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded">
                  {image + 1} / {images.length}
                </div>
              </div>

              {/* Right arrow */}
              <button
                className="cursor-pointer p-5 text-white text-4xl select-none hover:bg-white/10 rounded-full transition-colors border-none bg-transparent"
                onClick={() => sliderbtn("right")}
                aria-label="Next image"
              >
                →
              </button>
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
