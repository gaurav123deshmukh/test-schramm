
document.addEventListener('DOMContentLoaded',()=>{
 const menu=document.querySelector('.menu');
 const nav=document.querySelector('.navlinks');
 if(menu) menu.onclick=()=>{nav.style.display=nav.style.display==='flex'?'none':'flex';nav.style.position='absolute';nav.style.top='82px';nav.style.left='0';nav.style.right='0';nav.style.background='#050914';nav.style.flexDirection='column';nav.style.padding='20px'};
 const reveal=()=>document.querySelectorAll('[data-reveal]').forEach(e=>{if(e.getBoundingClientRect().top<innerHeight*.88)e.style.opacity=1});
 document.querySelectorAll('[data-reveal]').forEach(e=>{e.style.opacity=0;e.style.transform='translateY(22px)';e.style.transition='opacity .8s,transform .8s';});
 addEventListener('scroll',()=>{reveal();});
 reveal();
 document.querySelectorAll('.node').forEach(n=>n.addEventListener('mousemove',e=>{const r=n.getBoundingClientRect();n.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.08}px,${(e.clientY-r.top-r.height/2)*.08}px)`}));
 document.querySelectorAll('.node').forEach(n=>n.addEventListener('mouseleave',()=>n.style.transform=''));
});

/* V8 interactive cursor and hero selector */
document.addEventListener("DOMContentLoaded",()=>{const hero=document.querySelector(".cinematic-hero"),visual=document.querySelector(".cinematic-visual");if(hero){const r=document.createElement("div");r.className="cursor-reticle";document.body.appendChild(r);hero.addEventListener("mousemove",e=>{r.style.left=e.clientX+"px";r.style.top=e.clientY+"px";r.classList.add("on");if(visual){const x=(e.clientX-innerWidth/2)/innerWidth,y=(e.clientY-innerHeight/2)/innerHeight;visual.style.transform=`perspective(900px) rotateY(${x*5}deg) rotateX(${-y*4}deg)`}});hero.addEventListener("mouseleave",()=>{r.classList.remove("on");if(visual)visual.style.transform=""});hero.addEventListener("click",()=>{r.classList.remove("click");void r.offsetWidth;r.classList.add("click")})}const sel=document.getElementById("growthSelect"),out=document.getElementById("selectorOutput");const copy={visibility:"We’ll combine SEO, social, content and paid reach to put your brand in front of the right audience.",leads:"We’ll connect targeting, campaigns, landing pages and follow-up into a lead-generation system.",sales:"We’ll focus the digital journey on intent, conversion, performance data and sales outcomes.",brand:"We’ll strengthen your identity, creative communication, website and digital presence.",expansion:"We’ll map the audience, channels and digital assets needed to enter and grow in a new market.",custom:"No problem. Tell us where you are today and what you want next — we’ll help shape the right plan."};if(sel)sel.addEventListener("change",()=>out.textContent=copy[sel.value]);document.querySelectorAll(".floating-chip").forEach(c=>{c.addEventListener("mousemove",e=>{const b=c.getBoundingClientRect();c.style.transform=`translate(${(e.clientX-b.left-b.width/2)*.07}px,${(e.clientY-b.top-b.height/2)*.07}px) scale(1.04)`});c.addEventListener("mouseleave",()=>c.style.transform="")})});

/* V9 cursor / CTA micro-interactions */
document.addEventListener("DOMContentLoaded",()=>{
 const hero=document.querySelector(".cinematic-hero");
 document.querySelectorAll(".navcta,.btn.primary").forEach(btn=>{
   btn.addEventListener("pointerdown",()=>btn.classList.add("pressed"));
   btn.addEventListener("pointerup",()=>setTimeout(()=>btn.classList.remove("pressed"),180));
 });
 if(hero){
   hero.addEventListener("mousemove",e=>{
     hero.style.setProperty("--cursorX",e.clientX+"px");
     hero.style.setProperty("--cursorY",e.clientY+"px");
   });
 }
});

/* V11 Get a Quote — hover on desktop, click on touch devices */
document.addEventListener("DOMContentLoaded",()=>{
  document.querySelectorAll(".navcta-wrap").forEach(wrap=>{
    const cta=wrap.querySelector(".navcta");
    const panel=wrap.querySelector(".quote-hover-panel");
    const close=wrap.querySelector(".quote-close");
    if(!cta||!panel) return;
    const touch=()=>window.matchMedia("(max-width:760px)").matches;
    cta.addEventListener("click",e=>{
      if(touch()){
        e.preventDefault();
        const open=panel.classList.toggle("open");
        cta.setAttribute("aria-expanded",String(open));
      }
    });
    close?.addEventListener("click",()=>{panel.classList.remove("open");cta.setAttribute("aria-expanded","false")});
  });
  document.addEventListener("click",e=>{
    document.querySelectorAll(".navcta-wrap").forEach(wrap=>{
      if(!wrap.contains(e.target)){
        const p=wrap.querySelector(".quote-hover-panel"), c=wrap.querySelector(".navcta");
        p?.classList.remove("open"); c?.setAttribute("aria-expanded","false");
      }
    });
  });
  document.addEventListener("keydown",e=>{
    if(e.key==="Escape") document.querySelectorAll(".quote-hover-panel.open").forEach(p=>{
      p.classList.remove("open");
      p.closest(".navcta-wrap")?.querySelector(".navcta")?.setAttribute("aria-expanded","false");
    });
  });
});
