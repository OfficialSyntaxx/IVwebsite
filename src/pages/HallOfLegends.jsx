import React, { useState, useEffect } from 'react';
import { Trophy, Sword, Hammer, Skull, Crown, Medal, ExternalLink } from 'lucide-react';

const MOCK_LEGENDS = {
    pvp: {
        title: "Warlord of the Wilderness",
        player: "PKSkullCrusher",
        subtext: "Most Kills (Wilderness)",
        stat: "14,203 Kills",
        avatar: "https://oldschool.runescape.wiki/images/thumb/Dharok_the_Wretched.png/150px-Dharok_the_Wretched.png?260d3",
        color: "red",
        icon: <Sword size={32} strokeWidth={1.5} />
    },
    skilling: {
        title: "Grandmaster Artisan",
        player: "MaxCapeSpeed",
        subtext: "First to Max All Skills",
        stat: "200M XP (All)",
        avatar: "https://oldschool.runescape.wiki/images/thumb/Wise_Old_Man.png/130px-Wise_Old_Man.png?12345",
        color: "blue",
        icon: <Hammer size={32} strokeWidth={1.5} />
    },
    pvm: {
        title: "Slayer of Gods",
        player: "WooxWannabe",
        subtext: "Most Boss Logs Completed",
        stat: "52/55 Logs",
        avatar: "https://oldschool.runescape.wiki/images/thumb/Nieve.png/110px-Nieve.png?56789",
        color: "purple",
        icon: <Skull size={32} strokeWidth={1.5} />
    }
};

const MOCK_LEADERBOARDS = {
    pvp: [
        { rank: 1, name: "PKSkullCrusher", score: "14,203", label: "Kills" },
        { rank: 2, name: "Vengeance4Life", score: "12,900", label: "Kills" },
        { rank: 3, name: "SitRat", score: "11,550", label: "Kills" },
        { rank: 4, name: "IceBarrageGoBrr", score: "10,120", label: "Kills" },
        { rank: 5, name: "TeleBlocker", score: "9,800", label: "Kills" },
    ],
    xp: [
        { rank: 1, name: "MaxCapeSpeed", score: "4,600M", label: "Total XP" },
        { rank: 2, name: "200mAll", score: "4,250M", label: "Total XP" },
        { rank: 3, name: "SkillerPure", score: "3,800M", label: "Total XP" },
        { rank: 4, name: "IronMeme", score: "3,100M", label: "Total XP" },
        { rank: 5, name: "Fisherman", score: "2,950M", label: "Total XP" },
    ],
    boss: [
        { rank: 1, name: "WooxWannabe", score: "0:42", label: "Inferno Time" },
        { rank: 2, name: "PvM_Master", score: "0:45", label: "Inferno Time" },
        { rank: 3, name: "ZukKiller", score: "0:48", label: "Inferno Time" },
        { rank: 4, name: "JadSkipper", score: "0:51", label: "Inferno Time" },
        { rank: 5, name: "Tztok-Chad", score: "0:55", label: "Inferno Time" },
    ]
};

const LegendCard = ({ data, onProfileClick }) => {
    const colorClasses = {
        red: "from-red-600/20 to-orange-900/20 border-red-500/30 hover:border-red-500",
        blue: "from-blue-600/20 to-cyan-900/20 border-blue-500/30 hover:border-blue-500",
        purple: "from-purple-600/20 to-pink-900/20 border-purple-500/30 hover:border-purple-500"
    };

    const textColors = {
        red: "text-red-400",
        blue: "text-blue-400",
        purple: "text-purple-400"
    };

    return (
        <div className={`relative group overflow-hidden rounded-2xl border ${colorClasses[data.color]} bg-gradient-to-br transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] p-0 flex flex-col items-center text-center`}>

            {/* Background Glow */}
            <div className={`absolute top-0 w-full h-32 bg-gradient-to-b ${data.color === 'red' ? 'from-red-900/50' : data.color === 'blue' ? 'from-blue-900/50' : 'from-purple-900/50'} to-transparent opacity-50`}></div>

            {/* Crown Icon */}
            <div className={`mt-8 mb-4 relative z-10 p-4 rounded-full bg-slate-950 border border-slate-800 shadow-xl ${textColors[data.color]}`}>
                {data.icon || <Crown size={32} strokeWidth={1.5} />}
            </div>

            {/* Character Avatar */}
            <div className="relative z-10 w-32 h-40 mb-4 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform group-hover:scale-110 transition-transform duration-500">
                <img src={data.avatar} alt={data.player} className="w-full h-full object-contain" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full bg-slate-950/80 backdrop-blur-sm p-6 border-t border-slate-800 flex-grow flex flex-col justify-between">
                <div>
                    <h3 className={`font-serif text-3xl font-bold text-white mb-1`}>{data.player}</h3>
                    <p className={`text-xs font-bold uppercase tracking-widest ${textColors[data.color]} mb-4`}>{data.title}</p>

                    <div className="w-12 h-0.5 bg-slate-800 mx-auto mb-4 group-hover:w-24 transition-all duration-500"></div>

                    <div className="space-y-1">
                        <p className="text-slate-400 text-sm">{data.subtext}</p>
                        <p className="text-xl font-mono font-bold text-white">{data.stat}</p>
                    </div>
                </div>

                <button
                    onClick={() => onProfileClick(data.player)}
                    className={`mt-6 w-full py-2 rounded border border-slate-700 hover:bg-white/5 transition-colors text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white flex items-center justify-center gap-2 group/btn`}
                >
                    View Profile <ExternalLink size={12} className="opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </button>
            </div>
        </div>
    );
};

