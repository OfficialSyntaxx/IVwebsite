import React, { useState, useEffect, useRef } from 'react';
import {
    Shield,
    Sword,
    Skull,
    Users,
    Activity,
    Map as MapIcon,
    ChevronRight,
    X,
    Crosshair,
    TrendingUp,
    Clock,
    Zap,
    Maximize2,
    Info,
    BookOpen,
    CheckCircle2,
    Trophy,
    Scroll,
    ZoomIn,
    ZoomOut,
    Move,
    Navigation,
    Target,
    Newspaper,
    Gamepad2 // For Minigames
} from 'lucide-react';

/**
 * ==========================================
 * 1. MOCK DATA LAYER
 * ==========================================
 */
const MOCK_WORLD_STATE = {
    meta: {
        serverName: "IronVeil",
        status: "ONLINE",
        uptime: "4d 12h 30m",
        playersOnline: 432,
        wildyActivityLevel: "HIGH"
    },
    events: [
        { id: 1, name: "Galvek", status: "ALIVE", hpPercent: 45, location: "Myth's Guild", attackers: 12 },
        { id: 2, name: "Wildy Wyrm", status: "DEAD", respawnTimer: "14:20", location: "Wilderness Lvl 45", attackers: 0 },
        { id: 3, name: "Tekton", status: "ALIVE", hpPercent: 88, location: "Raids Lobby", attackers: 4 }
    ],
    hotspots: [
        { id: 1, region: "Revenant Caves", intensity: "EXTREME", x: 69.26, y: 24.37, desc: "Multi-combat active" },
        { id: 2, region: "Mage Bank", intensity: "MODERATE", x: 70.04, y: 11.42, desc: "Team pking detected" }, // User Verified
        { id: 3, region: "Lava Maze", intensity: "LOW", x: 69.74, y: 17.16, desc: "Sporadic activity" }, // User Verified
        { id: 4, region: "Zul-Andra", intensity: "HIGH", x: 39.67, y: 65.55, desc: "Bot farm patrol" }, // User Verified
        { id: 5, region: "Chambers of Xeric", intensity: "HIGH", x: 6.74, y: 35.39, desc: "Raiding parties" }, // User Verified
        { id: 6, region: "Theatre of Blood", intensity: "MODERATE", x: 89.64, y: 55.72, desc: "Lobby active" }, // User Verified
        { id: 7, region: "Grand Exchange", intensity: "EXTREME", x: 72.58, y: 39.50, desc: "High volume trading" },
        { id: 8, region: "Ferox Enclave", intensity: "MODERATE", x: 71.80, y: 30.94, desc: "Safe zone pking" }, // User Verified
        { id: 9, region: "Lumbridge", intensity: "LOW", x: 74.53, y: 55.72, desc: "New player area" }
    ]
};

