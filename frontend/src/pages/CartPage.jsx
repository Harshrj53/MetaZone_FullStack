import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartItem, removeFromCart } from '../redux/slices/cartSlice';
import { FaTrash, FaMinus, FaPlus, FaArrowRight } from 'react-icons/fa';

const CartPage = () => {
    const { items, subtotal, loading } = useSelector((state) => state.cart);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleQuantityChange = (itemId, currentQty, type) => {
        if (type === 'inc') {
            dispatch(updateCartItem({ itemId, quantity: currentQty + 1 }));
        } else {
            if (currentQty > 1) {
                dispatch(updateCartItem({ itemId, quantity: currentQty - 1 }));
            }
        }
    };

    const handleRemove = (itemId) => {
        if (window.confirm('Are you sure you want to remove this item?')) {
            dispatch(removeFromCart(itemId));
        }
    };

    if (loading && (!items || items.length === 0)) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your cart</h2>
                <Link to="/login" className="btn-primary">Login</Link>
            </div>
        );
    }

    if (!items || items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/products" className="btn-primary">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden">
                    <ul className="divide-y divide-gray-200">
                        {items.map((item) => (
                            <li key={item.id} className="p-6 flex flex-col sm:flex-row items-center">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                        src={item.Product.imageUrl || 'https://via.placeholder.com/150'}
                                        alt={item.Product.name}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>

                                <div className="ml-4 flex-1 flex flex-col sm:flex-row sm:justify-between w-full mt-4 sm:mt-0">
                                    <div>
                                        <h3 className="text-base font-medium text-gray-900">
                                            <Link to={`/products/${item.Product.id}`}>{item.Product.name}</Link>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">${item.Product.price}</p>
                                    </div>

                                    <div className="flex items-center mt-4 sm:mt-0">
                                        <div className="flex items-center border border-gray-300 rounded-lg mr-6">
                                            <button
                                                onClick={() => handleQuantityChange(item.id, item.quantity, 'dec')}
                                                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                                                disabled={item.quantity <= 1}
                                            >
                                                <FaMinus size={10} />
                                            </button>
                                            <span className="px-3 py-1 font-medium text-gray-900 min-w-[2rem] text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(item.id, item.quantity, 'inc')}
                                                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                                                disabled={item.quantity >= item.Product.stock}
                                            >
                                                <FaPlus size={10} />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => handleRemove(item.id)}
                                            className="text-red-500 hover:text-red-700 font-medium text-sm flex items-center"
                                        >
                                            <FaTrash className="mr-1" /> Remove
                                        </button>
                                    </div>
                                </div>

                                <div className="ml-4 font-bold text-gray-900 mt-4 sm:mt-0">
                                    ${(parseFloat(item.Product.price) * item.quantity).toFixed(2)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-96">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>

                        <div className="flow-root">
                            <dl className="-my-4 divide-y divide-gray-200">
                                <div className="py-4 flex items-center justify-between">
                                    <dt className="text-gray-600">Subtotal</dt>
                                    <dd className="font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
                                </div>
                                <div className="py-4 flex items-center justify-between">
                                    <dt className="text-gray-600">Shipping</dt>
                                    <dd className="font-medium text-gray-900">Free</dd>
                                </div>
                                <div className="py-4 flex items-center justify-between">
                                    <dt className="text-base font-bold text-gray-900">Total</dt>
                                    <dd className="text-base font-bold text-primary">${subtotal.toFixed(2)}</dd>
                                </div>
                            </dl>
                        </div>

                        <div className="mt-8">
                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full btn-primary flex justify-center items-center py-3"
                            >
                                Proceed to Checkout <FaArrowRight className="ml-2" />
                            </button>
                        </div>

                        <div className="mt-6 text-center text-sm text-gray-500">
                            <p>
                                or{' '}
                                <Link to="/products" className="font-medium text-primary hover:text-indigo-500">
                                    Continue Shopping<span aria-hidden="true"> &rarr;</span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
