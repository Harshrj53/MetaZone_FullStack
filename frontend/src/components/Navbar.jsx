import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const { items } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${searchQuery}`);
        }
    };

    const cartItemCount = items ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold text-primary">
                            MetaZone
                        </Link>
                    </div>

                    {/* Desktop Search */}
                    <div className="hidden md:flex flex-1 items-center justify-center px-8">
                        <form onSubmit={handleSearch} className="w-full max-w-lg relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit" className="absolute right-3 top-2.5 text-gray-400 hover:text-primary">
                                <FaSearch />
                            </button>
                        </form>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/products" className="text-gray-600 hover:text-primary font-medium">
                            Shop
                        </Link>

                        <Link to="/cart" className="relative text-gray-600 hover:text-primary">
                            <FaShoppingCart size={20} />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>

                        {isAuthenticated ? (
                            <div className="relative group">
                                <button className="flex items-center space-x-1 text-gray-600 hover:text-primary focus:outline-none">
                                    <FaUser size={20} />
                                    <span className="font-medium">{user?.name}</span>
                                </button>
                                {/* Dropdown */}
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Orders</Link>
                                    {user?.role === 'admin' && (
                                        <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin Dashboard</Link>
                                    )}
                                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-gray-600 hover:text-primary font-medium">Login</Link>
                                <Link to="/signup" className="btn-primary">Sign Up</Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-600 hover:text-primary focus:outline-none"
                        >
                            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="px-4 pt-4 pb-2">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit" className="absolute right-3 top-2.5 text-gray-400">
                                <FaSearch />
                            </button>
                        </form>
                    </div>
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link to="/products" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Shop</Link>
                        <Link to="/cart" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">
                            Cart ({cartItemCount})
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Profile</Link>
                                <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">My Orders</Link>
                                {user?.role === 'admin' && (
                                    <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Admin Dashboard</Link>
                                )}
                                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Login</Link>
                                <Link to="/signup" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