export default function HallOfLegends() {
    const [activeTab, setActiveTab] = useState('pvp');
    const [leaderboardData, setLeaderboardData] = useState([]);

    // Simulate API Fetch
    useEffect(() => {
        // In a real app, this would be: fetch(API_URL + `?type=${activeTab}`)
        setLeaderboardData(MOCK_LEADERBOARDS[activeTab]);
    }, [activeTab]);

    const handleProfileClick = (playerName) => {
        // Placeholder for future profile modal
        alert(`Viewing profile for ${playerName} is coming soon!`);
    };

    return (
        <div className="min-h-screen pt-32 pb-20 container mx-auto px-6 relative z-10">
            <style>{`
                @keyframes shine {
                    0% { background-position: 200% center; }
                    100% { background-position: -200% center; }
                }
                .animate-shine {
                    background-size: 200% auto;
                    animation: shine 4s linear infinite;
                }
            `}</style>

            {/* Header */}
            <div className="text-center mb-16 relative">

                <h1 className="text-5xl md:text-8xl font-serif font-black mb-6 tracking-tight relative z-10">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600 animate-shine">
                        HALL OF LEGENDS
                    </span>
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                    Honoring the elite champions of IronVeil. These players have etched their names into history through unmatched skill, dedication, and power.
                </p>
            </div>

            {/* Legends Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-20 items-end">
                {/* 2nd Place Visual Weight */}
                <div className="order-2 md:order-1 transform md:scale-90 opacity-90 hover:opacity-100 hover:scale-95 transition-all duration-300">
                    <LegendCard data={MOCK_LEGENDS.skilling} onProfileClick={handleProfileClick} />
                </div>

                {/* 1st Place Visual Weight */}
                <div className="order-1 md:order-2 transform md:-translate-y-8 z-20">
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-yellow-200 rounded-2xl blur opacity-20 animate-pulse"></div>
                        <LegendCard data={MOCK_LEGENDS.pvp} onProfileClick={handleProfileClick} />
                    </div>
                </div>

                {/* 3rd Place Visual Weight */}
                <div className="order-3 md:order-3 transform md:scale-90 opacity-90 hover:opacity-100 hover:scale-95 transition-all duration-300">
                    <LegendCard data={MOCK_LEGENDS.pvm} onProfileClick={handleProfileClick} />
                </div>
            </div>

            {/* Leaderboards */}
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                    <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-3">
                        <Medal className="text-yellow-500" /> Current Leaderboards
                    </h2>
                    <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
                        <button
                            onClick={() => setActiveTab('pvp')}
                            className={`px-6 py-2 text-xs font-bold rounded transition-all ${activeTab === 'pvp' ? 'bg-slate-800 text-white shadow ring-1 ring-slate-700' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            Top PvP
                        </button>
                        <button
                            onClick={() => setActiveTab('xp')}
                            className={`px-6 py-2 text-xs font-bold rounded transition-all ${activeTab === 'xp' ? 'bg-slate-800 text-white shadow ring-1 ring-slate-700' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            Top XP
                        </button>
                        <button
                            onClick={() => setActiveTab('boss')}
                            className={`px-6 py-2 text-xs font-bold rounded transition-all ${activeTab === 'boss' ? 'bg-slate-800 text-white shadow ring-1 ring-slate-700' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            Boss Speed
                        </button>
                    </div>
                </div>

                <div className="bg-slate-950/50 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-sm relative">
                    {/* Table Loading State Simulation */}
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-800 bg-slate-900/50">
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-24 text-center">Rank</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Player</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">{activeTab === 'boss' ? 'Time' : 'Score'}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {leaderboardData.map((rank) => (
                                <tr key={rank.rank} className="hover:bg-white/5 transition-colors group cursor-pointer" onClick={() => handleProfileClick(rank.name)}>
                                    <td className="p-4 text-center">
                                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold font-mono ${rank.rank === 1 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' :
                                            rank.rank === 2 ? 'bg-slate-400/20 text-slate-300 border border-slate-400/50' :
                                                rank.rank === 3 ? 'bg-orange-700/20 text-orange-400 border border-orange-700/50' :
                                                    'text-slate-500'
                                            }`}>
                                            {rank.rank}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img src="https://oldschool.runescape.wiki/images/thumb/Helper_icon.png/15px-Helper_icon.png" className="w-4 opacity-50" alt="" />
                                            <span className="font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">{rank.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <span className="font-mono text-slate-300 text-lg">{rank.score}</span>
                                        <span className="block text-[10px] text-slate-500 uppercase">{rank.label}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
}
