import { Link } from 'react-router-dom';
import { Sun, Moon, ShoppingBag, LogOut, User as UserIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar({ user, setUser, cartCount }) {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = '/';
    };

    return (
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-4 shadow-sm sticky top-0 z-50 transition-colors duration-300 backdrop-filter backdrop-blur-lg bg-opacity-80 dark:bg-opacity-80">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter transition-colors flex items-center gap-2">
                    <ShoppingBag className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    MetaZone
                </Link>

                <div className="flex items-center space-x-8">
                    {user && user.role === 'admin' && (
                        <Link to="/admin/dashboard" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors bg-indigo-50 dark:bg-indigo-900/50 px-3 py-1.5 rounded-md hidden md:block">
                            Admin Dashboard
                        </Link>
                    )}
                    <Link to="/" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors hidden sm:block">
                        Home
                    </Link>
                    {user && (
                        <Link to="/orders" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                            My Orders
                        </Link>
                    )}
                </div>

                <div className="flex items-center space-x-4 sm:space-x-6">
                    <button 
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="Toggle Dark Mode"
                    >
                        {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
                    </button>

                    <Link to="/cart" className="relative group p-2">
                        <ShoppingBag className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transform scale-100 transition-transform shadow-md">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <div className="hidden lg:flex items-center space-x-2 text-gray-900 dark:text-white">
                                <UserIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                <span className="text-sm font-bold">{user.name}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="text-sm font-medium text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors flex items-center gap-1 p-2"
                                title="Logout"
                            >
                                <LogOut className="w-4 h-4 sm:hidden" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-3">
                            <Link to="/login" className="text-sm font-bold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                Login
                            </Link>
                            <Link to="/register" className="bg-gray-900 dark:bg-indigo-600 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-sm font-bold hover:bg-gray-800 dark:hover:bg-indigo-700 transition shadow-md active:scale-95">
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
