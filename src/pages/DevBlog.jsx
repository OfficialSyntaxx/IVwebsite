
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SectionTitle from '../components/SectionTitle';
import { BLOG_POSTS } from '../data/blogPosts';
import { ChevronRight, Calendar, User, Zap, Sword, Shield, Map as MapIcon, Trophy } from 'lucide-react';

const getIcon = (tags) => {
    if (tags.includes('Update') || tags.includes('System') || tags.includes('Patch')) return Zap;
    if (tags.includes('PvP') || tags.includes('Event')) return Sword;
    if (tags.includes('Community') || tags.includes('Website')) return User;
    if (tags.includes('PvM') || tags.includes('Raids')) return Trophy;
    return Calendar;
};

const DevBlog = () => {
    return (
        <div className="min-h-screen pt-32 pb-20 container mx-auto px-6 relative z-20 animate-in fade-in duration-500">
            <Helmet>
                <title>Dev Blog - IronVeil</title>
                <meta name="description" content="Stay up to date with the latest updates, patch notes, and developer insights for IronVeil." />
            </Helmet>

            <SectionTitle subtitle>Developer Blog</SectionTitle>
            <p className="text-slate-400 text-lg mb-12 max-w-2xl">
                Insights, updates, and sneak peeks directly from the development team.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {BLOG_POSTS.map((post) => (
                    <Link
                        key={post.id}
                        to={`/blog/${post.id}`}
                        className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(8,145,178,0.1)] transition-all group flex flex-col"
                    >
                        {/* Fake Thumbnail / Icon Header */}
                        <div className="h-48 bg-slate-950 relative flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 to-purple-900/10"></div>
                            {(() => {
                                const Icon = getIcon(post.tags);
                                return <Icon size={64} className="text-slate-700 group-hover:text-cyan-500/50 transition-colors duration-500 transform group-hover:scale-110" />;
                            })()}
                            <div className="absolute top-4 left-4 flex gap-2">
                                {post.tags.map(tag => (
                                    <span key={tag} className="bg-black/60 backdrop-blur px-3 py-1 rounded text-xs font-bold uppercase tracking-wider text-cyan-400 border border-cyan-500/20">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                                {post.title}
                            </h3>
                            <p className="text-slate-400 text-sm mb-6 line-clamp-3">
                                {post.excerpt}
                            </p>

                            <div className="mt-auto flex items-center justify-between text-xs text-slate-500 border-t border-slate-800 pt-4">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                                    <span className="flex items-center gap-1"><User size={12} /> IronVeil Team</span>
                                </div>
                                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform text-cyan-500" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default DevBlog;
