import { Link } from 'react-router-dom';
import { ShoppingCart as CartIcon, Trash2, ArrowRight } from 'lucide-react';

export default function Cart({ cart, removeFromCart }) {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cart.length === 0) return (
        <div className="text-center py-20 px-4">
            <div className="flex justify-center mb-6">
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full inline-block text-gray-400 dark:text-gray-500">
                    <CartIcon className="w-16 h-16" />
                </div>
            </div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Your cart is empty</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto text-lg">Looks like you haven't added anything yet. Discover our premium collection!</p>
            <Link to="/" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg hover:shadow-indigo-500/30 active:scale-95">
                Start Shopping <ArrowRight className="w-5 h-5" />
            </Link>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-black mb-8 text-gray-900 dark:text-white tracking-tight">Your Cart</h1>
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors">
                <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                    {cart.map(item => (
                        <li key={item.id} className="p-6 sm:p-8 flex items-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                            <div className="relative flex-shrink-0">
                                {item.imageUrl ? (
                                    <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700" />
                                ) : (
                                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 flex justify-center items-center">
                                        <CartIcon className="text-gray-300 dark:text-gray-600" />
                                    </div>
                                )}
                            </div>
                            <div className="ml-6 flex-1">
                                <Link to={`/products/${item.id}`} className="text-xl font-bold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-1">
                                    {item.name}
                                </Link>
                                <div className="text-gray-500 dark:text-gray-400 mt-2 font-medium">${item.price} each</div>
                            </div>
                            <div className="flex items-center space-x-6 mr-6 flex-shrink-0">
                                <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2 text-sm font-bold text-gray-900 dark:text-white">
                                    Qty: {item.quantity}
                                </div>
                                <div className="text-xl font-black w-24 text-right text-gray-900 dark:text-white hidden sm:block">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-3 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20"
                                aria-label="Remove item"
                            >
                                <Trash2 className="w-6 h-6" />
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="p-8 sm:p-10 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <span className="text-gray-500 dark:text-gray-400 font-medium block text-sm uppercase tracking-wider mb-1">Total Amount</span>
                        <span className="text-4xl font-black text-gray-900 dark:text-white">${total.toFixed(2)}</span>
                    </div>
                    <Link to="/checkout" className="w-full md:w-auto bg-indigo-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg hover:shadow-indigo-500/30 transform active:scale-95 text-center flex items-center justify-center gap-2">
                        Checkout <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
