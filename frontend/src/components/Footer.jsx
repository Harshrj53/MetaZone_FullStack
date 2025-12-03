import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-2xl font-bold text-primary mb-4">MetaZone</h3>
                        <p className="text-gray-400 text-sm">
                            Your one-stop shop for everything. Premium quality, best prices, and fast delivery.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/products" className="hover:text-primary transition-colors">Shop</Link></li>
                            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                            <li><Link to="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Categories</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/products?category=Men" className="hover:text-primary transition-colors">Men</Link></li>
                            <li><Link to="/products?category=Women" className="hover:text-primary transition-colors">Women</Link></li>
                            <li><Link to="/products?category=Electronics" className="hover:text-primary transition-colors">Electronics</Link></li>
                            <li><Link to="/products?category=Accessories" className="hover:text-primary transition-colors">Accessories</Link></li>
                        </ul>
                    </div>

                    {/* Social & Newsletter */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
                        <div className="flex space-x-4 mb-6">
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><FaFacebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><FaTwitter size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><FaInstagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><FaLinkedin size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} MetaZone. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
