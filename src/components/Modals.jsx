
import React, { useState, useEffect } from 'react';
import { X, Activity, BookOpen, Info, Users, Shield, Scroll, Gamepad2, Sword, Skull, Zap } from 'lucide-react';
import { STORE_ITEMS } from '../data/constants';
import { getItemImage } from '../data/armory';
import MapViewer from './MapViewer';


// Mapped icons for the API categories
const CATEGORY_ICONS = {
    BOSS: Skull,
    RAIDS: Sword,
    CLUES: Scroll,
    MINIGAMES: Gamepad2,
    OTHER: Info
};

export const CollectionLogModal = ({ isOpen, onClose, logData }) => {
    // logData is now { BOSS: { "Abyssal Sire": [{name:"..", id:1, ...}], ... }, ... }
    const categories = Object.keys(logData).sort();
    // Default to first category if available, else 'BOSS'
    const [activeCategory, setActiveCategory] = useState(categories[0] || 'BOSS');

    // Sub-category selection (e.g. 'Abyssal Sire')
    const subCategories = logData[activeCategory] ? Object.keys(logData[activeCategory]).sort() : [];
    const [activeSubCategory, setActiveSubCategory] = useState(subCategories[0] || '');

    // Reset sub-cat when category changes
    useEffect(() => {
        if (logData[activeCategory]) {
            const subs = Object.keys(logData[activeCategory]).sort();
            setActiveSubCategory(subs[0] || '');
        }
    }, [activeCategory, logData]);

    if (!isOpen) return null;

    // Empty State Handling
    if (categories.length === 0) {
        return (
            <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in zoom-in duration-200">
                <div className="w-full max-w-lg bg-[#3e3529] border-2 border-[#5d5245] rounded shadow-2xl p-8 text-center">
                    <BookOpen size={48} className="text-[#ff981f] mx-auto mb-4" />
                    <h3 className="text-[#ff981f] font-bold text-xl uppercase tracking-wider mb-2">Collection Log Unavailable</h3>
                    <p className="text-gray-400 mb-6">
                        The Collection Log structure has not been cached yet. <br />
                        Please run the Game Server <b>once</b> to download the latest data.
                    </p>
                    <button onClick={onClose} className="px-6 py-2 bg-[#ff981f] text-[#3e3529] font-bold rounded hover:bg-[#ffb04f] transition-colors">
                        Close
                    </button>
                </div>
            </div>
        );
    }

    const currentItems = (logData[activeCategory] && logData[activeCategory][activeSubCategory]) || [];
    // Since we don't have user login, 'obtained' is false for all, unless we mock it.
    // Let's just show the items. If we want to simulate obtained, we'd need local storage or random.
    // For now, assume all unobtained except maybe some defaults if we wanted.
    // But honestly, showing the greyed out items is the "Collection Log" look.
    const obtainedCount = 0;

    return (
        <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in zoom-in duration-200">
            <div className="w-full max-w-4xl bg-[#3e3529] border-2 border-[#5d5245] rounded shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
                <div className="bg-[#2d261e] p-3 border-b border-[#5d5245] flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <BookOpen size={20} className="text-[#ff981f]" />
                        <h3 className="text-[#ff981f] font-bold uppercase tracking-wider text-lg shadow-black drop-shadow-md">Collection Log</h3>
                    </div>
                    <button onClick={onClose} className="text-[#ff981f] hover:text-white transition-colors"><X size={20} /></button>
                </div>
                <div className="flex flex-1 overflow-hidden">
                    {/* Categories (Left) */}
                    <div className="w-32 bg-[#2d261e] border-r border-[#5d5245] flex flex-col overflow-y-auto">
                        {categories.map(cat => {
                            const Icon = CATEGORY_ICONS[cat] || Info;
                            return (
                                <button key={cat} onClick={() => setActiveCategory(cat)} className={`p-3 text-xs font-bold uppercase tracking-wider flex flex-col items-center gap-1 transition-colors border-b border-[#5d5245]/50 ${activeCategory === cat ? 'bg-[#3e3529] text-[#ff981f] border-l-4 border-l-[#ff981f]' : 'text-gray-500 hover:text-gray-300 hover:bg-[#362e24]'}`}>
                                    <Icon size={18} />{cat}
                                </button>
                            );
                        })}
                    </div>

                    {/* Sub-categories (Middle) */}
                    <div className="w-48 bg-[#362e24] border-r border-[#5d5245] flex flex-col overflow-y-auto">
                        {subCategories.map(sub => (
                            <button key={sub} onClick={() => setActiveSubCategory(sub)} className={`p-2 text-xs text-left font-medium transition-colors border-b border-[#5d5245]/30 ${activeSubCategory === sub ? 'bg-[#ff981f]/20 text-[#ff981f]' : 'text-gray-400 hover:text-gray-200 hover:bg-[#3e3529]'}`}>
                                {sub}
                            </button>
                        ))}
                    </div>

                    {/* Items (Right) */}
                    <div className="flex-1 bg-[#1e1e1e] p-4 overflow-y-auto">
                        <h4 className="text-gray-400 text-xs uppercase mb-4 font-bold border-b border-gray-700 pb-2 flex justify-between">
                            <span>{activeSubCategory} Drops</span>
                            <span className="text-[#ff981f]">{obtainedCount}/{currentItems.length}</span>
                        </h4>
                        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                            {currentItems.map((item, i) => (
                                <div key={i} className={`group relative flex flex-col items-center p-2 rounded border transition-colors ${true ? 'bg-[#3e3529]/50 border-green-900/50 hover:bg-[#3e3529]' : 'bg-black/30 border-transparent opacity-50'}`}>
                                    <img src={getItemImage(item.name)} alt={item.name} className={`w-8 h-8 object-contain mb-1`} onError={(e) => { e.target.style.display = 'none' }} />
                                    <span className={`text-[9px] text-center leading-tight line-clamp-2 text-gray-600`}>{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const WorldMapOverlay = ({ isOpen, onClose, hotspots }) => {
    const [activeSpot, setActiveSpot] = useState(null);

    useEffect(() => { if (!isOpen) setActiveSpot(null); }, [isOpen]);

    // Handle ESC key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
            {/* Close Button - Moved outside for better z-axis control */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 z-[110] bg-red-600 hover:bg-red-500 text-white p-2 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all transform hover:scale-110"
                title="Close Map (ESC)"
            >
                <X size={24} />
            </button>

            <div className="relative w-full max-w-7xl h-[90vh] bg-[#1a1a1a] border border-slate-800 rounded-lg overflow-hidden flex shadow-2xl">
                <div className="w-80 bg-[#0f0f0f] border-r border-slate-800 flex flex-col z-20">
                    <div className="p-4 border-b border-slate-800 bg-[#151515]">
                        <h3 className="text-white font-bold flex items-center gap-2">
                            <Activity className="text-cyan-500" />
                            Live Hotspots
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">Real-time PvP & Event tracking</p>
                    </div>

                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        {hotspots.map(spot => (
                            <button
                                key={spot.id}
                                onClick={() => setActiveSpot(spot)}
                                className={`
                    w-full text-left p-3 rounded-md border transition-all duration-200 group
                    ${activeSpot?.id === spot.id
                                        ? 'bg-cyan-950/30 border-cyan-500/50'
                                        : 'bg-[#1a1a1a] border-slate-800 hover:border-slate-600'}
                  `}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`font-bold text-sm ${activeSpot?.id === spot.id ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                                        {spot.region}
                                    </span>
                                    <span className={`
                      text-[10px] px-1.5 py-0.5 rounded font-bold
                      ${spot.intensity === 'EXTREME' ? 'bg-red-900/50 text-red-500' :
                                            spot.intensity === 'HIGH' ? 'bg-orange-900/50 text-orange-500' :
                                                'bg-green-900/50 text-green-500'}
                    `}>
                                        {spot.intensity}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 flex flex-col relative">
                    <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-30 pointer-events-none">
                        {/* Top bar cleared */}
                    </div>

                    <MapViewer
                        hotspots={hotspots}
                        activeLocation={activeSpot}
                        onLocationSelect={setActiveSpot}
                    />
                </div>
            </div>
        </div>
    );
};

export const StoreModal = ({ isOpen, onClose }) => {

    const [activeTab, setActiveTab] = useState('cosmetics');
    const [selectedItem, setSelectedItem] = useState(null);
    const [cartCount, setCartCount] = useState(0);

    const categories = [
        { id: 'cosmetics', label: 'Cosmetics', icon: Shield, color: 'text-cyan-400', border: 'border-cyan-500/30' },
        { id: 'pets', label: 'Pets', icon: Scroll, color: 'text-green-400', border: 'border-green-500/30' },
        { id: 'services', label: 'Services', icon: Users, color: 'text-purple-400', border: 'border-purple-500/30' },
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="fixed inset-0" onClick={onClose}></div>

            {/* MAIN STORE CONTAINER */}
            <div className="relative w-full max-w-6xl bg-[#1e1e1e] border border-slate-700/50 rounded-lg shadow-2xl overflow-hidden flex flex-col h-[85vh]">

                {/* Header */}
                <div className="p-6 border-b border-white/5 bg-[#1a1a1a] flex justify-between items-center z-10 shrink-0">
                    <div className="flex items-center gap-4">
                        <img src="./logo_iv_final.png" className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" />
                        <div>
                            <h2 className="text-2xl font-serif font-bold text-white tracking-widest">STORE</h2>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">No P2W. Just Style.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-black/40 rounded border border-white/5">
                            <span className="text-xs font-bold text-slate-400 uppercase">Cart</span>
                            <span className="text-orange-400 font-mono font-bold">{cartCount}</span>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white"><X size={24} /></button>
                    </div>
                </div>

                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar Categories */}
                    <div className="w-64 bg-[#161616] border-r border-white/5 p-4 space-y-2 overflow-y-auto hidden md:block">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-all ${activeTab === cat.id ? `bg-white/5 border ${cat.border} shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]` : 'hover:bg-white/5 border border-transparent'}`}
                            >
                                <cat.icon size={20} className={activeTab === cat.id ? cat.color : 'text-slate-500'} />
                                <span className={`font-bold ${activeTab === cat.id ? 'text-white' : 'text-slate-400'}`}>{cat.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Item Grid */}
                    <div className="flex-1 overflow-y-auto p-8 bg-[#121212] relative">
                        <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/5 pb-4 uppercase tracking-wider">{activeTab}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {STORE_ITEMS[activeTab]?.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => setSelectedItem(item)}
                                    className="bg-[#1a1a1a] border border-slate-800 rounded-xl p-4 hover:border-orange-500/50 transition-all cursor-pointer group hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                                >
                                    <div className="aspect-square bg-gradient-to-br from-black/60 to-black/20 rounded-lg mb-4 flex items-center justify-center p-6 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <img src={item.img} className="w-full h-full object-contain drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                    <div className="text-white font-bold text-sm mb-1 truncate">{item.name}</div>
                                    <div className="text-orange-400 text-xs font-bold font-mono">{item.price} Credits</div>
                                    <button className="w-full mt-4 bg-slate-800 hover:bg-orange-600 text-white text-[10px] font-bold py-2 rounded transition-colors uppercase tracking-widest">
                                        View Details
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ITEM DETAIL POPUP (Child Modal) */}
            {selectedItem && (
                <div className="absolute inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
                    <div className="absolute inset-0" onClick={() => setSelectedItem(null)}></div>
                    <div className="relative bg-[#1a1a1a] border border-orange-500/40 w-full max-w-lg rounded-xl shadow-2xl p-8 flex flex-col items-center text-center">
                        <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={24} /></button>

                        <div className="w-32 h-32 bg-black/40 rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-[inner_0_0_20px_rgba(0,0,0,0.8)]">
                            <img src={selectedItem.img} className="w-20 h-20 object-contain drop-shadow-[0_0_15px_rgba(255,165,0,0.3)]" />
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2">{selectedItem.name}</h3>
                        <p className="text-orange-400 font-mono font-bold text-lg mb-6">{selectedItem.price} Credits</p>

                        <div className="bg-black/30 p-4 rounded-lg w-full mb-8 text-sm text-slate-300 border border-white/5">
                            {selectedItem.desc}
                        </div>

                        <button
                            onClick={() => { setCartCount(c => c + 1); setSelectedItem(null); }}
                            className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(234,88,12,0.4)] uppercase tracking-wider flex items-center justify-center gap-2"
                        >
                            <Zap size={18} fill="currentColor" /> Add to Cart
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export const PatchNoteModal = ({ item, onClose }) => {
    if (!item) return null;
    return (
        <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="fixed inset-0" onClick={onClose}></div>
            <div className="relative bg-[#1a1a1a] border border-cyan-500/30 w-full max-w-2xl rounded-xl shadow-2xl p-8 flex flex-col max-h-[80vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={24} /></button>

                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-cyan-950/30 rounded-lg text-cyan-400 border border-cyan-500/20">
                        <item.icon size={32} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-white">{item.title}</h2>
                        <span className="text-slate-400 text-sm font-mono bg-black/30 px-2 py-1 rounded inline-block mt-1">{item.date} • {item.tag}</span>
                    </div>
                </div>

                <div className="prose prose-invert prose-cyan max-w-none">
                    <p className="text-lg text-slate-300 leading-relaxed mb-4">
                        We are excited to announce the release of <strong>{item.title}</strong>! This update brings significant changes to the world of IronVeil.
                    </p>
                    <h3 className="text-xl font-bold text-white mb-2">Key Highlights</h3>
                    <ul className="list-disc list-inside text-slate-400 space-y-2 mb-4">
                        <li>New mechanics added to the core gameplay loop.</li>
                        <li>Balance adjustments for end-game PvM content.</li>
                        <li>Visual improvements to major cities and hubs.</li>
                        <li>Fixed various bugs reported by the community.</li>
                    </ul>
                    <p className="text-slate-500 text-sm italic border-l-2 border-cyan-800 pl-4 py-2 bg-black/20">
                        "The Void watches... and it is pleased with the progress." - Lead Developer
                    </p>
                </div>

                <button onClick={onClose} className="mt-8 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-lg transition-colors">
                    Close
                </button>
            </div>
        </div>
    );
};
export const RulesModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const rules = [
        { title: "Respect & Harassment", desc: "No racism, homophobia, heavy toxicity, or real-life threats." },
        { title: "Macroing & Botting", desc: "All third-party software that automates gameplay is strictly prohibited." },
        { title: "Real World Trading", desc: "Buying or selling in-game wealth for real currency is a bannable offense." },
        { title: "Bug Abuse", desc: "Knowingly exploiting bugs for gain will result in a ban. Report them immediately." },
        { title: "Scamming", desc: "Deceiving players for financial gain is not tolerated. Trust trades are at your own risk." },
        { title: "Staff Impersonation", desc: "Do not pretend to be IronVeil staff. Mod accounts always have a crown icon." },
    ];

    return (
        <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="fixed inset-0" onClick={onClose}></div>
            <div className="relative bg-[#1a1a1a] border border-red-500/30 w-full max-w-2xl rounded-xl shadow-2xl p-8 flex flex-col max-h-[80vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={24} /></button>

                <div className="flex items-center gap-3 mb-8 border-b border-red-900/40 pb-6">
                    <div className="p-3 bg-red-950/30 rounded-lg text-red-500 border border-red-500/20">
                        <Shield size={32} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-white uppercase tracking-wider">Server Rules</h2>
                        <p className="text-slate-400 text-sm">Failure to comply will result in account suspension.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {rules.map((rule, i) => (
                        <div key={i} className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg flex gap-4 hover:border-red-500/30 transition-colors">
                            <span className="font-mono font-bold text-red-500/50 text-xl">#{i + 1}</span>
                            <div>
                                <h3 className="text-white font-bold mb-1">{rule.title}</h3>
                                <p className="text-slate-400 text-sm">{rule.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                    <button onClick={onClose} className="px-8 py-3 bg-red-900/20 hover:bg-red-900/40 text-red-500 font-bold rounded-lg border border-red-500/20 transition-all uppercase tracking-widest text-xs">
                        I Understand
                    </button>
                </div>
            </div>
        </div>
    );
};
