(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/Panel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Panel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
;
;
function Panel(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(13);
    if ($[0] !== "d607754660893d0183ea11198fc571621d58e7c5d7249dbf9635c6ccc29afd9f") {
        for(let $i = 0; $i < 13; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "d607754660893d0183ea11198fc571621d58e7c5d7249dbf9635c6ccc29afd9f";
    }
    const { title, description, actions, children, className: t1 } = t0;
    const className = t1 === undefined ? "" : t1;
    const t2 = `rounded-2xl border border-[#EADAFB]/70 dark:border-[#2b1f4a] bg-gradient-to-br from-[#FFFFFF] via-[#FCEBFF]/80 to-[#FED2E2]/70 dark:from-[#23143E]/90 dark:via-[#1C1033]/70 dark:to-[#120A23]/70 p-5 shadow-md transition-shadow hover:shadow-xl ${className}`;
    let t3;
    if ($[1] !== t2) {
        t3 = t2.trim();
        $[1] = t2;
        $[2] = t3;
    } else {
        t3 = $[2];
    }
    let t4;
    if ($[3] !== actions || $[4] !== description || $[5] !== title) {
        t4 = (title || description || actions) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
            className: "mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        title ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-base sm:text-lg font-semibold text-slate-900 dark:text-white",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/src/components/Panel.tsx",
                            lineNumber: 37,
                            columnNumber: 153
                        }, this) : null,
                        description ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-slate-500 dark:text-slate-400",
                            children: description
                        }, void 0, false, {
                            fileName: "[project]/src/components/Panel.tsx",
                            lineNumber: 37,
                            columnNumber: 270
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Panel.tsx",
                    lineNumber: 37,
                    columnNumber: 139
                }, this),
                actions ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap gap-2",
                    children: actions
                }, void 0, false, {
                    fileName: "[project]/src/components/Panel.tsx",
                    lineNumber: 37,
                    columnNumber: 370
                }, this) : null
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Panel.tsx",
            lineNumber: 37,
            columnNumber: 47
        }, this);
        $[3] = actions;
        $[4] = description;
        $[5] = title;
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    let t5;
    if ($[7] !== children) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/Panel.tsx",
            lineNumber: 47,
            columnNumber: 10
        }, this);
        $[7] = children;
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    let t6;
    if ($[9] !== t3 || $[10] !== t4 || $[11] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: t3,
            children: [
                t4,
                t5
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Panel.tsx",
            lineNumber: 55,
            columnNumber: 10
        }, this);
        $[9] = t3;
        $[10] = t4;
        $[11] = t5;
        $[12] = t6;
    } else {
        t6 = $[12];
    }
    return t6;
}
_c = Panel;
var _c;
__turbopack_context__.k.register(_c, "Panel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/StatCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StatCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
"use client";
;
;
;
function StatCard(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(29);
    if ($[0] !== "305cb39821b257dfcec3339f7d620eefcf1189ab701f36e639cdbeca6165d633") {
        for(let $i = 0; $i < 29; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "305cb39821b257dfcec3339f7d620eefcf1189ab701f36e639cdbeca6165d633";
    }
    const { label, value, helper, icon, onClick } = t0;
    const CardElement = onClick ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div;
    const t1 = onClick ? "button" : undefined;
    const t2 = `rounded-2xl border border-white/60 dark:border-[#2b1f4a] bg-gradient-to-br from-[#FDF5FF] via-[#E9A5F1]/60 to-[#C68EFD]/40 dark:from-[#281745] dark:via-[#1f1136] dark:to-[#120926] p-5 shadow-lg shadow-[#C68EFD]/20 transition ${onClick ? "text-left focus:outline-none focus:ring-2 focus:ring-blue-400/40 cursor-pointer" : ""}`;
    let t3;
    let t4;
    let t5;
    let t6;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = {
            opacity: 0,
            y: 10
        };
        t4 = {
            opacity: 1,
            y: 0
        };
        t5 = {
            duration: 0.2
        };
        t6 = {
            y: -4
        };
        $[1] = t3;
        $[2] = t4;
        $[3] = t5;
        $[4] = t6;
    } else {
        t3 = $[1];
        t4 = $[2];
        t5 = $[3];
        t6 = $[4];
    }
    let t7;
    if ($[5] !== onClick) {
        t7 = onClick ? {
            scale: 0.98
        } : undefined;
        $[5] = onClick;
        $[6] = t7;
    } else {
        t7 = $[6];
    }
    let t8;
    if ($[7] !== icon) {
        t8 = icon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-blue-600 dark:text-blue-300",
            children: icon
        }, void 0, false, {
            fileName: "[project]/src/components/StatCard.tsx",
            lineNumber: 72,
            columnNumber: 17
        }, this) : null;
        $[7] = icon;
        $[8] = t8;
    } else {
        t8 = $[8];
    }
    let t9;
    if ($[9] !== label) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs uppercase tracking-[0.3em] text-slate-400",
            children: label
        }, void 0, false, {
            fileName: "[project]/src/components/StatCard.tsx",
            lineNumber: 80,
            columnNumber: 10
        }, this);
        $[9] = label;
        $[10] = t9;
    } else {
        t9 = $[10];
    }
    let t10;
    if ($[11] !== value) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-2xl font-semibold text-slate-900 dark:text-white mt-2",
            children: value
        }, void 0, false, {
            fileName: "[project]/src/components/StatCard.tsx",
            lineNumber: 88,
            columnNumber: 11
        }, this);
        $[11] = value;
        $[12] = t10;
    } else {
        t10 = $[12];
    }
    let t11;
    if ($[13] !== helper) {
        t11 = helper ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs text-slate-500 dark:text-slate-400 mt-1",
            children: helper
        }, void 0, false, {
            fileName: "[project]/src/components/StatCard.tsx",
            lineNumber: 96,
            columnNumber: 20
        }, this) : null;
        $[13] = helper;
        $[14] = t11;
    } else {
        t11 = $[14];
    }
    let t12;
    if ($[15] !== t10 || $[16] !== t11 || $[17] !== t9) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t9,
                t10,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/StatCard.tsx",
            lineNumber: 104,
            columnNumber: 11
        }, this);
        $[15] = t10;
        $[16] = t11;
        $[17] = t9;
        $[18] = t12;
    } else {
        t12 = $[18];
    }
    let t13;
    if ($[19] !== t12 || $[20] !== t8) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-start gap-3",
            children: [
                t8,
                t12
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/StatCard.tsx",
            lineNumber: 114,
            columnNumber: 11
        }, this);
        $[19] = t12;
        $[20] = t8;
        $[21] = t13;
    } else {
        t13 = $[21];
    }
    let t14;
    if ($[22] !== CardElement || $[23] !== onClick || $[24] !== t1 || $[25] !== t13 || $[26] !== t2 || $[27] !== t7) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardElement, {
            type: t1,
            onClick: onClick,
            className: t2,
            initial: t3,
            animate: t4,
            transition: t5,
            whileHover: t6,
            whileTap: t7,
            children: t13
        }, void 0, false, {
            fileName: "[project]/src/components/StatCard.tsx",
            lineNumber: 123,
            columnNumber: 11
        }, this);
        $[22] = CardElement;
        $[23] = onClick;
        $[24] = t1;
        $[25] = t13;
        $[26] = t2;
        $[27] = t7;
        $[28] = t14;
    } else {
        t14 = $[28];
    }
    return t14;
}
_c = StatCard;
var _c;
__turbopack_context__.k.register(_c, "StatCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/format.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatBDT",
    ()=>formatBDT
]);
function formatBDT(valueMinor) {
    const taka = (valueMinor || 0) / 100;
    return new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT"
    }).format(taka);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/MemberCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MemberCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/format.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
