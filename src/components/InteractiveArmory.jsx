
import React, { useState } from 'react';
import { ChevronRight, BookOpen } from 'lucide-react';
import { ARMORY_DATA, getItemImage } from '../data/armory';

const InteractiveArmory = ({ logData, setLogOpen }) => {
    const [currentProfileId, setCurrentProfileId] = useState('MELEE');
    const p = ARMORY_DATA[currentProfileId];
    const [activeItem, setActiveItem] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const equipmentOrder = [null, 'head', null, 'cape', 'neck', 'ammo', 'weapon', 'body', 'shield', null, 'legs', null, 'hands', 'feet', 'ring'];

    return (
        <div className="bg-slate-900/50 backdrop-blur border border-slate-700 p-6 rounded-xl max-w-lg w-full mx-auto relative group">
            <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                    <div className="relative mb-2">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-2 text-2xl font-serif text-white font-bold hover:text-cyan-400 transition-colors"
                        >
                            {p.label} <ChevronRight className={`transition-transform ${dropdownOpen ? 'rotate-90' : ''}`} size={20} />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute top-full left-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded shadow-xl overflow-hidden z-[60]">
                                {Object.values(ARMORY_DATA).map((profile) => (
                                    <button
                                        key={profile.id}
                                        onClick={() => {
                                            setCurrentProfileId(profile.id.toUpperCase());
                                            setDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-sm font-bold hover:bg-slate-800 transition-colors ${currentProfileId === profile.id.toUpperCase() ? 'text-cyan-400 bg-slate-800' : 'text-slate-400'}`}
                                    >
                                        {profile.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="text-sm text-slate-400 flex items-center gap-2">
                        <span className="text-white font-bold">{p.username}</span>
                        <span className="text-slate-600">|</span>
                        <span>{p.description}</span>
                    </div>
                </div>
                <div className="px-3 py-1 bg-slate-800 border border-slate-600 rounded-full text-xs text-slate-300 uppercase tracking-wider font-bold">{p.rank}</div>
            </div>

            <div className="relative min-h-[340px] mx-auto bg-slate-950 rounded-lg border border-slate-800 shadow-inner p-6 mb-8">
                <div className="grid grid-cols-3 grid-rows-5 gap-3 h-full w-full">
                    {equipmentOrder.map((slot, i) => {
                        const item = slot && p.equipment[slot];
                        const isActive = activeItem === item?.id;
                        return (
                            <div key={i} className={`relative rounded bg-slate-900/50 border border-slate-800 flex items-center justify-center min-h-[50px] aspect-square ${!slot ? 'invisible' : 'cursor-pointer'} transition-all duration-200 ${isActive ? 'border-yellow-500 bg-slate-800 ring-2 ring-yellow-500/30 z-20' : 'hover:border-slate-500 hover:bg-slate-800'}`} onMouseEnter={() => item && setActiveItem(item.id)} onMouseLeave={() => setActiveItem(null)} onClick={() => item && setActiveItem(isActive ? null : item.id)}>
                                {item ? (
                                    <>
                                        <img src={getItemImage(item.name)} alt={item.name} className="w-8 h-8 object-contain relative z-10" onError={(e) => { e.target.style.display = 'none'; }} />
                                        {isActive && (
                                            <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-48 z-50 pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-200">
                                                <div className="bg-[#3e3529] border-2 border-[#5d5245] p-1 shadow-2xl rounded-sm">
                                                    <div className="bg-[#1e1e1e] border border-[#5d5245] p-2 text-center">
                                                        <div className="text-orange-400 font-bold text-sm mb-1">{item.name}</div>
                                                        <div className="h-px bg-slate-600 w-full mb-1"></div>
                                                        <div className="text-[10px] text-cyan-200 mb-1">{item.stats}</div>
                                                    </div>
                                                </div>
                                                <div className="w-2 h-2 bg-[#5d5245] rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                                            </div>
                                        )}
                                    </>
                                ) : (slot && <div className="w-2 h-2 rounded-full bg-slate-800 opacity-50"></div>)}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="text-center">
                <button onClick={() => setLogOpen(true)} className="relative overflow-hidden group w-full py-3 px-6 rounded-md bg-gradient-to-r from-[#3e3529] to-[#2d261e] border border-[#ff981f]/30 hover:border-[#ff981f] text-[#ff981f] font-serif uppercase tracking-widest font-bold text-sm shadow-[0_4px_10px_rgba(0,0,0,0.5)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,152,31,0.2)] flex items-center justify-center gap-3">
                    <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <BookOpen size={18} /><span>Open Collection Log</span><ChevronRight size={16} className="group-hover:translate-x-1 transition-transform text-[#ff981f]" />
                </button>
            </div>
        </div>
    );
};

export default InteractiveArmory;
