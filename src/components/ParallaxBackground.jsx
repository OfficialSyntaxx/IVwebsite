
import React, { useState, useEffect, useRef } from 'react';

const ParallaxBackground = () => {
    const [scrollY, setScrollY] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const rafRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (rafRef.current) return;
            rafRef.current = requestAnimationFrame(() => {
                setScrollY(window.scrollY);
                rafRef.current = null;
            });
        };

        const handleMouseMove = (e) => {
            // Calculate normalized mouse position (-1 to 1) for parallax
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            setMousePos({ x, y });
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    // Enhanced Rune Data
    const runes = [
        { name: "Death_rune", left: "10%", top: "20%", size: "w-20", speed: 0.1, mouseDepth: 20, delay: "0s", spin: false },
        { name: "Blood_rune", left: "85%", top: "30%", size: "w-24", speed: 0.15, mouseDepth: -30, delay: "1s", spin: true },
        { name: "Soul_rune", left: "50%", top: "50%", size: "w-32", speed: 0.05, mouseDepth: 10, delay: "2s", spin: false },
        { name: "Nature_rune", left: "20%", top: "70%", size: "w-14", speed: 0.2, mouseDepth: 40, delay: "0.5s", spin: true },
        { name: "Law_rune", left: "80%", top: "80%", size: "w-16", speed: 0.12, mouseDepth: -20, delay: "1.5s", spin: false },
        { name: "Chaos_rune", left: "15%", top: "40%", size: "w-12", speed: 0.18, mouseDepth: 25, delay: "0.2s", spin: true },
        { name: "Cosmic_rune", left: "70%", top: "15%", size: "w-14", speed: 0.08, mouseDepth: -15, delay: "3s", spin: false },
        { name: "Astral_rune", left: "35%", top: "10%", size: "w-16", speed: 0.1, mouseDepth: 15, delay: "4s", spin: true },
        { name: "Wrath_rune", left: "60%", top: "85%", size: "w-20", speed: 0.14, mouseDepth: -35, delay: "2.5s", spin: true },
    ];

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#050505]">
            {/* Layer 0: Deep BG with Radial Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(8,145,178,0.05),transparent_70%)]"></div>
            </div>

            {/* Layer 1: Distant Stars (Slow Scroll Parallax) */}
            <div className="absolute inset-0 opacity-40" style={{ transform: `translateY(${scrollY * -0.05}px)` }}>
                <div className="absolute top-20 left-20 w-1 h-1 bg-white rounded-full blur-[1px]"></div>
                <div className="absolute top-60 right-60 w-1 h-1 bg-white rounded-full blur-[1px]"></div>
                <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-cyan-500 rounded-full blur-[4px] opacity-50"></div>
                <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-purple-500 rounded-full blur-[2px] opacity-60"></div>
                <div className="absolute top-10 left-1/2 w-1 h-1 bg-white rounded-full blur-[1px] opacity-30"></div>
                <div className="absolute bottom-10 right-10 w-1.5 h-1.5 bg-cyan-300 rounded-full blur-[2px] opacity-40"></div>
            </div>

            {/* Layer 2: Floating Runes (Mouse + Scroll Parallax) */}
            <div className="absolute inset-0 w-full h-full">
                {runes.map((rune, i) => (
                    <div
                        key={i}
                        className="absolute will-change-transform transition-transform duration-100 ease-linear"
                        style={{
                            left: rune.left,
                            top: rune.top,
                            transform: `translate3d(${mousePos.x * rune.mouseDepth}px, ${(scrollY * -rune.speed) + (mousePos.y * rune.mouseDepth)}px, 0)`
                        }}
                    >
                        <img
                            src={`https://oldschool.runescape.wiki/images/${rune.name}_detail.png`}
                            className={`
                                ${rune.size} opacity-20 grayscale hover:grayscale-0 hover:opacity-60 transition-all duration-500
                                animate-rune-float ${rune.spin ? 'animate-rune-spin' : ''}
                            `}
                            style={{
                                animationDelay: rune.delay,
                                filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))'
                            }}
                            alt={rune.name}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ParallaxBackground;
