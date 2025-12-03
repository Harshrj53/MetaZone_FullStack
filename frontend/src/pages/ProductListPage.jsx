import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from '../api/axios';
import { FaFilter, FaSearch } from 'react-icons/fa';

const ProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const categoryParam = searchParams.get('category') || '';
    const searchParam = searchParams.get('search') || '';
    const sortParam = searchParams.get('sort') || 'createdAt';
    const orderParam = searchParams.get('order') || 'DESC';

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const query = new URLSearchParams({
                    category: categoryParam,
                    search: searchParam,
                    sort: sortParam,
                    order: orderParam,
                }).toString();

                // Use search endpoint if search param exists, otherwise normal list
                let url = '/products';
                if (searchParam) {
                    url = `/products/search?query=${searchParam}`;
                } else {
                    url = `/products?${query}`;
                }

                const response = await axios.get(url);
                setProducts(response.data.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryParam, searchParam, sortParam, orderParam]);

    const handleCategoryChange = (category) => {
        if (category) {
            searchParams.set('category', category);
        } else {
            searchParams.delete('category');
        }
        searchParams.delete('search'); // Clear search when changing category
        setSearchParams(searchParams);
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        const [sort, order] = value.split('-');
        searchParams.set('sort', sort);
        searchParams.set('order', order);
        setSearchParams(searchParams);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <FaFilter className="mr-2" /> Filters
                        </h3>

                        <div className="mb-6">
                            <h4 className="font-medium text-gray-700 mb-2">Categories</h4>
                            <ul className="space-y-2">
                                <li>
                                    <button
                                        onClick={() => handleCategoryChange('')}
                                        className={`text-sm ${!categoryParam ? 'text-primary font-bold' : 'text-gray-600 hover:text-primary'}`}
                                    >
                                        All Products
                                    </button>
                                </li>
                                {['Men', 'Women', 'Electronics', 'Accessories'].map(cat => (
                                    <li key={cat}>
                                        <button
                                            onClick={() => handleCategoryChange(cat)}
                                            className={`text-sm ${categoryParam === cat ? 'text-primary font-bold' : 'text-gray-600 hover:text-primary'}`}
                                        >
                                            {cat}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {searchParam ? `Search Results for "${searchParam}"` : (categoryParam || 'All Products')}
                        </h2>
                        <div className="flex items-center">
                            <span className="mr-2 text-gray-600 text-sm">Sort by:</span>
                            <select
                                onChange={handleSortChange}
                                className="border-gray-300 rounded-md text-sm focus:ring-primary focus:border-primary"
                                defaultValue={`${sortParam}-${orderParam}`}
                            >
                                <option value="createdAt-DESC">Newest</option>
                                <option value="price-ASC">Price: Low to High</option>
                                <option value="price-DESC">Price: High to Low</option>
                                <option value="name-ASC">Name: A-Z</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                            <p className="text-gray-500 text-lg">No products found.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <Link key={product.id} to={`/products/${product.id}`} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group">
                                    <div className="h-64 overflow-hidden rounded-t-xl bg-gray-100 relative">
                                        <img
                                            src={product.imageUrl || 'https://via.placeholder.com/400'}
                                            alt={product.name}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {product.stock <= 0 && (
                                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                                <span className="text-white font-bold px-4 py-2 border-2 border-white rounded">OUT OF STOCK</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5">
                                        <p className="text-sm text-gray-500 mb-1">{product.Category?.name}</p>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">{product.name}</h3>
                                        <div className="flex justify-between items-center mt-4">
                                            <span className="text-xl font-bold text-primary">${product.price}</span>
                                            <span className="text-sm text-gray-500">{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductListPage;
