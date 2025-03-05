import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="footer bg-base-200 text-base-content p-10 grid grid-cols-1 md:grid-cols-3 gap-10">
      
      {/* About Section - Left */}
      <div className="flex flex-col space-y-4">
        <h6 className="footer-title">About Us</h6>
        <p>Learn more about us and our mission to deliver quality food at your convenience.</p>
      </div>

      {/* Quick Links Section - Center */}
      <div className="flex flex-col space-y-4">
        <h6 className="footer-title">Quick Links</h6>
        <Link to="/" className="link link-hover">Home</Link>
        <Link to="/about" className="link link-hover">About Us</Link>
        <Link to="/contact" className="link link-hover">Contact</Link>
        <Link to="/terms" className="link link-hover">Terms & Conditions</Link>
        <Link to="/admin/logings" className="link link-hover">Log in as Admin</Link>
      </div>

      {/* Contact Us Section - Right */}
      <div className="flex flex-col space-y-4">
        <h6 className="footer-title">Contact Us</h6>
        <p>Email: <a href="mailto:info@ordereat.com" className="link link-hover">info@ordereat.com</a></p>
        <p>Phone: <a href="tel:+1234567890" className="link link-hover">+123 456 7890</a></p>
        <p>Address: 134 Food Street, grampuram City, India</p>
      </div>
    </footer>
  );
}
