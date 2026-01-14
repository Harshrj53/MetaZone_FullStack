import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetails({ addToCart }) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/products/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) setProduct(null);
                else setProduct(data);
                setLoading(false);
            })
            .catch(err => setLoading(false));
    }, [id]);

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!product) return <div className="text-center py-20 text-xl">Product not found.</div>;

    return (
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-w-5xl mx-auto">
            <div className="md:flex">
                <div className="md:w-1/2 relative bg-gray-100">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover mix-blend-multiply" />
                </div>
                <div className="p-10 md:w-1/2 flex flex-col justify-center bg-white">
                    <div className="text-sm text-indigo-600 font-bold tracking-widest uppercase mb-3 bg-indigo-50 inline-block px-3 py-1 rounded-full w-fit">{product.category}</div>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">{product.name}</h1>
                    <p className="text-gray-600 mb-8 leading-relaxed text-lg">{product.description}</p>

                    <div className="border-t border-gray-100 pt-8 mt-auto">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <span className="text-gray-400 text-sm block mb-1">Price</span>
                                <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => addToCart(product)}
                            className="w-full bg-gray-900 text-white py-4 rounded-xl text-lg font-bold hover:bg-gray-800 transition transform active:scale-[0.98] shadow-lg"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
