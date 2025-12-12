
import React from 'react';
import { X, Activity, Crosshair, Skull, Maximize2, Zap, Clock } from 'lucide-react';

const LiveHUD = ({ isOpen, toggle, onOpenMap, data, uptimeMs, formatUptime }) => {

    return (
        <>
            {/* Click Outside Overlay */}
            {isOpen && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={toggle}></div>}

            <button onClick={toggle} className="fixed top-4 right-4 z-50 md:hidden bg-slate-800 text-white p-2 rounded-md border border-slate-600 shadow-lg">{isOpen ? <X size={24} /> : <Activity size={24} />}</button>
            <aside className={`fixed right-0 top-0 h-full w-80 bg-slate-950/95 border-l border-slate-800 backdrop-blur-md z-[60] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
                <div className="p-6 border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 relative">
                    <button onClick={toggle} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"><X size={20} /></button>
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xs font-bold text-cyan-500 uppercase tracking-[0.2em]">IronVeil Network</h3>
                        <span className="flex h-2 w-2 relative mr-6"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>
                    </div>
                    <div className="flex items-end justify-between">
                        <div><span className="block text-3xl font-mono text-white font-bold">{data.meta.playersOnline}</span><span className="text-xs text-slate-400">Players Online</span></div>
                        <div className="text-right"><div className="text-xs text-slate-500">Uptime</div><div className="text-xs text-slate-300 font-mono">{formatUptime(uptimeMs)}</div></div>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                    <div>
                        <div className="flex items-center gap-2 mb-3 text-red-500"><Crosshair size={16} /><h4 className="text-xs font-bold uppercase tracking-wider">Wilderness Hotspots</h4></div>
                        <button onClick={onOpenMap} className="w-full text-left bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-colors rounded-lg p-3 relative overflow-hidden group mb-3 h-32">
                            <img src="https://cdn.runescape.com/assets/img/external/oldschool/2024/newsposts/2024-09-25/osrs_world_map_sept24_2024.jpg" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" alt="Mini Map" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                            <div className="relative z-10 flex items-center justify-between h-full items-end pb-1"><span className="text-xs text-slate-300 font-mono group-hover:text-cyan-400 transition-colors bg-black/50 px-2 py-1 rounded">View Live Map</span><Maximize2 size={14} className="text-slate-500 group-hover:text-cyan-400" /></div>
                        </button>
                        <div className="space-y-2">
                            {data.hotspots.slice(0, 3).map((spot, i) => (
                                <div key={i} className="flex justify-between items-center text-sm p-2 bg-slate-900/50 rounded border border-slate-800/50">
                                    <span className="text-slate-300">{spot.region}</span><span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${spot.intensity === 'EXTREME' ? 'bg-red-950/50 border-red-900 text-red-500 animate-pulse' : 'bg-orange-950/50 border-orange-900 text-orange-500'}`}>{spot.intensity}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-3 text-purple-400"><Skull size={16} /><h4 className="text-xs font-bold uppercase tracking-wider">World Events</h4></div>
                        <div className="space-y-3">
                            {/* RENDER BOOSTS IF AVAILABLE */}
                            {data.boosts && data.boosts.map((boost, i) => (
                                <div key={`boost-${i}`} className="bg-slate-900 border border-slate-800 rounded p-3 relative overflow-hidden border-yellow-500/30">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-yellow-400 text-sm flex items-center gap-2"><Zap size={14} /> {boost.name}</span>
                                        <span className="text-xs font-mono text-slate-400">Active</span>
                                    </div>
                                </div>
                            ))}

                            {/* RENDER FILTERED EVENTS */}
                            {data.events.map((boss) => (
                                <div key={boss.id} className="bg-slate-900 border border-slate-800 rounded p-3 relative overflow-hidden">
                                    {boss.status === 'ALIVE' && (<div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-600 to-purple-600 transition-all duration-1000" style={{ width: `100%` }}></div>)}
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-slate-200 text-sm">{boss.name}</span>
                                        {boss.status === 'ALIVE' || boss.statusText === 'ALIVE' ? (
                                            <span className="text-xs font-mono text-green-400 animate-pulse">ACTIVE</span>
                                        ) : (
                                            <span className="text-xs font-mono text-yellow-500 flex items-center gap-1"><Clock size={10} /> {boss.status}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="p-4 border-t border-slate-800 bg-slate-950">
                    <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded shadow-[0_0_15px_rgba(8,145,178,0.5)] transition-all flex items-center justify-center gap-2 uppercase tracking-wide text-sm"><Zap size={16} fill="currentColor" /> Play Now</button>
                </div>
            </aside>
        </>
    );
};

export default LiveHUD;
