module.exports = {

"[project]/.next-internal/server/app/api/tracks/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}}),
"[externals]/fs/promises [external] (fs/promises, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}}),
"[externals]/path [external] (path, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}}),
"[project]/src/utils/audioDb.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "fetchAudioDbMetadata": (()=>fetchAudioDbMetadata),
    "fetchWorldHits": (()=>fetchWorldHits)
});
async function fetchAudioDbMetadata(artist, track) {
    const url = `https://theaudiodb.com/api/v1/json/2/searchtrack.php?s=${encodeURIComponent(artist)}&t=${encodeURIComponent(track)}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.track && data.track.length > 0) {
        return data.track[0] // Contient cover, genre, album, etc.
        ;
    }
    return null;
}
async function fetchWorldHits() {
    // Ex: les 10 derniers singles ajoutés sur TheAudioDB
    const url = "https://theaudiodb.com/api/v1/json/2/trending.php?country=us&type=itunes&format=singles";
    const res = await fetch(url);
    const data = await res.json();
    return data.trending || [];
}
}}),
"[project]/src/app/api/tracks/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET),
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$audioDb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/audioDb.ts [app-route] (ecmascript)");
;
;
;
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
async function GET() {
    const tracks = await prisma.track.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(tracks);
}
async function POST(req) {
    let title = "";
    let artist = "";
    let album = "";
    let url = "";
    let cover = null;
    let genre = null;
    let year = null;
    // 1. Détecte le type de contenu
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
        // --- Cas Jamendo ou ajout externe ---
        const data = await req.json();
        title = data.title;
        artist = data.artist;
        album = data.album || "";
        url = data.url;
        cover = data.cover || null;
        genre = data.genre || null;
        year = data.year || null;
    } else if (contentType.includes("multipart/form-data")) {
        // --- Cas upload local ---
        const formData = await req.formData();
        const file = formData.get("file");
        title = formData.get("title");
        artist = formData.get("artist");
        album = formData.get("album");
        if (file && file.size > 0) {
            const fileName = file.name.replace(/\s/g, "_");
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "public", "music", fileName);
            await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["writeFile"])(filePath, buffer);
            url = `/music/${fileName}`;
        }
    // Optionnel : cover, genre, year depuis le formData si tu veux
    }
    // Optionnel : enrichir avec AudioDb si info manquante
    try {
        const meta = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$audioDb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchAudioDbMetadata"])(artist, title);
        genre = genre || meta?.strGenre || null;
        year = year || meta?.intYearReleased || null;
        cover = cover || meta?.strTrackThumb || null;
    } catch (e) {
    // non bloquant
    }
    if (!url || !title || !artist) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Champs obligatoires manquants"
        }, {
            status: 400
        });
    }
    // Vérifie s'il existe déjà (par url ou par titre/artiste)
    const existing = await prisma.track.findFirst({
        where: {
            OR: [
                {
                    url
                },
                {
                    AND: [
                        {
                            title
                        },
                        {
                            artist
                        }
                    ]
                }
            ]
        }
    });
    if (existing) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Ce morceau existe déjà."
        }, {
            status: 409
        });
    }
    // Enregistre la piste en BDD avec les métadonnées
    const track = await prisma.track.create({
        data: {
            title,
            artist,
            album,
            url,
            cover,
            genre,
            year: year ? Number(year) : null
        }
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(track);
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__0f28c2dd._.js.map