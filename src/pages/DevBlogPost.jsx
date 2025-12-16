
import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { BLOG_POSTS as STATIC_POSTS } from '../data/blogPosts';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3002';

const DevBlogPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(STATIC_POSTS.find(p => p.id === slug));

    useEffect(() => {
        // Try to fetch specific post from API
        fetch(`${API_BASE}/api/blog`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const found = data.find(p => p.id === slug);
                    if (found) setPost(found);
                }
            })
            .catch(err => console.warn("Using static fallback for post"));
    }, [slug]);

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    return (
        <div className="min-h-screen pt-32 pb-20 container mx-auto px-6 relative z-20 animate-in fade-in duration-500">
            <Helmet>
                <title>{post.title} - Iron-Veil</title>
                <meta name="description" content={post.excerpt} />
            </Helmet>

            <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors text-sm font-bold uppercase tracking-wider group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Blog
            </Link>

            <article className="max-w-4xl mx-auto bg-slate-900/30 border border-slate-800 rounded-2xl overflow-hidden p-8 md:p-12">
                <header className="mb-8 border-b border-slate-800 pb-8">
                    <div className="flex items-center gap-3 mb-4">
                        {post.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-cyan-900/20 text-cyan-400 rounded text-xs font-bold uppercase tracking-wider border border-cyan-500/20">
                                {tag}
                            </span>
                        ))}
                        <span className="text-slate-500 text-sm flex items-center gap-2">
                            <Calendar size={14} /> {post.date}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 overflow-hidden">
                            {post.authorImage ? (
                                <img src={post.authorImage} alt={post.author} className="w-full h-full object-contain bg-slate-950" />
                            ) : (
                                <User size={20} className="text-slate-400" />
                            )}
                        </div>
                        <div>
                            <div className="text-white font-bold text-sm">{post.author || "Iron-Veil Team"}</div>
                            <div className="text-slate-500 text-xs">{post.role || "Developer"}</div>
                        </div>
                    </div>
                </header>

                <div className="prose prose-invert prose-cyan max-w-none text-slate-300 leading-relaxed">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
            </article>
        </div>
    );
};

export default DevBlogPost;
