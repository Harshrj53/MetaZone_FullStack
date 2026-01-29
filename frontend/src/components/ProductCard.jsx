import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onAddToCart, showQuickView = true }) => {
    const {
        id,
        name,
        price,
        imageUrl,
        stock,
        featured
    } = product;

    const isOutOfStock = stock === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
        >
            {/* Badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                {featured && (
                    <span className="bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        Featured
                    </span>
                )}
                {isOutOfStock && (
                    <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        Out of Stock
                    </span>
                )}
            </div>

            {/* Quick Actions */}
            <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                    className="bg-white p-2 rounded-full shadow-lg hover:bg-primary hover:text-white transition-colors"
                    onClick={(e) => {
                        e.preventDefault();
                        // Wishlist functionality placeholder
                    }}
                >
                    <FaHeart className="text-sm" />
                </button>
                {showQuickView && (
                    <Link
                        to={`/products/${id}`}
                        className="bg-white p-2 rounded-full shadow-lg hover:bg-primary hover:text-white transition-colors"
                    >
                        <FaEye className="text-sm" />
                    </Link>
                )}
            </div>

            {/* Image Container */}
            <Link to={`/products/${id}`} className="block relative h-64 overflow-hidden bg-gray-100">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </Link>

            {/* Content */}
            <div className="p-5">
                <Link to={`/products/${id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                        {name}
                    </h3>
                </Link>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-primary">${price}</span>
                        {stock > 0 && stock < 10 && (
                            <span className="text-xs text-orange-600 font-medium">Only {stock} left!</span>
                        )}
                    </div>

                    <button
                        onClick={() => onAddToCart && onAddToCart(product)}
                        disabled={isOutOfStock}
                        className={`
                            flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm
                            transition-all duration-300 transform hover:scale-105
                            ${isOutOfStock
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-primary text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'
                            }
                        `}
                    >
                        <FaShoppingCart className="text-xs" />
                        {isOutOfStock ? 'Unavailable' : 'Add'}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
