
import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { VOTE_SITES } from '../data/constants';

const Vote = () => {
    return (
        <div className="min-h-screen pt-32 pb-20 container mx-auto px-6 relative z-20 animate-in fade-in duration-500">
            <SectionTitle subtitle>Vote for Rewards</SectionTitle>
            <p className="text-slate-400 text-lg mb-12 max-w-2xl">
                Voting helps IronVeil grow. As a thank you, you'll receive a Vote Box and GP for every vote cast. (Resets every 12 hours)
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {VOTE_SITES.map((site) => (
                    <a
                        key={site.id}
                        href={site.url}
                        className="relative group overflow-hidden rounded-xl border border-slate-700 bg-slate-900/50 hover:border-cyan-500/50 transition-all hover:-translate-y-2"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${site.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                        <div className="p-6 relative z-10 flex flex-col h-full">
                            <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                                <span className="font-bold text-xl text-white">#{site.id}</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{site.name}</h3>
                            <p className="text-cyan-400 text-sm font-mono mb-6">{site.reward}</p>
                            <div className="mt-auto">
                                <span className="inline-block w-full py-3 text-center rounded bg-white/5 hover:bg-cyan-500 hover:text-white font-bold uppercase tracking-wider text-xs transition-colors">
                                    Vote Now
                                </span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Vote;
