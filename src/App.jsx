
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { MOCK_WORLD_STATE } from './data/constants';

// Page Imports
import Home from './pages/Home';
import Wiki from './pages/Wiki';
import Vote from './pages/Vote';
import MeetTheTeam from './pages/MeetTheTeam';
import DevBlog from './pages/DevBlog';
import DevBlogPost from './pages/DevBlogPost';
import StaffApplication from './pages/StaffApplication';

// Component Imports
import Layout from './components/Layout';
import LiveHUD from './components/LiveHUD';
import ParallaxBackground from './components/ParallaxBackground';
import { StoreModal, CollectionLogModal, WorldMapOverlay, PatchNoteModal, RulesModal } from './components/Modals';

export default function App() {
    // === GLOBAL STATE ===
    const [hudOpen, setHudOpen] = useState(false);
    const [mapOpen, setMapOpen] = useState(false);
    const [storeOpen, setStoreOpen] = useState(false);
    const [rulesOpen, setRulesOpen] = useState(false);
    const [logOpen, setLogOpen] = useState(false);
    const [selectedPatchNote, setSelectedPatchNote] = useState(null);

    // Dynamic Data
    const [collectionLogData, setCollectionLogData] = useState(() => {
        const saved = localStorage.getItem('collectionLog');
        return saved ? JSON.parse(saved) : {};
    });

    const [worldData, setWorldData] = useState(() => {
        const saved = localStorage.getItem('worldEvents');
        return saved ? JSON.parse(saved) : MOCK_WORLD_STATE;
    });

    const [uptimeMs, setUptimeMs] = useState(0);

    // === UPTIME & POLLING ===
    const formatUptime = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        const fetchStatus = () => {
            fetch("http://localhost:3001/world-events")
                .then(res => res.json())
                .then(apiData => {
                    let metaUptime = 0;
                    if (apiData.uptimeMs) {
                        metaUptime = apiData.uptimeMs;
                        setUptimeMs(prev => (Math.abs(prev - apiData.uptimeMs) > 2000 || prev === 0) ? apiData.uptimeMs : prev);
                    }

                    const newData = {
                        meta: {
                            ...worldData.meta,
                            playersOnline: apiData.players,
                            status: apiData.status,
                            uptime: formatUptime(metaUptime)
                        },
                        events: apiData.events.map((e, i) => ({
                            id: i,
                            name: e.name,
                            active: e.active,
                            status: e.active ? "ALIVE" : (e.statusText || (e.nextSpawnMs > 0 ? `${Math.ceil(e.nextSpawnMs / 60000)}m` : "INACTIVE")),
                            location: e.location || "",
                            statusText: e.statusText,
                            hpPercent: e.active ? 100 : 0
                        })).filter(e => ["Xamphur", "Shooting Star", "Wilderness Flash Event", "Charity Well", "Chambers of Xeric", "Vote Bonus"].includes(e.name)),
                        boosts: apiData.boosts || [],
                        hotspots: worldData.hotspots
                    };
                    setWorldData(newData);
                    localStorage.setItem('worldEvents', JSON.stringify(newData));
                })
                .catch(err => {
                    setWorldData(prev => ({
                        ...prev,
                        meta: { ...prev.meta, status: "OFFLINE (Cached)" }
                    }));
                });
        };

        fetchStatus();
        const interval = setInterval(fetchStatus, 5000);
        const uptimeInterval = setInterval(() => {
            setUptimeMs(prev => prev + 1000);
        }, 1000);

        // Fetch Collection Log
        fetch("http://localhost:3001/collection-log")
            .then(res => res.json())
            .then(data => {
                setCollectionLogData(data);
                localStorage.setItem('collectionLog', JSON.stringify(data));
            })
            .catch(err => console.warn("Using cached collection log", err));

        return () => {
            clearInterval(interval);
            clearInterval(uptimeInterval);
        };
    }, []);

    // Custom Route Wrapper to Handle Patch Note Modals which act like navigation but are state
    // Actually, we'll just handle it globally.

    return (
        <Router>
            <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-cyan-500/30">
                <style>{`
                  @keyframes gradient-x {
                      0%, 100% { background-position: 0% 50%; }
                      50% { background-position: 100% 50%; }
                  }
                  .animate-gradient-x {
                      background-size: 200% auto;
                      animation: gradient-x 4s linear infinite;
                  }
                `}</style>

                {/* FIXED BACKGROUND */}
                <ParallaxBackground />

                {/* MODAL LAYER (Outside of Layout/Router flow to be always on top) */}
                <div className="relative z-[100]">
                    <WorldMapOverlay
                        isOpen={mapOpen}
                        onClose={() => setMapOpen(false)}
                        hotspots={MOCK_WORLD_STATE.hotspots}
                    />

                    <StoreModal isOpen={storeOpen} onClose={() => setStoreOpen(false)} />
                    <RulesModal isOpen={rulesOpen} onClose={() => setRulesOpen(false)} />
                    <PatchNoteModal item={selectedPatchNote} onClose={() => setSelectedPatchNote(null)} />
                    <CollectionLogModal isOpen={logOpen} onClose={() => setLogOpen(false)} logData={collectionLogData} />

                    {/* LiveHUD is fixed and always visible if toggled */}
                    <LiveHUD
                        isOpen={hudOpen}
                        toggle={() => setHudOpen(!hudOpen)}
                        onOpenMap={() => setMapOpen(true)}
                        data={worldData}
                        uptimeMs={uptimeMs}
                        formatUptime={formatUptime}
                    />
                </div>

                {/* PAGE CONTENT LAYER */}
                {/* We shift the main content when HUD is open */}
                <div className={`relative z-10 transition-all duration-300 ${hudOpen ? 'pr-80' : 'pr-0'}`}>
                    <Routes>
                        <Route
                            element={
                                <Layout
                                    hudOpen={hudOpen}
                                    setHudOpen={setHudOpen}
                                    worldData={worldData}
                                    setStoreOpen={setStoreOpen}
                                    setMapOpen={setMapOpen}
                                    setRulesOpen={setRulesOpen}
                                />
                            }
                        >
                            <Route index element={
                                <Home
                                    collectionLogData={collectionLogData}
                                    setLogOpen={setLogOpen}
                                    setMapOpen={setMapOpen}
                                    setSelectedPatchNote={setSelectedPatchNote}
                                />
                            } />
                            <Route path="/wiki" element={<Wiki />} />
                            <Route path="/vote" element={<Vote />} />
                            <Route path="/team" element={<MeetTheTeam />} />
                            <Route path="/blog" element={<DevBlog />} />
                            <Route path="/blog/:slug" element={<DevBlogPost />} />
                            <Route path="/staff-application" element={<StaffApplication />} />
                        </Route>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}