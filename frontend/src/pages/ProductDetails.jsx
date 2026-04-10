import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import api from '../api/axios';

export default function ProductDetails({ addToCart }) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/products/${id}`)
            .then(res => {
                if (res.data.error) setProduct(null);
                else setProduct(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    if (loading) return (
        <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
    );

    if (!product) return (
        <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product not found</h2>
            <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:underline">Return Home</Link>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors font-medium">
                <ArrowLeft className="w-5 h-5" /> Back to Products
            </Link>
            
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row transition-colors">
                <div className="md:w-1/2 relative bg-gray-50 dark:bg-gray-800 min-h-[400px]">
                    {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                        <div className="absolute inset-0 flex justify-center items-center text-gray-400">No Image</div>
                    )}
                </div>
                
                <div className="p-8 sm:p-12 md:w-1/2 flex flex-col justify-center bg-white dark:bg-gray-900">
                    <div className="text-sm text-indigo-600 dark:text-indigo-400 font-bold tracking-widest uppercase mb-4 bg-indigo-50 dark:bg-indigo-900/30 inline-block px-4 py-1.5 rounded-full w-fit">
                        {product.category || 'Uncategorized'}
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
                        {product.name}
                    </h1>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-lg">
                        {product.description}
                    </p>

                    <div className="border-t border-gray-100 dark:border-gray-800 pt-8 mt-auto">
                        <div className="flex items-end justify-between mb-8">
                            <div>
                                <span className="text-gray-400 dark:text-gray-500 font-medium text-sm tracking-wider uppercase block mb-1">Total Price</span>
                                <span className="text-5xl font-black text-gray-900 dark:text-white">${product.price}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => addToCart(product)}
                            className="w-full bg-indigo-600 text-white py-4 rounded-xl text-lg font-bold hover:bg-indigo-700 transition shadow-lg hover:shadow-indigo-500/30 active:scale-[0.98] flex items-center justify-center gap-3"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
