
import React, { useState, useEffect, useRef } from 'react';
import { Skull, Target, Activity, ZoomIn, ZoomOut, Move } from 'lucide-react';

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

export default MapViewer;
