import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

export default function Home({ addToCart }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Use imported environment variable
        fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/products`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
    );

    return (
        <div className="pb-12">
            <div className="mb-16 mt-8 text-center max-w-2xl mx-auto space-y-4">
                <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                    Elevate Your Lifestyle
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                    Discover premium products curated for modern living.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map(product => (
                    <div key={product.id} className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100 dark:border-gray-800 group relative">
                        <Link to={`/products/${product.id}`} className="block overflow-hidden relative pb-[100%] bg-gray-50 dark:bg-gray-800">
                            {product.imageUrl ? (
                                <img src={product.imageUrl} alt={product.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400">No Image</div>
                            )}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                        </Link>
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2">
                                {product.category || 'Uncategorized'}
                            </div>
                            <Link to={`/products/${product.id}`}>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    {product.name}
                                </h2>
                            </Link>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-2">
                                {product.description}
                            </p>
                            <div className="mt-auto flex justify-between items-center group-hover:transform group-hover:-translate-y-1 transition-transform duration-300">
                                <span className="text-2xl font-black text-gray-900 dark:text-white">
                                    ${product.price}
                                </span>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="bg-gray-900 dark:bg-indigo-600 text-white p-3 rounded-xl text-sm font-bold hover:bg-gray-800 dark:hover:bg-indigo-700 transition-all shadow-md hover:shadow-xl active:scale-95"
                                    title="Add to Cart"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {products.length === 0 && !loading && (
                <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                    <p className="text-gray-500 dark:text-gray-400 text-lg">No products found. Start adding some!</p>
                </div>
            )}
        </div>
    );
}
