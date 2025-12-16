import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Shield, Calendar, Mail, AlertTriangle } from 'lucide-react';

import { Camera, Save, X, Upload } from 'lucide-react';

const AVATAR_PRESETS = [
    "https://oldschool.runescape.wiki/images/Blue_partyhat.png",
    "https://oldschool.runescape.wiki/images/Red_partyhat.png",
    "https://oldschool.runescape.wiki/images/Santa_hat.png",
    "https://oldschool.runescape.wiki/images/Helm_of_neitiznot.png",
    "https://oldschool.runescape.wiki/images/Dragon_full_helm.png"
];

const Profile = () => {
    const navigate = useNavigate();
    const { user, setUser, logout } = useAuth(); // Assuming setUser is exposed in AuthContext, if not I will need to update AuthContext too.
    const [isEditing, setIsEditing] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState('');
    const [customAvatar, setCustomAvatar] = useState('');
    const fileInputRef = React.useRef(null);

    // Check if setUser is actually available, if not I'll need to refactor AuthContext or just rely on re-fetching.

    // Check if setUser is actually available, if not I'll need to refactor AuthContext or just rely on re-fetching.
    // For now let's assume I can update local state or trigger a reload.

    useEffect(() => {
        if (user) {
            setAvatarUrl(user.avatar || AVATAR_PRESETS[0]);
        }
    }, [user]);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64Data = reader.result;
            // Upload immediately to get URL
            try {
                const res = await fetch('http://localhost:3002/api/upload', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ image: base64Data })
                });
                const data = await res.json();
                if (data.success) {
                    setAvatarUrl(data.url); // Use the returned URL
                    setCustomAvatar('');
                } else {
                    alert("Upload failed: " + data.error);
                }
            } catch (err) {
                console.error("Upload error", err);
                alert("Upload failed. Check server connection.");
            }
        };
        reader.readAsDataURL(file);
    };

    const handleSaveAvatar = async () => {
        const newAvatar = customAvatar || avatarUrl;
        const token = localStorage.getItem('token');

        try {
            const res = await fetch('http://localhost:3002/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ avatar: newAvatar })
            });
            const data = await res.json();
            if (data.success) {
                if (setUser) setUser(data.user);
            }
        } catch (err) {
            console.error("Failed to update profile", err);
        }
        setIsEditing(false);
    };

    useEffect(() => {
        // If no user and not loading (implicit), redirect
        // However, Profile is likely protected. If user is null, we redirect.
        if (!user) {
            // We can rely on the check below or redirect here.
            // But let's just return null if no user so it doesn't flash.
        }
    }, [user, navigate]);

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            logout();
            navigate('/');
        }
    };

    if (!user) {
        // Redirect effect will handle it, or we can just show nothing/redirect here
        navigate('/');
        return null;
    }

    if (!user) return null;

    return (
        <div className="pt-32 pb-12 container mx-auto px-6 min-h-screen">
            <div className="max-w-2xl mx-auto">
                <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 border-b border-slate-700 flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="relative group cursor-pointer" onClick={() => setIsEditing(true)}>
                                <div className="w-32 h-32 bg-slate-900 rounded-full flex items-center justify-center border-4 border-slate-700 overflow-hidden shadow-xl">
                                    {avatarUrl ? (
                                        <img src={avatarUrl} alt="Profile" className="w-full h-full object-contain p-2 bg-slate-900" />
                                    ) : (
                                        <User size={40} className="text-slate-500" />
                                    )}
                                </div>
                                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera size={24} className="text-white" />
                                </div>
                            </div>

                            <div>
                                <h1 className="text-3xl font-serif font-bold text-white tracking-wide">{user.username}</h1>
                            </div>
                        </div>
                    </div>

                    {/* Avatar Editor Modal */}
                    {isEditing && (
                        <div className="bg-black/20 p-6 border-b border-slate-700 animate-in slide-in-from-top-4">
                            <h3 className="text-white font-bold mb-4">Choose Avatar</h3>
                            <div className="flex gap-4 mb-4 overflow-x-auto pb-2">
                                {AVATAR_PRESETS.map((url, i) => (
                                    <button
                                        key={i}
                                        onClick={() => { setAvatarUrl(url); setCustomAvatar(''); }}
                                        className={`w-16 h-16 rounded-full border-2 transition-all shrink-0 overflow-hidden bg-slate-900 ${avatarUrl === url ? 'border-cyan-500 scale-110 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'border-transparent hover:border-slate-500'}`}
                                    >
                                        <img src={url} className="w-full h-full object-contain p-2" />
                                    </button>
                                ))}
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-16 h-16 rounded-full border-2 border-slate-700 hover:border-cyan-500 bg-slate-900 flex flex-col items-center justify-center shrink-0 text-slate-400 hover:text-cyan-400 transition-colors"
                                    title="Upload Image"
                                >
                                    <Upload size={20} />
                                    <span className="text-[9px] font-bold mt-1">UPLOAD</span>
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                />
                            </div>



                            <div className="flex justify-end gap-2">
                                <button onClick={() => setIsEditing(false)} className="px-4 py-2 hover:bg-white/5 rounded text-slate-400 text-sm font-bold">Cancel</button>
                                <button onClick={handleSaveAvatar} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-sm font-bold flex items-center gap-2">
                                    <Save size={14} /> Save Changes
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Content */}
                    <div className="p-8 space-y-6">
                        <div className="grid gap-4">
                            <div className="p-4 bg-black/20 rounded-lg border border-slate-800/50 flex items-center gap-4">
                                <Mail className="text-slate-500" size={20} />
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-bold">Email Address</p>
                                    <p className="text-slate-200">{user.email}</p>
                                </div>
                            </div>

                            <div className="p-4 bg-black/20 rounded-lg border border-slate-800/50 flex items-center gap-4">
                                <Calendar className="text-slate-500" size={20} />
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-bold">Member Since</p>
                                    <p className="text-slate-200">{user.joined ? new Date(user.joined).toLocaleDateString() : 'Unknown'}</p>
                                </div>
                            </div>


                        </div>

                        <div className="pt-6 border-t border-slate-800">
                            <button
                                onClick={handleLogout}
                                className="w-full py-3 bg-red-900/20 hover:bg-red-900/40 text-red-500 border border-red-900/50 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                            >
                                <LogOut size={18} />
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
