if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let c={};const d=e=>n(e,o),t={module:{uri:o},exports:c,require:d};i[o]=Promise.all(s.map((e=>t[e]||d(e)))).then((e=>(r(...e),c)))}}define(["./workbox-27b29e6f"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-8YV5Picf.css",revision:null},{url:"assets/index-sSPC2V94.js",revision:null},{url:"index.html",revision:"3c5d906666f4449aaa2458fe4c45fbbe"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.ico",revision:"c90a49836375fe50c355672d7892f057"},{url:"apple-touch-icon.png",revision:"a18cda3d5132fb40c9c8a6bf92f35d47"},{url:"android-chrome-192x192.png",revision:"0595552e99c51d1590679624c147cd0f"},{url:"android-chrome-512x512.png",revision:"dae5f29642e83e25a75a8f9d451e82c0"},{url:"maskable_icon.png",revision:"d8a2424e0bfdec7726317b126523478f"},{url:"manifest.webmanifest",revision:"d0fbcc51851654b3cf5256a488173701"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
