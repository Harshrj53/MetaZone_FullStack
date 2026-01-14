import { Link } from 'react-router-dom';

export default function Navbar({ user, setUser, cartCount }) {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = '/';
    };

    return (
        <nav className="bg-white border-b border-gray-100 py-4 shadow-sm sticky top-0 z-50 backdrop-filter backdrop-blur-lg bg-opacity-80">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-black text-gray-900 tracking-tighter hover:text-indigo-600 transition-colors">
                    MetaZone
                </Link>

                <div className="flex items-center space-x-8">
                    <Link to="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                        Home
                    </Link>
                    {user && (
                        <Link to="/orders" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                            My Orders
                        </Link>
                    )}
                </div>

                <div className="flex items-center space-x-6">
                    <Link to="/cart" className="relative group">
                        <span className="sr-only">Cart</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 group-hover:text-indigo-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg transform scale-100 transition-transform">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-sm font-bold text-gray-900 hidden md:block">Hi, {user.name}</span>
                            <button
                                onClick={handleLogout}
                                className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Link to="/login" className="text-sm font-bold text-gray-900 hover:text-indigo-600 transition-colors">
                                Login
                            </Link>
                            <Link to="/register" className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-800 transition shadow-lg hover:shadow-xl transform active:scale-95">
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
