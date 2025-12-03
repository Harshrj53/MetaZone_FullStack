import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import { FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/products/${id}`);
                setProduct(response.data.data);
            } catch (error) {
                toast.error('Failed to load product');
                navigate('/products');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, navigate]);

    const handleQuantityChange = (type) => {
        if (type === 'inc') {
            if (quantity < product.stock) setQuantity(quantity + 1);
        } else {
            if (quantity > 1) setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = async () => {
        if (!product) return;
        setAdding(true);
        try {
            await dispatch(addToCart({ productId: product.id, quantity })).unwrap();
            toast.success('Added to cart successfully');
        } catch (error) {
            toast.error(error || 'Failed to add to cart');
        } finally {
            setAdding(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!product) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Image Section */}
                    <div className="h-96 md:h-[600px] bg-gray-100 relative">
                        <img
                            src={product.imageUrl || 'https://via.placeholder.com/600'}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Details Section */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                        <div className="mb-2">
                            <span className="text-sm font-medium text-primary bg-indigo-50 px-3 py-1 rounded-full">
                                {product.Category?.name || 'Category'}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                        <p className="text-3xl font-bold text-primary mb-6">${product.price}</p>

                        <div className="prose prose-sm text-gray-600 mb-8">
                            <p>{product.description}</p>
                        </div>

                        <div className="border-t border-gray-200 pt-8">
                            <div className="flex items-center mb-6">
                                <span className="mr-4 font-medium text-gray-700">Quantity:</span>
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                    <button
                                        onClick={() => handleQuantityChange('dec')}
                                        className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-lg disabled:opacity-50"
                                        disabled={quantity <= 1}
                                    >
                                        <FaMinus size={12} />
                                    </button>
                                    <span className="px-4 py-2 font-medium text-gray-900 min-w-[3rem] text-center">{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange('inc')}
                                        className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-lg disabled:opacity-50"
                                        disabled={quantity >= product.stock}
                                    >
                                        <FaPlus size={12} />
                                    </button>
                                </div>
                                <span className="ml-4 text-sm text-gray-500">
                                    {product.stock} pieces available
                                </span>
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={product.stock <= 0 || adding}
                                    className={`flex-1 btn-primary flex items-center justify-center py-4 text-lg ${(product.stock <= 0 || adding) ? 'opacity-75 cursor-not-allowed' : ''
                                        }`}
                                >
                                    <FaShoppingCart className="mr-2" />
                                    {product.stock <= 0 ? 'Out of Stock' : adding ? 'Adding...' : 'Add to Cart'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
