
import React from 'react';
import { ShoppingCart, ExternalLink, Shield, Zap, Crown } from 'lucide-react';

const Store = () => {
    return (
        <div className="pt-24 pb-12 container mx-auto px-6 min-h-screen flex items-center justify-center">
            <div className="max-w-4xl w-full">
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
                        Iron-Veil <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Store</span>
                    </h1>
                    <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
                        Support the server and unlock exclusive cosmetic rewards, quality of life features, and membership benefits.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-xl text-center group hover:border-yellow-500/30 transition-colors">
                        <div className="w-16 h-16 bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-500 group-hover:scale-110 transition-transform">
                            <Crown size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Membership Ranks</h3>
                        <p className="text-slate-500">Stand out with exclusive chat icons, yell titles, and boosted drop rates.</p>
                    </div>
                    <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-xl text-center group hover:border-cyan-500/30 transition-colors">
                        <div className="w-16 h-16 bg-cyan-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-cyan-500 group-hover:scale-110 transition-transform">
                            <Zap size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">QoL Features</h3>
                        <p className="text-slate-500">Unlock conveniences like infinite run energy, instance timer extensions, and more.</p>
                    </div>
                    <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-xl text-center group hover:border-purple-500/30 transition-colors">
                        <div className="w-16 h-16 bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-500 group-hover:scale-110 transition-transform">
                            <Shield size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Cosmetics</h3>
                        <p className="text-slate-500">Customize your character with unique outfits, pets, and animations.</p>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-slate-900 to-black border border-slate-700 p-8 rounded-2xl text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-yellow-500/5 group-hover:bg-yellow-500/10 transition-colors"></div>
                    <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Ready to Upgrade?</h2>
                    <p className="text-slate-400 mb-8 relative z-10">Visit our secure store powered by TeamGames.</p>

                    <a
                        href="https://store.teamgames.io/ironveil"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-yellow-900/50 relative z-10"
                    >
                        <ShoppingCart size={24} />
                        <span>Visit Official Store</span>
                        <ExternalLink size={18} className="opacity-70" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Store;
