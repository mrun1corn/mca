module.exports=[89578,a=>{a.v({className:"geist_a71539c9-module__T19VSG__className",variable:"geist_a71539c9-module__T19VSG__variable"})},35214,a=>{a.v({className:"geist_mono_8d43a2aa-module__8Li5zG__className",variable:"geist_mono_8d43a2aa-module__8Li5zG__variable"})},27572,a=>{"use strict";var b=a.i(7997),c=a.i(89578);let d={className:c.default.className,style:{fontFamily:"'Geist', 'Geist Fallback'",fontStyle:"normal"}};null!=c.default.variable&&(d.variable=c.default.variable);var e=a.i(35214);let f={className:e.default.className,style:{fontFamily:"'Geist Mono', 'Geist Mono Fallback'",fontStyle:"normal"}};function g({children:a}){let c=`
    (function() {
      try {
        var stored = localStorage.getItem('theme');
        var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        var theme = stored ? stored : (prefersDark ? 'dark' : 'light');
        var root = document.documentElement;
        root.classList.toggle('dark', theme === 'dark');
        root.setAttribute('data-theme', theme);
        root.style.colorScheme = theme;
        document.body && document.body.setAttribute('data-theme', theme);
      } catch (_) {}
    })();
  `;return(0,b.jsxs)("html",{lang:"en",suppressHydrationWarning:!0,children:[(0,b.jsx)("head",{children:(0,b.jsx)("script",{dangerouslySetInnerHTML:{__html:c}})}),(0,b.jsx)("body",{className:`${d.variable} ${f.variable} antialiased`,children:a})]})}null!=e.default.variable&&(f.variable=e.default.variable),a.s(["default",()=>g,"metadata",0,{title:"Community Savings",description:"Dashboard for community-led savings groups",icons:{icon:"/favicon.svg"}}],27572)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__11fa4345._.js.map