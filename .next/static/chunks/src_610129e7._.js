(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/AudioQueueHUD.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>AudioQueueHUD)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AudioContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AudioContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function AudioQueueHUD() {
    _s();
    const { queue, playTrack, removeFromQueue } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AudioContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAudio"])();
    if (queue.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed top-24 right-4 z-50 w-80 bg-gray-900/95 border border-gray-800 rounded-lg shadow-lg p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                className: "text-lg font-bold text-white mb-2",
                children: "File d’attente"
            }, void 0, false, {
                fileName: "[project]/src/components/AudioQueueHUD.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "space-y-2",
                children: queue.map((track, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "flex items-center gap-2 bg-gray-800 rounded p-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: track.cover || "/default-cover.png",
                                alt: "",
                                className: "w-10 h-10 object-cover rounded"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AudioQueueHUD.tsx",
                                lineNumber: 15,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "truncate text-white",
                                        children: track.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AudioQueueHUD.tsx",
                                        lineNumber: 17,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "truncate text-xs text-gray-400",
                                        children: track.artist
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AudioQueueHUD.tsx",
                                        lineNumber: 18,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AudioQueueHUD.tsx",
                                lineNumber: 16,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "text-kodi-blue hover:underline text-xs",
                                onClick: ()=>playTrack(track),
                                title: "Lire ce morceau",
                                children: "Lire"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AudioQueueHUD.tsx",
                                lineNumber: 20,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "text-red-400 hover:underline text-xs",
                                onClick: ()=>removeFromQueue(i),
                                title: "Retirer de la file",
                                children: "✕"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AudioQueueHUD.tsx",
                                lineNumber: 25,
                                columnNumber: 13
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/src/components/AudioQueueHUD.tsx",
                        lineNumber: 14,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/AudioQueueHUD.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AudioQueueHUD.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_s(AudioQueueHUD, "vQgMFVSuwqFC4IKR3VpDHHdNeak=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AudioContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAudio"]
    ];
});
_c = AudioQueueHUD;
var _c;
__turbopack_context__.k.register(_c, "AudioQueueHUD");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/musique/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>MusiquePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AudioContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AudioContext.tsx [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/components/TrackItem'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AudioQueueHUD$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AudioQueueHUD.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function MusiquePage() {
    _s();
    const [tracks, setTracks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [jamendoTracks, setJamendoTracks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { play, pause, isPlaying, volume, setVolume, queue, addToQueue, playTrack } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AudioContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAudio"])();
    // Suppression d'un morceau
    const handleDelete = async (id)=>{
        if (!confirm("Supprimer ce morceau ?")) return;
        const res = await fetch(`/api/tracks/${id}`, {
            method: "DELETE"
        });
        if (res.ok) setTracks((tracks)=>tracks.filter((t)=>t.id !== id));
        else alert("Erreur lors de la suppression");
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MusiquePage.useEffect": ()=>{
            // Fetch local tracks
            fetch("/api/tracks").then({
                "MusiquePage.useEffect": (res)=>res.json()
            }["MusiquePage.useEffect"]).then(setTracks);
            // Fetch Jamendo world hits
            fetch("/api/world-hits").then({
                "MusiquePage.useEffect": (res)=>res.json()
            }["MusiquePage.useEffect"]).then(setJamendoTracks);
        }
    }["MusiquePage.useEffect"], []);
    // Filtrage des morceaux selon la recherche
    const filteredTracks = tracks.filter((track)=>track.title.toLowerCase().includes(search.toLowerCase()) || track.artist.toLowerCase().includes(search.toLowerCase()) || (track.album?.toLowerCase().includes(search.toLowerCase()) ?? false));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MusiquePage.useEffect": ()=>{
            const handleKeyDown = {
                "MusiquePage.useEffect.handleKeyDown": (e)=>{
                    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return; // ignore si focus sur input
                    if (e.code === "Space") {
                        e.preventDefault();
                        isPlaying ? pause() : play();
                    }
                    if (e.code === "ArrowUp") {
                        e.preventDefault();
                        setVolume(Math.min(1, volume + 0.05));
                    }
                    if (e.code === "ArrowDown") {
                        e.preventDefault();
                        setVolume(Math.max(0, volume - 0.05));
                    }
                }
            }["MusiquePage.useEffect.handleKeyDown"];
            window.addEventListener("keydown", handleKeyDown);
            return ({
                "MusiquePage.useEffect": ()=>window.removeEventListener("keydown", handleKeyDown)
            })["MusiquePage.useEffect"];
        }
    }["MusiquePage.useEffect"], [
        isPlaying,
        play,
        pause,
        volume,
        setVolume
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-kodi-blue/40 py-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-4xl mx-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl font-extrabold text-white drop-shadow",
                                children: "🎵 Ma musique"
                            }, void 0, false, {
                                fileName: "[project]/src/app/musique/page.tsx",
                                lineNumber: 86,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "/musique/ajouter",
                                className: "bg-kodi-blue hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition",
                                children: "+ Ajouter un morceau"
                            }, void 0, false, {
                                fileName: "[project]/src/app/musique/page.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/musique/page.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            placeholder: "Rechercher un titre, artiste ou album...",
                            value: search,
                            onChange: (e)=>setSearch(e.target.value),
                            className: "w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                        }, void 0, false, {
                            fileName: "[project]/src/app/musique/page.tsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/musique/page.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-bold text-white mb-4",
                        children: "Mes morceaux"
                    }, void 0, false, {
                        fileName: "[project]/src/app/musique/page.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    filteredTracks.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-400 text-center",
                        children: "Aucun morceau trouvé."
                    }, void 0, false, {
                        fileName: "[project]/src/app/musique/page.tsx",
                        lineNumber: 109,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10",
                        children: filteredTracks.map((track)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TrackItem, {
                                track: track,
                                onDelete: handleDelete,
                                onQueue: (id)=>{
                                    const t = tracks.find((t)=>t.id === id);
                                    if (t) addToQueue(t);
                                },
                                onPlay: (track)=>play(track)
                            }, track.id, false, {
                                fileName: "[project]/src/app/musique/page.tsx",
                                lineNumber: 113,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/musique/page.tsx",
                        lineNumber: 111,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-bold text-white mb-4 mt-10",
                        children: "Top musiques libres de droits"
                    }, void 0, false, {
                        fileName: "[project]/src/app/musique/page.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this),
                    jamendoTracks.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-400 text-center",
                        children: "Chargement des musiques libres..."
                    }, void 0, false, {
                        fileName: "[project]/src/app/musique/page.tsx",
                        lineNumber: 130,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 gap-6",
                        children: jamendoTracks.map((track)=>{
                            const jamendoAsTrack = {
                                id: Number(track.id),
                                title: track.name,
                                artist: track.artist_name,
                                album: track.album_name,
                                url: track.audio,
                                createdAt: "",
                                cover: track.album_image,
                                genre: "",
                                year: undefined
                            };
                            // Vérifie si déjà dans la file
                            const isInQueue = queue.some((t)=>t.url === jamendoAsTrack.url);
                            // Vérifie si déjà dans la bibliothèque locale
                            const isInLibrary = tracks.some((t)=>t.url === jamendoAsTrack.url);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gray-700 rounded p-4 flex flex-col gap-1 shadow hover:bg-kodi-blue/80 transition",
                                children: [
                                    track.album_image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: track.album_image,
                                        alt: "cover",
                                        className: "w-32 h-32 object-cover rounded mb-2 mx-auto"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/musique/page.tsx",
                                        lineNumber: 153,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-32 h-32 bg-gray-600 rounded mb-2 mx-auto flex items-center justify-center text-gray-400",
                                        children: "Pas de cover"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/musique/page.tsx",
                                        lineNumber: 155,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-semibold text-lg",
                                        children: track.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/musique/page.tsx",
                                        lineNumber: 157,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-gray-300",
                                        children: [
                                            track.artist_name,
                                            " — ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "italic",
                                                children: track.album_name
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/musique/page.tsx",
                                                lineNumber: 158,
                                                columnNumber: 80
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/musique/page.tsx",
                                        lineNumber: 158,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2 mt-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "bg-kodi-blue text-white px-2 py-1 rounded text-xs hover:bg-blue-700",
                                                onClick: ()=>playTrack(jamendoAsTrack),
                                                children: "Écouter"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/musique/page.tsx",
                                                lineNumber: 160,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: `flex-1 bg-gray-600 text-white px-2 py-1 rounded text-xs hover:bg-gray-500 ${isInQueue ? "opacity-50 cursor-not-allowed" : ""}`,
                                                onClick: async ()=>{
                                                    if (isInLibrary) return;
                                                    const res = await fetch("/api/tracks", {
                                                        method: "POST",
                                                        headers: {
                                                            "Content-Type": "application/json"
                                                        },
                                                        body: JSON.stringify(jamendoAsTrack)
                                                    });
                                                    if (res.ok) {
                                                        fetch("/api/tracks").then((res)=>res.json()).then(setTracks);
                                                        setMessage("Morceau sauvegardé !");
                                                        setTimeout(()=>setMessage(null), 2000);
                                                    } else {
                                                        const data = await res.json();
                                                        setMessage(data.error || "Erreur lors de la sauvegarde");
                                                    }
                                                },
                                                children: isInLibrary ? "Déjà sauvegardé" : "Sauvegarder"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/musique/page.tsx",
                                                lineNumber: 166,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/musique/page.tsx",
                                        lineNumber: 159,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, track.id, true, {
                                fileName: "[project]/src/app/musique/page.tsx",
                                lineNumber: 151,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/app/musique/page.tsx",
                        lineNumber: 132,
                        columnNumber: 11
                    }, this),
                    message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `mb-4 p-2 rounded text-center ${message.includes("sauvegardé") ? "bg-green-700" : "bg-red-700"} text-white`,
                        children: message
                    }, void 0, false, {
                        fileName: "[project]/src/app/musique/page.tsx",
                        lineNumber: 199,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/musique/page.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AudioQueueHUD$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/app/musique/page.tsx",
                lineNumber: 204,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/musique/page.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
_s(MusiquePage, "hTpXhZQydReFToRDjr72oiMmy/o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AudioContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAudio"]
    ];
});
_c = MusiquePage;
var _c;
__turbopack_context__.k.register(_c, "MusiquePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_610129e7._.js.map