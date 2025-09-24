import React from "react";
import logo from "../../assets/logo.png";

function About() {
  return (
    <div className="about-us px-6 py-10">
      {/* Title Section */}
      <h1 className="text-4xl font-extrabold text-center mb-6 text-black">
        Welcome to <span className="text-red-600">The Vision Media</span>
      </h1>

      {/* Company Introduction */}
      <div className="flex flex-col lg:flex-row items-center lg:space-x-12">
        <div className="flex-1 mb-8 lg:mb-0">
          <img
            src={logo}
            alt="Company Logo"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div className="flex-1 text-gray-800 leading-relaxed">
          <p className="mb-4">
            We are one of the leading importers, manufacturers, wholesalers, and
            distributors dealing in machines and raw materials for personalized
            gifts, awards, trophies, mementos, and more.
          </p>
          <p className="mb-4">
            Established in <strong>1988</strong>, we thrive on building strong
            relationships with our valued clients by delivering high-quality
            products, constant innovation, and timely service.
          </p>
          <p className="mb-4">
            At <span className="text-red-600 font-bold">Vision Media</span>, our
            team of passionate professionals ensures you receive customized and
            personalized gifting solutions to meet your every need.
          </p>
          <button className="mt-4 bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700 transition">
            Explore All Products
          </button>
        </div>
      </div>

      {/* Team Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center text-black mb-8">
          🏆 <span className="text-red-600">Our Team</span>
        </h2>
        <p className="text-center text-gray-700 max-w-4xl mx-auto leading-relaxed">
          Behind every success story is a resilient backbone—the driving force
          that holds it all together. At Vision Media, our team is that
          unyielding core, supporting our vision and propelling us forward.
        </p>
      </div>

      {/* Working Hours */}
      <div className="mt-12 text-center">
        <h3 className="text-2xl font-bold mb-4">🕒 Working Hours</h3>
        <p className="text-lg">Monday - Saturday: <strong>10:00 AM - 7:00 PM</strong></p>
        <p className="text-lg">Sunday: <span className="text-red-600 font-bold">Closed</span></p>
      </div>
    </div>
  );
}

export default About;
