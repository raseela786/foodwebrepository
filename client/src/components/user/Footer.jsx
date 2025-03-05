import React from 'react';
import { Link } from 'react-router-dom';

export const FooterUser = () => {
  return (
    <footer className="footer bg-base-200 text-base-content p-10">
      {/* Full-width container to center content */}
      <div className="flex justify-center items-center w-full">
        <div className="flex flex-col items-center space-y-4 text-center">
          {/* Quick Links Section */}
          <h6 className="footer-title">Quick Links</h6>
          <Link to="/" className="link link-hover">Home</Link>
          <Link to="/about" className="link link-hover">About Us</Link>
          <Link to="/contact" className="link link-hover">Contact</Link>
          <Link to="/terms" className="link link-hover">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
};
