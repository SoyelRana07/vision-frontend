import React from "react";
import logo from "../assets/VISION MEDIA RAW LOGO 1.png";

function NewsLetter() {
  return (
    <div className="flex flex-col font-bold md:flex-row items-center md:items-start gap-8 p-16 bg-gray-50 text-gray-800">
      {/* Follow Us Section */}
      <div className="md:w-1/5 flex flex-col items-center md:items-start">
        <h1 className="text-2xl font-bold mb-4">Follow Us</h1>
        <ul className="space-y-2">
          <li>
            <a
              href="https://www.facebook.com/visionmediakolkata"
              className="text-blue-600 hover:underline"
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://api.whatsapp.com/send/?phone=918336904266&text=Hii&type=phone_number&app_absent=0"
              className="text-green-600 hover:underline"
            >
              WhatsApp
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/visionmedia6/"
              className="text-pink-500 hover:underline"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/@visionmediaindia"
              className="text-red-600 hover:underline"
            >
              YouTube
            </a>
          </li>
        </ul>
        <button className="mt-6 px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
          Partner with Us
        </button>
      </div>

      {/* Logo Section */}
      <div className="md:w-1/2 mt-[50px] mb-[50px] md:m-0 flex justify-center">
        <img
          src={logo}
          alt="Brand Logo"
          className="h-52 w-auto object-contain"
        />
      </div>

      {/* Newsletter Section */}
      <div className="md:w-1/3 flex flex-col items-center md:items-start">
        <p className=" text-2xl font-bold mb-4 text-center md:text-left">
          <span className="text-red-600 ">Subscribe to Our</span> Newsletter
        </p>
        <p className="text-sm text-gray-600 mb-6 text-center md:text-left">
          Sign up to receive updates and a 5% coupon code. We respect your
          privacy, and you can unsubscribe at any time.
        </p>
        <div className="flex w-full items-center gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
            Sign Up
          </button>
        </div>
        <p className="text-[12px] mt-5 font-semibold">
          Your personal details are strictly for our use, and you can
          unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}

export default NewsLetter;
