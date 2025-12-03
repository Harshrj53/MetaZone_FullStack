import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash, FaBox, FaTags, FaShoppingBag } from 'react-icons/fa';

const AdminDashboardPage = () => {
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal states
    const [showProductModal, setShowProductModal] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    // Form states
    const [productForm, setProductForm] = useState({
        name: '', description: '', price: '', stock: '', imageUrl: '', categoryId: ''
    });
    const [categoryForm, setCategoryForm] = useState({ name: '', description: '' });

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'products') {
                const res = await axios.get('/products?limit=100');
                setProducts(res.data.data);
                const catRes = await axios.get('/categories');
                setCategories(catRes.data.data);
            } else if (activeTab === 'categories') {
                const res = await axios.get('/categories');
                setCategories(res.data.data);
            } else if (activeTab === 'orders') {
                const res = await axios.get('/orders/admin');
                setOrders(res.data.data);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    // Product Handlers
    const handleProductSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingItem) {
                await axios.put(`/products/${editingItem.id}`, productForm);
                toast.success('Product updated');
            } else {
                await axios.post('/products', productForm);
                toast.success('Product created');
            }
            setShowProductModal(false);
            setEditingItem(null);
            setProductForm({ name: '', description: '', price: '', stock: '', imageUrl: '', categoryId: '' });
            fetchData();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Delete this product?')) {
            try {
                await axios.delete(`/products/${id}`);
                toast.success('Product deleted');
                fetchData();
            } catch (error) {
                toast.error('Failed to delete');
            }
        }
    };

    const openProductModal = (product = null) => {
        if (product) {
            setEditingItem(product);
            setProductForm({
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                imageUrl: product.imageUrl,
                categoryId: product.categoryId
            });
        } else {
            setEditingItem(null);
            setProductForm({ name: '', description: '', price: '', stock: '', imageUrl: '', categoryId: categories[0]?.id || '' });
        }
        setShowProductModal(true);
    };

    // Category Handlers
    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingItem) {
                await axios.put(`/categories/${editingItem.id}`, categoryForm);
                toast.success('Category updated');
            } else {
                await axios.post('/categories', categoryForm);
                toast.success('Category created');
            }
            setShowCategoryModal(false);
            setEditingItem(null);
            setCategoryForm({ name: '', description: '' });
            fetchData();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleDeleteCategory = async (id) => {
        if (window.confirm('Delete this category?')) {
            try {
                await axios.delete(`/categories/${id}`);
                toast.success('Category deleted');
                fetchData();
            } catch (error) {
                toast.error('Failed to delete');
            }
        }
    };

    const openCategoryModal = (category = null) => {
        if (category) {
            setEditingItem(category);
            setCategoryForm({ name: category.name, description: category.description });
        } else {
            setEditingItem(null);
            setCategoryForm({ name: '', description: '' });
        }
        setShowCategoryModal(true);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`w-full flex items-center px-6 py-4 text-left ${activeTab === 'products' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                        >
                            <FaBox className="mr-3" /> Products
                        </button>
                        <button
                            onClick={() => setActiveTab('categories')}
                            className={`w-full flex items-center px-6 py-4 text-left ${activeTab === 'categories' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                        >
                            <FaTags className="mr-3" /> Categories
                        </button>
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`w-full flex items-center px-6 py-4 text-left ${activeTab === 'orders' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                        >
                            <FaShoppingBag className="mr-3" /> Orders
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
                    {/* Products Tab */}
                    {activeTab === 'products' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold">Manage Products</h2>
                                <button onClick={() => openProductModal()} className="btn-primary flex items-center text-sm">
                                    <FaPlus className="mr-2" /> Add Product
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {products.map((product) => (
                                            <tr key={product.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button onClick={() => openProductModal(product)} className="text-indigo-600 hover:text-indigo-900 mr-4"><FaEdit /></button>
                                                    <button onClick={() => handleDeleteProduct(product.id)} className="text-red-600 hover:text-red-900"><FaTrash /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Categories Tab */}
                    {activeTab === 'categories' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold">Manage Categories</h2>
                                <button onClick={() => openCategoryModal()} className="btn-primary flex items-center text-sm">
                                    <FaPlus className="mr-2" /> Add Category
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {categories.map((category) => (
                                            <tr key={category.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.description}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button onClick={() => openCategoryModal(category)} className="text-indigo-600 hover:text-indigo-900 mr-4"><FaEdit /></button>
                                                    <button onClick={() => handleDeleteCategory(category.id)} className="text-red-600 hover:text-red-900"><FaTrash /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Orders Tab */}
                    {activeTab === 'orders' && (
                        <div>
                            <h2 className="text-xl font-bold mb-6">All Orders</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {orders.map((order) => (
                                            <tr key={order.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.User?.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.totalAmount}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Product Modal */}
            {showProductModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-6">{editingItem ? 'Edit Product' : 'Add Product'}</h2>
                        <form onSubmit={handleProductSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Product Name"
                                className="input-field"
                                value={productForm.name}
                                onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                                required
                            />
                            <textarea
                                placeholder="Description"
                                className="input-field"
                                value={productForm.description}
                                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                                required
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="number"
                                    placeholder="Price"
                                    className="input-field"
                                    value={productForm.price}
                                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Stock"
                                    className="input-field"
                                    value={productForm.stock}
                                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                                    required
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Image URL"
                                className="input-field"
                                value={productForm.imageUrl}
                                onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                            />
                            <select
                                className="input-field"
                                value={productForm.categoryId}
                                onChange={(e) => setProductForm({ ...productForm, categoryId: e.target.value })}
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            <div className="flex justify-end space-x-4 mt-6">
                                <button type="button" onClick={() => setShowProductModal(false)} className="text-gray-600 hover:text-gray-800">Cancel</button>
                                <button type="submit" className="btn-primary">{editingItem ? 'Update' : 'Create'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Category Modal */}
            {showCategoryModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-6">{editingItem ? 'Edit Category' : 'Add Category'}</h2>
                        <form onSubmit={handleCategorySubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Category Name"
                                className="input-field"
                                value={categoryForm.name}
                                onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                                required
                            />
                            <textarea
                                placeholder="Description"
                                className="input-field"
                                value={categoryForm.description}
                                onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                            />
                            <div className="flex justify-end space-x-4 mt-6">
                                <button type="button" onClick={() => setShowCategoryModal(false)} className="text-gray-600 hover:text-gray-800">Cancel</button>
                                <button type="submit" className="btn-primary">{editingItem ? 'Update' : 'Create'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboardPage;
