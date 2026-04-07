import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Checkout({ cart, user, clearCart }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        setLoading(true);
        try {
            const res = await fetch('http://localhost:3000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ total, items: cart }),
            });
            if (res.ok) {
                clearCart();
                navigate('/orders');
            } else {
                alert('Checkout failed');
            }
        } catch (err) {
            alert('Error processing order');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) return <div className="text-center py-20 text-xl text-gray-500">Your cart is empty</div>;

    return (
        <div className="max-w-lg mx-auto bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 mt-10">
            <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-900">Order Summary</h1>
            <div className="space-y-4 mb-8 bg-gray-50 p-6 rounded-xl">
                {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-gray-700 text-sm">
                        <span>{item.name} <span className="text-gray-400">x{item.quantity}</span></span>
                        <span className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
                <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-2xl font-bold text-gray-900 mt-4">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>
            <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-indigo-200 transform active:scale-[0.98]"
            >
                {loading ? 'Processing Order...' : 'Confirm Order'}
            </button>
            <p className="text-center text-xs text-gray-400 mt-4">Secure checkout powered by MetaZone</p>
        </div>
    );
}
