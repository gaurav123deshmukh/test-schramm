document.addEventListener("DOMContentLoaded",()=>{
 // card rows auto-slide every 2s on phones/tablets (pauses on touch, off for reduced-motion)
 const rm=matchMedia("(prefers-reduced-motion:reduce)").matches;
 document.querySelectorAll(".growth,.service-grid").forEach(r=>{let hold=false,vis=false,t;
  const pause=()=>{hold=true;clearTimeout(t);t=setTimeout(()=>hold=false,4000)};
  ["touchstart","pointerdown","wheel"].forEach(ev=>r.addEventListener(ev,pause,{passive:true}));
  new IntersectionObserver(e=>vis=e[0].isIntersecting).observe(r);
  setInterval(()=>{if(innerWidth>900||hold||!vis||rm||document.hidden||!r.children[0])return;
   const w=r.children[0].getBoundingClientRect().width;
   if(r.scrollLeft+r.clientWidth>=r.scrollWidth-6)r.scrollTo({left:0,behavior:"smooth"});
   else r.scrollTo({left:Math.round(r.scrollLeft/w)*w+w,behavior:"smooth"})},2000)});

 // reveal fix: legacy code left a 22px offset on cards that were never hovered
 const rv=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){(e.target.classList.contains("growth")?[...e.target.children]:[e.target]).forEach(x=>{x.style.opacity=1;x.style.transform=""});rv.unobserve(e.target)}}),{threshold:.12});
 document.querySelectorAll("[data-reveal]").forEach(el=>{const g=el.closest(".growth");if(g){if(!g._o){g._o=1;rv.observe(g)}}else rv.observe(el)});

 const m=document.querySelector(".menu");if(!m)return;
 const n=m.cloneNode(true);m.replaceWith(n);   // drop legacy inline-style toggle
 n.setAttribute("role","button");n.setAttribute("tabindex","0");n.setAttribute("aria-label","Open menu");n.setAttribute("aria-expanded","false");
 const setH=()=>{const s=document.querySelector(".site-nav");if(s)document.documentElement.style.setProperty("--nav-h",Math.round(s.getBoundingClientRect().bottom)+"px")};
 const set=o=>{setH();document.body.classList.toggle("nav-open",o);n.textContent=o?"✕":"☰";n.setAttribute("aria-expanded",o);n.setAttribute("aria-label",o?"Close menu":"Open menu")};
 const tog=()=>set(!document.body.classList.contains("nav-open"));
 n.addEventListener("click",tog);n.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();tog()}});
 document.querySelectorAll(".nav-drop > a").forEach(a=>a.addEventListener("click",e=>{
  if(innerWidth<=900&&!document.body.classList.contains("nav-open"))return;
  if(innerWidth<=900){const d=a.parentElement;if(!d.classList.contains("open")){e.preventDefault();document.querySelectorAll(".nav-drop.open").forEach(x=>x.classList.remove("open"));d.classList.add("open")}}}));
 document.querySelectorAll(".navlinks a[href]").forEach(a=>a.addEventListener("click",()=>{if(!a.parentElement.classList.contains("nav-drop")||a.closest(".mega-menu"))set(false)}));
 addEventListener("resize",()=>{setH();if(innerWidth>900){set(false);document.querySelectorAll(".nav-drop.open").forEach(x=>x.classList.remove("open"))}});
 addEventListener("keydown",e=>{if(e.key==="Escape")set(false)});
});
