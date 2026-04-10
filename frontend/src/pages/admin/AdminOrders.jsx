import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);

    const fetchOrders = () => {
        api.get('/admin/orders', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
        .then(res => Array.isArray(res.data) && setOrders(res.data))
        .catch(err => console.error('Failed to fetch orders:', err));
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (id, status) => {
        await api.patch(`/admin/orders/${id}/status`, { status }, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        fetchOrders();
    };

    const statuses = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

    return (
        <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-8">Manage Orders</h1>
            
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm uppercase tracking-widest border-b border-gray-100 dark:border-gray-700">
                            <th className="px-6 py-4 font-bold">Order ID</th>
                            <th className="px-6 py-4 font-bold">Customer</th>
                            <th className="px-6 py-4 font-bold">Total</th>
                            <th className="px-6 py-4 font-bold">Date</th>
                            <th className="px-6 py-4 font-bold">Status</th>
                            <th className="px-6 py-4 font-bold text-center">Update Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {orders.map(order => (
                            <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">#{window.btoa(order.id.toString()).slice(0,6).toUpperCase()}</td>
                                <td className="px-6 py-4">
                                    <div className="font-bold text-gray-900 dark:text-white">{order.user.name}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{order.user.email}</div>
                                </td>
                                <td className="px-6 py-4 font-black text-gray-900 dark:text-white">${order.total.toFixed(2)}</td>
                                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${
                                        order.status === 'Delivered' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                        order.status === 'Cancelled' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                        order.status === 'Shipped' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' :
                                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                    }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <select 
                                        value={order.status} 
                                        onChange={(e) => updateStatus(order.id, e.target.value)}
                                        className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:text-white"
                                    >
                                        {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
