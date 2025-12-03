import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../redux/slices/cartSlice'; // To refresh cart after order
import axios from '../api/axios';
import { toast } from 'react-toastify';

const CheckoutPage = () => {
    const { items, subtotal } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [shippingAddress, setShippingAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const [discountCode, setDiscountCode] = useState('');
    const [useReferralCredits, setUseReferralCredits] = useState(false);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleApplyDiscount = async () => {
        if (!discountCode) return;
        try {
            const response = await axios.post('/discounts/validate', { code: discountCode });
            const discount = response.data.data;
            const amount = (subtotal * discount.discountPercentage) / 100;
            setDiscountAmount(amount);
            toast.success(`Discount applied: ${discount.discountPercentage}% off`);
        } catch (error) {
            setDiscountAmount(0);
            toast.error(error.response?.data?.message || 'Invalid discount code');
        }
    };

    const calculateTotal = () => {
        let total = subtotal - discountAmount;
        if (useReferralCredits && user?.referral_credits) {
            total -= parseFloat(user.referral_credits);
        }
        return total > 0 ? total : 0;
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        if (!shippingAddress) {
            toast.error('Please enter a shipping address');
            return;
        }

        setIsProcessing(true);
        try {
            await axios.post('/orders', {
                shippingAddress,
                paymentMethod,
                discountCode: discountAmount > 0 ? discountCode : null,
                useReferralCredits,
            });

            toast.success('Order placed successfully!');
            dispatch(fetchCart()); // Clear cart in redux
            navigate('/profile'); // Redirect to profile/orders
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to place order');
        } finally {
            setIsProcessing(false);
        }
    };

    if (!items || items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                <button onClick={() => navigate('/products')} className="btn-primary">Go Shopping</button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Checkout Form */}
                <div className="flex-1 bg-white rounded-lg shadow-sm p-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping & Payment</h2>

                    <form onSubmit={handlePlaceOrder} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                            <textarea
                                required
                                rows={3}
                                className="input-field"
                                placeholder="Enter your full address"
                                value={shippingAddress}
                                onChange={(e) => setShippingAddress(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                            <select
                                className="input-field"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                                <option value="Credit Card">Credit Card</option>
                                <option value="PayPal">PayPal</option>
                                <option value="Cash on Delivery">Cash on Delivery</option>
                            </select>
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Discounts & Credits</h3>

                            <div className="flex gap-2 mb-4">
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="Discount Code"
                                    value={discountCode}
                                    onChange={(e) => setDiscountCode(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={handleApplyDiscount}
                                    className="btn-secondary whitespace-nowrap"
                                >
                                    Apply
                                </button>
                            </div>

                            {user?.referral_credits > 0 && (
                                <div className="flex items-center">
                                    <input
                                        id="use-credits"
                                        type="checkbox"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                        checked={useReferralCredits}
                                        onChange={(e) => setUseReferralCredits(e.target.checked)}
                                    />
                                    <label htmlFor="use-credits" className="ml-2 block text-sm text-gray-900">
                                        Use Referral Credits (${user.referral_credits})
                                    </label>
                                </div>
                            )}
                        </div>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-96">
                    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                        <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>

                        <ul className="divide-y divide-gray-200 mb-6 max-h-64 overflow-y-auto">
                            {items.map((item) => (
                                <li key={item.id} className="py-4 flex">
                                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img
                                            src={item.Product.imageUrl || 'https://via.placeholder.com/100'}
                                            alt={item.Product.name}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>
                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3 className="truncate w-32">{item.Product.name}</h3>
                                                <p className="ml-4">${(item.Product.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">Qty {item.quantity}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="flow-root border-t border-gray-200 pt-4">
                            <dl className="divide-y divide-gray-200">
                                <div className="py-2 flex items-center justify-between">
                                    <dt className="text-gray-600">Subtotal</dt>
                                    <dd className="font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
                                </div>
                                {discountAmount > 0 && (
                                    <div className="py-2 flex items-center justify-between text-green-600">
                                        <dt>Discount</dt>
                                        <dd>-${discountAmount.toFixed(2)}</dd>
                                    </div>
                                )}
                                {useReferralCredits && user?.referral_credits > 0 && (
                                    <div className="py-2 flex items-center justify-between text-green-600">
                                        <dt>Referral Credits</dt>
                                        <dd>-${Math.min(user.referral_credits, subtotal - discountAmount).toFixed(2)}</dd>
                                    </div>
                                )}
                                <div className="py-4 flex items-center justify-between">
                                    <dt className="text-lg font-bold text-gray-900">Total</dt>
                                    <dd className="text-lg font-bold text-primary">${calculateTotal().toFixed(2)}</dd>
                                </div>
                            </dl>
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={handlePlaceOrder}
                                disabled={isProcessing}
                                className={`w-full btn-primary py-3 ${isProcessing ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                {isProcessing ? 'Processing...' : 'Place Order'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
