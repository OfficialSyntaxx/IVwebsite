import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, UserPlus, AlertCircle, ShieldCheck } from 'lucide-react';

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        discord: '',
        password: '',
        confirmPassword: '',
        captchaAnswer: ''
    });
    const [captchaProblem, setCaptchaProblem] = useState({ q: '', a: 0 });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();

    useEffect(() => {
        if (isOpen) generateCaptcha();
    }, [isOpen]);

    const generateCaptcha = () => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        setCaptchaProblem({ q: `What is ${num1} + ${num2}?`, a: num1 + num2 });
        setFormData(prev => ({ ...prev, captchaAnswer: '' }));
    };

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match");
        }

        if (parseInt(formData.captchaAnswer) !== captchaProblem.a) {
            return setError("Incorrect captcha answer");
        }

        setIsLoading(true);
        const res = await register({
            username: formData.username,
            email: formData.email,
            discord: formData.discord,
            password: formData.password
        });
        setIsLoading(false);

        if (res.success) {
            onClose();
        } else {
            setError(res.error || 'Registration failed');
            generateCaptcha(); // Reset captcha on fail
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <UserPlus className="text-cyan-400" /> Member Registration
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-slate-400 text-sm font-bold mb-1">Username</label>
                        <input
                            type="text"
                            value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })}
                            className="w-full bg-black/40 border border-slate-700 rounded px-4 py-3 text-white focus:border-cyan-500 outline-none"
                            placeholder="Desired username"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-sm font-bold mb-1">Email</label>
                        <input
                            type="email"
                            value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-black/40 border border-slate-700 rounded px-4 py-3 text-white focus:border-cyan-500 outline-none"
                            placeholder="your@email.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-sm font-bold mb-1">Discord (Optional)</label>
                        <input
                            type="text"
                            value={formData.discord} onChange={e => setFormData({ ...formData, discord: e.target.value })}
                            className="w-full bg-black/40 border border-slate-700 rounded px-4 py-3 text-white focus:border-cyan-500 outline-none"
                            placeholder="Discord username"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-slate-400 text-sm font-bold mb-1">Password</label>
                            <input
                                type="password"
                                value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })}
                                className="w-full bg-black/40 border border-slate-700 rounded px-4 py-3 text-white focus:border-cyan-500 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-slate-400 text-sm font-bold mb-1">Confirm</label>
                            <input
                                type="password"
                                value={formData.confirmPassword} onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className="w-full bg-black/40 border border-slate-700 rounded px-4 py-3 text-white focus:border-cyan-500 outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Captcha */}
                    <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
                        <div className="flex items-center gap-2 text-cyan-400 mb-2 font-bold">
                            <ShieldCheck size={18} /> Human Verification
                        </div>
                        <label className="block text-slate-300 text-sm mb-2">{captchaProblem.q}</label>
                        <input
                            type="number"
                            value={formData.captchaAnswer} onChange={e => setFormData({ ...formData, captchaAnswer: e.target.value })}
                            className="w-full bg-black/40 border border-slate-700 rounded px-4 py-2 text-white focus:border-cyan-500 outline-none"
                            placeholder="Answer"
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
                        {isLoading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>

                <p className="mt-4 text-center text-slate-400 text-sm">
                    Already have an account?{' '}
                    <button onClick={onSwitchToLogin} className="text-cyan-400 hover:underline">
                        Login here
                    </button>
                </p>
            </div>
        </div>
    );
};

export default RegisterModal;