const ARMORY_DATA = {
    MELEE: {
        id: 'melee',
        label: 'Max Melee',
        username: "IronLegend",
        rank: "Ironman",
        totalLevel: 2277,
        description: "Standard max efficiency melee setup.",
        equipment: {
            head: { id: 1, name: "Torva full helm", stats: "+8 Str, +256 Def" },
            body: { id: 2, name: "Torva platebody", stats: "+6 Str, +320 Def" },
            legs: { id: 3, name: "Torva platelegs", stats: "+4 Str, +289 Def" },
            weapon: { id: 4, name: "Scythe of vitur", stats: "+75 Str, +70 Acc" },
            shield: { id: 5, name: "Avernic defender", stats: "+30 Acc, +8 Str" },
            feet: { id: 6, name: "Primordial boots", stats: "+5 Str, +2 Acc" },
            hands: { id: 7, name: "Ferocious gloves", stats: "+14 Str, +16 Acc" },
            neck: { id: 8, name: "Amulet of torture", stats: "+15 Acc, +10 Str" },
            ring: { id: 9, name: "Ultor ring", stats: "+12 Str" },
            cape: { id: 10, name: "Infernal cape", stats: "+8 Str, +4 Prayer" }
        }
    },
    RANGED: {
        id: 'ranged',
        label: 'Max Ranged',
        username: "BowFaDees",
        rank: "Legend",
        totalLevel: 2150,
        description: "High dps ranged setup for raids.",
        equipment: {
            head: { id: 11, name: "Masori mask (f)", stats: "+8 Ranged Str" },
            body: { id: 12, name: "Masori body (f)", stats: "+4 Ranged Str" },
            legs: { id: 13, name: "Masori chaps (f)", stats: "+2 Ranged Str" },
            weapon: { id: 14, name: "Twisted bow", stats: "+70 Ranged Str" },
            shield: { id: 15, name: "Dragonfire ward", stats: "+15 Def" }, // Often empty for Tbow
            feet: { id: 16, name: "Pegasian boots", stats: "+12 Ranged Acc" },
            hands: { id: 17, name: "Zaryte vambraces", stats: "+2 Ranged Str" },
            neck: { id: 18, name: "Necklace of anguish", stats: "+5 Ranged Str" },
            ring: { id: 19, name: "Venator ring", stats: "+2 Ranged Str" },
            cape: { id: 20, name: "Ava's assembler", stats: "+2 Ranged Str" },
            ammo: { id: 21, name: "Dragon arrow", stats: "+60 Str" }
        }
    },
    MAGE: {
        id: 'mage',
        label: 'Max Mage',
        username: "ShadowWizard",
        rank: "Administrator",
        totalLevel: 2277,
        description: "Tumeken's Shadow max hit setup.",
        equipment: {
            head: { id: 22, name: "Ancestral hat", stats: "+2% Magic Dmg" },
            body: { id: 23, name: "Ancestral robe top", stats: "+2% Magic Dmg" },
            legs: { id: 24, name: "Ancestral robe bottom", stats: "+2% Magic Dmg" },
            weapon: { id: 25, name: "Tumeken's shadow", stats: "Triple Magic Accuracy" },
            feet: { id: 26, name: "Eternal boots", stats: "+8 Magic Acc" },
            hands: { id: 27, name: "Tormented bracelet", stats: "+5% Magic Dmg" },
            neck: { id: 28, name: "Occult necklace", stats: "+10% Magic Dmg" },
            ring: { id: 29, name: "Magus ring", stats: "+2% Magic Dmg" },
            cape: { id: 30, name: "Imbued guthix cape", stats: "+2% Magic Dmg" }
        }
    },
    NH: {
        id: 'nh',
        label: 'NH Pker',
        username: "SitRat",
        rank: "Pker",
        totalLevel: 126,
        description: "Tribrid setup for deep wilderness.",
        equipment: {
            head: { id: 31, name: "Neitiznot faceguard", stats: "+6 Str" },
            body: { id: 32, name: "Ahrim's robetop", stats: "Mage/Def Hybrid" },
            legs: { id: 33, name: "Ahrim's robeskirt", stats: "Mage/Def Hybrid" },
            weapon: { id: 34, name: "Ancient godsword", stats: "Blood Sacrifice" },
            shield: { id: 35, name: "Elysian spirit shield", stats: "Dmg Reduction" },
            feet: { id: 36, name: "Primordial boots", stats: "+5 Str" },
            hands: { id: 37, name: "Barrows gloves", stats: "Hybrid Stats" },
            neck: { id: 38, name: "Amulet of fury", stats: "Hybrid Stats" },
            ring: { id: 39, name: "Ring of suffering (i)", stats: "+20 Def, Recoil" },
            cape: { id: 40, name: "Infernal cape", stats: "+8 Str" }
        }
    }
};

const MOCK_COLLECTION_LOG = {
    raids: [
        { name: "Twisted bow", obtained: true },
        { name: "Kodai insignia", obtained: true },
        { name: "Elder maul", obtained: false },
        { name: "Ancestral hat", obtained: true },
        { name: "Ancestral robe top", obtained: false },
        { name: "Ancestral robe bottom", obtained: true },
        { name: "Dragon claws", obtained: true },
        { name: "Dinh's bulwark", obtained: false },
    ],
    bosses: [
        { name: "Pet snakeling", obtained: true },
        { name: "Toxic blowpipe", obtained: true },
        { name: "Magic fang", obtained: true },
        { name: "Serpentine visage", obtained: true },
        { name: "Tanzanite fang", obtained: false },
        { name: "Uncut onyx", obtained: true },
        { name: "Pet vorki", obtained: false },
        { name: "Draconic visage", obtained: true },
        { name: "Jar of decay", obtained: false },
    ],
    clues: [
        { name: "Bloodhound", obtained: false },
        { name: "3rd age pickaxe", obtained: true },
        { name: "3rd age druidic robe top", obtained: false },
        { name: "3rd age druidic robe bottom", obtained: false },
        { name: "Ring of coins", obtained: true },
        { name: "Mimic", obtained: true },
        { name: "Ranger boots", obtained: true },
        { name: "Holy sandals", obtained: true },
    ],
    minigames: [
        { name: "Void knight top", obtained: true },
        { name: "Void knight robe", obtained: true },
        { name: "Void knight gloves", obtained: true },
        { name: "Fighter torso", obtained: true },
        { name: "Fire cape", obtained: true },
        { name: "Infernal cape", obtained: false },
        { name: "Imbued heart", obtained: false },
        { name: "Castle wars helm (red)", obtained: false },
    ]
};

