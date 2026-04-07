import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, ShoppingBag, List, ShoppingCart, LogOut, Settings } from 'lucide-react';

export default function AdminLayout({ setUser }) {
    const location = useLocation();

    const navigation = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Users', href: '/admin/users', icon: Users },
        { name: 'Products', href: '/admin/products', icon: ShoppingBag },
        { name: 'Categories', href: '/admin/categories', icon: List },
        { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = '/';
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden text-gray-900 dark:text-gray-100 w-full transition-colors duration-300">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col z-20">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
                    <ShoppingBag className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    <div>
                        <Link to="/" className="text-xl font-black text-indigo-600 dark:text-indigo-400 block leading-tight">
                            MetaZone
                        </Link>
                        <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Admin</span>
                    </div>
                </div>
                <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                    {navigation.map((item) => {
                        const isActive = location.pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                                    isActive 
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none translate-x-1' 
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-white'
                                }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? 'text-indigo-100' : 'text-gray-400 dark:text-gray-500'}`} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>
            
            {/* Main Content Viewport */}
            <main className="flex-1 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}
