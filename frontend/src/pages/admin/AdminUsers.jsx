import { useEffect, useState } from 'react';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = () => {
        fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/admin/users`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
        .then(res => res.json())
        .then(data => {
            setUsers(data);
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const toggleBlock = async (id, currentStatus) => {
        const action = currentStatus ? 'unblock' : 'block';
        await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/admin/users/${id}/${action}`, {
            method: 'PATCH',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        fetchUsers();
    };

    if (loading) return <div className="text-center py-10 mt-10 text-gray-500">Loading users...</div>;

    return (
        <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">Manage Users</h1>
            
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm uppercase tracking-widest border-b border-gray-100 dark:border-gray-700">
                                <th className="px-6 py-4 font-bold">Name</th>
                                <th className="px-6 py-4 font-bold">Email</th>
                                <th className="px-6 py-4 font-bold">Role</th>
                                <th className="px-6 py-4 font-bold">Status</th>
                                <th className="px-6 py-4 font-bold text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {users.map(user => (
                                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{user.name}</td>
                                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${user.role === 'admin' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.isBlocked ? (
                                            <span className="text-red-500 font-bold text-sm bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full">Blocked</span>
                                        ) : (
                                            <span className="text-green-500 font-bold text-sm bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">Active</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {user.role !== 'admin' && (
                                            <button
                                                onClick={() => toggleBlock(user.id, user.isBlocked)}
                                                className={`p-2 rounded-xl transition-all shadow-sm ${user.isBlocked ? 'bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/30' : 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30'}`}
                                                title={user.isBlocked ? 'Unblock user' : 'Block user'}
                                            >
                                                {user.isBlocked ? <ShieldCheck className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
