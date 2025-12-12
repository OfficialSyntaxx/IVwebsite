
import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Activity, Menu, X, Map as MapIcon, ChevronDown } from 'lucide-react';

const Layout = ({ hudOpen, setHudOpen, worldData, setStoreOpen, setMapOpen, setRulesOpen }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Check scroll for navbar styling
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Top Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled ? 'bg-slate-950/90 backdrop-blur border-slate-800 py-3' : 'bg-transparent border-transparent py-6'} pr-0 md:pr-80`}>
                <div className="container mx-auto px-6 flex items-center justify-between">

                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <NavLink to="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-300 cursor-pointer">
                            <img src="/logo_iv_final.png" alt="IronVeil" className="h-16 w-auto object-contain drop-shadow-[0_0_15px_rgba(8,145,178,0.3)]" />
                            <div className="hidden sm:block">
                                <span className="block text-2xl font-serif font-bold text-white tracking-widest leading-none">IRONVEIL</span>
                                <span className="block text-[10px] text-cyan-400 font-mono tracking-[0.3em] uppercase leading-none opacity-80">Forged in the Void</span>
                            </div>
                        </NavLink>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wider text-slate-400">
                        {/* Live HUD Toggle */}
                        <button
                            onClick={() => setHudOpen(!hudOpen)}
                            className={`hover:text-cyan-400 transition-colors relative group flex items-center gap-2 ${hudOpen ? 'text-cyan-400' : ''}`}
                        >
                            <div className="relative">
                                <Activity size={16} />
                            </div>
                            Network
                            <span className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-500 transition-all group-hover:w-full ${hudOpen ? 'w-full' : 'w-0'}`}></span>
                        </button>

                        <div className="h-4 w-px bg-slate-800"></div>

                        {/* Community Dropdown */}
                        <div className="relative group/dropdown h-full flex items-center">
                            <button className="hover:text-white transition-colors flex items-center gap-1 cursor-default py-2">
                                Community
                                <ChevronDown size={14} className="group-hover/dropdown:rotate-180 transition-transform duration-300" />
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all group-hover/dropdown:w-full"></span>
                            </button>

                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-300 transform group-hover/dropdown:translate-y-0 translate-y-2 w-48">
                                <div className="bg-slate-950/95 backdrop-blur border border-slate-700/50 rounded-lg shadow-xl overflow-hidden flex flex-col py-1">
                                    <NavLink to="/wiki" className={({ isActive }) => `px-4 py-3 hover:bg-slate-800 text-left transition-colors flex items-center justify-between group/item ${isActive ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>
                                        Wiki <span className="opacity-0 group-hover/item:opacity-100 transition-opacity text-cyan-500">→</span>
                                    </NavLink>
                                    <NavLink to="/blog" className={({ isActive }) => `px-4 py-3 hover:bg-slate-800 text-left transition-colors flex items-center justify-between group/item ${isActive ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>
                                        Dev Blog <span className="opacity-0 group-hover/item:opacity-100 transition-opacity text-cyan-500">→</span>
                                    </NavLink>
                                    <NavLink to="/team" className={({ isActive }) => `px-4 py-3 hover:bg-slate-800 text-left transition-colors flex items-center justify-between group/item ${isActive ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>
                                        Team <span className="opacity-0 group-hover/item:opacity-100 transition-opacity text-cyan-500">→</span>
                                    </NavLink>
                                    <NavLink to="/hall-of-legends" className={({ isActive }) => `px-4 py-3 hover:bg-slate-800 text-left transition-colors flex items-center justify-between group/item ${isActive ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>
                                        Hall of Legends <span className="opacity-0 group-hover/item:opacity-100 transition-opacity text-yellow-500">♛</span>
                                    </NavLink>
                                    <div className="h-px bg-slate-800 my-1 mx-2"></div>
                                    <a href="https://discord.gg/ironveil" target="_blank" rel="noreferrer" className="px-4 py-3 hover:bg-[#5865F2]/20 text-left transition-colors text-slate-400 hover:text-[#5865F2] flex items-center justify-between group/item">
                                        Discord <span className="opacity-0 group-hover/item:opacity-100 transition-opacity">↗</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <NavLink to="/vote" className={({ isActive }) => `hover:text-white transition-colors relative group ${isActive ? 'text-white' : ''}`}>
                            Vote
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all group-hover:w-full"></span>
                        </NavLink>

                        <button onClick={() => setStoreOpen(true)} className="hover:text-orange-400 transition-colors relative group text-orange-500/80">
                            Store
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                {mobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-slate-950 border-b border-slate-800 p-6 flex flex-col gap-4 text-center z-50 shadow-xl">
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-widest border-b border-slate-800 pb-2 mb-2">Community</span>
                        <NavLink to="/wiki" className="text-slate-300 font-bold uppercase tracking-wider py-2">Wiki</NavLink>
                        <NavLink to="/blog" className="text-slate-300 font-bold uppercase tracking-wider py-2">Blog</NavLink>
                        <NavLink to="/team" className="text-slate-300 font-bold uppercase tracking-wider py-2">Team</NavLink>
                        <NavLink to="/hall-of-legends" className="text-yellow-500 font-bold uppercase tracking-wider py-2">Hall of Legends</NavLink>
                        <a href="https://discord.gg/ironveil" className="text-slate-300 font-bold uppercase tracking-wider py-2">Discord</a>

                        <div className="h-px bg-slate-800 w-1/2 mx-auto my-2"></div>

                        <NavLink to="/vote" className="text-slate-300 font-bold uppercase tracking-wider py-2">Vote</NavLink>
                        <button onClick={() => setStoreOpen(true)} className="text-orange-400 font-bold uppercase tracking-wider py-2">Store</button>
                    </div>
                )}
            </nav>

            {/* Main Content Rendered Here */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-slate-950 py-12 border-t border-slate-900 text-center md:text-left relative z-10">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <h3 className="text-2xl font-serif font-bold text-white mb-4">IRONVEIL</h3>
                            <p className="text-slate-500 max-w-sm">The next generation of RSPS. A fully integrated web and game experience built for the modern player.</p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Community</h4>
                            <ul className="space-y-2 text-slate-400 text-sm">
                                <li><NavLink to="/team" className="hover:text-cyan-400">Meet the Team</NavLink></li>
                                <li><a href="https://discord.gg/ironveil" className="hover:text-cyan-400">Discord</a></li>
                                <li><NavLink to="/wiki" className="hover:text-cyan-400">Wiki</NavLink></li>
                                <li><NavLink to="/blog" className="hover:text-cyan-400">Dev Blog</NavLink></li>
                                <li><NavLink to="/hall-of-legends" className="hover:text-yellow-500">Hall of Legends</NavLink></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Game</h4>
                            <ul className="space-y-2 text-slate-400 text-sm">
                                <li><a href="#" className="hover:text-cyan-400">Download</a></li>
                                <li><button onClick={() => setMapOpen(true)} className="hover:text-cyan-400 text-left">World Map</button></li>
                                <li><button onClick={() => setRulesOpen(true)} className="hover:text-cyan-400 text-left">Server Rules</button></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-slate-900 text-center">
                        <p className="text-slate-600 text-xs mb-4">&copy; 2025 IronVeil. Not affiliated with Jagex Ltd. RuneScape is a registered trademark of Jagex.</p>
                        <div className="flex items-center justify-center gap-2 text-sm font-bold tracking-wider">
                            <span className="text-slate-600">Made by</span>
                            <span className="relative group cursor-pointer">
                                <span className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-gradient-x"></span>
                                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 animate-gradient-x">Syntaxx</span>
                            </span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
