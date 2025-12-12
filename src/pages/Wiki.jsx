
import React, { useState } from 'react';
import { Scroll, Terminal, Map as MapIcon, HelpCircle, Sword, ChevronRight, Crown } from 'lucide-react';
import { WIKI_TABS, GEAR_PROGRESSION, SKILLING_HOTSPOTS, CUSTOM_CONTENT } from '../data/wikiData';

const Wiki = () => {
    const [activeTab, setActiveTab] = useState('general');

    return (
        <div className="pt-24 pb-12 container mx-auto px-6 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">IronVeil <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Wiki</span></h1>
                    <p className="text-slate-400 text-lg">Your essential guide to surviving the void.</p>
                </div>

                {/* Navigation Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {WIKI_TABS.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg border transition-all duration-300 ${isActive
                                    ? 'bg-cyan-950/50 border-cyan-500 text-cyan-400 shadow-[0_0_20px_rgba(8,145,178,0.2)]'
                                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                                    }`}
                            >
                                <Icon size={18} />
                                <span className="font-bold uppercase tracking-wider text-sm">{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* === GENERAL GUIDE === */}
                    {activeTab === 'general' && (
                        <div className="space-y-8 max-w-4xl mx-auto">
                            {/* Getting Started */}
                            <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-xl p-8 shadow-xl">
                                <div className="flex items-center gap-4 mb-6 border-b border-slate-800 pb-4">
                                    <div className="p-3 bg-cyan-900/20 rounded-lg text-cyan-400"><Scroll size={28} /></div>
                                    <h2 className="text-3xl font-bold text-white">Getting Started</h2>
                                </div>
                                <div className="space-y-4 text-slate-300 leading-relaxed text-lg">
                                    <p>Welcome to IronVeil. Your journey begins at <strong className="text-white">Edgeville</strong>, the central hub for all activities.</p>
                                    <ul className="list-disc pl-6 space-y-3">
                                        <li><strong className="text-cyan-400">Custom XP Rates:</strong> Select up to 100x XP rates or choose 1x for maximum drop rate bonuses!</li>
                                        <li><strong className="text-cyan-400">Starter Pack:</strong> Begin your journey with a combat starter pack.</li>
                                        <li><strong className="text-cyan-400">Ironman Modes:</strong> Full Group Ironman support with shared banks and storage.</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Commands */}
                            <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-xl p-8 shadow-xl">
                                <div className="flex items-center gap-4 mb-6 border-b border-slate-800 pb-4">
                                    <div className="p-3 bg-purple-900/20 rounded-lg text-purple-400"><Terminal size={28} /></div>
                                    <h2 className="text-3xl font-bold text-white">Useful Commands</h2>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {[
                                        { cmd: "::home", desc: "Teleport to Edgeville home area" },
                                        { cmd: "::shops", desc: "Teleport to the shopping district" },
                                        { cmd: "::train", desc: "Teleport to Rock Crabs/Sand Crabs" },
                                        { cmd: "::wildy", desc: "Teleport to Wilderness selection interface" },
                                        { cmd: "::vote", desc: "Open the voting page" },
                                        { cmd: "::store", desc: "Open the donation store" },
                                        { cmd: "::discord", desc: "Join our community Discord" },
                                        { cmd: "::max", desc: "Show a max hit dummy" },
                                    ].map((c, i) => (
                                        <div key={i} className="flex items-center justify-between bg-black/40 p-4 rounded border border-slate-800 hover:border-slate-600 transition-colors">
                                            <code className="text-cyan-400 font-mono font-bold text-lg">{c.cmd}</code>
                                            <span className="text-slate-400 text-sm">{c.desc}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Locations */}
                            <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-xl p-8 shadow-xl">
                                <div className="flex items-center gap-4 mb-6 border-b border-slate-800 pb-4">
                                    <div className="p-3 bg-orange-900/20 rounded-lg text-orange-400"><MapIcon size={28} /></div>
                                    <h2 className="text-3xl font-bold text-white">Key Locations</h2>
                                </div>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="bg-black/20 p-6 rounded border border-slate-800 hover:bg-slate-800/50 transition-colors">
                                        <h3 className="text-white font-bold mb-2 text-xl">Home (Edgeville)</h3>
                                        <p className="text-slate-400">Banks, shops, ornate pool, and portal nexus.</p>
                                    </div>
                                    <div className="bg-black/20 p-6 rounded border border-slate-800 hover:bg-slate-800/50 transition-colors">
                                        <h3 className="text-white font-bold mb-2 text-xl">Revenant Caves</h3>
                                        <p className="text-slate-400">High-risk wilderness PvP area with boosted loot.</p>
                                    </div>
                                    <div className="bg-black/20 p-6 rounded border border-slate-800 hover:bg-slate-800/50 transition-colors">
                                        <h3 className="text-white font-bold mb-2 text-xl">Chambers of Xeric</h3>
                                        <p className="text-slate-400">Raid dungeon located at Mount Quidamortem.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* === CUSTOM CONTENT === */}
                    {activeTab === 'custom' && (
                        <div className="grid md:grid-cols-1 gap-6 max-w-4xl mx-auto">
                            {CUSTOM_CONTENT.map((item, idx) => (
                                <div key={idx} className={`bg-slate-900/80 backdrop-blur border ${item.border} rounded-xl p-8 shadow-xl hover:-translate-y-1 transition-transform duration-300`}>
                                    <div className="flex justify-between items-start mb-4">
                                        <h2 className={`text-3xl font-bold ${item.color}`}>{item.title}</h2>
                                        <span className="px-3 py-1 bg-slate-950 rounded text-xs font-bold uppercase tracking-widest text-slate-400 border border-slate-800">
                                            {item.difficulty}
                                        </span>
                                    </div>
                                    <p className="text-slate-300 text-lg leading-relaxed mb-6">{item.desc}</p>
                                    <div>
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Key Rewards</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {item.rewards.map((reward, rIdx) => (
                                                <span key={rIdx} className="px-3 py-1 bg-cyan-900/20 text-cyan-400 rounded-full text-xs font-bold border border-cyan-500/20">
                                                    {reward}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}


                    {/* === GEAR PROGRESSION === */}
                    {activeTab === 'gear' && (
                        <div className="grid lg:grid-cols-3 gap-8">
                            {Object.entries(GEAR_PROGRESSION).map(([style, data]) => {
                                const StyleIcon = data.icon;
                                return (
                                    <div key={style} className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-xl overflow-hidden flex flex-col">
                                        <div className="p-6 border-b border-slate-800 bg-black/20 flex items-center gap-3">
                                            {typeof StyleIcon === 'string' ? (
                                                <img src={StyleIcon} alt={style} className="w-6 h-6 object-contain" />
                                            ) : (
                                                <StyleIcon className={data.color} size={24} />
                                            )}
                                            <h2 className="text-2xl font-bold text-white uppercase tracking-wider">{style}</h2>
                                        </div>
                                        <div className="p-6 space-y-8 flex-1">
                                            {data.tiers.map((tier, idx) => (
                                                <div key={tier.name} className="relative pl-6 border-l-2 border-slate-800">
                                                    <span className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-slate-900 ${idx === 0 ? 'bg-green-500' : idx === 1 ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                                                    <h3 className="text-lg font-bold text-white mb-1 leading-none">{tier.name}</h3>
                                                    <p className="text-xs text-slate-500 mb-4">{tier.desc}</p>
                                                    <div className="space-y-2">
                                                        {tier.items.map(item => (
                                                            <div key={item.name} className="bg-black/40 p-2 rounded flex justify-between items-center text-sm group hover:bg-white/5 transition-colors cursor-default">
                                                                <span className="text-slate-300 font-medium group-hover:text-white transition-colors">{item.name}</span>
                                                                <span className="text-[10px] text-slate-500 uppercase tracking-wide bg-slate-900/50 px-1.5 py-0.5 rounded">{item.source}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}


                    {/* === SKILLING HOTSPOTS === */}
                    {activeTab === 'skilling' && (
                        <div className="grid md:grid-cols-2 gap-8">
                            {SKILLING_HOTSPOTS.map((skill) => {
                                const Icon = skill.icon;
                                return (
                                    <div key={skill.skill} className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-xl overflow-hidden">
                                        <div className="p-6 border-b border-slate-800 bg-black/20 flex items-center gap-3">
                                            <div className={`p-2 rounded bg-slate-900 ${skill.color}`}>
                                                <Icon size={24} />
                                            </div>
                                            <h2 className="text-2xl font-bold text-white">{skill.skill}</h2>
                                        </div>
                                        <div className="p-6 grid gap-4">
                                            {skill.locations.map((loc, i) => (
                                                <div key={i} className="bg-black/30 p-4 rounded-lg border border-slate-800/50 hover:border-cyan-500/30 transition-all group">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{loc.name}</h3>
                                                        <span className="text-xs font-mono font-bold text-yellow-500 bg-yellow-900/20 px-2 py-1 rounded border border-yellow-500/20">
                                                            Req: {loc.requirements}
                                                        </span>
                                                    </div>
                                                    <p className="text-slate-400 text-sm leading-relaxed">{loc.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Wiki;
