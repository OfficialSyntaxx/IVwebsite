
import React, { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import { Lock, Save, AlertCircle, CheckCircle, Edit, Trash2, X, FileText, Users, Megaphone, Shield } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
    const { user } = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('blog'); // blog, apps, users, announcement

    // --- BLOG STATE ---
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('Syntaxx');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('Update');
    const [editingId, setEditingId] = useState(null);
    const [posts, setPosts] = useState([]);

    // --- APPS STATE ---
    const [apps, setApps] = useState([]);

    // --- USERS STATE ---
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [editForm, setEditForm] = useState({ username: '', email: '', role: 'User', password: '' });

    // --- ANNOUNCEMENT STATE ---
    const [announcementMsg, setAnnouncementMsg] = useState('');
    const [announcementType, setAnnouncementType] = useState('permanent'); // permanent, timed
    const [announcementDuration, setAnnouncementDuration] = useState(60); // minutes
    const [announcementQueue, setAnnouncementQueue] = useState([]);

    // --- SHARED STATE ---
    const [status, setStatus] = useState(null); // 'loading', 'success', 'error'
    const [message, setMessage] = useState('');
    const [loginStatus, setLoginStatus] = useState(null);
    const [loginMessage, setLoginMessage] = useState('');

    // --- FETCHERS ---
    const fetchPosts = () => {
        fetch('http://localhost:3002/api/blog').then(res => res.json()).then(setPosts).catch(console.error);
    };
    const fetchApps = () => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:3002/staff-applications', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setApps(data);
                else setApps([]);
            })
            .catch(console.error);
    };
    const fetchUsers = () => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:3002/api/users', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch users');
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data)) setUsers(data);
                else setUsers([]); // Fallback to avoid map error
            })
            .catch(err => {
                console.error(err);
                setUsers([]);
            });
    };
    const fetchAnnouncement = () => {
        fetch('http://localhost:3002/api/announcement/queue').then(res => res.json()).then(setAnnouncementQueue).catch(console.error);
    };

    const handleAnnouncementDelete = async (id) => {
        if (!window.confirm("Delete this announcement?")) return;
        try {
            await fetch(`http://localhost:3002/api/announcement/${id}`, { method: 'DELETE' });
            fetchAnnouncement();
        } catch (err) { alert('Failed to delete announcement'); }
    };

    useEffect(() => {
        if (isAuthenticated) {
            if (activeTab === 'blog') fetchPosts();
            if (activeTab === 'apps') fetchApps();
            if (activeTab === 'users') fetchUsers();
            if (activeTab === 'announcement') fetchAnnouncement();
        }
    }, [isAuthenticated, activeTab]);

    useEffect(() => {
        if (user && (user.role === 'Owner' || user.username.toLowerCase() === 'syntaxx' || user.username.toLowerCase() === 'cranked')) {
            setIsAuthenticated(true);
        }
    }, [user]);

    // --- AUTH ---
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginStatus('loading');
        try {
            const res = await fetch('http://localhost:3002/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });
            if (res.ok) setIsAuthenticated(true);
            else { setLoginStatus('error'); setLoginMessage('Incorrect password'); }
        } catch (err) { setLoginStatus('error'); setLoginMessage('Server connection failed'); }
    };

    // --- ACTIONS ---
    const handleBlogSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        const newPost = {
            title, author, excerpt, content,
            tags: tags.split(',').map(t => t.trim()),
            role: author === 'Syntaxx' ? 'Co owner & Wizard' : 'Owner & Mastermind',
            authorImage: author === 'Syntaxx' ? 'https://oldschool.runescape.wiki/images/Wise_Old_Man.png' : 'https://oldschool.runescape.wiki/images/Vannaka.png'
        };
        const url = editingId ? `http://localhost:3002/api/blog/${editingId}` : 'http://localhost:3002/api/blog';
        const method = editingId ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method, headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password, post: newPost })
            });
            const data = await res.json();
            if (res.ok) {
                setStatus('success'); setMessage(editingId ? 'Post updated!' : 'Post published!');
                fetchPosts();
                if (!editingId) { setTitle(''); setExcerpt(''); setContent(''); }
            } else { setStatus('error'); setMessage(data.error); }
        } catch (err) { setStatus('error'); setMessage('Network error'); }
    };

    const handleBlogDelete = async (id) => {
        if (!window.confirm("Delete this post?")) return;
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:3002/api/blog/${id}`, {
                method: 'DELETE', headers: {
                    'Content-Type': 'application/json',
                    'x-admin-password': password,
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                fetchPosts();
                setStatus('success'); setMessage('Post deleted!');
                setTimeout(() => { setStatus(null); setMessage(''); }, 3000);
            }
        } catch (err) { alert('Error deleting post'); }
    };

    const handleBlogEdit = (post) => {
        setEditingId(post.id); setTitle(post.title); setAuthor(post.author); setExcerpt(post.excerpt);
        setContent(post.content); setTags(post.tags.join(', '));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleAppUpdate = async (id, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`http://localhost:3002/staff-application/${id}`, {
                method: 'PUT', headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            fetchApps();
        } catch (err) { alert('Failed to update status'); }
    };

    const handleAppDelete = async (id) => {
        if (!window.confirm("Delete this application?")) return;
        try {
            const token = localStorage.getItem('token');
            await fetch(`http://localhost:3002/staff-application/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchApps();
        } catch (err) { alert('Failed to delete application'); }
    };

    const handleUserDelete = async (id) => {
        if (!window.confirm("Ban/Delete this user?")) return;
        try {
            const token = localStorage.getItem('token');
            await fetch(`http://localhost:3002/api/users/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchUsers();
        } catch (err) { alert('Failed to delete user'); }
    }

    const openEditUser = (user) => {
        setEditingUser(user);
        setEditForm({ username: user.username, email: user.email, role: user.role || 'User', password: '' });
    };

    const handleUserUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = {
                username: editForm.username,
                email: editForm.email,
                role: editForm.role
            };
            if (editForm.password) body.newPassword = editForm.password;

            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:3002/api/users/${editingUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });

            if (res.ok) {
                setEditingUser(null);
                fetchUsers();
                alert('User updated successfully');
            } else {
                alert('Failed to update user');
            }
        } catch (err) { alert('Error updating user'); }
    };

    const handleAnnouncementSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await fetch('http://localhost:3002/api/announcement', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: announcementMsg, type: announcementType, duration: announcementDuration })
            });
            setStatus('success'); setMessage('Announcement updated!');
            setTimeout(() => { setStatus(null); setMessage(''); }, 3000);
        } catch (err) { setStatus('error'); setMessage('Failed to update announcement'); }
    };


    if (!isAuthenticated) {
        return (
            <div className="min-h-screen pt-32 pb-20 container mx-auto px-6 flex flex-col items-center justify-center animate-in fade-in duration-500">
                <Helmet><title>Admin Login - Iron-Veil</title></Helmet>
                <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-xl w-full max-w-md shadow-2xl">
                    <div className="flex justify-center mb-6 text-cyan-400"><Lock size={48} /></div>
                    <SectionTitle center>Staff Access</SectionTitle>
                    <form onSubmit={handleLogin} className="mt-8 space-y-6">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black/40 border border-slate-700 rounded px-4 py-3 text-white focus:border-cyan-500 outline-none" placeholder="Enter admin password..." />
                        {loginStatus === 'error' && <div className="text-red-400 text-sm flex gap-2"><AlertCircle size={16} /> {loginMessage}</div>}
                        <button type="submit" disabled={loginStatus === 'loading'} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded transition-all">Access Panel</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 container mx-auto px-6 animate-in fade-in duration-500">
            <Helmet><title>Admin Panel - Iron-Veil</title></Helmet>
            <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
                {/* Sidebar Navigation */}
                <div className="w-full md:w-64 flex flex-col gap-2 shrink-0">
                    <h2 className="text-2xl font-bold text-white mb-6 px-2">Admin Panel</h2>
                    <button onClick={() => setActiveTab('blog')} className={`text-left px-4 py-3 rounded-lg font-bold flex items-center gap-3 transition-colors ${activeTab === 'blog' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
                        <FileText size={18} /> Blog Posts
                    </button>
                    <button onClick={() => setActiveTab('apps')} className={`text-left px-4 py-3 rounded-lg font-bold flex items-center gap-3 transition-colors ${activeTab === 'apps' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
                        <Shield size={18} /> Staff Apps
                    </button>
                    <button onClick={() => setActiveTab('users')} className={`text-left px-4 py-3 rounded-lg font-bold flex items-center gap-3 transition-colors ${activeTab === 'users' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
                        <Users size={18} /> User Manager
                    </button>
                    <button onClick={() => setActiveTab('announcement')} className={`text-left px-4 py-3 rounded-lg font-bold flex items-center gap-3 transition-colors ${activeTab === 'announcement' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
                        <Megaphone size={18} /> Announcement
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 min-w-0">
                    {/* BLOG TAB */}
                    {activeTab === 'blog' && (
                        <div className="space-y-8">
                            <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-xl shadow-xl">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">{editingId ? 'Edit Post' : 'Create New Post'}</h3>
                                <form onSubmit={handleBlogSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-black/40 border border-slate-700 rounded px-4 py-3 text-white focus:border-cyan-500 outline-none" placeholder="Title" required />
                                        <select value={author} onChange={e => setAuthor(e.target.value)} className="w-full bg-black/40 border border-slate-700 rounded px-4 py-3 text-white focus:border-cyan-500 outline-none">
                                            <option value="Syntaxx">Syntaxx</option><option value="Cranked">Cranked</option>
                                        </select>
                                    </div>
                                    <input type="text" value={excerpt} onChange={e => setExcerpt(e.target.value)} className="w-full bg-black/40 border border-slate-700 rounded px-4 py-3 text-white focus:border-cyan-500 outline-none" placeholder="Excerpt" required />
                                    <input type="text" value={tags} onChange={e => setTags(e.target.value)} className="w-full bg-black/40 border border-slate-700 rounded px-4 py-3 text-white focus:border-cyan-500 outline-none" placeholder="Tags" />
                                    <textarea value={content} onChange={e => setContent(e.target.value)} className="w-full h-64 bg-black/40 border border-slate-700 rounded px-4 py-3 text-white focus:border-cyan-500 outline-none font-mono text-sm" placeholder="Content (Markdown)" required />

                                    {status && <div className={`p-4 rounded border ${status === 'success' ? 'bg-green-900/20 border-green-500/50 text-green-400' : 'bg-red-900/20 border-red-500/50 text-red-400'}`}>{message}</div>}

                                    <button type="submit" disabled={status === 'loading'} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded transition-all">{status === 'loading' ? 'Saving...' : 'Publish'}</button>
                                </form>
                            </div>
                            <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-xl">
                                <h3 className="text-xl font-bold text-white mb-6">Manage Posts</h3>
                                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                    {posts.map(post => (
                                        <div key={post.id} className="bg-black/40 border border-slate-700 p-4 rounded flex justify-between items-center">
                                            <div><h4 className="font-bold text-slate-200">{post.title}</h4><span className="text-xs text-slate-500">{post.date} • {post.author}</span></div>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleBlogEdit(post)} className="p-2 bg-slate-800 hover:bg-yellow-900/50 text-yellow-500 rounded"><Edit size={16} /></button>
                                                <button onClick={() => handleBlogDelete(post.id)} className="p-2 bg-slate-800 hover:bg-red-900/50 text-red-500 rounded"><Trash2 size={16} /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* APPS TAB */}
                    {activeTab === 'apps' && (
                        <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-xl shadow-xl">
                            <h3 className="text-xl font-bold text-white mb-6">Staff Applications</h3>
                            <div className="space-y-6">
                                {apps.length === 0 ? <p className="text-slate-500">No applications found.</p> : apps.map(app => (
                                    <div key={app.id} className="bg-black/40 border border-slate-700 p-6 rounded-lg">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="font-bold text-white text-lg">{app.discord}</h4>
                                                <p className="text-slate-500 text-sm">Submitted: {new Date(app.timestamp).toLocaleDateString()}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded text-xs font-bold uppercase ${app.status === 'Accepted' ? 'bg-green-900/20 text-green-400' : app.status === 'Rejected' ? 'bg-red-900/20 text-red-400' : 'bg-yellow-900/20 text-yellow-400'}`}>{app.status || 'Pending'}</span>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4 text-slate-300 text-sm mb-4">
                                            <div><strong>Experience:</strong><p>{app.experience}</p></div>
                                            <div><strong>Why:</strong><p>{app.reason}</p></div>
                                            <div><strong>Age:</strong> {app.age}</div>
                                            <div><strong>IGN:</strong> {app.ign}</div>
                                        </div>
                                        <div className="flex gap-3 pt-4 border-t border-slate-800">
                                            <button onClick={() => handleAppUpdate(app.id, 'Accepted')} className="px-4 py-2 bg-green-600/20 hover:bg-green-600/40 text-green-400 rounded font-bold text-xs uppercase">Accept</button>
                                            <button onClick={() => handleAppUpdate(app.id, 'Rejected')} className="px-4 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded font-bold text-xs uppercase">Reject</button>
                                            <button onClick={() => handleAppUpdate(app.id, 'Pending')} className="px-4 py-2 bg-yellow-600/20 hover:bg-yellow-600/40 text-yellow-400 rounded font-bold text-xs uppercase">Reset</button>
                                            <button onClick={() => handleAppDelete(app.id)} className="px-4 py-2 bg-slate-700/50 hover:bg-red-900/40 text-red-500 rounded font-bold text-xs uppercase ml-auto"><Trash2 size={14} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* USERS TAB */}
                    {activeTab === 'users' && (
                        <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-xl shadow-xl">
                            <h3 className="text-xl font-bold text-white mb-6">User Management</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="text-slate-500 text-sm border-b border-slate-800">
                                            <th className="p-3">Username</th>
                                            <th className="p-3">Email</th>
                                            <th className="p-3">Role</th>
                                            <th className="p-3">Joined</th>
                                            <th className="p-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-slate-300">
                                        {users.map(user => (
                                            <tr key={user.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                                                <td className="p-3 font-bold text-white">{user.username}</td>
                                                <td className="p-3 text-slate-400">{user.email}</td>
                                                <td className="p-3">
                                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${user.role === 'Admin' || user.role === 'Owner' ? 'bg-red-900/20 text-red-400' : 'bg-slate-700/20 text-slate-400'}`}>{user.role}</span>
                                                </td>
                                                <td className="p-3 text-sm">{new Date(user.joined).toLocaleDateString()}</td>
                                                <td className="p-3 text-right flex justify-end gap-2">
                                                    <button onClick={() => openEditUser(user)} className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-900/20 p-2 rounded transition-colors" title="Edit User"><Edit size={16} /></button>
                                                    <button onClick={() => handleUserDelete(user.id)} className="text-red-400 hover:text-red-300 hover:bg-red-900/20 p-2 rounded transition-colors" title="Ban User"><Trash2 size={16} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Edit Modal */}
                            {editingUser && (
                                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
                                    <div className="bg-slate-900 border border-slate-700 p-8 rounded-xl w-full max-w-lg shadow-2xl animate-in zoom-in-95">
                                        <h3 className="text-xl font-bold text-white mb-6">Edit User: {editingUser.username}</h3>
                                        <form onSubmit={handleUserUpdateSubmit} className="space-y-4">
                                            <div>
                                                <label className="block text-slate-400 text-sm font-bold mb-2">Username</label>
                                                <input type="text" value={editForm.username} onChange={e => setEditForm({ ...editForm, username: e.target.value })} className="w-full bg-black/40 border border-slate-700 rounded px-4 py-3 text-white focus:border-cyan-500 outline-none" required />
                                            </div>
                                            <div>
                                                <label className="block text-slate-400 text-sm font-bold mb-2">Email</label>
                                                <input type="email" value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })} className="w-full bg-black/40 border border-slate-700 rounded px-4 py-3 text-white focus:border-cyan-500 outline-none" required />
                                            </div>
                                            <div>
                                                <label className="block text-slate-400 text-sm font-bold mb-2">Role</label>
                                                <select value={editForm.role} onChange={e => setEditForm({ ...editForm, role: e.target.value })} className="w-full bg-black/40 border border-slate-700 rounded px-4 py-3 text-white focus:border-cyan-500 outline-none">
                                                    <option value="User">User</option>
                                                    <option value="Donator">Donator</option>
                                                    <option value="Moderator">Moderator</option>
                                                    <option value="Admin">Admin</option>
                                                    <option value="Owner">Owner</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-slate-400 text-sm font-bold mb-2">New Password (Optional)</label>
                                                <input type="text" value={editForm.password} onChange={e => setEditForm({ ...editForm, password: e.target.value })} className="w-full bg-black/40 border border-slate-700 rounded px-4 py-3 text-white focus:border-cyan-500 outline-none" placeholder="Leave empty to keep current" />
                                            </div>
                                            <div className="flex gap-4 pt-4">
                                                <button type="button" onClick={() => setEditingUser(null)} className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded">Cancel</button>
                                                <button type="submit" className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded">Save Changes</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ANNOUNCEMENTS TAB */}
                    {activeTab === 'announcement' && (
                        <div className="space-y-8">
                            <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-xl shadow-xl">
                                <h3 className="text-xl font-bold text-white mb-6">Create Announcement</h3>
                                <div className="bg-cyan-900/10 border border-cyan-500/20 p-4 rounded-lg mb-8 text-cyan-200 text-sm">
                                    Announcements appear on the homepage. They queue and play sequentially.
                                </div>
                                <form onSubmit={handleAnnouncementSubmit} className="space-y-6 max-w-lg">
                                    <div>
                                        <label className="block text-slate-400 text-sm font-bold mb-2">Message</label>
                                        <input type="text" value={announcementMsg} onChange={e => setAnnouncementMsg(e.target.value)} className="w-full bg-black/40 border border-slate-700 rounded px-4 py-3 text-white focus:border-cyan-500 outline-none" placeholder="e.g. Server restarting in 30 minutes..." required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-slate-400 text-sm font-bold mb-2">Type</label>
                                            <select value={announcementType} onChange={e => setAnnouncementType(e.target.value)} className="w-full bg-black/40 border border-slate-700 rounded px-4 py-3 text-white focus:border-cyan-500 outline-none">
                                                <option value="permanent">Permanent</option>
                                                <option value="timed">Timed</option>
                                            </select>
                                        </div>
                                        {announcementType === 'timed' && (
                                            <div>
                                                <label className="block text-slate-400 text-sm font-bold mb-2">Duration (Minutes)</label>
                                                <input type="number" value={announcementDuration} onChange={e => setAnnouncementDuration(Number(e.target.value))} className="w-full bg-black/40 border border-slate-700 rounded px-4 py-3 text-white focus:border-cyan-500 outline-none" min="1" />
                                            </div>
                                        )}
                                    </div>

                                    {status && <div className={`p-4 rounded border ${status === 'success' ? 'bg-green-900/20 border-green-500/50 text-green-400' : 'bg-red-900/20 border-red-500/50 text-red-400'}`}>{message}</div>}

                                    <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded transition-all">Add to Queue</button>
                                </form>
                            </div>

                            <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-xl shadow-xl">
                                <h3 className="text-xl font-bold text-white mb-6">Announcement Queue</h3>
                                {announcementQueue.length === 0 ? (
                                    <p className="text-slate-500 text-center py-8">No announcements in queue</p>
                                ) : (
                                    <div className="space-y-4">
                                        {announcementQueue.map((ann, index) => (
                                            <div key={ann.id} className={`bg-black/40 border rounded-lg p-4 flex justify-between items-start ${index === 0 ? 'border-cyan-500/50 bg-cyan-900/10' : 'border-slate-700'}`}>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        {index === 0 && <span className="px-2 py-1 bg-cyan-600/20 text-cyan-400 text-xs font-bold rounded uppercase">Active</span>}
                                                        {index > 0 && <span className="px-2 py-1 bg-slate-700/20 text-slate-400 text-xs font-medium rounded">#{index}</span>}
                                                        <span className={`px-2 py-1 text-xs font-bold rounded ${ann.type === 'permanent' ? 'bg-red-900/20 text-red-400' : 'bg-yellow-900/20 text-yellow-400'}`}>{ann.type}</span>
                                                        {ann.type === 'timed' && <span className="text-slate-500 text-xs">{ann.duration} min</span>}
                                                    </div>
                                                    <p className="text-white font-medium">{ann.message}</p>
                                                    {ann.startTime && <p className="text-slate-500 text-xs mt-1">Started: {new Date(ann.startTime).toLocaleString()}</p>}
                                                </div>
                                                <button onClick={() => handleAnnouncementDelete(ann.id)} className="ml-4 p-2 bg-red-900/20 hover:bg-red-900/40 text-red-400 rounded transition-colors" title="Delete">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;
