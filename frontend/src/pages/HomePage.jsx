import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from '../api/axios';
import { motion } from 'framer-motion';
import { FaShoppingBag, FaUsers, FaLayerGroup } from 'react-icons/fa';

const HomePage = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const response = await axios.get('/products?sort=featured&limit=4');
                setFeaturedProducts(response.data.data.slice(0, 4));
            } catch (error) {
                console.error('Error fetching featured products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, []);

    return (
        <div className="space-y-16 pb-16">
            {/* Hero Section */}
            <section className="relative bg-dark text-white py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark to-transparent opacity-95"></div>
                    <img
                        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80"
                        alt="Hero Background"
                        className="w-full h-full object-cover"
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 max-w-7xl mx-auto"
                >
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                        Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-secondary animate-pulse-slow">MetaZone</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-10">
                        Discover the future of shopping. Premium products, exclusive deals, and an immersive experience tailored just for you.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link to="/products" className="btn-primary text-lg px-8 py-3">
                            Shop Now
                        </Link>
                        <Link to="/signup" className="btn-secondary text-lg px-8 py-3">
                            Join Us
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Statistics Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: FaShoppingBag, label: '21+ Products', color: 'text-primary' },
                        { icon: FaLayerGroup, label: '4 Categories', color: 'text-secondary' },
                        { icon: FaUsers, label: '1000+ Customers', color: 'text-indigo-600' }
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow duration-300"
                        >
                            <stat.icon className={`text-5xl ${stat.color} mx-auto mb-4`} />
                            <h3 className="text-2xl font-bold text-gray-900">{stat.label}</h3>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Categories Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {['Mens', 'Womens', 'Kids', 'Electronics'].map((cat, index) => (
                        <motion.div
                            key={cat}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                        >
                            <Link
                                to={`/products?category=${cat}`}
                                className="group relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 block"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-all duration-300"></div>
                                <img
                                    src={`https://source.unsplash.com/random/400x600/?${cat.toLowerCase()}`}
                                    alt={cat}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <h3 className="text-3xl font-bold text-white tracking-wider transform group-hover:scale-110 transition-transform duration-300">{cat}</h3>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Advertisement Space */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-white">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                    <div className="relative z-10 px-8 py-16 text-center md:text-left md:flex items-center justify-between">
                        <div className="md:w-2/3">
                            <span className="bg-white/20 text-white text-sm font-bold uppercase py-1 px-3 rounded-full mb-4 inline-block">Special Offer</span>
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-md">Summer Clearance Event!</h2>
                            <p className="text-xl opacity-90 mb-6 drop-shadow-sm">Enjoy up to 50% off select apparel and premium electronics. Limited time only.</p>
                            <Link to="/products?category=Mens" className="inline-block bg-white text-red-500 font-bold text-lg px-8 py-3 rounded-full hover:bg-gray-100 transition-colors shadow-lg">
                                Shop the Sale
                            </Link>
                        </div>
                        <div className="hidden md:block w-1/3">
                            <img src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400&q=80" alt="Sale Box" className="rounded-xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                    <Link to="/products" className="text-primary font-medium hover:text-indigo-700 transition-colors">
                        View All &rarr;
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
                                <div className="h-64 bg-gray-200 skeleton"></div>
                                <div className="p-6 space-y-3">
                                    <div className="h-4 bg-gray-200 rounded skeleton"></div>
                                    <div className="h-4 bg-gray-200 rounded w-2/3 skeleton"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group"
                            >
                                <Link to={`/products/${product.id}`} className="block">
                                    <div className="h-64 overflow-hidden bg-gray-100 relative">
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                                            {product.name}
                                        </h3>
                                        <div className="flex justify-between items-center">
                                            <span className="text-2xl font-bold text-primary">${product.price}</span>
                                            <span className="text-sm font-medium text-gray-500 hover:text-primary transition-colors">
                                                View Details →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>

            {/* Promo Section */}
            <section className="bg-gradient-to-r from-primary/10 via-indigo-50 to-secondary/10 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Refer a Friend & Earn Rewards</h2>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                            Share your unique referral code with friends. When they sign up and make a purchase, you both get $50 in store credits!
                        </p>
                        <Link to="/profile" className="btn-primary text-lg px-8 py-3">
                            Get My Referral Code
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
