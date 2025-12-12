
import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { STAFF } from '../data/constants';

const MeetTheTeam = () => {
    const [showIntro, setShowIntro] = useState(true);

    // Auto-dismiss if video fails to load or on error, just in case
    const handleVideoError = () => {
        console.warn("Video failed to play or load - skipping intro");
        setShowIntro(false);
    };

    if (showIntro) {
        return (
            <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center animate-in fade-in duration-500">
                <video
                    src="./Ironvid.mp4"
                    className="w-full h-full object-cover"
                    autoPlay
                    muted={false}
                    playsInline
                    onEnded={() => setShowIntro(false)}
                    onError={handleVideoError}
                >
                    <source src="./Ironvid.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Optional Skip Button */}
                <button
                    onClick={() => setShowIntro(false)}
                    className="absolute bottom-8 right-8 text-white/30 hover:text-white text-xs font-bold uppercase tracking-widest border border-white/10 hover:border-white/50 px-4 py-2 rounded transition-all"
                >
                    Skip Intro
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 container mx-auto px-6 relative z-20 animate-in fade-in duration-1000">
            <SectionTitle subtitle>Meet The Team</SectionTitle>
            <p className="text-slate-400 text-lg mb-12 max-w-2xl">
                IronVeil is brought to you by a passionate team of veterans dedicated to preserving the golden era of RSPS while pushing boundaries with modern tech.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
                {STAFF.map((staff, i) => (
                    <div key={i} className="bg-slate-900/50 border border-slate-700/50 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-all group">
                        <div className="p-8 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                            <div className="relative shrink-0">
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-800 shadow-xl relative z-10 group-hover:scale-105 transition-transform duration-500">
                                    <img src={staff.image} className="w-full h-full object-cover object-top bg-slate-950" />
                                </div>
                                <div className="absolute inset-0 bg-cyan-500/20 blur-[40px] rounded-full z-0 group-hover:bg-cyan-400/30 transition-colors"></div>
                            </div>

                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-white mb-1">{staff.name}</h3>
                                <p className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-4">{staff.role}</p>
                                <p className="text-slate-300 leading-relaxed mb-6 text-sm">{staff.desc}</p>

                                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                    {staff.skills.map(skill => (
                                        <span key={skill} className="bg-black/30 text-slate-400 text-[10px] font-bold px-2 py-1 rounded border border-white/5 uppercase tracking-wide">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-20 text-center">
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-12 max-w-3xl mx-auto">
                    <h3 className="text-2xl font-bold text-white mb-4">Want to join the team?</h3>
                    <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                        We are always looking for talented individuals to help us build the future of IronVeil.
                        If you have experience in development, community management, or game design, we want to hear from you.
                    </p>
                    <a
                        href="/staff-application"
                        className="inline-block px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded shadow-[0_0_20px_rgba(8,145,178,0.4)] hover:shadow-[0_0_30px_rgba(8,145,178,0.6)] transition-all uppercase tracking-widest text-xs"
                    >
                        Apply for Staff
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MeetTheTeam;