"use client";
;
;
;
;
function MemberCard(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(28);
    if ($[0] !== "11446cefc60381974b742c0af4cf9edd5e61b3e6472c51c4674abca1dc210671") {
        for(let $i = 0; $i < 28; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "11446cefc60381974b742c0af4cf9edd5e61b3e6472c51c4674abca1dc210671";
    }
    const { member, onSelect } = t0;
    let t1;
    if ($[1] !== member.userId || $[2] !== onSelect) {
        t1 = ({
            "MemberCard[handleClick]": ()=>{
                if (onSelect) {
                    onSelect(member.userId);
                }
            }
        })["MemberCard[handleClick]"];
        $[1] = member.userId;
        $[2] = onSelect;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    const handleClick = t1;
    const Card = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button;
    const t2 = `w-full text-left rounded-2xl border border-white/70 dark:border-[#2b1f4a] bg-gradient-to-br from-[#FDF5FF]/90 via-[#E9A5F1]/60 to-[#C68EFD]/50 dark:from-[#271444]/80 dark:via-[#1f0f37]/60 dark:to-[#140a25]/60 p-4 shadow-lg shadow-[#8F87F1]/15 ${onSelect ? "focus:outline-none focus:ring-2 focus:ring-[#C68EFD]/40" : ""}`;
    let t3;
    let t4;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = {
            y: -4,
            boxShadow: "0 20px 30px rgba(143,135,241,0.25)"
        };
        t4 = {
            scale: 0.98
        };
        $[4] = t3;
        $[5] = t4;
    } else {
        t3 = $[4];
        t4 = $[5];
    }
    let t5;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = {
            duration: 0.2,
            ease: [
                0.16,
                1,
                0.3,
                1
            ]
        };
        $[6] = t5;
    } else {
        t5 = $[6];
    }
    let t6;
    if ($[7] !== member.name) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-base font-semibold text-slate-900 dark:text-white",
            children: member.name
        }, void 0, false, {
            fileName: "[project]/src/components/MemberCard.tsx",
            lineNumber: 72,
            columnNumber: 10
        }, this);
        $[7] = member.name;
        $[8] = t6;
    } else {
        t6 = $[8];
    }
    const t7 = member.lastMonth || 0;
    let t8;
    if ($[9] !== t7) {
        t8 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBDT"])(t7);
        $[9] = t7;
        $[10] = t8;
    } else {
        t8 = $[10];
    }
    let t9;
    if ($[11] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs text-slate-500 dark:text-slate-400",
            children: [
                "Last month ",
                t8
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/MemberCard.tsx",
            lineNumber: 89,
            columnNumber: 10
        }, this);
        $[11] = t8;
        $[12] = t9;
    } else {
        t9 = $[12];
    }
    let t10;
    if ($[13] !== t6 || $[14] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t6,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/MemberCard.tsx",
            lineNumber: 97,
            columnNumber: 11
        }, this);
        $[13] = t6;
        $[14] = t9;
        $[15] = t10;
    } else {
        t10 = $[15];
    }
    let t11;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs text-slate-500 dark:text-slate-400",
            children: "Balance"
        }, void 0, false, {
            fileName: "[project]/src/components/MemberCard.tsx",
            lineNumber: 106,
            columnNumber: 11
        }, this);
        $[16] = t11;
    } else {
        t11 = $[16];
    }
    const t12 = member.balance || 0;
    let t13;
    if ($[17] !== t12) {
        t13 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBDT"])(t12);
        $[17] = t12;
        $[18] = t13;
    } else {
        t13 = $[18];
    }
    let t14;
    if ($[19] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-right",
            children: [
                t11,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm font-semibold text-emerald-600 dark:text-emerald-300",
                    children: t13
                }, void 0, false, {
                    fileName: "[project]/src/components/MemberCard.tsx",
                    lineNumber: 122,
                    columnNumber: 44
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/MemberCard.tsx",
            lineNumber: 122,
            columnNumber: 11
        }, this);
        $[19] = t13;
        $[20] = t14;
    } else {
        t14 = $[20];
    }
    let t15;
    if ($[21] !== t10 || $[22] !== t14) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between",
            children: [
                t10,
                t14
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/MemberCard.tsx",
            lineNumber: 130,
            columnNumber: 11
        }, this);
        $[21] = t10;
        $[22] = t14;
        $[23] = t15;
    } else {
        t15 = $[23];
    }
    let t16;
    if ($[24] !== handleClick || $[25] !== t15 || $[26] !== t2) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
            type: "button",
            onClick: handleClick,
            className: t2,
            whileHover: t3,
            whileTap: t4,
            transition: t5,
            children: t15
        }, void 0, false, {
            fileName: "[project]/src/components/MemberCard.tsx",
            lineNumber: 139,
            columnNumber: 11
        }, this);
        $[24] = handleClick;
        $[25] = t15;
        $[26] = t2;
        $[27] = t16;
    } else {
        t16 = $[27];
    }
    return t16;
}
_c = MemberCard;
var _c;
__turbopack_context__.k.register(_c, "MemberCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/PageHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PageHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
;
;
function PageHeader(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(18);
    if ($[0] !== "0fb3cb26e6abcca2cc6a6c72cc834e2e029dee4fee7462bbb8464d3485d698e4") {
        for(let $i = 0; $i < 18; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "0fb3cb26e6abcca2cc6a6c72cc834e2e029dee4fee7462bbb8464d3485d698e4";
    }
    const { eyebrow, title, description, actions } = t0;
    let t1;
    if ($[1] !== eyebrow) {
        t1 = eyebrow ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs uppercase tracking-[0.3em] text-slate-400",
            children: eyebrow
        }, void 0, false, {
            fileName: "[project]/src/components/layout/PageHeader.tsx",
            lineNumber: 25,
            columnNumber: 20
        }, this) : null;
        $[1] = eyebrow;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] !== title) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: "text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white",
            children: title
        }, void 0, false, {
            fileName: "[project]/src/components/layout/PageHeader.tsx",
            lineNumber: 33,
            columnNumber: 10
        }, this);
        $[3] = title;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] !== description) {
        t3 = description ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-base text-slate-500 dark:text-slate-400 max-w-3xl",
            children: description
        }, void 0, false, {
            fileName: "[project]/src/components/layout/PageHeader.tsx",
            lineNumber: 41,
            columnNumber: 24
        }, this) : null;
        $[5] = description;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    let t4;
    if ($[7] !== t2 || $[8] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2",
            children: [
                t2,
                t3
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/PageHeader.tsx",
            lineNumber: 49,
            columnNumber: 10
        }, this);
        $[7] = t2;
        $[8] = t3;
        $[9] = t4;
    } else {
        t4 = $[9];
    }
    let t5;
    if ($[10] !== actions) {
        t5 = actions ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-wrap gap-2",
            children: actions
        }, void 0, false, {
            fileName: "[project]/src/components/layout/PageHeader.tsx",
            lineNumber: 58,
            columnNumber: 20
        }, this) : null;
        $[10] = actions;
        $[11] = t5;
    } else {
        t5 = $[11];
    }
    let t6;
    if ($[12] !== t4 || $[13] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
            children: [
                t4,
                t5
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/PageHeader.tsx",
            lineNumber: 66,
            columnNumber: 10
        }, this);
        $[12] = t4;
        $[13] = t5;
        $[14] = t6;
    } else {
        t6 = $[14];
    }
    let t7;
    if ($[15] !== t1 || $[16] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mb-6 space-y-3",
            children: [
                t1,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/PageHeader.tsx",
            lineNumber: 75,
            columnNumber: 10
        }, this);
        $[15] = t1;
        $[16] = t6;
        $[17] = t7;
    } else {
        t7 = $[17];
    }
    return t7;
}
_c = PageHeader;
var _c;
__turbopack_context__.k.register(_c, "PageHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/clientApi.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "api",
    ()=>api
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/format.ts [app-client] (ecmascript)");
;
;
const baseURL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";
const api = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL,
    withCredentials: true
});
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
"use client";
;
;
const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-500",
    secondary: "bg-white border border-blue-200 text-blue-700 hover:bg-blue-50",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
    danger: "bg-rose-600 text-white hover:bg-rose-500"
};
function Button(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "6f30948fc378736251a22c9b264ddd86fc729ce925ee1078d8994c89c84cfd43") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "6f30948fc378736251a22c9b264ddd86fc729ce925ee1078d8994c89c84cfd43";
    }
    let props;
    let t1;
    let t2;
    if ($[1] !== t0) {
        ({ variant: t1, className: t2, ...props } = t0);
        $[1] = t0;
        $[2] = props;
        $[3] = t1;
        $[4] = t2;
    } else {
        props = $[2];
        t1 = $[3];
        t2 = $[4];
    }
    const variant = t1 === undefined ? "primary" : t1;
    const className = t2 === undefined ? "" : t2;
    const t3 = `inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`;
    let t4;
    if ($[5] !== props || $[6] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: t3,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/Button.tsx",
            lineNumber: 45,
            columnNumber: 10
        }, this);
        $[5] = props;
        $[6] = t3;
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    return t4;
}
_c = Button;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/deposit/DepositForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DepositForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/format.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function DepositForm({ userId }) {
    _s();
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("simple");
    const [amount, setAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [date, setDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "DepositForm.useState": ()=>new Date().toISOString().slice(0, 10)
    }["DepositForm.useState"]);
    const [note, setNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Deposit");
    const [includePenalty, setIncludePenalty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [dues, setDues] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [dueId, setDueId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadingDues, setLoadingDues] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [investments, setInvestments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [investmentId, setInvestmentId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadingInvestments, setLoadingInvestments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [investmentError, setInvestmentError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DepositForm.useEffect": ()=>{
            setAmount("");
            setDueId(null);
        }
    }["DepositForm.useEffect"], [
        userId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DepositForm.useEffect": ()=>{
            if (mode !== "pay_due") return;
            setLoadingDues(true);
            setError(null);
            fetch(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBrowserApiBase"])()}/users/${userId}/dues`, {
                credentials: "include"
            }).then({
                "DepositForm.useEffect": async (res)=>{
                    if (!res.ok) throw new Error("Failed to load dues");
                    const list = await res.json();
                    setDues(list);
                    if (list.length && !dueId) setDueId(list[0]._id);
                }
            }["DepositForm.useEffect"]).catch({
                "DepositForm.useEffect": (err)=>setError(err?.message || "Failed to load dues")
            }["DepositForm.useEffect"]).finally({
                "DepositForm.useEffect": ()=>setLoadingDues(false)
            }["DepositForm.useEffect"]);
        }
    }["DepositForm.useEffect"], [
        mode,
        userId,
        dueId
    ]);
    const hasOpenDues = dues.length > 0;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DepositForm.useEffect": ()=>{
            if (mode === "pay_due" && hasOpenDues && !dueId) setDueId(dues[0]._id);
        }
    }["DepositForm.useEffect"], [
        mode,
        hasOpenDues,
        dues,
        dueId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DepositForm.useEffect": ()=>{
            if (mode !== "investment_return") return;
            setLoadingInvestments(true);
            setInvestmentError(null);
            fetch(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBrowserApiBase"])()}/investments`, {
                credentials: "include"
            }).then({
                "DepositForm.useEffect": async (res_0)=>{
                    if (!res_0.ok) throw new Error((await res_0.json())?.error || "Failed to load investments");
                    const list_0 = await res_0.json();
                    setInvestments(list_0);
                    if (list_0.length) setInvestmentId(list_0[0].id);
                }
            }["DepositForm.useEffect"]).catch({
                "DepositForm.useEffect": (err_0)=>setInvestmentError(err_0?.message || "Failed to load investments")
            }["DepositForm.useEffect"]).finally({
                "DepositForm.useEffect": ()=>setLoadingInvestments(false)
            }["DepositForm.useEffect"]);
        }
    }["DepositForm.useEffect"], [
        mode
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DepositForm.useEffect": ()=>{
            setNote({
                "DepositForm.useEffect": (prev)=>{
                    if (mode === "investment_return" && prev === "Deposit") return "Investment return";
                    if (mode !== "investment_return" && prev === "Investment return") return "Deposit";
                    return prev;
                }
            }["DepositForm.useEffect"]);
        }
    }["DepositForm.useEffect"], [
        mode
    ]);
    const selected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DepositForm.useMemo[selected]": ()=>dues.find({
                "DepositForm.useMemo[selected]": (d)=>d._id === dueId
            }["DepositForm.useMemo[selected]"])
    }["DepositForm.useMemo[selected]"], [
        dues,
        dueId
    ]);
    const suggested = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DepositForm.useMemo[suggested]": ()=>{
            if (!selected) return 0;
            const today = new Date(date);
            const grace = selected.penaltyRule?.graceDays ?? 3;
            const pct = selected.penaltyRule?.monthlyPenaltyPct ?? 1;
            for (const item of selected.schedule){
                if (item.status === "paid") continue;
                const base = (item.totalDuePoisha || 0) - (item.paidPoisha || 0);
                if (base <= 0) continue;
                const dueDate = new Date(item.dueDate);
                dueDate.setDate(dueDate.getDate() + grace);
                let total = base;
                if (includePenalty && today > dueDate && selected.penaltyRule?.enabled) {
                    total += Math.floor(item.totalDuePoisha * pct / 100);
                }
                return total;
            }
            return 0;
        }
    }["DepositForm.useMemo[suggested]"], [
        selected,
        includePenalty,
        date
    ]);
    const onSubmit = async ()=>{
        if (!userId) return;
        setSaving(true);
        setError(null);
        try {
            if (mode === "investment_return") {
                if (!investmentId) throw new Error("Pick an investment to credit the return against.");
                const amtTaka = Number(amount);
                if (!amtTaka || !Number.isFinite(amtTaka)) throw new Error("Enter the amount that came back.");
                const res_1 = await fetch(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBrowserApiBase"])()}/investments/${investmentId}/return`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        amount: amtTaka,
                        date,
                        note
                    })
                });
                if (!res_1.ok) throw new Error((await res_1.json())?.error || "Failed to record investment return");
                setAmount("");
                setMode("simple");
                setInvestmentId(null);
                return;
            }
            const payload = {
                userId,
                mode,
                date,
                note,
                includePenalty
            };
            const amtTaka_0 = Number(amount);
            if (amount) payload.amount = Number.isFinite(amtTaka_0) ? amtTaka_0 : 0;
            else payload.amountPoisha = suggested || 0;
            if (mode === "pay_due") payload.dueId = dueId;
            const res_2 = await fetch(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBrowserApiBase"])()}/deposit`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            if (!res_2.ok) throw new Error((await res_2.json())?.error || "Deposit failed");
            setAmount("");
        } catch (err_1) {
            setError(err_1?.message || "Deposit failed");
        } finally{
            setSaving(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "rounded-2xl border border-slate-200 dark:border-slate-800 p-4 bg-white/70 dark:bg-slate-900/40 space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs uppercase tracking-[0.3em] text-slate-400",
                                children: "Step 1"
                            }, void 0, false, {
                                fileName: "[project]/src/components/deposit/DepositForm.tsx",
                                lineNumber: 168,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-base font-semibold text-slate-900 dark:text-white",
                                children: "Choose the intent"
                            }, void 0, false, {
                                fileName: "[project]/src/components/deposit/DepositForm.tsx",
                                lineNumber: 169,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/deposit/DepositForm.tsx",
                        lineNumber: 167,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ModeCard, {
                                title: "Simple deposit",
                                body: "Keeps the balance free for future withdrawals.",
                                active: mode === "simple",
                                onClick: ()=>setMode("simple")
                            }, void 0, false, {
                                fileName: "[project]/src/components/deposit/DepositForm.tsx",
                                lineNumber: 172,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ModeCard, {
                                title: "Pay down a due",
                                body: hasOpenDues ? "Apply this to their repayment schedule." : "No open dues right now.",
                                active: mode === "pay_due",
                                onClick: ()=>setMode("pay_due"),
                                disabled: !hasOpenDues
                            }, void 0, false, {
                                fileName: "[project]/src/components/deposit/DepositForm.tsx",
                                lineNumber: 173,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ModeCard, {
                                title: "Investment return",
                                body: "Re-add money that just came back from an investment.",
                                active: mode === "investment_return",
                                onClick: ()=>setMode("investment_return")
                            }, void 0, false, {
                                fileName: "[project]/src/components/deposit/DepositForm.tsx",
                                lineNumber: 174,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/deposit/DepositForm.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this),
                    mode === "pay_due" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-blue-100 dark:border-blue-500/30 bg-blue-50/60 dark:bg-blue-500/10 p-4 space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-sm font-semibold text-slate-900 dark:text-white",
                                        children: "Target a due"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/deposit/DepositForm.tsx",
                                        lineNumber: 179,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-blue-600 dark:text-blue-200 font-medium bg-blue-100/70 dark:bg-blue-500/20 px-2 py-0.5 rounded-full",
                                        children: loadingDues ? "Loading…" : `${dues.length} open`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/deposit/DepositForm.tsx",
                                        lineNumber: 180,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/deposit/DepositForm.tsx",
                                lineNumber: 178,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                className: "input-like",
                                value: dueId || "",
                                onChange: (e)=>setDueId(e.target.value),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "Select due…"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/deposit/DepositForm.tsx",
                                        lineNumber: 185,
                                        columnNumber: 15
                                    }, this),
                                    dues.map((d_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: d_0._id,
                                            children: [
                                                "Principal ",
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBDT"])(d_0.principal),
                                                " — ",
                                                d_0.months,
                                                " mo @ ",
                                                d_0.monthlyRatePct,
                                                "%"
                                            ]
                                        }, d_0._id, true, {
                                            fileName: "[project]/src/components/deposit/DepositForm.tsx",
                                            lineNumber: 186,
                                            columnNumber: 32
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/deposit/DepositForm.tsx",
                                lineNumber: 184,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "inline-flex items-center gap-2 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: includePenalty,
                                        onChange: (e_0)=>setIncludePenalty(e_0.target.checked)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/deposit/DepositForm.tsx",
                                        lineNumber: 191,
                                        columnNumber: 15
                                    }, this),
                                    "Add penalty when grace period is over"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/deposit/DepositForm.tsx",
                                lineNumber: 190,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-blue-700 dark:text-blue-200 bg-white/60 dark:bg-slate-900/40 rounded-xl px-3 py-2 inline-flex items-center gap-2",
                                children: [
                                    "Suggested instalment: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBDT"])(suggested)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/deposit/DepositForm.tsx",
                                        lineNumber: 195,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/deposit/DepositForm.tsx",
                                lineNumber: 194,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/deposit/DepositForm.tsx",
                        lineNumber: 177,
                        columnNumber: 32
                    }, this),
                    mode === "investment_return" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-emerald-200 dark:border-emerald-500/40 bg-emerald-50/60 dark:bg-emerald-500/10 p-4 space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-sm font-semibold text-slate-900 dark:text-white",
                                        children: "Select the investment"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/deposit/DepositForm.tsx",
                                        lineNumber: 201,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-emerald-700 dark:text-emerald-200 font-medium bg-white/70 dark:bg-slate-900/40 px-2 py-0.5 rounded-full",
                                        children: loadingInvestments ? "Loading…" : `${investments.length} recorded`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/deposit/DepositForm.tsx",
                                        lineNumber: 202,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/deposit/DepositForm.tsx",
                                lineNumber: 200,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                className: "input-like",
                                value: investmentId || "",
                                onChange: (e_1)=>setInvestmentId(e_1.target.value || null),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "Pick an investment…"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/deposit/DepositForm.tsx",
                                        lineNumber: 207,
                                        columnNumber: 15
                                    }, this),
                                    investments.map((inv)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: inv.id,
                                            children: [
                                                inv.name,
                                                " · ",
                                                inv.status === "completed" ? "Completed" : "Active",
                                                " (",
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBDT"])(inv.amountPoisha),
                                                ")"
                                            ]
                                        }, inv.id, true, {
                                            fileName: "[project]/src/components/deposit/DepositForm.tsx",
                                            lineNumber: 208,
                                            columnNumber: 39
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/deposit/DepositForm.tsx",
                                lineNumber: 206,
                                columnNumber: 13
                            }, this),
                            investmentError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-rose-500",
                                children: investmentError
                            }, void 0, false, {
                                fileName: "[project]/src/components/deposit/DepositForm.tsx",
                                lineNumber: 212,
                                columnNumber: 32
                            }, this) : null,
                            !investments.length && !loadingInvestments ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-500",
                                children: "No investments recorded yet."
                            }, void 0, false, {
                                fileName: "[project]/src/components/deposit/DepositForm.tsx",
                                lineNumber: 213,
                                columnNumber: 59
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/deposit/DepositForm.tsx",
                        lineNumber: 199,
                        columnNumber: 42
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/deposit/DepositForm.tsx",
                lineNumber: 166,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "rounded-2xl border border-slate-200 dark:border-slate-800 p-4 bg-white/80 dark:bg-slate-900/50 space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs uppercase tracking-[0.3em] text-slate-400",
                                children: "Step 2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/deposit/DepositForm.tsx",
                                lineNumber: 219,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-base font-semibold text-slate-900 dark:text-white",
                                children: "Fill in the details"
                            }, void 0, false, {
                                fileName: "[project]/src/components/deposit/DepositForm.tsx",
                                lineNumber: 220,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/deposit/DepositForm.tsx",
                        lineNumber: 218,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                label: "Amount (BDT)",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: "input-like",
                                    type: "number",
                                    step: "0.01",
                                    placeholder: "0.00",
                                    value: amount,
                                    onChange: (e_2)=>setAmount(e_2.target.value)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/deposit/DepositForm.tsx",
                                    lineNumber: 224,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/deposit/DepositForm.tsx",
                                lineNumber: 223,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                label: "Date",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: "input-like",
                                    type: "date",
                                    value: date,
                                    onChange: (e_3)=>setDate(e_3.target.value)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/deposit/DepositForm.tsx",
                                    lineNumber: 227,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/deposit/DepositForm.tsx",
                                lineNumber: 226,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/deposit/DepositForm.tsx",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                        label: "Note",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: "input-like",
                            value: note,
                            onChange: (e_4)=>setNote(e_4.target.value)
                        }, void 0, false, {
                            fileName: "[project]/src/components/deposit/DepositForm.tsx",
                            lineNumber: 231,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/deposit/DepositForm.tsx",
                        lineNumber: 230,
                        columnNumber: 9
                    }, this),
                    error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-rose-500",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/components/deposit/DepositForm.tsx",
                        lineNumber: 233,
                        columnNumber: 18
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/deposit/DepositForm.tsx",
                lineNumber: 217,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-end",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    onClick: onSubmit,
                    disabled: saving,
                    children: saving ? "Saving…" : "Save deposit"
                }, void 0, false, {
                    fileName: "[project]/src/components/deposit/DepositForm.tsx",
                    lineNumber: 237,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/deposit/DepositForm.tsx",
                lineNumber: 236,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/deposit/DepositForm.tsx",
        lineNumber: 165,
        columnNumber: 10
    }, this);
}
_s(DepositForm, "W+579nj2rd61Jy18s0UNEBGZu/g=");
_c = DepositForm;
function Field(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(6);
    if ($[0] !== "b3272727f71d2b889e262d312481a89d56a0b88471c5ac6f29becf933f54e4d6") {
        for(let $i = 0; $i < 6; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "b3272727f71d2b889e262d312481a89d56a0b88471c5ac6f29becf933f54e4d6";
    }
    const { label, children } = t0;
    let t1;
    if ($[1] !== label) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "text-sm font-medium text-slate-600 dark:text-slate-300",
            children: label
        }, void 0, false, {
            fileName: "[project]/src/components/deposit/DepositForm.tsx",
            lineNumber: 257,
            columnNumber: 10
        }, this);
        $[1] = label;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] !== children || $[4] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-1",
            children: [
                t1,
                children
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/deposit/DepositForm.tsx",
            lineNumber: 265,
            columnNumber: 10
        }, this);
        $[3] = children;
        $[4] = t1;
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    return t2;
}
_c1 = Field;
function ModeCard(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(11);
    if ($[0] !== "b3272727f71d2b889e262d312481a89d56a0b88471c5ac6f29becf933f54e4d6") {
        for(let $i = 0; $i < 11; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "b3272727f71d2b889e262d312481a89d56a0b88471c5ac6f29becf933f54e4d6";
    }
    const { title, body, active, onClick, disabled } = t0;
    const t1 = `rounded-2xl border p-4 text-left transition disabled:opacity-60 disabled:cursor-not-allowed ${active ? "border-blue-400 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-500/10 dark:text-blue-200" : "border-slate-200 dark:border-slate-700 hover:border-blue-200 hover:bg-blue-50/40 dark:hover:border-blue-500/40 dark:hover:bg-slate-800"}`;
    let t2;
    if ($[1] !== title) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "font-semibold",
            children: title
        }, void 0, false, {
            fileName: "[project]/src/components/deposit/DepositForm.tsx",
            lineNumber: 292,
            columnNumber: 10
        }, this);
        $[1] = title;
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    let t3;
    if ($[3] !== body) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm text-slate-500 dark:text-slate-400",
            children: body
        }, void 0, false, {
            fileName: "[project]/src/components/deposit/DepositForm.tsx",
            lineNumber: 300,
            columnNumber: 10
        }, this);
        $[3] = body;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    if ($[5] !== disabled || $[6] !== onClick || $[7] !== t1 || $[8] !== t2 || $[9] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: onClick,
            disabled: disabled,
            className: t1,
            children: [
                t2,
                t3
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/deposit/DepositForm.tsx",
            lineNumber: 308,
            columnNumber: 10
        }, this);
        $[5] = disabled;
        $[6] = onClick;
        $[7] = t1;
        $[8] = t2;
        $[9] = t3;
        $[10] = t4;
    } else {
        t4 = $[10];
    }
    return t4;
}
_c2 = ModeCard;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "DepositForm");
__turbopack_context__.k.register(_c1, "Field");
__turbopack_context__.k.register(_c2, "ModeCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/withdraw/WithdrawForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/clientApi.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$ToastProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/providers/ToastProvider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function WithdrawForm(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(113);
    if ($[0] !== "988f66875459b80b760c3abe5af471885e5d46bffcbcdd45dbd9962d5103022b") {
        for(let $i = 0; $i < 113; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "988f66875459b80b760c3abe5af471885e5d46bffcbcdd45dbd9962d5103022b";
    }
    const { userId } = t0;
    const qc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const { notify } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$ToastProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const allowModeToggle = !userId;
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("member");
    const effectiveMode = userId ? "member" : mode;
    const [takerId, setTakerId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [amount, setAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [date, setDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(_WithdrawFormUseState);
    const [months, setMonths] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(3);
    const [rate, setRate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(2);
    const [penaltyEnabled, setPenaltyEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [penaltyPct, setPenaltyPct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [graceDays, setGraceDays] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(3);
    const [investmentName, setInvestmentName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [investmentStart, setInvestmentStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(_WithdrawFormUseState2);
    const [investmentMonths, setInvestmentMonths] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(6);
    const [investmentRate, setInvestmentRate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(3);
    const [investmentOpenEnded, setInvestmentOpenEnded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            queryKey: [
                "users"
            ],
            queryFn: _temp
        };
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const users = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t1);
    let t2;
    let t3;
    if ($[2] !== takerId || $[3] !== userId || $[4] !== users.data) {
        t2 = ({
            "WithdrawForm[useEffect()]": ()=>{
                if (userId) {
                    setTakerId(userId);
                    return;
                }
                if (!takerId && users.data?.length) {
                    setTakerId(users.data[0].id);
                }
            }
        })["WithdrawForm[useEffect()]"];
        t3 = [
            users.data,
            takerId,
            userId
        ];
        $[2] = takerId;
        $[3] = userId;
        $[4] = users.data;
        $[5] = t2;
        $[6] = t3;
    } else {
        t2 = $[5];
        t3 = $[6];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t2, t3);
    let t4;
    bb0: {
        if (!users.data) {
            let t5;
            if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
                t5 = [];
                $[7] = t5;
            } else {
                t5 = $[7];
            }
            t4 = t5;
            break bb0;
        }
        if (effectiveMode === "member") {
            let t5;
            if ($[8] !== takerId || $[9] !== users.data) {
                let t6;
                if ($[11] !== takerId) {
                    t6 = ({
                        "WithdrawForm[users.data.filter()]": (u)=>u.id !== takerId
                    })["WithdrawForm[users.data.filter()]"];
                    $[11] = takerId;
                    $[12] = t6;
                } else {
                    t6 = $[12];
                }
                t5 = users.data.filter(t6);
                $[8] = takerId;
                $[9] = users.data;
                $[10] = t5;
            } else {
                t5 = $[10];
            }
            t4 = t5;
            break bb0;
        }
        t4 = users.data;
    }
    const selectableMembers = t4;
    let t5;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = [];
        $[13] = t5;
    } else {
        t5 = $[13];
    }
    const [excluded, setExcluded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t5);
    let t6;
    let t7;
    if ($[14] !== effectiveMode || $[15] !== takerId) {
        t6 = ({
            "WithdrawForm[useEffect()]": ()=>{
                if (effectiveMode === "member") {
                    setExcluded({
                        "WithdrawForm[useEffect() > setExcluded()]": (prev)=>prev.filter({
                                "WithdrawForm[useEffect() > setExcluded() > prev.filter()]": (id)=>id !== takerId
                            }["WithdrawForm[useEffect() > setExcluded() > prev.filter()]"])
                    }["WithdrawForm[useEffect() > setExcluded()]"]);
                }
            }
        })["WithdrawForm[useEffect()]"];
        t7 = [
            effectiveMode,
            takerId
        ];
        $[14] = effectiveMode;
        $[15] = takerId;
        $[16] = t6;
        $[17] = t7;
    } else {
        t6 = $[16];
        t7 = $[17];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t6, t7);
    let t8;
    if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = ({
            "WithdrawForm[toggleExcluded]": (id_0)=>setExcluded({
                    "WithdrawForm[toggleExcluded > setExcluded()]": (arr)=>arr.includes(id_0) ? arr.filter({
                            "WithdrawForm[toggleExcluded > setExcluded() > arr.filter()]": (x)=>x !== id_0
                        }["WithdrawForm[toggleExcluded > setExcluded() > arr.filter()]"]) : [
                            ...arr,
                            id_0
                        ]
                }["WithdrawForm[toggleExcluded > setExcluded()]"])
        })["WithdrawForm[toggleExcluded]"];
        $[18] = t8;
    } else {
        t8 = $[18];
    }
    const toggleExcluded = t8;
    const [, setPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    let t10;
    let t9;
    if ($[19] !== amount || $[20] !== excluded) {
        t9 = ({
            "WithdrawForm[useEffect()]": ()=>{
                const amtTaka = Number(amount);
                if (!amtTaka || amtTaka <= 0 || !isFinite(amtTaka)) {
                    setPreview(null);
                    return;
                }
                const excludeIds = excluded.join(",");
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["api"].get("/preview/withdraw-split", {
                    params: {
                        amount: amtTaka,
                        excludeIds
                    }
                }).then({
                    "WithdrawForm[useEffect() > (anonymous)()]": (r)=>setPreview(r.data)
                }["WithdrawForm[useEffect() > (anonymous)()]"]).catch({
                    "WithdrawForm[useEffect() > (anonymous)()]": ()=>setPreview(null)
                }["WithdrawForm[useEffect() > (anonymous)()]"]);
            }
        })["WithdrawForm[useEffect()]"];
        t10 = [
            amount,
            excluded
        ];
        $[19] = amount;
        $[20] = excluded;
        $[21] = t10;
        $[22] = t9;
    } else {
        t10 = $[21];
        t9 = $[22];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t9, t10);
    let t11;
    if ($[23] !== notify || $[24] !== qc || $[25] !== takerId) {
        t11 = ()=>{
            if (takerId) {
                qc.invalidateQueries({
                    queryKey: [
                        "txs",
                        takerId
                    ]
                });
            }
            qc.invalidateQueries({
                queryKey: [
                    "home"
                ]
            });
            notify("Withdraw recorded", "success");
            setAmount("");
        };
        $[23] = notify;
        $[24] = qc;
        $[25] = takerId;
        $[26] = t11;
    } else {
        t11 = $[26];
    }
    let t12;
    if ($[27] !== notify) {
        t12 = ()=>notify("Withdraw failed", "error");
        $[27] = notify;
        $[28] = t12;
    } else {
        t12 = $[28];
    }
    let t13;
    if ($[29] !== t11 || $[30] !== t12) {
        t13 = {
            mutationFn: _temp2,
            onSuccess: t11,
            onError: t12
        };
        $[29] = t11;
        $[30] = t12;
        $[31] = t13;
    } else {
        t13 = $[31];
    }
    const withdrawMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t13);
    let t14;
    if ($[32] !== notify || $[33] !== qc) {
        t14 = ()=>{
            qc.invalidateQueries({
                queryKey: [
                    "home"
                ]
            });
            notify("Investment recorded", "success");
            setAmount("");
            setInvestmentName("");
        };
        $[32] = notify;
        $[33] = qc;
        $[34] = t14;
    } else {
        t14 = $[34];
    }
    let t15;
    if ($[35] !== notify) {
        t15 = ()=>notify("Investment failed", "error");
        $[35] = notify;
        $[36] = t15;
    } else {
        t15 = $[36];
    }
    let t16;
    if ($[37] !== t14 || $[38] !== t15) {
        t16 = {
            mutationFn: _temp3,
            onSuccess: t14,
            onError: t15
        };
        $[37] = t14;
        $[38] = t15;
        $[39] = t16;
    } else {
        t16 = $[39];
    }
    const investmentMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t16);
    let t17;
    if ($[40] !== amount || $[41] !== date || $[42] !== effectiveMode || $[43] !== excluded || $[44] !== graceDays || $[45] !== investmentMonths || $[46] !== investmentMutation || $[47] !== investmentName || $[48] !== investmentOpenEnded || $[49] !== investmentRate || $[50] !== investmentStart || $[51] !== months || $[52] !== penaltyEnabled || $[53] !== penaltyPct || $[54] !== rate || $[55] !== takerId || $[56] !== withdrawMutation) {
        t17 = ({
            "WithdrawForm[onSubmit]": ()=>{
                const amtTaka_0 = Number(amount);
                if (!amtTaka_0 || !isFinite(amtTaka_0)) {
                    return;
                }
                if (effectiveMode === "member") {
                    withdrawMutation.mutate({
                        takerId,
                        amount: amtTaka_0,
                        date,
                        reason: "Withdraw",
                        excludeMemberIds: excluded,
                        due: {
                            useDefaultDate: true,
                            defaultDate: date,
                            startDate: null,
                            endDate: null,
                            months,
                            monthlyRatePct: rate
                        },
                        penalty: {
                            enabled: penaltyEnabled,
                            monthlyPenaltyPct: penaltyPct,
                            graceDays
                        }
                    });
                } else {
                    investmentMutation.mutate({
                        name: investmentName || `Investment ${new Date(investmentStart).toLocaleDateString()}`,
                        amount: amtTaka_0,
                        startDate: investmentStart,
                        months: investmentOpenEnded ? undefined : investmentMonths,
                        monthlyRatePct: investmentOpenEnded ? undefined : investmentRate,
                        openEnded: investmentOpenEnded,
                        excludeMemberIds: excluded
                    });
                }
            }
        })["WithdrawForm[onSubmit]"];
        $[40] = amount;
        $[41] = date;
        $[42] = effectiveMode;
        $[43] = excluded;
        $[44] = graceDays;
        $[45] = investmentMonths;
        $[46] = investmentMutation;
        $[47] = investmentName;
        $[48] = investmentOpenEnded;
        $[49] = investmentRate;
        $[50] = investmentStart;
        $[51] = months;
        $[52] = penaltyEnabled;
        $[53] = penaltyPct;
        $[54] = rate;
        $[55] = takerId;
        $[56] = withdrawMutation;
        $[57] = t17;
    } else {
        t17 = $[57];
    }
    const onSubmit = t17;
    let t18;
    if ($[58] !== allowModeToggle || $[59] !== mode) {
        t18 = allowModeToggle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "rounded-2xl border border-slate-100 dark:border-slate-800 p-4 bg-white/70 dark:bg-slate-900/40 space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "flex items-center justify-between flex-wrap gap-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs uppercase tracking-[0.3em] text-slate-400",
                                children: "Step 1"
                            }, void 0, false, {
                                fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                                lineNumber: 350,
                                columnNumber: 231
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-base font-semibold text-slate-900 dark:text-white",
                                children: "Pick the type of outflow"
                            }, void 0, false, {
                                fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                                lineNumber: 350,
                                columnNumber: 306
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                        lineNumber: 350,
                        columnNumber: 226
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                    lineNumber: 350,
                    columnNumber: 156
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ModeCard, {
                            title: "Cash-out to a member",
                            body: "Record a loan or withdrawal and create a repayment plan.",
                            active: mode === "member",
                            onClick: {
                                "WithdrawForm[<ModeCard>.onClick]": ()=>setMode("member")
                            }["WithdrawForm[<ModeCard>.onClick]"]
                        }, void 0, false, {
                            fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                            lineNumber: 350,
                            columnNumber: 476
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ModeCard, {
                            title: "Invest the funds",
                            body: "Split contributions and track expected interest from elsewhere.",
                            active: mode === "investment",
                            onClick: {
                                "WithdrawForm[<ModeCard>.onClick]": ()=>setMode("investment")
                            }["WithdrawForm[<ModeCard>.onClick]"]
                        }, void 0, false, {
                            fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                            lineNumber: 352,
                            columnNumber: 50
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                    lineNumber: 350,
                    columnNumber: 421
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
            lineNumber: 350,
            columnNumber: 30
        }, this);
        $[58] = allowModeToggle;
        $[59] = mode;
        $[60] = t18;
    } else {
        t18 = $[60];
    }
    let t19;
    if ($[61] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs uppercase tracking-[0.3em] text-slate-400",
            children: "Who & why"
        }, void 0, false, {
            fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
            lineNumber: 363,
            columnNumber: 11
        }, this);
        $[61] = t19;
    } else {
        t19 = $[61];
    }
    const t20 = effectiveMode === "member" ? "Member details" : "Investment details";
    let t21;
    if ($[62] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
            children: [
                t19,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-base font-semibold text-slate-900 dark:text-white",
                    children: t20
                }, void 0, false, {
                    fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                    lineNumber: 371,
                    columnNumber: 24
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
            lineNumber: 371,
            columnNumber: 11
        }, this);
        $[62] = t20;
        $[63] = t21;
    } else {
        t21 = $[63];
    }
    let t22;
    if ($[64] !== effectiveMode || $[65] !== investmentMonths || $[66] !== investmentName || $[67] !== investmentOpenEnded || $[68] !== investmentRate || $[69] !== investmentStart || $[70] !== takerId || $[71] !== userId || $[72] !== users.data) {
        t22 = effectiveMode === "member" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
            label: "Member",
            children: userId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-base font-semibold text-slate-900 dark:text-white",
                children: users.data?.find({
                    "WithdrawForm[(anonymous)()]": (u_0)=>u_0.id === userId
                }["WithdrawForm[(anonymous)()]"])?.name || userId
            }, void 0, false, {
                fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                lineNumber: 379,
                columnNumber: 72
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                className: "input-like",
                value: takerId,
                onChange: {
                    "WithdrawForm[<select>.onChange]": (e)=>setTakerId(e.target.value)
                }["WithdrawForm[<select>.onChange]"],
                children: users.data?.map(_WithdrawFormAnonymous)
            }, void 0, false, {
                fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                lineNumber: 381,
                columnNumber: 68
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
            lineNumber: 379,
            columnNumber: 40
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                    label: "Investment name",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "input-like",
                        placeholder: "e.g. Community fridge fund",
                        value: investmentName,
                        onChange: {
                            "WithdrawForm[<input>.onChange]": (e_0)=>setInvestmentName(e_0.target.value)
                        }["WithdrawForm[<input>.onChange]"]
                    }, void 0, false, {
                        fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                        lineNumber: 383,
                        columnNumber: 193
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                    lineNumber: 383,
                    columnNumber: 162
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                    label: "Start date",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "input-like",
                        type: "date",
                        value: investmentStart,
                        onChange: {
                            "WithdrawForm[<input>.onChange]": (e_1)=>setInvestmentStart(e_1.target.value)
                        }["WithdrawForm[<input>.onChange]"]
                    }, void 0, false, {
                        fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                        lineNumber: 385,
                        columnNumber: 82
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                    lineNumber: 385,
                    columnNumber: 56
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                    label: "Months invested",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "input-like",
                                type: "number",
                                min: 1,
                                value: investmentMonths,
                                onChange: {
                                    "WithdrawForm[<input>.onChange]": (e_2)=>setInvestmentMonths(Number(e_2.target.value))
                                }["WithdrawForm[<input>.onChange]"],
                                disabled: investmentOpenEnded
                            }, void 0, false, {
                                fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                                lineNumber: 387,
                                columnNumber: 114
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: investmentOpenEnded,
                                        onChange: {
                                            "WithdrawForm[<input>.onChange]": (e_3)=>setInvestmentOpenEnded(e_3.target.checked)
                                        }["WithdrawForm[<input>.onChange]"]
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                                        lineNumber: 389,
                                        columnNumber: 174
                                    }, this),
                                    "No end date yet"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                                lineNumber: 389,
                                columnNumber: 81
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                        lineNumber: 387,
                        columnNumber: 87
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                    lineNumber: 387,
                    columnNumber: 56
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                    label: "Monthly interest %",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "input-like",
                        type: "number",
                        step: "0.1",
                        value: investmentRate,
                        onChange: {
                            "WithdrawForm[<input>.onChange]": (e_4)=>setInvestmentRate(Number(e_4.target.value))
                        }["WithdrawForm[<input>.onChange]"],
                        disabled: investmentOpenEnded
                    }, void 0, false, {
                        fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                        lineNumber: 391,
                        columnNumber: 123
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                    lineNumber: 391,
                    columnNumber: 89
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
            lineNumber: 383,
            columnNumber: 107
        }, this);
        $[64] = effectiveMode;
        $[65] = investmentMonths;
        $[66] = investmentName;
        $[67] = investmentOpenEnded;
        $[68] = investmentRate;
        $[69] = investmentStart;
        $[70] = takerId;
        $[71] = userId;
        $[72] = users.data;
        $[73] = t22;
    } else {
        t22 = $[73];
    }
    let t23;
    if ($[74] !== t21 || $[75] !== t22) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "rounded-2xl border border-slate-100 dark:border-slate-800 p-4 bg-white/80 dark:bg-slate-900/50 space-y-4",
            children: [
                t21,
                t22
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
            lineNumber: 409,
            columnNumber: 11
        }, this);
        $[74] = t21;
        $[75] = t22;
        $[76] = t23;
    } else {
        t23 = $[76];
    }
    let t24;
    if ($[77] !== effectiveMode || $[78] !== graceDays || $[79] !== months || $[80] !== penaltyEnabled || $[81] !== penaltyPct || $[82] !== rate) {
        t24 = effectiveMode === "member" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "rounded-2xl border border-slate-100 dark:border-slate-800 p-4 bg-white/70 dark:bg-slate-900/40 space-y-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs uppercase tracking-[0.3em] text-slate-400",
                            children: "Repayment plan"
                        }, void 0, false, {
                            fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                            lineNumber: 418,
                            columnNumber: 175
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-base font-semibold text-slate-900 dark:text-white",
                            children: "How will this be paid back?"
                        }, void 0, false, {
                            fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                            lineNumber: 418,
                            columnNumber: 258
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                    lineNumber: 418,
                    columnNumber: 167
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                            label: "Months",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "input-like",
                                type: "number",
                                min: 1,
                                value: months,
                                onChange: {
                                    "WithdrawForm[<input>.onChange]": (e_5)=>setMonths(Number(e_5.target.value))
                                }["WithdrawForm[<input>.onChange]"]
                            }, void 0, false, {
                                fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                                lineNumber: 418,
                                columnNumber: 447
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                            lineNumber: 418,
                            columnNumber: 425
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                            label: "Monthly rate %",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "input-like",
                                type: "number",
                                step: "0.1",
                                value: rate,
                                onChange: {
                                    "WithdrawForm[<input>.onChange]": (e_6)=>setRate(Number(e_6.target.value))
                                }["WithdrawForm[<input>.onChange]"]
                            }, void 0, false, {
                                fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                                lineNumber: 420,
                                columnNumber: 88
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                            lineNumber: 420,
                            columnNumber: 58
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                    lineNumber: 418,
                    columnNumber: 370
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "inline-flex items-center gap-2 text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "checkbox",
                            checked: penaltyEnabled,
                            onChange: {
                                "WithdrawForm[<input>.onChange]": (e_7)=>setPenaltyEnabled(e_7.target.checked)
                            }["WithdrawForm[<input>.onChange]"]
                        }, void 0, false, {
                            fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                            lineNumber: 422,
                            columnNumber: 122
                        }, this),
                        "Apply penalty when overdue"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                    lineNumber: 422,
                    columnNumber: 64
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                            label: "Penalty % per month",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "input-like",
                                type: "number",
                                step: "0.1",
                                value: penaltyPct,
                                onChange: {
                                    "WithdrawForm[<input>.onChange]": (e_8)=>setPenaltyPct(Number(e_8.target.value))
                                }["WithdrawForm[<input>.onChange]"],
                                disabled: !penaltyEnabled
                            }, void 0, false, {
                                fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                                lineNumber: 424,
                                columnNumber: 172
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                            lineNumber: 424,
                            columnNumber: 137
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                            label: "Grace days",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "input-like",
                                type: "number",
                                min: 0,
                                value: graceDays,
                                onChange: {
                                    "WithdrawForm[<input>.onChange]": (e_9)=>setGraceDays(Number(e_9.target.value))
                                }["WithdrawForm[<input>.onChange]"],
                                disabled: !penaltyEnabled
                            }, void 0, false, {
                                fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                                lineNumber: 426,
                                columnNumber: 111
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                            lineNumber: 426,
                            columnNumber: 85
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                    lineNumber: 424,
                    columnNumber: 82
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
            lineNumber: 418,
            columnNumber: 41
        }, this);
        $[77] = effectiveMode;
        $[78] = graceDays;
        $[79] = months;
        $[80] = penaltyEnabled;
        $[81] = penaltyPct;
        $[82] = rate;
        $[83] = t24;
    } else {
        t24 = $[83];
    }
    let t25;
    if ($[84] === Symbol.for("react.memo_cache_sentinel")) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs uppercase tracking-[0.3em] text-slate-400",
                    children: "Fill in the details"
                }, void 0, false, {
                    fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                    lineNumber: 441,
                    columnNumber: 19
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-base font-semibold text-slate-900 dark:text-white",
                    children: "Amount & date"
                }, void 0, false, {
                    fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                    lineNumber: 441,
                    columnNumber: 107
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
            lineNumber: 441,
            columnNumber: 11
        }, this);
        $[84] = t25;
    } else {
        t25 = $[84];
    }
    let t26;
    if ($[85] === Symbol.for("react.memo_cache_sentinel")) {
        t26 = ({
            "WithdrawForm[<input>.onChange]": (e_10)=>setAmount(e_10.target.value)
        })["WithdrawForm[<input>.onChange]"];
        $[85] = t26;
    } else {
        t26 = $[85];
    }
    let t27;
    if ($[86] !== amount) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
            label: "Amount (BDT)",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                className: "input-like",
                type: "number",
                step: "0.01",
                placeholder: "0.00",
                value: amount,
                onChange: t26
            }, void 0, false, {
                fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                lineNumber: 457,
                columnNumber: 39
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
            lineNumber: 457,
            columnNumber: 11
        }, this);
        $[86] = amount;
        $[87] = t27;
    } else {
        t27 = $[87];
    }
    let t28;
    if ($[88] === Symbol.for("react.memo_cache_sentinel")) {
        t28 = ({
            "WithdrawForm[<input>.onChange]": (e_11)=>setDate(e_11.target.value)
        })["WithdrawForm[<input>.onChange]"];
        $[88] = t28;
    } else {
        t28 = $[88];
    }
    let t29;
    if ($[89] !== date) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
            label: "Date",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                className: "input-like",
                type: "date",
                value: date,
                onChange: t28
            }, void 0, false, {
                fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                lineNumber: 474,
                columnNumber: 31
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
            lineNumber: 474,
            columnNumber: 11
        }, this);
        $[89] = date;
        $[90] = t29;
    } else {
        t29 = $[90];
    }
    let t30;
    if ($[91] !== t27 || $[92] !== t29) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "rounded-2xl border border-slate-100 dark:border-slate-800 p-4 bg-white/80 dark:bg-slate-900/50 space-y-4",
            children: [
                t25,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                    children: [
                        t27,
                        t29
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                    lineNumber: 482,
                    columnNumber: 142
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
            lineNumber: 482,
            columnNumber: 11
        }, this);
        $[91] = t27;
        $[92] = t29;
        $[93] = t30;
    } else {
        t30 = $[93];
    }
    let t31;
    if ($[94] === Symbol.for("react.memo_cache_sentinel")) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs uppercase tracking-[0.3em] text-slate-400",
                    children: "Exclusions"
                }, void 0, false, {
                    fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                    lineNumber: 491,
                    columnNumber: 19
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-base font-semibold text-slate-900 dark:text-white",
                    children: "Who should skip this split?"
                }, void 0, false, {
                    fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                    lineNumber: 491,
                    columnNumber: 98
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
            lineNumber: 491,
            columnNumber: 11
        }, this);
        $[94] = t31;
    } else {
        t31 = $[94];
    }
    let t32;
    if ($[95] !== excluded || $[96] !== selectableMembers) {
        let t33;
        if ($[98] !== excluded) {
            t33 = ({
                "WithdrawForm[selectableMembers.map()]": (member)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: {
                            "WithdrawForm[selectableMembers.map() > <button>.onClick]": ()=>toggleExcluded(member.id)
                        }["WithdrawForm[selectableMembers.map() > <button>.onClick]"],
                        className: `rounded-full border px-3 py-1 text-sm ${excluded.includes(member.id) ? "border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-200" : "border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"}`,
                        children: [
                            excluded.includes(member.id) ? "Excluded \xB7 " : "",
                            member.name
                        ]
                    }, member.id, true, {
                        fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                        lineNumber: 501,
                        columnNumber: 60
                    }, this)
            })["WithdrawForm[selectableMembers.map()]"];
            $[98] = excluded;
            $[99] = t33;
        } else {
            t33 = $[99];
        }
        t32 = selectableMembers.map(t33);
        $[95] = excluded;
        $[96] = selectableMembers;
        $[97] = t32;
    } else {
        t32 = $[97];
    }
    let t33;
    if ($[100] !== t32) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "rounded-2xl border border-slate-100 dark:border-slate-800 p-4 bg-white/70 dark:bg-slate-900/40 space-y-3",
            children: [
                t31,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap gap-2",
                    children: t32
                }, void 0, false, {
                    fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                    lineNumber: 519,
                    columnNumber: 142
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
            lineNumber: 519,
            columnNumber: 11
        }, this);
        $[100] = t32;
        $[101] = t33;
    } else {
        t33 = $[101];
    }
    const t34 = withdrawMutation.isPending || investmentMutation.isPending;
    const t35 = withdrawMutation.isPending || investmentMutation.isPending ? "Saving\u2026" : effectiveMode === "member" ? "Record withdrawal" : "Record investment";
    let t36;
    if ($[102] !== onSubmit || $[103] !== t34 || $[104] !== t35) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-end",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onClick: onSubmit,
                disabled: t34,
                children: t35
            }, void 0, false, {
                fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
                lineNumber: 529,
                columnNumber: 45
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
            lineNumber: 529,
            columnNumber: 11
        }, this);
        $[102] = onSubmit;
        $[103] = t34;
        $[104] = t35;
        $[105] = t36;
    } else {
        t36 = $[105];
    }
    let t37;
    if ($[106] !== t18 || $[107] !== t23 || $[108] !== t24 || $[109] !== t30 || $[110] !== t33 || $[111] !== t36) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                t18,
                t23,
                t24,
                t30,
                t33,
                t36
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
            lineNumber: 539,
            columnNumber: 11
        }, this);
        $[106] = t18;
        $[107] = t23;
        $[108] = t24;
        $[109] = t30;
        $[110] = t33;
        $[111] = t36;
        $[112] = t37;
    } else {
        t37 = $[112];
    }
    return t37;
}
_s(WithdrawForm, "fDQ3bld+Yk6Pw1UR6DcfXQ5KYA8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$ToastProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
_c = WithdrawForm;
function _WithdrawFormAnonymous(u_1) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
        value: u_1.id,
        children: u_1.name
    }, u_1.id, false, {
        fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
        lineNumber: 553,
        columnNumber: 10
    }, this);
}
function _temp3(body_0) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["api"].post("/investments", body_0);
}
function _temp2(body) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["api"].post("/withdraw", body);
}
async function _temp() {
    return (await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["api"].get("/users")).data;
}
function _WithdrawFormUseState2() {
    return new Date().toISOString().slice(0, 10);
}
function _WithdrawFormUseState() {
    return new Date().toISOString().slice(0, 10);
}
function Field(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(6);
    if ($[0] !== "988f66875459b80b760c3abe5af471885e5d46bffcbcdd45dbd9962d5103022b") {
        for(let $i = 0; $i < 6; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "988f66875459b80b760c3abe5af471885e5d46bffcbcdd45dbd9962d5103022b";
    }
    const { label, children } = t0;
    let t1;
    if ($[1] !== label) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "text-sm font-medium text-slate-600 dark:text-slate-300",
            children: label
        }, void 0, false, {
            fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
            lineNumber: 584,
            columnNumber: 10
        }, this);
        $[1] = label;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] !== children || $[4] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-1",
            children: [
                t1,
                children
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
            lineNumber: 592,
            columnNumber: 10
        }, this);
        $[3] = children;
        $[4] = t1;
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    return t2;
}
_c1 = Field;
function ModeCard(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(10);
    if ($[0] !== "988f66875459b80b760c3abe5af471885e5d46bffcbcdd45dbd9962d5103022b") {
        for(let $i = 0; $i < 10; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "988f66875459b80b760c3abe5af471885e5d46bffcbcdd45dbd9962d5103022b";
    }
    const { title, body, active, onClick } = t0;
    const t1 = `rounded-2xl	border p-4 text-left transition ${active ? "border-blue-400 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-500/10 dark:text-blue-200" : "border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300 hover:border-blue-200 hover:bg-blue-50/40 dark:hover:border-blue-500/40 dark:hover:bg-slate-800"}`;
    let t2;
    if ($[1] !== title) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "font-semibold",
            children: title
        }, void 0, false, {
            fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
            lineNumber: 618,
            columnNumber: 10
        }, this);
        $[1] = title;
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    let t3;
    if ($[3] !== body) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm text-slate-500 dark:text-slate-400",
            children: body
        }, void 0, false, {
            fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
            lineNumber: 626,
            columnNumber: 10
        }, this);
        $[3] = body;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    if ($[5] !== onClick || $[6] !== t1 || $[7] !== t2 || $[8] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: onClick,
            className: t1,
            children: [
                t2,
                t3
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/withdraw/WithdrawForm.tsx",
            lineNumber: 634,
            columnNumber: 10
        }, this);
        $[5] = onClick;
        $[6] = t1;
        $[7] = t2;
        $[8] = t3;
        $[9] = t4;
    } else {
        t4 = $[9];
    }
    return t4;
}
_c2 = ModeCard;
const __TURBOPACK__default__export__ = /*#__PURE__*/ _c3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(WithdrawForm);
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "WithdrawForm");
__turbopack_context__.k.register(_c1, "Field");
__turbopack_context__.k.register(_c2, "ModeCard");
__turbopack_context__.k.register(_c3, "%default%");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Skeleton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SkeletonCard",
    ()=>SkeletonCard,
    "SkeletonLine",
    ()=>SkeletonLine,
    "SkeletonList",
    ()=>SkeletonList,
    "SkeletonTableRows",
    ()=>SkeletonTableRows
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
;
;
function SkeletonLine(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "0e96025764ea27475e2c0bc88e90f0827d986735bc4fea342d262617b6c6e18a") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "0e96025764ea27475e2c0bc88e90f0827d986735bc4fea342d262617b6c6e18a";
    }
    const { className: t1 } = t0;
    const className = t1 === undefined ? "" : t1;
    const t2 = `h-3 bg-gray-200/80 rounded animate-pulse ${className}`;
    let t3;
    if ($[1] !== t2) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t2
        }, void 0, false, {
            fileName: "[project]/src/components/Skeleton.tsx",
            lineNumber: 17,
            columnNumber: 10
        }, this);
        $[1] = t2;
        $[2] = t3;
    } else {
        t3 = $[2];
    }
    return t3;
}
_c = SkeletonLine;
function SkeletonCard() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "0e96025764ea27475e2c0bc88e90f0827d986735bc4fea342d262617b6c6e18a") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "0e96025764ea27475e2c0bc88e90f0827d986735bc4fea342d262617b6c6e18a";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white/80 dark:bg-slate-900/50 p-4 shadow rounded-2xl space-y-2 animate-pulse",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonLine, {
                    className: "h-4 w-2/3"
                }, void 0, false, {
                    fileName: "[project]/src/components/Skeleton.tsx",
                    lineNumber: 35,
                    columnNumber: 107
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonLine, {
                    className: "w-1/2"
                }, void 0, false, {
                    fileName: "[project]/src/components/Skeleton.tsx",
                    lineNumber: 35,
                    columnNumber: 145
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonLine, {
                    className: "w-1/3"
                }, void 0, false, {
                    fileName: "[project]/src/components/Skeleton.tsx",
                    lineNumber: 35,
                    columnNumber: 179
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Skeleton.tsx",
            lineNumber: 35,
            columnNumber: 10
        }, this);
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    return t0;
}
_c1 = SkeletonCard;
function SkeletonList(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(6);
    if ($[0] !== "0e96025764ea27475e2c0bc88e90f0827d986735bc4fea342d262617b6c6e18a") {
        for(let $i = 0; $i < 6; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "0e96025764ea27475e2c0bc88e90f0827d986735bc4fea342d262617b6c6e18a";
    }
    const { rows: t1, className: t2 } = t0;
    const rows = t1 === undefined ? 4 : t1;
    const className = t2 === undefined ? "" : t2;
    const t3 = `space-y-2 ${className}`;
    let t4;
    if ($[1] !== rows) {
        t4 = Array.from({
            length: rows
        }).map(_SkeletonListAnonymous);
        $[1] = rows;
        $[2] = t4;
    } else {
        t4 = $[2];
    }
    let t5;
    if ($[3] !== t3 || $[4] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t3,
            children: t4
        }, void 0, false, {
            fileName: "[project]/src/components/Skeleton.tsx",
            lineNumber: 69,
            columnNumber: 10
        }, this);
        $[3] = t3;
        $[4] = t4;
        $[5] = t5;
    } else {
        t5 = $[5];
    }
    return t5;
}
_c2 = SkeletonList;
function _SkeletonListAnonymous(_, idx) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white/70 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-xl p-3 space-y-2 animate-pulse",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonLine, {
                className: "w-2/3"
            }, void 0, false, {
                fileName: "[project]/src/components/Skeleton.tsx",
                lineNumber: 79,
                columnNumber: 173
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonLine, {
                className: "w-1/3"
            }, void 0, false, {
                fileName: "[project]/src/components/Skeleton.tsx",
                lineNumber: 79,
                columnNumber: 207
            }, this)
        ]
    }, `skeleton-row-${idx}`, true, {
        fileName: "[project]/src/components/Skeleton.tsx",
        lineNumber: 79,
        columnNumber: 10
    }, this);
}
function SkeletonTableRows(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "0e96025764ea27475e2c0bc88e90f0827d986735bc4fea342d262617b6c6e18a") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "0e96025764ea27475e2c0bc88e90f0827d986735bc4fea342d262617b6c6e18a";
    }
    const { rows: t1 } = t0;
    const rows = t1 === undefined ? 4 : t1;
    let t2;
    if ($[1] !== rows) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2",
            children: Array.from({
                length: rows
            }).map(_SkeletonTableRowsAnonymous)
        }, void 0, false, {
            fileName: "[project]/src/components/Skeleton.tsx",
            lineNumber: 95,
            columnNumber: 10
        }, this);
        $[1] = rows;
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    return t2;
}
_c3 = SkeletonTableRows;
function _SkeletonTableRowsAnonymous(_, idx) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-12 gap-2 items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonLine, {
                className: "col-span-3 h-3"
            }, void 0, false, {
                fileName: "[project]/src/components/Skeleton.tsx",
                lineNumber: 106,
                columnNumber: 94
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonLine, {
                className: "col-span-4 h-3"
            }, void 0, false, {
                fileName: "[project]/src/components/Skeleton.tsx",
                lineNumber: 106,
                columnNumber: 137
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonLine, {
                className: "col-span-3 h-3"
            }, void 0, false, {
                fileName: "[project]/src/components/Skeleton.tsx",
                lineNumber: 106,
                columnNumber: 180
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonLine, {
                className: "col-span-2 h-3"
            }, void 0, false, {
                fileName: "[project]/src/components/Skeleton.tsx",
                lineNumber: 106,
                columnNumber: 223
            }, this)
        ]
    }, `skeleton-table-${idx}`, true, {
        fileName: "[project]/src/components/Skeleton.tsx",
        lineNumber: 106,
        columnNumber: 10
    }, this);
}
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "SkeletonLine");
__turbopack_context__.k.register(_c1, "SkeletonCard");
__turbopack_context__.k.register(_c2, "SkeletonList");
__turbopack_context__.k.register(_c3, "SkeletonTableRows");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useLockBodyScroll.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLockBodyScroll",
    ()=>useLockBodyScroll
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useLockBodyScroll(active) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "6088715d471e9fc202fe6fc398e9b89b356da83b0c82ce7c5aa8770c8e7544fa") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "6088715d471e9fc202fe6fc398e9b89b356da83b0c82ce7c5aa8770c8e7544fa";
    }
    let t0;
    let t1;
    if ($[1] !== active) {
        t0 = ({
            "useLockBodyScroll[useEffect()]": ()=>{
                if (!active) {
                    return;
                }
                const prevOverflow = document.body.style.overflow;
                const prevPadding = document.body.style.paddingRight;
                const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
                document.body.style.overflow = "hidden";
                if (scrollbarWidth > 0) {
                    document.body.style.paddingRight = `${scrollbarWidth}px`;
                }
                return ()=>{
                    document.body.style.overflow = prevOverflow;
                    document.body.style.paddingRight = prevPadding;
                };
            }
        })["useLockBodyScroll[useEffect()]"];
        t1 = [
            active
        ];
        $[1] = active;
        $[2] = t0;
        $[3] = t1;
    } else {
        t0 = $[2];
        t1 = $[3];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t0, t1);
}
_s(useLockBodyScroll, "OD7bBpZva5O2jO+Puf00hKivP7c=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/MemberDrawer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MemberDrawer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/clientApi.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/format.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$deposit$2f$DepositForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/deposit/DepositForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$withdraw$2f$WithdrawForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/withdraw/WithdrawForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Skeleton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$ToastProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/providers/ToastProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLockBodyScroll$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useLockBodyScroll.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
function MemberDrawer(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(99);
    if ($[0] !== "d65ce7dc679b1e438ab45c969a5b6e2ff7f7b687b61fe742a28d3c940b6a25d7") {
        for(let $i = 0; $i < 99; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "d65ce7dc679b1e438ab45c969a5b6e2ff7f7b687b61fe742a28d3c940b6a25d7";
    }
    const { userId, role, onClose } = t0;
    const qc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const { notify } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$ToastProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("ledger");
    const [editing, setEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [amountInput, setAmountInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    let t1;
    let t2;
    if ($[1] !== editing) {
        t1 = ({
            "MemberDrawer[useEffect()]": ()=>{
                if (!editing || editing.type !== "deposit") {
                    setAmountInput("");
                    return;
                }
                setAmountInput((editing.amount / 100).toFixed(2));
            }
        })["MemberDrawer[useEffect()]"];
        t2 = [
            editing
        ];
        $[1] = editing;
        $[2] = t1;
        $[3] = t2;
    } else {
        t1 = $[2];
        t2 = $[3];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t1, t2);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLockBodyScroll$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLockBodyScroll"])(true);
    let t3;
    let t4;
    if ($[4] !== userId) {
        t3 = [
            "txs",
            userId
        ];
        t4 = async ()=>(await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["api"].get("/transactions", {
                params: {
                    userId
                }
            })).data;
        $[4] = userId;
        $[5] = t3;
        $[6] = t4;
    } else {
        t3 = $[5];
        t4 = $[6];
    }
    const t5 = !!userId;
    let t6;
    if ($[7] !== t3 || $[8] !== t4 || $[9] !== t5) {
        t6 = {
            queryKey: t3,
            queryFn: t4,
            enabled: t5
        };
        $[7] = t3;
        $[8] = t4;
        $[9] = t5;
        $[10] = t6;
    } else {
        t6 = $[10];
    }
    const txs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t6);
    let t7;
    let t8;
    if ($[11] !== userId) {
        t7 = [
            "dues",
            userId
        ];
        t8 = async ()=>(await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["api"].get(`/users/${userId}/dues`)).data;
        $[11] = userId;
        $[12] = t7;
        $[13] = t8;
    } else {
        t7 = $[12];
        t8 = $[13];
    }
    const t9 = !!userId;
    let t10;
    if ($[14] !== t7 || $[15] !== t8 || $[16] !== t9) {
        t10 = {
            queryKey: t7,
            queryFn: t8,
            enabled: t9
        };
        $[14] = t7;
        $[15] = t8;
        $[16] = t9;
        $[17] = t10;
    } else {
        t10 = $[17];
    }
    const dues = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t10);
    let t11;
    if ($[18] !== qc || $[19] !== userId) {
        t11 = async (t12)=>{
            const { id: id_0, body: body_0 } = t12;
            await qc.cancelQueries({
                queryKey: [
                    "txs",
                    userId
                ]
            });
            const previous = qc.getQueryData([
                "txs",
                userId
            ]);
            if (previous) {
                qc.setQueryData([
                    "txs",
                    userId
                ], previous.map({
                    "MemberDrawer[<anonymous> > previous.map()]": (tx)=>tx._id === id_0 ? {
                            ...tx,
                            note: body_0.note ?? tx.note,
                            occurredAt: body_0.date ?? tx.occurredAt,
                            amount: body_0.amount ? Math.round(body_0.amount * 100) : tx.amount
                        } : tx
                }["MemberDrawer[<anonymous> > previous.map()]"]));
            }
            return {
                previous
            };
        };
        $[18] = qc;
        $[19] = userId;
        $[20] = t11;
    } else {
        t11 = $[20];
    }
    let t12;
    if ($[21] !== notify || $[22] !== qc || $[23] !== userId) {
        t12 = (_err, _vars, context)=>{
            if (context?.previous) {
                qc.setQueryData([
                    "txs",
                    userId
                ], context.previous);
            }
            notify("Update failed", "error");
        };
        $[21] = notify;
        $[22] = qc;
        $[23] = userId;
        $[24] = t12;
    } else {
        t12 = $[24];
    }
    let t13;
    if ($[25] !== notify) {
        t13 = ()=>notify("Transaction updated", "success");
        $[25] = notify;
        $[26] = t13;
    } else {
        t13 = $[26];
    }
    let t14;
    if ($[27] !== qc || $[28] !== userId) {
        t14 = ()=>{
            qc.invalidateQueries({
                queryKey: [
                    "txs",
                    userId
                ]
            });
            setEditing(null);
        };
        $[27] = qc;
        $[28] = userId;
        $[29] = t14;
    } else {
        t14 = $[29];
    }
    let t15;
    if ($[30] !== t11 || $[31] !== t12 || $[32] !== t13 || $[33] !== t14) {
        t15 = {
            mutationFn: _temp,
            onMutate: t11,
            onError: t12,
            onSuccess: t13,
            onSettled: t14
        };
        $[30] = t11;
        $[31] = t12;
        $[32] = t13;
        $[33] = t14;
        $[34] = t15;
    } else {
        t15 = $[34];
    }
    const patchTx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t15);
    let t16;
    if ($[35] !== qc || $[36] !== userId) {
        t16 = async (id_2)=>{
            await qc.cancelQueries({
                queryKey: [
                    "txs",
                    userId
                ]
            });
            const previous_0 = qc.getQueryData([
                "txs",
                userId
            ]);
            if (previous_0) {
                qc.setQueryData([
                    "txs",
                    userId
                ], previous_0.filter({
                    "MemberDrawer[<anonymous> > previous_0.filter()]": (tx_0)=>tx_0._id !== id_2
                }["MemberDrawer[<anonymous> > previous_0.filter()]"]));
            }
            return {
                previous: previous_0
            };
        };
        $[35] = qc;
        $[36] = userId;
        $[37] = t16;
    } else {
        t16 = $[37];
    }
    let t17;
    if ($[38] !== notify || $[39] !== qc || $[40] !== userId) {
        t17 = (err, _vars_0, context_0)=>{
            if (context_0?.previous) {
                qc.setQueryData([
                    "txs",
                    userId
                ], context_0.previous);
            }
            notify(err?.response?.data?.error || "Delete failed", "error");
        };
        $[38] = notify;
        $[39] = qc;
        $[40] = userId;
        $[41] = t17;
    } else {
        t17 = $[41];
    }
    let t18;
    if ($[42] !== notify) {
        t18 = ()=>notify("Transaction deleted", "success");
        $[42] = notify;
        $[43] = t18;
    } else {
        t18 = $[43];
    }
    let t19;
    if ($[44] !== qc || $[45] !== userId) {
        t19 = ()=>qc.invalidateQueries({
                queryKey: [
                    "txs",
                    userId
                ]
            });
        $[44] = qc;
        $[45] = userId;
        $[46] = t19;
    } else {
        t19 = $[46];
    }
    let t20;
    if ($[47] !== t16 || $[48] !== t17 || $[49] !== t18 || $[50] !== t19) {
        t20 = {
            mutationFn: _temp2,
            onMutate: t16,
            onError: t17,
            onSuccess: t18,
            onSettled: t19
        };
        $[47] = t16;
        $[48] = t17;
        $[49] = t18;
        $[50] = t19;
        $[51] = t20;
    } else {
        t20 = $[51];
    }
    const deleteTx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t20);
    const canManage = role !== "user";
    let t21;
    if ($[52] !== amountInput || $[53] !== editing || $[54] !== patchTx) {
        t21 = ({
            "MemberDrawer[handleSaveEdit]": ()=>{
                if (!editing) {
                    return;
                }
                const body_1 = {
                    note: editing.note,
                    date: editing.occurredAt
                };
                if (editing.type === "deposit" && amountInput) {
                    const parsed = Number(amountInput);
                    if (Number.isFinite(parsed)) {
                        body_1.amount = parsed;
                    }
                }
                patchTx.mutate({
                    id: editing._id,
                    body: body_1
                });
            }
        })["MemberDrawer[handleSaveEdit]"];
        $[52] = amountInput;
        $[53] = editing;
        $[54] = patchTx;
        $[55] = t21;
    } else {
        t21 = $[55];
    }
    const handleSaveEdit = t21;
    const reduceMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    let t22;
    if ($[56] !== reduceMotion) {
        t22 = reduceMotion ? {
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0
            }
        } : {
            initial: {
                y: "100%"
            },
            animate: {
                y: 0,
                transition: {
                    duration: 0.3,
                    ease: [
                        0.16,
                        1,
                        0.3,
                        1
                    ]
                }
            },
            exit: {
                y: "100%",
                transition: {
                    duration: 0.22,
                    ease: [
                        0.4,
                        0,
                        1,
                        1
                    ]
                }
            }
        };
        $[56] = reduceMotion;
        $[57] = t22;
    } else {
        t22 = $[57];
    }
    const sheetVariants = t22;
    let t23;
    if ($[58] !== reduceMotion) {
        t23 = reduceMotion ? {
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0
            }
        } : {
            initial: {
                scale: 0.96,
                opacity: 0
            },
            animate: {
                scale: 1,
                opacity: 1,
                transition: {
                    duration: 0.2,
                    ease: [
                        0.16,
                        1,
                        0.3,
                        1
                    ]
                }
            },
            exit: {
                scale: 0.96,
                opacity: 0,
                transition: {
                    duration: 0.15,
                    ease: [
                        0.4,
                        0,
                        1,
                        1
                    ]
                }
            }
        };
        $[58] = reduceMotion;
        $[59] = t23;
    } else {
        t23 = $[59];
    }
    const modalVariants = t23;
    let t24;
    if ($[60] === Symbol.for("react.memo_cache_sentinel")) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs uppercase tracking-[0.3em] text-slate-400",
                    children: "Member"
                }, void 0, false, {
                    fileName: "[project]/src/components/MemberDrawer.tsx",
                    lineNumber: 402,
                    columnNumber: 16
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-2xl font-semibold text-slate-900 dark:text-white",
                    children: "Account overview"
                }, void 0, false, {
                    fileName: "[project]/src/components/MemberDrawer.tsx",
                    lineNumber: 402,
                    columnNumber: 91
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/MemberDrawer.tsx",
            lineNumber: 402,
            columnNumber: 11
        }, this);
        $[60] = t24;
    } else {
        t24 = $[60];
    }
    let t25;
    if ($[61] === Symbol.for("react.memo_cache_sentinel")) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CloseIcon"], {}, void 0, false, {
            fileName: "[project]/src/components/MemberDrawer.tsx",
            lineNumber: 409,
            columnNumber: 11
        }, this);
        $[61] = t25;
    } else {
        t25 = $[61];
    }
    let t26;
    if ($[62] !== onClose) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between mb-4",
            children: [
                t24,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "p-2 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-white/70 dark:hover:bg-slate-900/60",
                    onClick: onClose,
                    "aria-label": "Close member drawer",
                    children: t25
                }, void 0, false, {
                    fileName: "[project]/src/components/MemberDrawer.tsx",
                    lineNumber: 416,
                    columnNumber: 72
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/MemberDrawer.tsx",
            lineNumber: 416,
            columnNumber: 11
        }, this);
        $[62] = onClose;
        $[63] = t26;
    } else {
        t26 = $[63];
    }
    let t27;
    if ($[64] !== tab) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-wrap items-center gap-2 border-b border-slate-100 dark:border-slate-800 mb-4 text-sm",
            children: [
                "ledger",
                "deposit",
                "withdraw",
                "dues"
            ].map({
                "MemberDrawer[(anonymous)()]": (item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: `px-3 py-2 rounded-full transition ${tab === item ? "bg-blue-600 text-white" : "bg-white/70 text-slate-600 dark:bg-slate-900/40 dark:text-slate-300"}`,
                        onClick: {
                            "MemberDrawer[(anonymous)() > <button>.onClick]": ()=>setTab(item)
                        }["MemberDrawer[(anonymous)() > <button>.onClick]"],
                        children: item.charAt(0).toUpperCase() + item.slice(1)
                    }, item, false, {
                        fileName: "[project]/src/components/MemberDrawer.tsx",
                        lineNumber: 425,
                        columnNumber: 48
                    }, this)
            }["MemberDrawer[(anonymous)()]"])
        }, void 0, false, {
            fileName: "[project]/src/components/MemberDrawer.tsx",
            lineNumber: 424,
            columnNumber: 11
        }, this);
        $[64] = tab;
        $[65] = t27;
    } else {
        t27 = $[65];
    }
    let t28;
    if ($[66] !== tab || $[67] !== userId) {
        t28 = tab === "deposit" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$deposit$2f$DepositForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            userId: userId
        }, void 0, false, {
            fileName: "[project]/src/components/MemberDrawer.tsx",
            lineNumber: 436,
            columnNumber: 31
        }, this) : null;
        $[66] = tab;
        $[67] = userId;
        $[68] = t28;
    } else {
        t28 = $[68];
    }
    let t29;
    if ($[69] !== tab || $[70] !== userId) {
        t29 = tab === "withdraw" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$withdraw$2f$WithdrawForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            userId: userId
        }, void 0, false, {
            fileName: "[project]/src/components/MemberDrawer.tsx",
            lineNumber: 445,
            columnNumber: 32
        }, this) : null;
        $[69] = tab;
        $[70] = userId;
        $[71] = t29;
    } else {
        t29 = $[71];
    }
    let t30;
    if ($[72] !== canManage || $[73] !== deleteTx || $[74] !== tab || $[75] !== txs) {
        t30 = tab === "ledger" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col h-[calc(100vh-200px)] pb-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-12 text-xs text-slate-500 px-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-span-3",
                            children: "Date"
                        }, void 0, false, {
                            fileName: "[project]/src/components/MemberDrawer.tsx",
                            lineNumber: 454,
                            columnNumber: 151
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-span-4",
                            children: "Details"
                        }, void 0, false, {
                            fileName: "[project]/src/components/MemberDrawer.tsx",
                            lineNumber: 454,
                            columnNumber: 189
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-span-3 text-right",
                            children: "Amount"
                        }, void 0, false, {
                            fileName: "[project]/src/components/MemberDrawer.tsx",
                            lineNumber: 454,
                            columnNumber: 230
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-span-2 text-right",
                            children: "Actions"
                        }, void 0, false, {
                            fileName: "[project]/src/components/MemberDrawer.tsx",
                            lineNumber: 454,
                            columnNumber: 281
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/MemberDrawer.tsx",
                    lineNumber: 454,
                    columnNumber: 88
                }, this),
                txs.isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SkeletonTableRows"], {
                        rows: 4
                    }, void 0, false, {
                        fileName: "[project]/src/components/MemberDrawer.tsx",
                        lineNumber: 454,
                        columnNumber: 377
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/MemberDrawer.tsx",
                    lineNumber: 454,
                    columnNumber: 356
                }, this) : txs.data?.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1 flex-1 overflow-auto pr-1 mt-2",
                    children: txs.data.map({
                        "MemberDrawer[txs.data.map()]": (tx_1)=>{
                            const isDeposit = tx_1.type === "deposit";
                            const canDelete = canManage && isDeposit;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-12 items-center px-2 py-2 text-sm border-b border-slate-100 dark:border-slate-900/40",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "col-span-3",
                                        children: new Date(tx_1.occurredAt).toLocaleDateString("en-BD")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MemberDrawer.tsx",
                                        lineNumber: 458,
                                        columnNumber: 152
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `col-span-4 ${isDeposit ? "text-emerald-600" : "text-rose-500"}`,
                                        children: tx_1.note || (isDeposit ? "Deposit" : "Withdrawal")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MemberDrawer.tsx",
                                        lineNumber: 458,
                                        columnNumber: 243
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "col-span-3 text-right font-medium",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBDT"])(tx_1.amount)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MemberDrawer.tsx",
                                        lineNumber: 458,
                                        columnNumber: 386
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "col-span-2 flex justify-end gap-2 flex-wrap",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                type: "button",
                                                variant: "ghost",
                                                className: "w-20 justify-center px-3 py-1 text-xs flex items-center gap-1 rounded-full bg-[#8F87F1]/20 text-[#5b3cc4] hover:bg-[#8F87F1]/30 dark:bg-[#4c3c8c]/40 dark:text-white",
                                                onClick: {
                                                    "MemberDrawer[txs.data.map() > <Button>.onClick]": ()=>setEditing({
                                                            ...tx_1,
                                                            occurredAt: new Date(tx_1.occurredAt).toISOString().slice(0, 10)
                                                        })
                                                }["MemberDrawer[txs.data.map() > <Button>.onClick]"],
                                                disabled: !canManage,
                                                title: canManage ? "Edit transaction" : "View only",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PencilIcon"], {
                                                        className: "w-3.5 h-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/MemberDrawer.tsx",
                                                        lineNumber: 463,
                                                        columnNumber: 146
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "hidden sm:inline",
                                                        children: "Edit"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/MemberDrawer.tsx",
                                                        lineNumber: 463,
                                                        columnNumber: 184
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/MemberDrawer.tsx",
                                                lineNumber: 458,
                                                columnNumber: 531
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                type: "button",
                                                variant: "danger",
                                                className: "w-20 justify-center px-3 py-1 text-xs flex items-center gap-1 rounded-full",
                                                onClick: {
                                                    "MemberDrawer[txs.data.map() > <Button>.onClick]": ()=>{
                                                        if (!canDelete) {
                                                            return;
                                                        }
                                                        if (confirm("Delete this transaction?")) {
                                                            deleteTx.mutate(tx_1._id);
                                                        }
                                                    }
                                                }["MemberDrawer[txs.data.map() > <Button>.onClick]"],
                                                disabled: !canDelete,
                                                title: canDelete ? "Delete deposit" : "Only deposits can be deleted",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrashIcon"], {
                                                        className: "w-3.5 h-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/MemberDrawer.tsx",
                                                        lineNumber: 472,
                                                        columnNumber: 163
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "hidden sm:inline",
                                                        children: "Delete"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/MemberDrawer.tsx",
                                                        lineNumber: 472,
                                                        columnNumber: 200
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/MemberDrawer.tsx",
                                                lineNumber: 463,
                                                columnNumber: 239
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/MemberDrawer.tsx",
                                        lineNumber: 458,
                                        columnNumber: 469
                                    }, this)
                                ]
                            }, tx_1._id, true, {
                                fileName: "[project]/src/components/MemberDrawer.tsx",
                                lineNumber: 458,
                                columnNumber: 20
                            }, this);
                        }
                    }["MemberDrawer[txs.data.map()]"])
                }, void 0, false, {
                    fileName: "[project]/src/components/MemberDrawer.tsx",
                    lineNumber: 454,
                    columnNumber: 435
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm text-slate-500 px-2 py-3",
                    children: "No transactions yet."
                }, void 0, false, {
                    fileName: "[project]/src/components/MemberDrawer.tsx",
                    lineNumber: 474,
                    columnNumber: 53
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/MemberDrawer.tsx",
            lineNumber: 454,
            columnNumber: 30
        }, this) : null;
        $[72] = canManage;
        $[73] = deleteTx;
        $[74] = tab;
        $[75] = txs;
        $[76] = t30;
    } else {
        t30 = $[76];
    }
    let t31;
    if ($[77] !== dues || $[78] !== tab) {
        t31 = tab === "dues" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-3 text-xs text-slate-500 px-2 mb-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Due date"
                        }, void 0, false, {
                            fileName: "[project]/src/components/MemberDrawer.tsx",
                            lineNumber: 485,
                            columnNumber: 100
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Amount"
                        }, void 0, false, {
                            fileName: "[project]/src/components/MemberDrawer.tsx",
                            lineNumber: 485,
                            columnNumber: 121
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-right",
                            children: "Status"
                        }, void 0, false, {
                            fileName: "[project]/src/components/MemberDrawer.tsx",
                            lineNumber: 485,
                            columnNumber: 140
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/MemberDrawer.tsx",
                    lineNumber: 485,
                    columnNumber: 33
                }, this),
                dues.isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SkeletonList"], {
                        rows: 3
                    }, void 0, false, {
                        fileName: "[project]/src/components/MemberDrawer.tsx",
                        lineNumber: 485,
                        columnNumber: 227
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/MemberDrawer.tsx",
                    lineNumber: 485,
                    columnNumber: 206
                }, this) : dues.data?.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2 max-h-72 overflow-auto",
                    children: dues.data.map(_MemberDrawerDuesDataMap)
                }, void 0, false, {
                    fileName: "[project]/src/components/MemberDrawer.tsx",
                    lineNumber: 485,
                    columnNumber: 281
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm text-slate-500 px-2 py-3",
                    children: "No dues scheduled."
                }, void 0, false, {
                    fileName: "[project]/src/components/MemberDrawer.tsx",
                    lineNumber: 485,
                    columnNumber: 381
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/MemberDrawer.tsx",
            lineNumber: 485,
            columnNumber: 28
        }, this) : null;
        $[77] = dues;
        $[78] = tab;
        $[79] = t31;
    } else {
        t31 = $[79];
    }
    let t32;
    if ($[80] !== t26 || $[81] !== t27 || $[82] !== t28 || $[83] !== t29 || $[84] !== t30 || $[85] !== t31) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full min-h-screen px-4 py-6 sm:px-6 lg:px-10",
            children: [
                t26,
                t27,
                t28,
                t29,
                t30,
                t31
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/MemberDrawer.tsx",
            lineNumber: 494,
            columnNumber: 11
        }, this);
        $[80] = t26;
        $[81] = t27;
        $[82] = t28;
        $[83] = t29;
        $[84] = t30;
        $[85] = t31;
        $[86] = t32;
    } else {
        t32 = $[86];
    }
    let t33;
    if ($[87] !== amountInput || $[88] !== editing || $[89] !== handleSaveEdit || $[90] !== modalVariants || $[91] !== patchTx) {
        t33 = editing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            className: "fixed inset-0 z-50 flex items-center justify-center bg-black/30",
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0
            },
            onClick: {
                "MemberDrawer[<motion.div>.onClick]": ()=>setEditing(null)
            }["MemberDrawer[<motion.div>.onClick]"],
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "w-[calc(100%-2rem)] max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/85 p-5 shadow-xl",
                variants: modalVariants,
                initial: "initial",
                animate: "animate",
                exit: "exit",
                onClick: _MemberDrawerMotionDivOnClick,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-base font-semibold text-slate-900 dark:text-white",
                                children: "Edit transaction"
                            }, void 0, false, {
                                fileName: "[project]/src/components/MemberDrawer.tsx",
                                lineNumber: 515,
                                columnNumber: 373
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800",
                                onClick: {
                                    "MemberDrawer[<button>.onClick]": ()=>setEditing(null)
                                }["MemberDrawer[<button>.onClick]"],
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CloseIcon"], {}, void 0, false, {
                                    fileName: "[project]/src/components/MemberDrawer.tsx",
                                    lineNumber: 517,
                                    columnNumber: 48
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/MemberDrawer.tsx",
                                lineNumber: 515,
                                columnNumber: 465
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/MemberDrawer.tsx",
                        lineNumber: 515,
                        columnNumber: 317
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 block",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-600 dark:text-slate-300",
                                        children: "Date"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MemberDrawer.tsx",
                                        lineNumber: 517,
                                        columnNumber: 146
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "date",
                                        className: "input-like",
                                        value: editing.occurredAt,
                                        onChange: {
                                            "MemberDrawer[<input>.onChange]": (e_0)=>setEditing({
                                                    "MemberDrawer[<input>.onChange > setEditing()]": (prev)=>prev ? {
                                                            ...prev,
                                                            occurredAt: e_0.target.value
                                                        } : prev
                                                }["MemberDrawer[<input>.onChange > setEditing()]"])
                                        }["MemberDrawer[<input>.onChange]"]
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MemberDrawer.tsx",
                                        lineNumber: 517,
                                        columnNumber: 210
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/MemberDrawer.tsx",
                                lineNumber: 517,
                                columnNumber: 111
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 block",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-600 dark:text-slate-300",
                                        children: "Note"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MemberDrawer.tsx",
                                        lineNumber: 524,
                                        columnNumber: 95
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "input-like",
                                        value: editing.note || "",
                                        onChange: {
                                            "MemberDrawer[<input>.onChange]": (e_1)=>setEditing({
                                                    "MemberDrawer[<input>.onChange > setEditing()]": (prev_0)=>prev_0 ? {
                                                            ...prev_0,
                                                            note: e_1.target.value
                                                        } : prev_0
                                                }["MemberDrawer[<input>.onChange > setEditing()]"])
                                        }["MemberDrawer[<input>.onChange]"]
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MemberDrawer.tsx",
                                        lineNumber: 524,
                                        columnNumber: 159
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/MemberDrawer.tsx",
                                lineNumber: 524,
                                columnNumber: 60
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "space-y-1 block",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-600 dark:text-slate-300",
                                        children: "Amount (BDT)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MemberDrawer.tsx",
                                        lineNumber: 531,
                                        columnNumber: 95
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "input-like",
                                        type: "number",
                                        step: "0.01",
                                        value: amountInput,
                                        onChange: {
                                            "MemberDrawer[<input>.onChange]": (e_2)=>{
                                                setAmountInput(e_2.target.value);
                                                const parsed_0 = Number(e_2.target.value);
                                                if (Number.isFinite(parsed_0)) {
                                                    setEditing({
                                                        "MemberDrawer[<input>.onChange > setEditing()]": (prev_1)=>prev_1 ? {
                                                                ...prev_1,
                                                                amount: Math.round(parsed_0 * 100)
                                                            } : prev_1
                                                    }["MemberDrawer[<input>.onChange > setEditing()]"]);
                                                }
                                            }
                                        }["MemberDrawer[<input>.onChange]"],
                                        disabled: editing.type !== "deposit"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MemberDrawer.tsx",
                                        lineNumber: 531,
                                        columnNumber: 167
                                    }, this),
                                    editing.type !== "deposit" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-slate-500",
                                        children: "Withdrawals & investments lock the amount to keep group splits accurate."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MemberDrawer.tsx",
                                        lineNumber: 544,
                                        columnNumber: 120
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/MemberDrawer.tsx",
                                lineNumber: 531,
                                columnNumber: 60
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/MemberDrawer.tsx",
                        lineNumber: 517,
                        columnNumber: 76
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex justify-end gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                type: "button",
                                variant: "ghost",
                                onClick: {
                                    "MemberDrawer[<Button>.onClick]": ()=>setEditing(null)
                                }["MemberDrawer[<Button>.onClick]"],
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/src/components/MemberDrawer.tsx",
                                lineNumber: 544,
                                columnNumber: 305
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                type: "button",
                                disabled: patchTx.isPending,
                                onClick: handleSaveEdit,
                                children: patchTx.isPending ? "Saving\u2026" : "Save changes"
                            }, void 0, false, {
                                fileName: "[project]/src/components/MemberDrawer.tsx",
                                lineNumber: 546,
                                columnNumber: 63
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/MemberDrawer.tsx",
                        lineNumber: 544,
                        columnNumber: 260
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/MemberDrawer.tsx",
                lineNumber: 515,
                columnNumber: 46
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/MemberDrawer.tsx",
            lineNumber: 507,
            columnNumber: 21
        }, this) : null;
        $[87] = amountInput;
        $[88] = editing;
        $[89] = handleSaveEdit;
        $[90] = modalVariants;
        $[91] = patchTx;
        $[92] = t33;
    } else {
        t33 = $[92];
    }
    let t34;
    if ($[93] !== t33) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            children: t33
        }, void 0, false, {
            fileName: "[project]/src/components/MemberDrawer.tsx",
            lineNumber: 558,
            columnNumber: 11
        }, this);
        $[93] = t33;
        $[94] = t34;
    } else {
        t34 = $[94];
    }
    let t35;
    if ($[95] !== sheetVariants || $[96] !== t32 || $[97] !== t34) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            className: "fixed inset-0 z-40 bg-gradient-to-b from-white via-slate-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden",
            variants: sheetVariants,
            initial: "initial",
            animate: "animate",
            exit: "exit",
            children: [
                t32,
                t34
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/MemberDrawer.tsx",
            lineNumber: 566,
            columnNumber: 11
        }, this);
        $[95] = sheetVariants;
        $[96] = t32;
        $[97] = t34;
        $[98] = t35;
    } else {
        t35 = $[98];
    }
    return t35;
}
_s(MemberDrawer, "EFpOXE0woiJfFw8UoSHoXdzOWPY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$providers$2f$ToastProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLockBodyScroll$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLockBodyScroll"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"]
    ];
});
_c = MemberDrawer;
function _MemberDrawerMotionDivOnClick(e) {
    return e.stopPropagation();
}
function _MemberDrawerDuesDataMap(due) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-slate-200 dark:border-slate-800",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-3 py-2 text-xs text-slate-500 dark:text-slate-400",
                children: [
                    "Principal: ",
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBDT"])(due.principal)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/MemberDrawer.tsx",
                lineNumber: 580,
                columnNumber: 98
            }, this),
            due.schedule.slice(0, 4).map({
                "MemberDrawer[dues.data.map() > (anonymous)()]": (item_0, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-3 items-center px-3 py-1 border-t border-slate-100 dark:border-slate-900/40 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: new Date(item_0.dueDate).toLocaleDateString("en-BD")
                            }, void 0, false, {
                                fileName: "[project]/src/components/MemberDrawer.tsx",
                                lineNumber: 581,
                                columnNumber: 215
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBDT"])(item_0.totalDuePoisha)
                            }, void 0, false, {
                                fileName: "[project]/src/components/MemberDrawer.tsx",
                                lineNumber: 581,
                                columnNumber: 282
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-right capitalize text-xs",
                                children: item_0.status
                            }, void 0, false, {
                                fileName: "[project]/src/components/MemberDrawer.tsx",
                                lineNumber: 581,
                                columnNumber: 329
                            }, this)
                        ]
                    }, `${due._id}-${idx}`, true, {
                        fileName: "[project]/src/components/MemberDrawer.tsx",
                        lineNumber: 581,
                        columnNumber: 73
                    }, this)
            }["MemberDrawer[dues.data.map() > (anonymous)()]"])
        ]
    }, due._id, true, {
        fileName: "[project]/src/components/MemberDrawer.tsx",
        lineNumber: 580,
        columnNumber: 10
    }, this);
}
function _temp2(id_1) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["api"].delete(`/transactions/${id_1}`);
}
function _temp(t0) {
    const { id, body } = t0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["api"].patch(`/transactions/${id}`, body);
}
var _c;
__turbopack_context__.k.register(_c, "MemberDrawer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/home/TotalBalanceDrawer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TotalBalanceDrawer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Panel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$StatCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/StatCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Skeleton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/clientApi.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/format.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLockBodyScroll$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useLockBodyScroll.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function TotalBalanceDrawer({ open, totalDeposits, totalWithdraws, available, rows, onClose }) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLockBodyScroll$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLockBodyScroll"])(open);
    const withdraws = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "withdrawals",
            "totals"
        ],
        queryFn: {
            "TotalBalanceDrawer.useQuery[withdraws]": async ()=>(await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["api"].get("/transactions", {
                    params: {
                        type: "withdraw",
                        limit: 20
                    }
                })).data
        }["TotalBalanceDrawer.useQuery[withdraws]"],
        enabled: open
    });
    const investments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "investments",
            "totals"
        ],
        queryFn: {
            "TotalBalanceDrawer.useQuery[investments]": async ()=>(await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["api"].get("/investments")).data
        }["TotalBalanceDrawer.useQuery[investments]"],
        enabled: open
    });
    if (!open) return null;
    const net = totalDeposits - totalWithdraws;
    const reduceMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const sheetVariants = reduceMotion ? {
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1
        },
        exit: {
            opacity: 0
        }
    } : {
        initial: {
            y: "100%"
        },
        animate: {
            y: 0,
            transition: {
                duration: 0.32,
                ease: [
                    0.16,
                    1,
                    0.3,
                    1
                ]
            }
        },
        exit: {
            y: "100%",
            transition: {
                duration: 0.22,
                ease: [
                    0.4,
                    0,
                    1,
                    1
                ]
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "fixed inset-0 z-40 bg-gradient-to-b from-white via-emerald-50 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-y-auto",
        variants: sheetVariants,
        initial: "initial",
        animate: "animate",
        exit: "exit",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full min-h-screen px-4 py-6 sm:px-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs uppercase tracking-[0.3em] text-slate-400",
                                    children: "Total balance"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                    lineNumber: 93,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl font-semibold text-slate-900 dark:text-white",
                                    children: "Collections vs. deductions"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                    lineNumber: 94,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                            lineNumber: 92,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "text-sm text-slate-500 hover:text-rose-500",
                            onClick: onClose,
                            children: "Close"
                        }, void 0, false, {
                            fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                    lineNumber: 91,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$StatCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            label: "Collected overall",
                            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBDT"])(totalDeposits)
                        }, void 0, false, {
                            fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$StatCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            label: "Deducted / invested",
                            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBDT"])(totalWithdraws)
                        }, void 0, false, {
                            fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$StatCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            label: "Net balance",
                            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBDT"])(net)
                        }, void 0, false, {
                            fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$StatCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            label: "Available cash",
                            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBDT"])(available)
                        }, void 0, false, {
                            fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                            lineNumber: 105,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                    lineNumber: 101,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 gap-6 lg:grid-cols-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            title: "Per-member totals",
                            description: "Lifetime deposits vs. deductions.",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-auto max-h-72 pr-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "min-w-[520px] text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "text-left text-slate-500 dark:text-slate-400",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-2 pr-3 font-medium",
                                                        children: "Member"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                                        lineNumber: 114,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-2 px-3 font-medium text-right",
                                                        children: "Deposited"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                                        lineNumber: 115,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-2 px-3 font-medium text-right",
                                                        children: "Deducted"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                                        lineNumber: 116,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-2 pl-3 font-medium text-right",
                                                        children: "Balance"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                                        lineNumber: 117,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                                lineNumber: 113,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                            lineNumber: 112,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: [
                                                rows.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "border-t border-slate-100 dark:border-slate-800",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-2 pr-3 font-medium text-slate-900 dark:text-white",
                                                                children: row.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                                                lineNumber: 122,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-2 px-3 text-right",
                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBDT"])(row.totalDeposits || 0)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                                                lineNumber: 123,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-2 px-3 text-right",
                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBDT"])(row.totalWithdraws || 0)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                                                lineNumber: 124,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-2 pl-3 text-right font-semibold text-emerald-600 dark:text-emerald-300",
                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBDT"])(row.balance || 0)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                                                lineNumber: 125,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, row.userId, true, {
                                                        fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                                        lineNumber: 121,
                                                        columnNumber: 36
                                                    }, this)),
                                                !rows.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        colSpan: 4,
                                                        className: "py-3 text-center text-slate-500",
                                                        children: "No members yet."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                                        lineNumber: 128,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                                    lineNumber: 127,
                                                    columnNumber: 36
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                            lineNumber: 120,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                    lineNumber: 111,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                lineNumber: 110,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                            lineNumber: 109,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            title: "Recent withdrawals / investments",
                            description: "Latest 20 records",
                            children: withdraws.isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SkeletonList"], {
                                rows: 4
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                lineNumber: 138,
                                columnNumber: 36
                            }, this) : withdraws.data?.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2 max-h-72 overflow-auto pr-1",
                                children: withdraws.data.map((tx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-2xl border border-slate-200 dark:border-slate-800 p-3 flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-semibold text-slate-900 dark:text-white",
                                                        children: tx.note || "Withdrawal"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                                        lineNumber: 141,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-slate-500 dark:text-slate-400",
                                                        children: new Date(tx.occurredAt).toLocaleDateString("en-BD")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                                        lineNumber: 142,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                                lineNumber: 140,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-semibold text-rose-600 dark:text-rose-300",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBDT"])(Math.abs(tx.amount || 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                                lineNumber: 144,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, tx._id, true, {
                                        fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                        lineNumber: 139,
                                        columnNumber: 43
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                lineNumber: 138,
                                columnNumber: 89
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-500",
                                children: "No withdrawals recorded yet."
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                lineNumber: 146,
                                columnNumber: 24
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                            lineNumber: 137,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                    lineNumber: 108,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    title: "Investments overview",
                    description: "Funds currently out of circulation.",
                    children: investments.isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SkeletonList"], {
                        rows: 3
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                        lineNumber: 151,
                        columnNumber: 36
                    }, this) : investments.data?.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
                        children: investments.data.map((inv)=>{
                            const returned = inv.returnedPoisha || 0;
                            const total = inv.amountPoisha + (inv.expectedInterestPoisha || 0);
                            const pct = total ? Math.min(100, Math.round(returned / total * 100)) : 0;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-semibold text-slate-900 dark:text-white",
                                                children: inv.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                                lineNumber: 158,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-300",
                                                children: inv.status === "completed" ? "Completed" : "Active"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                                lineNumber: 159,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                        lineNumber: 157,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-500 dark:text-slate-400",
                                        children: [
                                            "Principal: ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBDT"])(inv.amountPoisha)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                        lineNumber: 163,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-slate-500 dark:text-slate-400",
                                        children: [
                                            "Returned ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBDT"])(returned),
                                            " of ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBDT"])(total),
                                            " (",
                                            pct,
                                            "%)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                        lineNumber: 164,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-full bg-emerald-500",
                                            style: {
                                                width: `${pct}%`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                            lineNumber: 168,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                        lineNumber: 167,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, inv.id, true, {
                                fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                                lineNumber: 156,
                                columnNumber: 20
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                        lineNumber: 151,
                        columnNumber: 91
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-slate-500",
                        children: "No investments recorded yet."
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                        lineNumber: 174,
                        columnNumber: 22
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
                    lineNumber: 150,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
            lineNumber: 90,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/home/TotalBalanceDrawer.tsx",
        lineNumber: 89,
        columnNumber: 10
    }, this);
}
_s(TotalBalanceDrawer, "rNEqm7JSQlx4MtwZyHFveztyQY8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLockBodyScroll$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLockBodyScroll"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"]
    ];
});
_c = TotalBalanceDrawer;
var _c;
__turbopack_context__.k.register(_c, "TotalBalanceDrawer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/home/YearlyPeek.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>YearlyPeek
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/clientApi.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/format.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function YearlyPeek() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const currentYear = new Date().getFullYear();
    const years = [
        currentYear,
        currentYear - 1
    ];
    const [totals, setTotals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "YearlyPeek.useEffect": ()=>{
            let cancelled = false;
            async function load() {
                setLoading(true);
                setError(null);
                try {
                    const results = await Promise.all(years.map({
                        "YearlyPeek.useEffect.load": async (year)=>{
                            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["api"].get("/reports/yearly-collection", {
                                params: {
                                    year
                                }
                            });
                            return {
                                year,
                                total: res.data?.total ?? 0
                            };
                        }
                    }["YearlyPeek.useEffect.load"]));
                    if (!cancelled) {
                        setTotals(results.reduce({
                            "YearlyPeek.useEffect.load": (acc, item)=>({
                                    ...acc,
                                    [item.year]: item.total
                                })
                        }["YearlyPeek.useEffect.load"], {}));
                    }
                } catch (err) {
                    if (!cancelled) setError(err?.response?.data?.error || "Failed to load yearly totals");
                } finally{
                    if (!cancelled) setLoading(false);
                }
            }
            load();
            return ({
                "YearlyPeek.useEffect": ()=>{
                    cancelled = true;
                }
            })["YearlyPeek.useEffect"];
        }
    }["YearlyPeek.useEffect"], [
        currentYear
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs uppercase tracking-[0.3em] text-slate-400",
                children: "Yearly collection"
            }, void 0, false, {
                fileName: "[project]/src/components/home/YearlyPeek.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
                children: years.map((year_0)=>{
                    const total = totals[year_0];
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>router.push(`/yearly?year=${year_0}`),
                        className: "text-left rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 p-4 shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400/40",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs uppercase tracking-[0.3em] text-slate-400",
                                children: "Collection year"
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/YearlyPeek.tsx",
                                lineNumber: 53,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl font-semibold text-slate-900 dark:text-white mt-1",
                                children: year_0
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/YearlyPeek.tsx",
                                lineNumber: 54,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-500 dark:text-slate-400 mt-2",
                                children: typeof total === "number" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBDT"])(total) : loading ? "Loading…" : "Tap to view details"
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/YearlyPeek.tsx",
                                lineNumber: 55,
                                columnNumber: 15
                            }, this)
                        ]
                    }, year_0, true, {
                        fileName: "[project]/src/components/home/YearlyPeek.tsx",
                        lineNumber: 52,
                        columnNumber: 16
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/home/YearlyPeek.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-rose-500",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/components/home/YearlyPeek.tsx",
                lineNumber: 61,
                columnNumber: 16
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/home/YearlyPeek.tsx",
        lineNumber: 47,
        columnNumber: 10
    }, this);
}
_s(YearlyPeek, "TBVlmWWtkKmXoqUymdoCpaYswGQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = YearlyPeek;
var _c;
__turbopack_context__.k.register(_c, "YearlyPeek");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/home/HomeClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomeClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Panel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$StatCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/StatCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MemberCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/MemberCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$PageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/PageHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MemberDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/MemberDrawer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$TotalBalanceDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/home/TotalBalanceDrawer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$YearlyPeek$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/home/YearlyPeek.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/clientApi.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/format.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const STALE_TIME = 30_000;
function HomeClient(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(118);
    if ($[0] !== "c7613a54ff8b93b3a3c6d36b761c9a9f54c0ce31d2233246b920ddfd137a3fd5") {
        for(let $i = 0; $i < 118; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "c7613a54ff8b93b3a3c6d36b761c9a9f54c0ce31d2233246b920ddfd137a3fd5";
    }
    const { initialData, me } = t0;
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [drawerUserId, setDrawerUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showTotalsDrawer, setShowTotalsDrawer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [
            "home"
        ];
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] !== initialData) {
        t2 = {
            queryKey: t1,
            queryFn: _temp,
            initialData,
            staleTime: STALE_TIME,
            gcTime: STALE_TIME * 4,
            refetchOnWindowFocus: false
        };
        $[2] = initialData;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    const home = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t2);
    const data = home.data;
    const isRefreshing = home.isFetching && !!home.data;
    let t3;
    let t4;
    if ($[4] !== me.id) {
        t3 = [
            "dues",
            me.id
        ];
        t4 = async ()=>(await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["api"].get(`/users/${me.id}/dues`)).data;
        $[4] = me.id;
        $[5] = t3;
        $[6] = t4;
    } else {
        t3 = $[5];
        t4 = $[6];
    }
    const t5 = me.role === "user" && !!me.id;
    let t6;
    if ($[7] !== t3 || $[8] !== t4 || $[9] !== t5) {
        t6 = {
            queryKey: t3,
            queryFn: t4,
            enabled: t5,
            staleTime: STALE_TIME,
            refetchOnWindowFocus: false
        };
        $[7] = t3;
        $[8] = t4;
        $[9] = t5;
        $[10] = t6;
    } else {
        t6 = $[10];
    }
    const duesQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t6);
    let t7;
    let t8;
    if ($[11] !== me.id) {
        t7 = [
            "txs",
            me.id,
            12
        ];
        t8 = async ()=>(await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["api"].get("/transactions", {
                params: {
                    userId: me.id,
                    limit: 20
                }
            })).data;
        $[11] = me.id;
        $[12] = t7;
        $[13] = t8;
    } else {
        t7 = $[12];
        t8 = $[13];
    }
    const t9 = me.role === "user" && !!me.id;
    let t10;
    if ($[14] !== t7 || $[15] !== t8 || $[16] !== t9) {
        t10 = {
            queryKey: t7,
            queryFn: t8,
            enabled: t9,
            staleTime: STALE_TIME,
            refetchOnWindowFocus: false
        };
        $[14] = t7;
        $[15] = t8;
        $[16] = t9;
        $[17] = t10;
    } else {
        t10 = $[17];
    }
    const userTxsQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t10);
    let t11;
    bb0: {
        if (me.role !== "user" || !duesQuery.data) {
            t11 = 0;
            break bb0;
        }
        let soonest = null;
        for (const due of duesQuery.data){
            for (const item of due.schedule){
                if (item.status === "paid") {
                    continue;
                }
                const remaining = (item.totalDuePoisha || 0) - (item.paidPoisha || 0);
                if (remaining <= 0) {
                    continue;
                }
                soonest = remaining;
                break;
            }
            if (soonest) {
                break;
            }
        }
        t11 = soonest || 0;
    }
    const nextEmi = t11;
    if (!data) {
        return null;
    }
    if (me.role === "user" && data.cards.length) {
        const card = data.cards[0];
        let t12;
        if ($[18] !== card || $[19] !== userTxsQuery.data) {
            t12 = userTxsQuery.data || card.recent || [];
            $[18] = card;
            $[19] = userTxsQuery.data;
            $[20] = t12;
        } else {
            t12 = $[20];
        }
        const recent = t12;
        const t13 = `Hi ${me.name || "there"}, here’s the current picture`;
        let t14;
        if ($[21] !== t13) {
            t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$PageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                eyebrow: "My savings",
                title: t13,
                description: "Balance, what you\u2019ve contributed so far, and upcoming instalments if any are still pending."
            }, void 0, false, {
                fileName: "[project]/src/components/home/HomeClient.tsx",
                lineNumber: 173,
                columnNumber: 13
            }, this);
            $[21] = t13;
            $[22] = t14;
        } else {
            t14 = $[22];
        }
        let t15;
        if ($[23] !== data.groupBalance) {
            t15 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBDT"])(data.groupBalance);
            $[23] = data.groupBalance;
            $[24] = t15;
        } else {
            t15 = $[24];
        }
        let t16;
        if ($[25] !== t15) {
            t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$StatCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                label: "Savings balance",
                value: t15
            }, void 0, false, {
                fileName: "[project]/src/components/home/HomeClient.tsx",
                lineNumber: 189,
                columnNumber: 13
            }, this);
            $[25] = t15;
            $[26] = t16;
        } else {
            t16 = $[26];
        }
        let t17;
        if ($[27] !== data.totalDeposits) {
            t17 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBDT"])(data.totalDeposits);
            $[27] = data.totalDeposits;
            $[28] = t17;
        } else {
            t17 = $[28];
        }
        let t18;
        if ($[29] !== t17) {
            t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$StatCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                label: "Total contributed",
                value: t17
            }, void 0, false, {
                fileName: "[project]/src/components/home/HomeClient.tsx",
                lineNumber: 205,
                columnNumber: 13
            }, this);
            $[29] = t17;
            $[30] = t18;
        } else {
            t18 = $[30];
        }
        let t19;
        if ($[31] !== nextEmi) {
            t19 = nextEmi > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$StatCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                label: "Next payment due",
                value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBDT"])(nextEmi),
                helper: "Covers your oldest pending instalment"
            }, void 0, false, {
                fileName: "[project]/src/components/home/HomeClient.tsx",
                lineNumber: 213,
                columnNumber: 27
            }, this) : null;
            $[31] = nextEmi;
            $[32] = t19;
        } else {
            t19 = $[32];
        }
        let t20;
        if ($[33] !== t16 || $[34] !== t18 || $[35] !== t19) {
            t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3",
                children: [
                    t16,
                    t18,
                    t19
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/home/HomeClient.tsx",
                lineNumber: 221,
                columnNumber: 13
            }, this);
            $[33] = t16;
            $[34] = t18;
            $[35] = t19;
            $[36] = t20;
        } else {
            t20 = $[36];
        }
        let t21;
        if ($[37] !== isRefreshing) {
            t21 = isRefreshing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-slate-500",
                children: "Refreshing your dashboard…"
            }, void 0, false, {
                fileName: "[project]/src/components/home/HomeClient.tsx",
                lineNumber: 231,
                columnNumber: 28
            }, this) : null;
            $[37] = isRefreshing;
            $[38] = t21;
        } else {
            t21 = $[38];
        }
        let t22;
        if ($[39] === Symbol.for("react.memo_cache_sentinel")) {
            t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-12 text-xs text-slate-500 px-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-3",
                        children: "Date"
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/HomeClient.tsx",
                        lineNumber: 239,
                        columnNumber: 76
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-5",
                        children: "Details"
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/HomeClient.tsx",
                        lineNumber: 239,
                        columnNumber: 114
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-4 text-right",
                        children: "Amount"
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/HomeClient.tsx",
                        lineNumber: 239,
                        columnNumber: 155
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/home/HomeClient.tsx",
                lineNumber: 239,
                columnNumber: 13
            }, this);
            $[39] = t22;
        } else {
            t22 = $[39];
        }
        let t23;
        if ($[40] !== recent) {
            t23 = recent.length ? recent.map(_HomeClientRecentMap) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm text-slate-500 px-2 py-3",
                children: "No transactions recorded yet."
            }, void 0, false, {
                fileName: "[project]/src/components/home/HomeClient.tsx",
                lineNumber: 246,
                columnNumber: 64
            }, this);
            $[40] = recent;
            $[41] = t23;
        } else {
            t23 = $[41];
        }
        let t24;
        if ($[42] !== t23) {
            t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "Recent activity",
                description: "Only transactions tied to your name appear here.",
                children: [
                    t22,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-h-72 overflow-auto divide-y divide-slate-100 dark:divide-slate-800",
                        children: t23
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/HomeClient.tsx",
                        lineNumber: 254,
                        columnNumber: 112
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/home/HomeClient.tsx",
                lineNumber: 254,
                columnNumber: 13
            }, this);
            $[42] = t23;
            $[43] = t24;
        } else {
            t24 = $[43];
        }
        let t25;
        if ($[44] !== t14 || $[45] !== t20 || $[46] !== t21 || $[47] !== t24) {
            t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    t14,
                    t20,
                    t21,
                    t24
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/home/HomeClient.tsx",
                lineNumber: 262,
                columnNumber: 13
            }, this);
            $[44] = t14;
            $[45] = t20;
            $[46] = t21;
            $[47] = t24;
            $[48] = t25;
        } else {
            t25 = $[48];
        }
        return t25;
    }
    let t12;
    bb1: {
        if (!data) {
            let t13;
            if ($[49] === Symbol.for("react.memo_cache_sentinel")) {
                t13 = [];
                $[49] = t13;
            } else {
                t13 = $[49];
            }
            t12 = t13;
            break bb1;
        }
        let t13;
        if ($[50] !== data.groupBalance) {
            t13 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBDT"])(data.groupBalance);
            $[50] = data.groupBalance;
            $[51] = t13;
        } else {
            t13 = $[51];
        }
        let t14;
        if ($[52] === Symbol.for("react.memo_cache_sentinel")) {
            t14 = ()=>setShowTotalsDrawer(true);
            $[52] = t14;
        } else {
            t14 = $[52];
        }
        let t15;
        if ($[53] !== t13) {
            t15 = {
                label: "Total balance",
                value: t13,
                helper: "Tap to compare deposits vs. deductions",
                onClick: t14
            };
            $[53] = t13;
            $[54] = t15;
        } else {
            t15 = $[54];
        }
        let t16;
        if ($[55] !== data.groupBalance) {
            t16 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBDT"])(data.groupBalance);
            $[55] = data.groupBalance;
            $[56] = t16;
        } else {
            t16 = $[56];
        }
        let t17;
        if ($[57] !== router) {
            t17 = ()=>router.push("/balances");
            $[57] = router;
            $[58] = t17;
        } else {
            t17 = $[58];
        }
        let t18;
        if ($[59] !== t16 || $[60] !== t17) {
            t18 = {
                label: "Available cash",
                value: t16,
                helper: "See every member\u2019s balance",
                onClick: t17
            };
            $[59] = t16;
            $[60] = t17;
            $[61] = t18;
        } else {
            t18 = $[61];
        }
        let t19;
        if ($[62] !== data.membersCount) {
            t19 = {
                label: "Active members",
                value: data.membersCount,
                helper: "Counting only active profiles"
            };
            $[62] = data.membersCount;
            $[63] = t19;
        } else {
            t19 = $[63];
        }
        let t20;
        if ($[64] !== data.arrearsCount) {
            t20 = {
                label: "Open dues",
                value: data.arrearsCount,
                helper: "Members behind on instalments"
            };
            $[64] = data.arrearsCount;
            $[65] = t20;
        } else {
            t20 = $[65];
        }
        let stats;
        if ($[66] !== data.investments || $[67] !== data.totalDeposits || $[68] !== t15 || $[69] !== t18 || $[70] !== t19 || $[71] !== t20) {
            stats = [
                t15,
                t18,
                t19,
                t20
            ];
            let t21;
            if ($[73] !== data.investments) {
                t21 = data.investments || {
                    principal: 0,
                    expectedInterest: 0
                };
                $[73] = data.investments;
                $[74] = t21;
            } else {
                t21 = $[74];
            }
            const investmentInfo = t21;
            let t22;
            if ($[75] !== investmentInfo.principal) {
                t22 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBDT"])(investmentInfo.principal);
                $[75] = investmentInfo.principal;
                $[76] = t22;
            } else {
                t22 = $[76];
            }
            let t23;
            if ($[77] !== t22) {
                t23 = {
                    label: "Invested funds",
                    value: t22,
                    helper: "Currently out earning returns"
                };
                $[77] = t22;
                $[78] = t23;
            } else {
                t23 = $[78];
            }
            let t24;
            if ($[79] !== investmentInfo.expectedInterest) {
                t24 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBDT"])(investmentInfo.expectedInterest);
                $[79] = investmentInfo.expectedInterest;
                $[80] = t24;
            } else {
                t24 = $[80];
            }
            let t25;
            if ($[81] !== t24) {
                t25 = {
                    label: "Expected interest",
                    value: t24
                };
                $[81] = t24;
                $[82] = t25;
            } else {
                t25 = $[82];
            }
            let t26;
            if ($[83] !== data.totalDeposits) {
                t26 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBDT"])(data.totalDeposits);
                $[83] = data.totalDeposits;
                $[84] = t26;
            } else {
                t26 = $[84];
            }
            let t27;
            if ($[85] !== t26) {
                t27 = {
                    label: "Total collected",
                    value: t26
                };
                $[85] = t26;
                $[86] = t27;
            } else {
                t27 = $[86];
            }
            stats.push(t23, t25, t27);
            $[66] = data.investments;
            $[67] = data.totalDeposits;
            $[68] = t15;
            $[69] = t18;
            $[70] = t19;
            $[71] = t20;
            $[72] = stats;
        } else {
            stats = $[72];
        }
        t12 = stats;
    }
    const summaryStats = t12;
    let t13;
    if ($[87] !== summaryStats) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4",
            children: summaryStats.map(_HomeClientSummaryStatsMap)
        }, void 0, false, {
            fileName: "[project]/src/components/home/HomeClient.tsx",
            lineNumber: 457,
            columnNumber: 11
        }, this);
        $[87] = summaryStats;
        $[88] = t13;
    } else {
        t13 = $[88];
    }
    let t14;
    if ($[89] !== me.role) {
        t14 = me.role !== "user" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$YearlyPeek$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/src/components/home/HomeClient.tsx",
            lineNumber: 465,
            columnNumber: 32
        }, this) : null;
        $[89] = me.role;
        $[90] = t14;
    } else {
        t14 = $[90];
    }
    let t15;
    if ($[91] !== isRefreshing) {
        t15 = isRefreshing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs text-slate-500",
            children: "Refreshing data…"
        }, void 0, false, {
            fileName: "[project]/src/components/home/HomeClient.tsx",
            lineNumber: 473,
            columnNumber: 26
        }, this) : null;
        $[91] = isRefreshing;
        $[92] = t15;
    } else {
        t15 = $[92];
    }
    let t16;
    if ($[93] !== data.cards) {
        let t17;
        if ($[95] === Symbol.for("react.memo_cache_sentinel")) {
            t17 = ({
                "HomeClient[data.cards.map()]": (card_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MemberCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        member: card_0,
                        onSelect: {
                            "HomeClient[data.cards.map() > <MemberCard>.onSelect]": (id)=>setDrawerUserId(id)
                        }["HomeClient[data.cards.map() > <MemberCard>.onSelect]"]
                    }, card_0.userId, false, {
                        fileName: "[project]/src/components/home/HomeClient.tsx",
                        lineNumber: 484,
                        columnNumber: 51
                    }, this)
            })["HomeClient[data.cards.map()]"];
            $[95] = t17;
        } else {
            t17 = $[95];
        }
        t16 = data.cards.map(t17);
        $[93] = data.cards;
        $[94] = t16;
    } else {
        t16 = $[94];
    }
    let t17;
    if ($[96] !== t16) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            title: "Members at a glance",
            description: "Open any member to record deposits, withdrawals, or review their ledger.",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3",
                children: t16
            }, void 0, false, {
                fileName: "[project]/src/components/home/HomeClient.tsx",
                lineNumber: 500,
                columnNumber: 133
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/home/HomeClient.tsx",
            lineNumber: 500,
            columnNumber: 11
        }, this);
        $[96] = t16;
        $[97] = t17;
    } else {
        t17 = $[97];
    }
    let t18;
    if ($[98] !== drawerUserId || $[99] !== me.role) {
        t18 = drawerUserId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MemberDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            userId: drawerUserId,
            role: me.role,
            onClose: {
                "HomeClient[<MemberDrawer>.onClose]": ()=>setDrawerUserId(null)
            }["HomeClient[<MemberDrawer>.onClose]"]
        }, void 0, false, {
            fileName: "[project]/src/components/home/HomeClient.tsx",
            lineNumber: 508,
            columnNumber: 26
        }, this) : null;
        $[98] = drawerUserId;
        $[99] = me.role;
        $[100] = t18;
    } else {
        t18 = $[100];
    }
    let t19;
    if ($[101] !== t18) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            children: t18
        }, void 0, false, {
            fileName: "[project]/src/components/home/HomeClient.tsx",
            lineNumber: 519,
            columnNumber: 11
        }, this);
        $[101] = t18;
        $[102] = t19;
    } else {
        t19 = $[102];
    }
    let t20;
    if ($[103] !== data.cards || $[104] !== data.groupBalance || $[105] !== data.totalDeposits || $[106] !== data.totalWithdraws || $[107] !== showTotalsDrawer) {
        t20 = showTotalsDrawer ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$TotalBalanceDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            open: showTotalsDrawer,
            totalDeposits: data.totalDeposits,
            totalWithdraws: data.totalWithdraws,
            available: data.groupBalance,
            rows: data.cards,
            onClose: {
                "HomeClient[<TotalBalanceDrawer>.onClose]": ()=>setShowTotalsDrawer(false)
            }["HomeClient[<TotalBalanceDrawer>.onClose]"]
        }, void 0, false, {
            fileName: "[project]/src/components/home/HomeClient.tsx",
            lineNumber: 527,
            columnNumber: 30
        }, this) : null;
        $[103] = data.cards;
        $[104] = data.groupBalance;
        $[105] = data.totalDeposits;
        $[106] = data.totalWithdraws;
        $[107] = showTotalsDrawer;
        $[108] = t20;
    } else {
        t20 = $[108];
    }
    let t21;
    if ($[109] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            children: t20
        }, void 0, false, {
            fileName: "[project]/src/components/home/HomeClient.tsx",
            lineNumber: 541,
            columnNumber: 11
        }, this);
        $[109] = t20;
        $[110] = t21;
    } else {
        t21 = $[110];
    }
    let t22;
    if ($[111] !== t13 || $[112] !== t14 || $[113] !== t15 || $[114] !== t17 || $[115] !== t19 || $[116] !== t21) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                t13,
                t14,
                t15,
                t17,
                t19,
                t21
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/home/HomeClient.tsx",
            lineNumber: 549,
            columnNumber: 11
        }, this);
        $[111] = t13;
        $[112] = t14;
        $[113] = t15;
        $[114] = t17;
        $[115] = t19;
        $[116] = t21;
        $[117] = t22;
    } else {
        t22 = $[117];
    }
    return t22;
}
_s(HomeClient, "TeoX1ipKvs6DaBN/dt7wv+HLm0Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
_c = HomeClient;
function _HomeClientSummaryStatsMap(stat) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$StatCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        label: stat.label,
        value: stat.value,
        helper: stat.helper,
        onClick: stat.onClick
    }, String(stat.label), false, {
        fileName: "[project]/src/components/home/HomeClient.tsx",
        lineNumber: 563,
        columnNumber: 10
    }, this);
}
function _HomeClientRecentMap(tx) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-12 items-center py-2 px-2 text-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "col-span-3",
                children: new Date(tx.occurredAt || tx.date).toLocaleDateString("en-BD")
            }, void 0, false, {
                fileName: "[project]/src/components/home/HomeClient.tsx",
                lineNumber: 566,
                columnNumber: 100
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `col-span-5 ${tx.type === "deposit" ? "text-emerald-600" : "text-rose-600"}`,
                children: tx.note || tx.type
            }, void 0, false, {
                fileName: "[project]/src/components/home/HomeClient.tsx",
                lineNumber: 566,
                columnNumber: 200
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "col-span-4 text-right",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBDT"])(tx.amount)
            }, void 0, false, {
                fileName: "[project]/src/components/home/HomeClient.tsx",
                lineNumber: 566,
                columnNumber: 322
            }, this)
        ]
    }, tx._id || tx.date, true, {
        fileName: "[project]/src/components/home/HomeClient.tsx",
        lineNumber: 566,
        columnNumber: 10
    }, this);
}
async function _temp() {
    return (await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$clientApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["api"].get("/home")).data;
}
var _c;
__turbopack_context__.k.register(_c, "HomeClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_38a2d83a._.js.map