import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-black via-[#0a1a0a] to-[#0e4d0e] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-green-400 text-lg font-semibold mb-4">Antoree</h3>
            <p className="text-gray-400">
              Buzz your way to the perfect online courses.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">For Students</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Browse Courses
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  how to enrol
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  How to study
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">For Educator</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Post a Course
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Student tracking
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Educator Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <p className="text-gray-400">info@antoree.com</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© 2025 Antoree. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
