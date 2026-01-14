import { Link } from 'react-router-dom';

export default function Cart({ cart, removeFromCart }) {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cart.length === 0) return (
        <div className="text-center py-20">
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
            <Link to="/" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Start Shopping
            </Link>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Your Cart</h1>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <ul className="divide-y divide-gray-100">
                    {cart.map(item => (
                        <li key={item.id} className="p-6 flex items-center hover:bg-gray-50 transition-colors">
                            <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-lg shadow-sm border border-gray-200" />
                            <div className="ml-6 flex-1">
                                <Link to={`/products/${item.id}`} className="text-lg font-bold text-gray-900 hover:text-indigo-600 transition">
                                    {item.name}
                                </Link>
                                <div className="text-gray-500 mt-1">${item.price}</div>
                            </div>
                            <div className="flex items-center space-x-6 mr-6">
                                <div className="bg-white border border-gray-300 rounded-lg px-3 py-1 text-sm font-semibold">
                                    Qty: {item.quantity}
                                </div>
                                <div className="text-lg font-bold w-20 text-right">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                                aria-label="Remove item"
                            >
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="p-8 bg-gray-50 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <span className="text-gray-500 block text-sm">Total Amount</span>
                        <span className="text-3xl font-extrabold text-gray-900">${total.toFixed(2)}</span>
                    </div>
                    <Link to="/checkout" className="w-full md:w-auto bg-gray-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg hover:shadow-xl transform active:scale-95 text-center">
                        Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
}