/**
 * ==========================================
 * 2. HELPER COMPONENTS
 * ==========================================
 */

const getItemImage = (name) => {
    if (!name) return null;
    const formatted = name.replace(/ /g, '_');
    return `https://oldschool.runescape.wiki/images/${formatted}_detail.png`;
};

const SectionTitle = ({ children, subtitle }) => (
    <div className="mb-8 text-center md:text-left relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-widest font-serif">
            {children}
        </h2>
        {subtitle && <div className="h-1 w-24 bg-cyan-500 mt-2 mx-auto md:mx-0"></div>}
    </div>
);

/**
 * ==========================================
 * 3. MAP ENGINE V3.1 (STABLE + DISTORTION FIX)
 * ==========================================
 */

const MapViewer = ({ hotspots, activeLocation, onLocationSelect }) => {
    // 1. CONFIGURATION
    const IMG_WIDTH = 8793;
    const IMG_HEIGHT = 4993;
    const MAX_SCALE = 4;

    // 2. STATE
    const [scale, setScale] = useState(0.15); // Will be overwritten by effects
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
    const [mapLoaded, setMapLoaded] = useState(false);
    const [useGridFallback, setUseGridFallback] = useState(false);
    const [minScale, setMinScale] = useState(0.1);

    const containerRef = useRef(null);

    // 3. INITIALIZATION & RESIZE HANDLER
    useEffect(() => {
        if (!containerRef.current) return;

        const updateMinScale = () => {
            const containerW = containerRef.current.clientWidth;
            const containerH = containerRef.current.clientHeight;

            const minScaleX = containerW / IMG_WIDTH;
            const minScaleY = containerH / IMG_HEIGHT;

            // "Cover" behavior to ensure no black borders
            const newMinScale = Math.max(minScaleX, minScaleY);
            setMinScale(newMinScale);

            // If current scale is too small, upgrade it
            setScale(prev => Math.max(prev, newMinScale));
        };

        updateMinScale();
        window.addEventListener('resize', updateMinScale);
        return () => window.removeEventListener('resize', updateMinScale);
    }, []);

    // 4. BOUNDS LOGIC
    const constrainBounds = (pos, s, viewportW, viewportH) => {
        // Map Dimensions at current scale
        const mapW = IMG_WIDTH * s;
        const mapH = IMG_HEIGHT * s;

        let minX, maxX, minY, maxY;

        if (mapW <= viewportW) {
            const diff = viewportW - mapW;
            minX = diff / 2; maxX = diff / 2;
        } else {
            minX = viewportW - mapW;
            maxX = 0;
        }

        if (mapH <= viewportH) {
            const diff = viewportH - mapH;
            minY = diff / 2; maxY = diff / 2;
        } else {
            minY = viewportH - mapH;
            maxY = 0;
        }

        return {
            x: Math.min(maxX, Math.max(minX, pos.x)),
            y: Math.min(maxY, Math.max(minY, pos.y))
        };
    };

    // 5. MOUSE HANDLERS
    const handleMouseDown = (e) => {
        setDragging(true);
        setLastPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e) => {
        if (!dragging || !containerRef.current) return;
        const dx = e.clientX - lastPos.x;
        const dy = e.clientY - lastPos.y;

        const vpW = containerRef.current.clientWidth;
        const vpH = containerRef.current.clientHeight;

        setPosition(prev => constrainBounds({ x: prev.x + dx, y: prev.y + dy }, scale, vpW, vpH));
        setLastPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => setDragging(false);

    // 6. ZOOM TO CURSOR
    const handleWheel = (e) => {
        e.preventDefault();
        if (!containerRef.current) return;

        const zoomSensitivity = 0.001;
        const delta = -e.deltaY * zoomSensitivity;
        const newScale = Math.min(Math.max(minScale, scale + delta), MAX_SCALE);

        // Rects
        const rect = containerRef.current.getBoundingClientRect();
        const cursorX = e.clientX - rect.left;
        const cursorY = e.clientY - rect.top;

        // Cursor in Map-Space (pixels from top-left of image)
        const mapSpaceX = (cursorX - position.x) / scale;
        const mapSpaceY = (cursorY - position.y) / scale;

        // New Position: We want (mapSpaceX * newScale) to be at cursorX relative to new position
        const newX = cursorX - (mapSpaceX * newScale);
        const newY = cursorY - (mapSpaceY * newScale);

        // Constrain
        setPosition(constrainBounds({ x: newX, y: newY }, newScale, rect.width, rect.height));
        setScale(newScale);
    };



    // 7. AUTO FOCUS
    useEffect(() => {
        if (activeLocation && containerRef.current) {
            const targetScale = Math.max(minScale * 2, 0.8); // Ensure decent zoom
            const targetX = IMG_WIDTH * (activeLocation.x / 100);
            const targetY = IMG_HEIGHT * (activeLocation.y / 100);

            const vpW = containerRef.current.clientWidth;
            const vpH = containerRef.current.clientHeight;

            const rawX = (vpW / 2) - (targetX * targetScale);
            const rawY = (vpH / 2) - (targetY * targetScale);

            setPosition(constrainBounds({ x: rawX, y: rawY }, targetScale, vpW, vpH));
            setScale(targetScale);
        }
    }, [activeLocation, minScale]);

    return (
        <div
            ref={containerRef}
            className="flex-1 relative bg-[#0b0b0b] overflow-hidden cursor-move select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >






            {/* Loading */}
            {!mapLoaded && !useGridFallback && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none">
                    <Activity className="animate-spin text-cyan-500 mb-2" size={32} />
                    <span className="text-cyan-500 font-mono text-xs">LOADING SATELLITE FEED...</span>
                </div>
            )}

            {/* Map Container - now just a div passing transforms to children */}
            <div
                style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                    transformOrigin: '0 0',
                    transition: dragging ? 'none' : 'transform 0.1s ease-out',
                    width: `${IMG_WIDTH}px`,
                    height: `${IMG_HEIGHT}px`,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    willChange: 'transform' // Performance optimization
                }}
            >
                {/* Fallback Grid */}
                <div className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                        backgroundSize: '100px 100px'
                    }}>
                </div>

                {/* Image */}
                {!useGridFallback && (
                    <img
                        src="https://cdn.runescape.com/assets/img/external/oldschool/2024/newsposts/2024-09-25/osrs_world_map_sept24_2024.jpg"
                        alt="OSRS Map"
                        className={`w-full h-full pointer-events-none ${mapLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
                        draggable="false"
                        onLoad={() => setMapLoaded(true)}
                        style={{ pointerEvents: 'auto' }}
                        onError={() => {
                            console.warn("Map image failed to load");
                            setUseGridFallback(true);
                            setMapLoaded(true);
                        }}
                    />
                )}

                {/* Hotspots - Now children of the scaled container, so they move with it naturally */}
                {hotspots.map((spot) => (
                    <div
                        key={spot.id}
                        className="absolute group/spot z-20 cursor-pointer pointer-events-auto"
                        style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onLocationSelect(spot);
                        }}
                    >
                        {/* Inverse scale to keep marker size constant on screen */}
                        <div style={{ transform: `scale(${1 / Math.max(scale, 0.5)})` }}>
                            <div className={`
                 absolute -inset-8 rounded-full border-2 border-white/20 opacity-30 animate-ping rounded-full
                 ${spot.intensity === 'EXTREME' ? 'bg-red-500' :
                                    spot.intensity === 'HIGH' ? 'bg-orange-500' : 'bg-green-500'}
               `}></div>

                            <div className={`
                 relative w-8 h-8 rounded-full border-2 border-white shadow-[0_0_20px_rgba(0,0,0,1)] flex items-center justify-center
                 ${spot.intensity === 'EXTREME' ? 'bg-red-600' :
                                    spot.intensity === 'HIGH' ? 'bg-orange-500' : 'bg-slate-700'}
                 ${activeLocation?.id === spot.id ? 'ring-4 ring-cyan-400' : ''}
               `}>
                                {spot.intensity === 'EXTREME' ? <Skull size={14} className="text-white" /> : <Target size={14} className="text-white" />}
                            </div>
                        </div>

                        {/* Tooltip */}
                        <div
                            className="absolute left-10 top-0 bg-black/95 border border-slate-600 p-3 rounded w-64 opacity-0 group-hover/spot:opacity-100 transition-opacity z-50 pointer-events-none shadow-2xl origin-left"
                            style={{ transform: `scale(${1 / Math.max(scale, 0.5)})` }}
                        >
                            <div className="text-white font-bold text-lg mb-1">{spot.region}</div>
                            <div className="text-slate-400 text-xs italic mb-2">{spot.desc}</div>
                            <div className="flex items-center justify-between text-xs border-t border-slate-700 pt-2">
                                <span className="text-slate-500">Activity Level:</span>
                                <span className={`font-bold ${spot.intensity === 'EXTREME' ? 'text-red-500' :
                                    spot.intensity === 'HIGH' ? 'text-orange-500' : 'text-green-500'
                                    }`}>{spot.intensity}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Controls */}
            <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-40">
                <button onClick={() => {
                    // Zoom In Logic tailored to center of screen
                    if (!containerRef.current) return;
                    const rect = containerRef.current.getBoundingClientRect();
                    const cx = rect.width / 2;
                    const cy = rect.height / 2;

                    // mapSpace = (cx - pos.x) / scale
                    const msX = (cx - position.x) / scale;
                    const msY = (cy - position.y) / scale;

                    const newScale = Math.min(scale + 0.5, MAX_SCALE);
                    const newX = cx - (msX * newScale);
                    const newY = cy - (msY * newScale);

                    setPosition(constrainBounds({ x: newX, y: newY }, newScale, rect.width, rect.height));
                    setScale(newScale);

                }} className="bg-slate-900/90 border border-slate-700 text-white p-2 rounded hover:bg-slate-800"><ZoomIn size={20} /></button>

                <button onClick={() => {
                    if (!containerRef.current) return;
                    const rect = containerRef.current.getBoundingClientRect();
                    const cx = rect.width / 2;
                    const cy = rect.height / 2;
                    const msX = (cx - position.x) / scale;
                    const msY = (cy - position.y) / scale;

                    const newScale = Math.max(scale - 0.5, minScale);
                    const newX = cx - (msX * newScale);
                    const newY = cy - (msY * newScale);

                    setPosition(constrainBounds({ x: newX, y: newY }, newScale, rect.width, rect.height));
                    setScale(newScale);

                }} className="bg-slate-900/90 border border-slate-700 text-white p-2 rounded hover:bg-slate-800"><ZoomOut size={20} /></button>

                <button onClick={() => {
                    if (!containerRef.current) return;
                    const w = containerRef.current.clientWidth;
                    const h = containerRef.current.clientHeight;
                    // Center the map
                    const newX = (w - (IMG_WIDTH * minScale)) / 2;
                    const newY = (h - (IMG_HEIGHT * minScale)) / 2;

                    setScale(minScale);
                    setPosition({ x: newX, y: newY })
                }} className="bg-slate-900/90 border border-slate-700 text-white p-2 rounded hover:bg-slate-800" title="Reset"><Move size={20} /></button>
            </div>
        </div>
    );
};

const WorldMapOverlay = ({ isOpen, onClose, hotspots }) => {
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



const CollectionLogModal = ({ isOpen, onClose, logData }) => {
    const [activeTab, setActiveTab] = useState('raids');
    if (!isOpen) return null;
    const tabs = [
        { id: 'raids', label: 'Raids', icon: Sword },
        { id: 'bosses', label: 'Bosses', icon: Skull },
        { id: 'clues', label: 'Clues', icon: Scroll },
        { id: 'minigames', label: 'Minigames', icon: Gamepad2 },
    ];
    const currentItems = logData[activeTab] || [];
    const obtainedCount = currentItems.filter(i => i.obtained).length;

    return (
        <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in zoom-in duration-200">
            <div className="w-full max-w-3xl bg-[#3e3529] border-2 border-[#5d5245] rounded shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
                <div className="bg-[#2d261e] p-3 border-b border-[#5d5245] flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <BookOpen size={20} className="text-[#ff981f]" />
                        <h3 className="text-[#ff981f] font-bold uppercase tracking-wider text-lg shadow-black drop-shadow-md">Collection Log</h3>
                    </div>
                    <button onClick={onClose} className="text-[#ff981f] hover:text-white transition-colors"><X size={20} /></button>
                </div>
                <div className="flex flex-1 overflow-hidden">
                    <div className="w-32 bg-[#2d261e] border-r border-[#5d5245] flex flex-col">
                        {tabs.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`p-3 text-xs font-bold uppercase tracking-wider flex flex-col items-center gap-1 transition-colors border-b border-[#5d5245]/50 ${activeTab === tab.id ? 'bg-[#3e3529] text-[#ff981f] border-l-4 border-l-[#ff981f]' : 'text-gray-500 hover:text-gray-300 hover:bg-[#362e24]'}`}>
                                <tab.icon size={18} />{tab.label}
                            </button>
                        ))}
                    </div>
                    <div className="flex-1 bg-[#1e1e1e] p-4 overflow-y-auto">
                        <h4 className="text-gray-400 text-xs uppercase mb-4 font-bold border-b border-gray-700 pb-2 flex justify-between">
                            <span>{tabs.find(t => t.id === activeTab).label} Drops</span>
                            <span className="text-[#ff981f]">{obtainedCount}/{currentItems.length}</span>
                        </h4>
                        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                            {currentItems.map((item, i) => (
                                <div key={i} className={`group relative flex flex-col items-center p-2 rounded border transition-colors ${item.obtained ? 'bg-[#3e3529]/50 border-green-900/50 hover:bg-[#3e3529]' : 'bg-black/30 border-transparent opacity-50'}`}>
                                    <img src={getItemImage(item.name)} alt={item.name} className={`w-8 h-8 object-contain mb-1 ${!item.obtained && 'grayscale opacity-30'}`} onError={(e) => { e.target.style.display = 'none' }} />
                                    {item.obtained && <CheckCircle2 size={12} className="absolute bottom-1 right-1 text-green-500 bg-black rounded-full" />}
                                    <span className={`text-[9px] text-center leading-tight line-clamp-2 ${item.obtained ? 'text-[#ff981f]' : 'text-gray-600'}`}>{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InteractiveArmory = () => {
    const [currentProfileId, setCurrentProfileId] = useState('MELEE');
    const p = ARMORY_DATA[currentProfileId];
    const [activeItem, setActiveItem] = useState(null);
    const [logOpen, setLogOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const equipmentOrder = [null, 'head', null, 'cape', 'neck', 'ammo', 'weapon', 'body', 'shield', null, 'legs', null, 'hands', 'feet', 'ring'];

    return (
        <>
            <CollectionLogModal isOpen={logOpen} onClose={() => setLogOpen(false)} logData={MOCK_COLLECTION_LOG} />
            <div className="bg-slate-900/50 backdrop-blur border border-slate-700 p-6 rounded-xl max-w-lg w-full mx-auto relative group">
                {/* Logo Watermark */}
                <div className="absolute top-4 right-4 z-0 opacity-20 pointer-events-none">
                    <img src="./logo_iv.png" alt="" className="w-32 h-32 object-contain" />
                </div>

                <div className="flex justify-between items-start mb-6 relative z-10">
                    <div>
                        {/* Dropdown Menu */}
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
        </>
    );
};

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

const LiveHUD = ({ isOpen, toggle, onOpenMap }) => {
    const [data, setData] = useState(MOCK_WORLD_STATE);
    useEffect(() => {
        const interval = setInterval(() => {
            setData(prev => ({ ...prev, meta: { ...prev.meta, playersOnline: prev.meta.playersOnline + Math.floor(Math.random() * 5) - 2 } }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

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
                        <div className="text-right"><div className="text-xs text-slate-500">Uptime</div><div className="text-xs text-slate-300 font-mono">{data.meta.uptime}</div></div>
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
                        <div className="flex items-center gap-2 mb-3 text-purple-400"><Skull size={16} /><h4 className="text-xs font-bold uppercase tracking-wider">World Bosses</h4></div>
                        <div className="space-y-3">
                            {data.events.map((boss) => (
                                <div key={boss.id} className="bg-slate-900 border border-slate-800 rounded p-3 relative overflow-hidden">
                                    {boss.status === 'ALIVE' && (<div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-600 to-purple-600 transition-all duration-1000" style={{ width: `${boss.hpPercent}%` }}></div>)}
                                    <div className="flex justify-between items-center mb-1"><span className="font-bold text-slate-200 text-sm">{boss.name}</span>{boss.status === 'ALIVE' ? (<span className="text-xs font-mono text-red-400">{boss.hpPercent}% HP</span>) : (<span className="text-xs font-mono text-yellow-500 flex items-center gap-1"><Clock size={10} /> {boss.respawnTimer}</span>)}</div>
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

const STORE_ITEMS = {
    cosmetics: [
        { id: 1, name: "Infernal Cape Override", price: 2500, img: "https://oldschool.runescape.wiki/images/Infernal_cape.png", desc: "Cosmetic override for any cape slot item. Shows off your dominance without the stats." },
        { id: 2, name: "Blood Torva Set", price: 5000, img: "https://oldschool.runescape.wiki/images/Torva_platebody_%28damaged%29.png", desc: "The ultimate melee cosmetic. Includes Helm, Body, and Legs overrides." },
        { id: 3, name: "Twisted Bow (Red)", price: 4000, img: "https://oldschool.runescape.wiki/images/Twisted_bow.png", desc: "A ruby-red recolor of the legendary Twisted Bow." },
        { id: 10, name: "3rd Age Platebody", price: 3500, img: "https://oldschool.runescape.wiki/images/3rd_age_platebody.png", desc: "Classic wealth display. Cosmetic override." },
        { id: 11, name: "Gilded Scimitar", price: 1000, img: "https://oldschool.runescape.wiki/images/Gilded_scimitar.png", desc: "Golden blade for the wealthy warrior." }
    ],
    pets: [
        { id: 4, name: "Pet Kree'arra", price: 1500, img: "https://oldschool.runescape.wiki/w/Special:FilePath/Kree%27arra_Jr..png", desc: "The Aviansie general, shrunk down to size. Does not flap aggressively." },
        { id: 5, name: "Pet General Graardor", price: 1500, img: "https://oldschool.runescape.wiki/w/Special:FilePath/General_Graardor_Jr..png", desc: "A tiny Bandosian general to follow you into battle." },
        { id: 6, name: "Vorki", price: 2000, img: "https://oldschool.runescape.wiki/w/Special:FilePath/Vorki.png", desc: "The undead dragon spawn. Ideally kept away from heat." }
    ],
    services: [
        { id: 7, name: "Name Change Bond", price: 500, img: "https://oldschool.runescape.wiki/images/Old_school_bond.png", desc: "Allows one free username change. redeemable in-game." },
        { id: 8, name: "Clan Creation Ticket", price: 1000, img: "https://oldschool.runescape.wiki/w/Special:FilePath/Clan_vexillum_%28black%29.png", desc: "Create a permanent clan chat with custom ranks and vexillum." },
        { id: 9, name: "Bank Space (+50)", price: 250, img: "https://oldschool.runescape.wiki/images/Bank_key.png", desc: "Expands your bank by 50 slots. Max 5 uses per account." },
        { id: 12, name: "Item Recolor Ticket", price: 750, img: "https://oldschool.runescape.wiki/images/Looting_bag_note.png", desc: "Unlock a custom recolor for one supported item. MUST be redeemed by trading an Admin+ in-game." }
    ]
};

const PatchNoteModal = ({ item, onClose }) => {
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

const StoreModal = ({ isOpen, onClose }) => {
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
}

export default function App() {
    const [hudOpen, setHudOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mapOpen, setMapOpen] = useState(false);
    const [storeOpen, setStoreOpen] = useState(false);
    const [selectedPatchNote, setSelectedPatchNote] = useState(null); // State for Patch Note Modal

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
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

            {/* CONTENT OVERLAY */}
            <div className="relative z-10">

                <WorldMapOverlay
                    isOpen={mapOpen}
                    onClose={() => setMapOpen(false)}
                    hotspots={MOCK_WORLD_STATE.hotspots}
                />

                <StoreModal isOpen={storeOpen} onClose={() => setStoreOpen(false)} />

                <PatchNoteModal item={selectedPatchNote} onClose={() => setSelectedPatchNote(null)} />

                <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled ? 'bg-slate-950/90 backdrop-blur border-slate-800 py-3' : 'bg-transparent border-transparent py-6'} pr-0 md:pr-80`}>

                    <div className="container mx-auto px-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
                                {/* UPDATED LOGO V3 */}
                                <img src="./logo_iv_final.png" alt="IronVeil" className="h-16 w-auto object-contain drop-shadow-[0_0_15px_rgba(8,145,178,0.3)]" />
                                <div className="hidden sm:block">
                                    <span className="block text-2xl font-serif font-bold text-white tracking-widest leading-none">IRONVEIL</span>
                                    <span className="block text-[10px] text-cyan-400 font-mono tracking-[0.3em] uppercase leading-none opacity-80">Forged in the Void</span>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wider text-slate-400">
                            <button
                                onClick={() => setHudOpen(!hudOpen)} // Toggle Logic
                                className={`hover:text-cyan-400 transition-colors relative group flex items-center gap-2 ${hudOpen ? 'text-cyan-400' : ''}`}
                            >
                                <Activity size={16} />
                                Network
                                <span className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-500 transition-all group-hover:w-full ${hudOpen ? 'w-full' : 'w-0'}`}></span>
                            </button>
                            <div className="h-4 w-px bg-slate-800"></div>
                            <a href="#" className="hover:text-white transition-colors relative group">
                                Vote
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all group-hover:w-full"></span>
                            </a>
                            <button onClick={() => setStoreOpen(true)} className="hover:text-orange-400 transition-colors relative group text-orange-500/80">
                                Store
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
                            </button>
                            <a href="#" className="hover:text-white transition-colors relative group">
                                Discord
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all group-hover:w-full"></span>
                            </a>
                        </div>
                    </div>
                </nav>

                <LiveHUD isOpen={hudOpen} toggle={() => setHudOpen(!hudOpen)} onOpenMap={() => setMapOpen(true)} />

                {/* Main Content Area - shifts when HUD is open */}
                <div className={`transition-all duration-300 ${hudOpen ? 'pr-80' : 'pr-0'}`}>

                    <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
                        {/* Content is visually separated now, no need for background overrides since ParallaxBackground is fixed behind */}

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
                                    <InteractiveArmory />
                                    <div className="text-center mt-6 flex items-center justify-center gap-2 text-slate-500"><Info size={14} /><p className="text-sm font-mono">Hover items for detailed stats</p></div>
                                </div>
                            </div>
                        </div>
                    </section>



                    <footer className="bg-slate-950 py-12 border-t border-slate-900 text-center md:text-left">
                        <div className="container mx-auto px-6">
                            <div className="grid md:grid-cols-4 gap-8">
                                <div className="col-span-1 md:col-span-2"><h3 className="text-2xl font-serif font-bold text-white mb-4">IRONVEIL</h3><p className="text-slate-500 max-w-sm">The next generation of RSPS. A fully integrated web and game experience built for the modern player.</p></div>
                                <div><h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Community</h4><ul className="space-y-2 text-slate-400 text-sm"><li><a href="#" className="hover:text-cyan-400">Forums</a></li><li><a href="#" className="hover:text-cyan-400">Discord</a></li><li><a href="#" className="hover:text-cyan-400">Highscores</a></li></ul></div>
                                <div><h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Game</h4><ul className="space-y-2 text-slate-400 text-sm"><li><a href="#" className="hover:text-cyan-400">Download</a></li><li><a href="#" className="hover:text-cyan-400">Webclient</a></li><li><a href="#" className="hover:text-cyan-400">Rules</a></li></ul></div>
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

                    <LiveHUD isOpen={hudOpen} toggle={() => setHudOpen(!hudOpen)} onOpenMap={() => setMapOpen(true)} />
                </div>
            </div>
        </div>
    );
}