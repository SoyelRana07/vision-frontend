import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Pictures/plotter_files/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-sm">
      <div className="container mx-auto px-5 py-10">

        {/* For Large Screens */}
        <div className="hidden sm:grid sm:grid-cols-4 sm:gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <img
              src={logo}
              alt="Vision Media Logo"
              className="w-32 bg-white"
            />
            <p className="text-gray-400">
              Welcome to Vision Media, Your One-Stop Destination For High-Quality Sublimation Products.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/login" className="hover:text-red-500">My Account</Link></li>
              <li><Link to="/orders" className="hover:text-red-500">My Orders</Link></li>
              <li><Link to="/login" className="hover:text-red-500">Account Security</Link></li>
              <li><Link to="/orders" className="hover:text-red-500">Track My Orders</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help-center" className="hover:text-red-500">Help Center</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-red-500">Privacy Policy</Link></li>
              <li><Link to="/refund-policy" className="hover:text-red-500">Refund Policy</Link></li>
              <li><Link to="/terms-conditions" className="hover:text-red-500">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <ul className="space-y-2">
              <li>📞 <a href="tel:+918100280400" className="hover:text-red-500">+91 8100280400</a></li>
              <li>📱 <a href="tel:+919831463859" className="hover:text-red-500">+91 9831463859</a></li>
              <li>✉️ <a href="mailto:sales@visionmediaonline.in" className="hover:text-red-500">sales@visionmediaonline.in</a></li>
            </ul>
            <div className="mt-4">
              <h4 className="font-semibold">Head Office</h4>
              <p>📍 Kolkata</p>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold">Branch Office</h4>
              <p>📍 Chennai</p>
              <p>📍 Guwahati</p>
              <p>📍 Hyderabad</p>
            </div>
          </div>
        </div>

        {/* For Small Screens */}
        <div className="block sm:hidden text-center">
          {/* Logo */}
          <div className="mb-8">
            <img
              src={logo}
              alt="Vision Media Logo"
              className="w-48 mx-auto bg-white p-2 rounded-lg"
            />
            <p className="text-gray-400 mt-4">
              Welcome to Vision Media, Your One-Stop Destination For High-Quality Sublimation Products.
            </p>
          </div>

          {/* Quick Links and Support in a row */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/login" className="hover:text-red-500">My Account</Link></li>
                <li><Link to="/orders" className="hover:text-red-500">My Orders</Link></li>
                <li><Link to="/login" className="hover:text-red-500">Account Security</Link></li>
                <li><Link to="/orders" className="hover:text-red-500">Track My Orders</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/help-center" className="hover:text-red-500">Help Center</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-red-500">Privacy Policy</Link></li>
                <li><Link to="/refund-policy" className="hover:text-red-500">Refund Policy</Link></li>
                <li><Link to="/terms-conditions" className="hover:text-red-500">Terms & Conditions</Link></li>
              </ul>
            </div>
          </div>

          {/* Connect With Us */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <ul className="space-y-2">
              <li>📞 <a href="tel:+918100280400" className="hover:text-red-500">+91 8100280400</a></li>
              <li>📱 <a href="tel:+919831463859" className="hover:text-red-500">+91 9831463859</a></li>
              <li>✉️ <a href="mailto:sales@visionmediaonline.in" className="hover:text-red-500">sales@visionmediaonline.in</a></li>
            </ul>
          </div>

          {/* Head Office and Branches */}
          <div>
            <h4 className="font-semibold">Head Office</h4>
            <p>📍 Kolkata</p>
            <h4 className="font-semibold mt-4">Branch Office</h4>
            <p>📍 Chennai</p>
            <p>📍 Guwahati</p>
            <p>📍 Hyderabad</p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-red-700 text-center py-3">
        <p>&copy; Copyright 1988–2023 | All Rights Reserved.</p>
        <p>Made with ❤️ By Your Creator</p>
      </div>
    </footer>
  );
};

export default Footer;
