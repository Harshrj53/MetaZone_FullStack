import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home({ addToCart }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(res => res.json())
            .then(data => {
                // Ensure data is array (if error, might be obj)
                if (Array.isArray(data)) setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;

    return (
        <div>
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Welcome to MetaZone</h1>
                <p className="text-lg text-gray-600">The premium destination for all your needs.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map(product => (
                    <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col border border-gray-100">
                        <Link to={`/products/${product.id}`} className="block overflow-hidden">
                            <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500" />
                        </Link>
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="text-sm text-indigo-500 font-semibold mb-1 uppercase tracking-wider">{product.category}</div>
                            <Link to={`/products/${product.id}`}>
                                <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight hover:text-indigo-600 transition-colors">{product.name}</h2>
                            </Link>
                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                            <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100">
                                <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors active:scale-95 transform"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
