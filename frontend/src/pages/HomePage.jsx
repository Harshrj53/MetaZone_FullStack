import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts } from '../redux/slices/productSlice'; // To be implemented

const HomePage = () => {
    // const dispatch = useDispatch();
    // const { products } = useSelector((state) => state.products);

    // Placeholder data until we connect backend
    const featuredProducts = [
        { id: 1, name: 'Premium Headphones', price: 199.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
        { id: 2, name: 'Smart Watch', price: 299.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80' },
        { id: 3, name: 'Designer Bag', price: 149.99, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80' },
        { id: 4, name: 'Running Shoes', price: 89.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' },
    ];

    return (
        <div className="space-y-16 pb-16">
            {/* Hero Section */}
            <section className="relative bg-dark text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-dark to-transparent opacity-90"></div>
                    <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80" alt="Hero Background" className="w-full h-full object-cover" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                        Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">MetaZone</span>
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
                </div>
            </section>

            {/* Categories Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {['Men', 'Women', 'Electronics', 'Accessories'].map((cat) => (
                        <Link key={cat} to={`/products?category=${cat}`} className="group relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
                            <img
                                src={`https://source.unsplash.com/random/400x600/?${cat.toLowerCase()}`}
                                alt={cat}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h3 className="text-2xl font-bold text-white tracking-wider">{cat}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                    <Link to="/products" className="text-primary font-medium hover:text-indigo-700">View All &rarr;</Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.map((product) => (
                        <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                            <div className="h-64 overflow-hidden bg-gray-100 relative">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold text-primary">${product.price}</span>
                                    <button className="text-sm font-medium text-gray-500 hover:text-primary">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Promo Section */}
            <section className="bg-primary bg-opacity-5 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Refer a Friend & Earn Rewards</h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Share your unique referral code with friends. When they sign up and make a purchase, you both get $50 in store credits!
                    </p>
                    <Link to="/profile" className="btn-primary">
                        Get My Referral Code
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
