// src/components/common/Footer.jsx

import React from 'react';
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import '../../styles/Footer.css'; // Import CSS

const Footer = () => {
  return (
    <footer className="footer-bg text-center text-lg-start mt-auto">
      <div className="container p-4">
        {/* Tagline */}
        <div className="footer-tagline text-center" >
          Thank you for visiting <strong>Kissan</strong> 
        </div>

        {/* Social Media Icons */}
        <div className="mb-3 social-icons">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-link"
          >
            <FaInstagram />
          </a>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-link"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-link"
          >
            <FaFacebookF />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center p-3 copyright-text">
          &copy; {new Date().getFullYear()} Kissan E-commerce App
        </div>
      </div>
    </footer>
  );
};

export default Footer;
