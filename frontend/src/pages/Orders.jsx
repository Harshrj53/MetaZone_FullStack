import { useEffect, useState } from 'react';

export default function Orders({ user }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        fetch('http://localhost:3000/orders/my', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setOrders(data);
                setLoading(false);
            })
            .catch(err => setLoading(false));
    }, [user]);

    if (!user) return <div className="text-center py-20 text-gray-500">Please login to view orders.</div>;
    if (loading) return <div className="text-center py-20">Loading orders...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 border-b pb-4">Order History</h1>
            {orders.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-lg">No orders found.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map(order => (
                        <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-shadow hover:shadow-md">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="text-sm text-gray-400 font-medium uppercase tracking-wider">Order #{order.id}</span>
                                    <div className="text-xs text-gray-400 mt-1">{new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}</div>
                                </div>
                                <div className="text-right">
                                    <span className="block text-xl font-bold text-gray-900">${order.total.toFixed(2)}</span>
                                    <span className="inline-block mt-1 px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold uppercase tracking-wide border border-green-100">Paid</span>
                                </div>
                            </div>

                            {order.items && order.items.length > 0 && (
                                <div className="border-t border-gray-100 pt-4 mt-4">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Items</h4>
                                    <ul className="space-y-2">
                                        {order.items.map(item => (
                                            <li key={item.id} className="flex justify-between text-sm text-gray-600">
                                                <span>
                                                    {item.product ? item.product.name : 'Product'}
                                                    <span className="text-gray-400 mx-2">x{item.quantity}</span>
                                                </span>
                                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
