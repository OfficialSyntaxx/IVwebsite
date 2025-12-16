import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, LogIn, AlertCircle } from 'lucide-react';

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const res = await login(username, password);
        setIsLoading(false);

        if (res.success) {
            onClose();
        } else {
            setError(res.error || 'Login failed');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md p-6 relative shadow-2xl">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <LogIn className="text-cyan-400" /> Member Login
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-slate-400 text-sm font-bold mb-1">Username</label>
                        <input
                            type="text"
                            value={username} onChange={e => setUsername(e.target.value)}
                            className="w-full bg-black/40 border border-slate-700 rounded px-4 py-3 text-white focus:border-cyan-500 outline-none"
                            placeholder="Enter username"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-sm font-bold mb-1">Password</label>
                        <input
                            type="password"
                            value={password} onChange={e => setPassword(e.target.value)}
                            className="w-full bg-black/40 border border-slate-700 rounded px-4 py-3 text-white focus:border-cyan-500 outline-none"
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-900/20 border border-red-500/50 rounded flex items-center gap-2 text-red-400 text-sm">
                            <AlertCircle size={16} /> {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 text-white font-bold py-3 rounded transition-all"
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="mt-4 text-center text-slate-400 text-sm">
                    Don't have an account?{' '}
                    <button onClick={onSwitchToRegister} className="text-cyan-400 hover:underline">
                        Register here
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginModal;
