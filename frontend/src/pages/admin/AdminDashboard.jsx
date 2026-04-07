import { useEffect, useState } from 'react';
import { Users, ShoppingBag, List, ShoppingCart, DollarSign, UserX } from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/admin/stats`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setStats(data);
            setLoading(false);
        })
        .catch(err => setLoading(false));
    }, []);

    if (loading) return <div className="animate-pulse bg-gray-200 dark:bg-gray-800 h-96 rounded-3xl"></div>;
    
    if (!stats) return <div className="text-red-500 text-xl font-bold">Failed to load statistics.</div>;

    const statCards = [
        { label: 'Total Revenue', value: `$${(stats.revenue || 0).toFixed(2)}`, icon: DollarSign, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
        { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingCart, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
        { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
        { label: 'Total Products', value: stats.totalProducts, icon: ShoppingBag, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
        { label: 'Total Categories', value: stats.totalCategories, icon: List, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
        { label: 'Blocked Users', value: stats.blockedUsers, icon: UserX, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' }
    ];

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statCards.map((stat, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-6 transition-transform hover:-translate-y-1 hover:shadow-xl">
                        <div className={`p-4 rounded-2xl ${stat.bg}`}>
                            <stat.icon className={`w-8 h-8 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{stat.label}</p>
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-1">{stat.value}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
