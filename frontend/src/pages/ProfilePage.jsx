import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from '../api/axios';
import { FaUser, FaHistory, FaGift, FaCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProfilePage = () => {
    const { user } = useSelector((state) => state.auth);
    const [orders, setOrders] = useState([]);
    const [referrals, setReferrals] = useState([]);
    const [activeTab, setActiveTab] = useState('orders');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ordersRes = await axios.get('/orders');
                setOrders(ordersRes.data.data);

                const referralsRes = await axios.get('/referrals');
                setReferrals(referralsRes.data.data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        if (user) {
            fetchData();
        }
    }, [user]);

    const copyReferralCode = () => {
        navigator.clipboard.writeText(user.referral_code);
        toast.success('Referral code copied!');
    };

    if (!user) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                <div className="bg-primary px-8 py-10 text-white">
                    <div className="flex items-center">
                        <div className="bg-white p-4 rounded-full text-primary">
                            <FaUser size={40} />
                        </div>
                        <div className="ml-6">
                            <h1 className="text-3xl font-bold">{user.name}</h1>
                            <p className="text-indigo-100">{user.email}</p>
                        </div>
                    </div>
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Referral Card */}
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                            <FaGift className="mr-2 text-primary" /> Referral Program
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Share your code and earn $50 for every friend who joins!
                        </p>
                        <div className="bg-white p-3 rounded-lg border border-dashed border-primary flex justify-between items-center mb-4">
                            <span className="font-mono font-bold text-lg text-primary">{user.referral_code}</span>
                            <button onClick={copyReferralCode} className="text-gray-500 hover:text-primary">
                                <FaCopy />
                            </button>
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                            Credits Earned: <span className="text-green-600 font-bold">${user.referral_credits}</span>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Account Stats</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Orders</span>
                                <span className="font-bold">{orders.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Member Since</span>
                                <span className="font-bold">{new Date(user.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-8">
                <button
                    className={`py-4 px-6 font-medium text-sm focus:outline-none ${activeTab === 'orders'
                            ? 'border-b-2 border-primary text-primary'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                    onClick={() => setActiveTab('orders')}
                >
                    Order History
                </button>
                <button
                    className={`py-4 px-6 font-medium text-sm focus:outline-none ${activeTab === 'referrals'
                            ? 'border-b-2 border-primary text-primary'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                    onClick={() => setActiveTab('referrals')}
                >
                    Referrals
                </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'orders' && (
                <div className="space-y-6">
                    {orders.length === 0 ? (
                        <p className="text-gray-500">No orders found.</p>
                    ) : (
                        orders.map((order) => (
                            <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                                    <div>
                                        <span className="text-sm text-gray-500">Order placed</span>
                                        <div className="font-medium text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</div>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500">Total amount</span>
                                        <div className="font-bold text-gray-900">${order.totalAmount}</div>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500">Status</span>
                                        <div className={`font-medium capitalize ${order.status === 'delivered' ? 'text-green-600' : 'text-orange-600'
                                            }`}>
                                            {order.status}
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500">Order #{order.id}</div>
                                </div>
                                <div className="p-6">
                                    <ul className="divide-y divide-gray-100">
                                        {order.OrderItems.map((item) => (
                                            <li key={item.id} className="py-4 flex items-center">
                                                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        src={item.Product?.imageUrl || 'https://via.placeholder.com/100'}
                                                        alt={item.Product?.name}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>
                                                <div className="ml-4 flex-1">
                                                    <h4 className="text-sm font-medium text-gray-900">{item.Product?.name}</h4>
                                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                </div>
                                                <div className="font-medium text-gray-900">${item.price}</div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {activeTab === 'referrals' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Joined</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {referrals.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">No referrals yet.</td>
                                </tr>
                            ) : (
                                referrals.map((ref) => (
                                    <tr key={ref.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{ref.ReferredUser?.name}</div>
                                            <div className="text-sm text-gray-500">{ref.ReferredUser?.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(ref.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Completed
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
