
import React, { useState } from 'react';
import { Activity, Crosshair } from 'lucide-react';
import { getItemImage } from '../data/armory';

const LootBeamSimulator = () => {
    const [loot, setLoot] = useState(null);
    const [isRolling, setIsRolling] = useState(false);

    const POSSIBLE_LOOT = [
        { name: "Twisted bow", rarity: "LEGENDARY", color: "text-[#d19c1d]", beamColor: "from-[#d19c1d]", bgGlow: "shadow-[0_0_100px_#d19c1d]" },
        { name: "Scythe of vitur", rarity: "LEGENDARY", color: "text-[#d19c1d]", beamColor: "from-[#d19c1d]", bgGlow: "shadow-[0_0_100px_#d19c1d]" },
        { name: "Tumeken's shadow", rarity: "LEGENDARY", color: "text-[#d19c1d]", beamColor: "from-[#d19c1d]", bgGlow: "shadow-[0_0_100px_#d19c1d]" },
        { name: "Kodai insignia", rarity: "RARE", color: "text-[#a322bd]", beamColor: "from-[#a322bd]", bgGlow: "shadow-[0_0_80px_#a322bd]" },
        { name: "Dexterous prayer scroll", rarity: "RARE", color: "text-[#a322bd]", beamColor: "from-[#a322bd]", bgGlow: "shadow-[0_0_80px_#a322bd]" },
        { name: "Arcane prayer scroll", rarity: "RARE", color: "text-[#a322bd]", beamColor: "from-[#a322bd]", bgGlow: "shadow-[0_0_80px_#a322bd]" },
        { name: "Rune platebody", rarity: "COMMON", color: "text-slate-300", beamColor: "from-white", bgGlow: "shadow-[0_0_50px_white]" },
        { name: "Coal", rarity: "COMMON", color: "text-slate-300", beamColor: "from-slate-400", bgGlow: "shadow-[0_0_20px_gray]" },
    ];

    const rollLoot = () => {
        if (isRolling) return;
        setIsRolling(true);
        setLoot(null);

        // Play sound effect here if we had one

        setTimeout(() => {
            const randomItem = POSSIBLE_LOOT[Math.floor(Math.random() * POSSIBLE_LOOT.length)];
            setLoot(randomItem);
            setIsRolling(false);
        }, 800);
    };

    return (
        <div className="relative w-full max-w-md mx-auto aspect-[4/5] bg-slate-900 border border-slate-700 rounded-xl overflow-hidden flex flex-col items-center justify-end p-8 shadow-2xl group">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[url('https://oldschool.runescape.wiki/images/Chambers_of_Xeric.png')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-1000"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/60"></div>

            {/* Dynamic Light Source from Top */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>

            {/* Loot Beam & Item Display */}
            <div className="relative flex-1 w-full flex items-center justify-center mb-12">
                {loot ? (
                    <div className="relative flex flex-col items-center justify-end h-64 w-full">

                        {/* The Beam */}
                        <div className={`absolute bottom-0 w-24 h-[150%] bg-gradient-to-t ${loot.beamColor} to-transparent opacity-60 blur-xl animate-beam-rise`}></div>
                        <div className={`absolute bottom-0 w-8 h-[150%] bg-gradient-to-t ${loot.beamColor} to-transparent opacity-90 animate-beam-rise box-decoration-clone`}></div>


                        {/* Ground Glow */}
                        <div className={`absolute -bottom-8 w-48 h-12 bg-white/20 blur-xl rounded-[100%] ${loot.bgGlow}`}></div>

                        {/* The Item */}
                        <div className="animate-item-pop z-20 flex flex-col items-center gap-4">
                            <img
                                src={getItemImage(loot.name)}
                                className="w-24 h-24 object-contain drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] filter brightness-110"
                                alt={loot.name}
                            />
                            <div className="bg-black/80 backdrop-blur border border-white/10 px-4 py-2 rounded-lg text-center transform translate-y-4">
                                <div className={`text-lg font-bold font-serif uppercase tracking-wider ${loot.color}`}>{loot.name}</div>
                                <div className="text-[10px] text-slate-400 font-mono">{loot.rarity} DROP</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center opacity-50 h-full">
                        <div className="w-32 h-32 border-4 border-slate-700 border-dashed rounded-full flex items-center justify-center mb-4">
                            <span className="text-4xl">?</span>
                        </div>
                        <p className="text-slate-500 font-mono text-xs uppercase tracking-widest animate-pulse">Waiting for Loot...</p>
                    </div>
                )}
            </div>

            {/* Controls */}
            <button
                onClick={rollLoot}
                disabled={isRolling}
                className={`
                    relative z-20 w-full py-4 text-white font-bold uppercase tracking-[0.2em] text-sm
                    bg-gradient-to-r from-purple-900 to-cyan-900 
                    border border-white/10 rounded-lg shadow-lg overflow-hidden
                    hover:shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all
                    ${isRolling ? 'cursor-not-allowed opacity-80' : ''}
                `}
            >
                <div className="absolute inset-0 bg-white/10 translate-y-full hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative flex items-center justify-center gap-3">
                    {isRolling ? <Activity className="animate-spin" size={18} /> : <Crosshair size={18} />}
                    {isRolling ? "Rolling..." : "Simulate Drop"}
                </span>
            </button>
        </div>
    );
};

export default LootBeamSimulator;
