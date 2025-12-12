
import React from 'react';
import { Zap, Trophy, Newspaper, ChevronRight, Map as MapIcon, Users, Shield, CheckCircle2, Info } from 'lucide-react';
import InteractiveArmory from '../components/InteractiveArmory';
import LootBeamSimulator from '../components/LootBeamSimulator';
import SectionTitle from '../components/SectionTitle';

const FeatureItem = ({ icon: Icon, title, desc }) => (
    <div className="flex gap-4 p-4 rounded-lg hover:bg-slate-800/50 transition-colors">
        <div className="flex-shrink-0 w-12 h-12 rounded bg-cyan-900/20 flex items-center justify-center text-cyan-400">
            <Icon size={24} />
        </div>
        <div>
            <h4 className="text-white font-bold text-lg mb-1">{title}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
        </div>
    </div>
);

const Home = ({ collectionLogData, setLogOpen, setMapOpen, setSelectedPatchNote }) => {
    return (
        <>
            <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* RESTORED COMMUNITY SECTION - Overlapping Parallax */}
                <div className="absolute bottom-12 left-0 right-0 z-20 container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {[
                            { title: "Patch Notes v2.0", date: "Just Now", tag: "Update", icon: Zap },
                            { title: "Clan Cup: Finals", date: "Yesterday", tag: "Event", icon: Trophy },
                            { title: "Dev Blog: Raids 4", date: "Last Week", tag: "Blog", icon: Newspaper }
                        ].map((item, i) => (
                            <div
                                key={i}
                                onClick={() => setSelectedPatchNote(item)}
                                className="
                        bg-slate-900/40 backdrop-blur-md border border-slate-700/30 p-6 rounded-lg
                        hover:border-cyan-500/50 hover:bg-slate-900/60 transition-all duration-500 group cursor-pointer
                        shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-4
                        "
                                style={{ animation: `float ${4 + i}s ease-in-out infinite` }}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-slate-800/80 rounded-lg text-cyan-400 group-hover:scale-110 transition-transform shadow-inner">
                                        <item.icon size={24} />
                                    </div>
                                    <span className="text-xs font-mono text-slate-400 bg-black/30 px-2 py-1 rounded">{item.date}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-cyan-500 transition-colors">
                                    <span>Read More</span>
                                    <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 container mx-auto px-6 text-center pt-20 pb-32">
                    <span className="inline-block py-1 px-3 rounded-full bg-slate-800/80 border border-slate-700 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6 animate-bounce">Newly Released!</span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                        The Veil Has <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 animate-gradient-x">Lifted</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">Experience RuneScape like never before. A persistent, living world that connects directly to your browser.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-bold rounded hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]">Download Launcher</button>
                        <button onClick={() => setMapOpen(true)} className="w-full sm:w-auto px-8 py-4 bg-transparent border border-slate-600 text-white font-bold rounded hover:bg-slate-800 transition-all flex items-center justify-center gap-2"><MapIcon size={18} /> View World Map</button>
                    </div>
                </div>
            </header>

            {/* SMOOTH TRANSITION GRADIENT */}
            <div className="h-32 bg-gradient-to-b from-transparent to-slate-950 -mt-16 relative z-20 pointer-events-none"></div>

            {/* SECTION 1: FEATURES & ARMORY */}
            <section className="py-24 bg-slate-950 relative z-20">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <SectionTitle subtitle>The Portal System</SectionTitle>
                            <div className="space-y-6">
                                <FeatureItem icon={Users} title="Live Social Hub" desc="See where your clan is operating in real-time. Our WebSocket layer provides instant updates on Wilderness hotspots." />
                                <FeatureItem icon={Shield} title="Dynamic Armory" desc="Inspect any player, verify drops, and flex your gear. Syncs directly with the game server cache." />
                                <FeatureItem icon={MapIcon} title="Boss Telemetry" desc="Never miss a spawn. Track Galvek, Zulrah, and World Boss HP bars directly from your second monitor." />
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-[80px] opacity-20 transform rotate-12"></div>
                            <InteractiveArmory logData={collectionLogData} setLogOpen={setLogOpen} />
                            <div className="text-center mt-6 flex items-center justify-center gap-2 text-slate-500"><Info size={14} /><p className="text-sm font-mono">Hover items for detailed stats</p></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: LOOT BEAM SIMULATOR */}
            <section className="py-24 bg-[#0a0a0a] relative z-20 border-t border-slate-900">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_rgba(168,85,247,0.08),transparent_50%)]"></div>
                <div className="container mx-auto px-6 relative">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="order-2 md:order-1 relative">
                            <div className="absolute inset-0 bg-purple-500/20 blur-[100px] rounded-full"></div>
                            <LootBeamSimulator />
                        </div>
                        <div className="order-1 md:order-2">
                            <SectionTitle subtitle>Chasing The Beam</SectionTitle>
                            <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                                Nothing beats the dopamine rush of a purple light. On IronVeil, we've fine-tuned drop rates to be fair but rewarding.
                            </p>
                            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                                Test your luck right now. Our loot generation system is built on a transparent, true-random algorithm.
                                What you see here is exactly what you get in-game.
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-slate-300">
                                    <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center border border-purple-500/30 text-purple-400"><CheckCircle2 size={16} /></div>
                                    <span className="font-bold">Rare Drop Guarantee</span>
                                </li>
                                <li className="flex items-center gap-3 text-slate-300">
                                    <div className="w-8 h-8 rounded-full bg-yellow-900/30 flex items-center justify-center border border-yellow-500/30 text-yellow-400"><CheckCircle2 size={16} /></div>
                                    <span className="font-bold">Broadcasted Drops</span>
                                </li>
                                <li className="flex items-center gap-3 text-slate-300">
                                    <div className="w-8 h-8 rounded-full bg-cyan-900/30 flex items-center justify-center border border-cyan-500/30 text-cyan-400"><CheckCircle2 size={16} /></div>
                                    <span className="font-bold">Global Loot Tables</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
