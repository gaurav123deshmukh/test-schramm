/* Schramm AdLabs — upgrade: 3D hero, tilt cards, coded video, UX polish */
document.addEventListener("DOMContentLoaded",()=>{
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
// progress + nav state + active link
const bar=document.createElement("div");bar.id="progress";document.body.prepend(bar);
const nav=$(".site-nav");
addEventListener("scroll",()=>{const h=document.documentElement;bar.style.width=(scrollY/(h.scrollHeight-innerHeight)*100)+"%";nav&&nav.classList.toggle("scrolled",scrollY>30)},{passive:true});
const page=location.pathname.split("/").pop()||"index.html";
$$(".navlinks > a, .nav-drop > a").forEach(a=>{if(a.getAttribute("href")===page)a.classList.add("active")});
// whatsapp floating button
const fab=document.createElement("a");fab.className="fab";fab.href="https://wa.me/917304148788";fab.target="_blank";fab.rel="noopener";fab.setAttribute("aria-label","Chat on WhatsApp");fab.innerHTML='<img src="whatsapp.png" alt="" width="56" height="56">';document.body.appendChild(fab);
// 3D tilt + spotlight
if(!reduce)$$(".service,.growth article,.approach-panel,.metric").forEach(c=>{
 c.addEventListener("mousemove",e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
  c.style.setProperty("--mx",x*100+"%");c.style.setProperty("--my",y*100+"%");
  c.style.transform=`perspective(800px) rotateY(${(x-.5)*10}deg) rotateX(${(.5-y)*10}deg) translateZ(8px)`});
 c.addEventListener("mouseleave",()=>c.style.transform="");
});
// 3D hero: clean dotted globe + orbit rings, sits exactly behind the logo
const vis3=$(".cinematic-visual");
if(vis3&&window.THREE&&!reduce){
 const cv=document.createElement("canvas");cv.id="hero3d";vis3.prepend(cv);
 const R=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});R.setPixelRatio(Math.min(devicePixelRatio,2));
 const S=new THREE.Scene(),C=new THREE.PerspectiveCamera(45,1,.1,100);C.position.z=9;
 const grp=new THREE.Group();S.add(grp);
 const N=1100,p=new Float32Array(N*3),ga=Math.PI*(3-Math.sqrt(5));
 for(let i=0;i<N;i++){const y=1-i/(N-1)*2,r=Math.sqrt(1-y*y),a=i*ga;p.set([Math.cos(a)*r*2.2,y*2.2,Math.sin(a)*r*2.2],i*3)}
 const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(p,3));
 const globe=new THREE.Points(g,new THREE.PointsMaterial({color:0x7fb2ff,size:.045,transparent:true,opacity:.75}));grp.add(globe);
 const ring=(r,rx,ry,o)=>{const m=new THREE.Mesh(new THREE.TorusGeometry(r,.008,8,160),new THREE.MeshBasicMaterial({color:0x5b9bff,transparent:true,opacity:o}));m.rotation.set(rx,ry,0);grp.add(m);return m};
 const r1=ring(3,1.25,.3,.55),r2=ring(3.6,1.9,-.4,.3);
 const orb=[0,1,2].map(i=>{const m=new THREE.Mesh(new THREE.SphereGeometry(.08,16,16),new THREE.MeshBasicMaterial({color:0x9be7ff}));grp.add(m);return m});
 let mx=0,my=0;vis3.addEventListener("mousemove",e=>{const b=vis3.getBoundingClientRect();mx=(e.clientX-b.left)/b.width-.5;my=(e.clientY-b.top)/b.height-.5});
 const fit=()=>{const w=vis3.clientWidth,h=vis3.clientHeight;R.setSize(w,h,false);C.aspect=w/h;C.updateProjectionMatrix()};
 fit();addEventListener("resize",fit);
 let on=true;new IntersectionObserver(e=>on=e[0].isIntersecting).observe(vis3);
 (function loop(t){requestAnimationFrame(loop);if(!on)return;t*=.001;
  globe.rotation.y=t*.15;r1.rotation.z=t*.25;r2.rotation.z=-t*.18;
  orb.forEach((o,i)=>{const a=t*.6+i*2.1;o.position.set(Math.cos(a)*3,Math.sin(a)*3*Math.sin(1.25),Math.sin(a)*3*Math.cos(1.25)*.5)});
  grp.rotation.y+=(mx*.9-grp.rotation.y)*.05;grp.rotation.x+=(my*.6-grp.rotation.x)*.05;R.render(S,C)})(0);
}
// coded marketing video: services + why choose us (30s, canvas)
const vp=$("#mktVideo");
if(vp){
 const cv=$("canvas",vp),g=cv.getContext("2d"),W=cv.width=1280,H=cv.height=720;
 const logo=new Image();logo.src="Schramm_AdLabs_logo.png";
 const D=30,ST=[0,5,14,25],LB=["Welcome","Our services","Why Schramm","Let’s talk"];
 const ease=x=>x<0?0:x>1?1:1-Math.pow(1-x,3);let t=0,playing=false,last=0;
 const F='"Plus Jakarta Sans",Arial,sans-serif';
 const txt=(s,x,y,sz,col="#fff",al="left",wt=700)=>{g.font=`${wt} ${sz}px ${F}`;g.fillStyle=col;g.textAlign=al;g.fillText(s,x,y)};
 const rr=(x,y,w,h,r)=>{g.beginPath();g.roundRect(x,y,w,h,r)};
 const bg=()=>{const gr=g.createLinearGradient(0,0,W,H);gr.addColorStop(0,"#040812");gr.addColorStop(1,"#0b1d3a");g.fillStyle=gr;g.fillRect(0,0,W,H);
  g.fillStyle="rgba(91,155,255,.5)";for(let i=0;i<50;i++){const x=(i*173+t*12*(1+i%3))%W,y=(i*97)%H;g.globalAlpha=.15+(i%4)*.08;g.fillRect(x,y,2,2)}g.globalAlpha=1};
 const drawLogo=(cx,y,w,a)=>{if(!logo.complete)return;g.globalAlpha=a;g.drawImage(logo,cx-w/2,y,w,w*logo.height/logo.width);g.globalAlpha=1};
 const SV=[["🔎","SEO & AEO","Found on search + AI"],["🎯","Google Ads","High-intent enquiries"],["📱","Social Media","Consistent presence"],["🤖","AI Marketing","Smarter workflows"],["💻","Web Development","Sites that convert"],["🎨","Branding & Creative","Identity + design"],["📣","Lead Generation","Campaigns that create demand"],["🌍","Market Expansion","New regions + audiences"]];
 const WHY=[["Practical, jargon-free marketing","No big presentations. Just real results."],["Plans customised to your business","Every business is different, so is our approach."],["Cost-effective, without cutting corners","Strategies aligned with your market reality."],["One partner for branding and growth","B2B focus, open to every business."]];
 const scenes=[
  s=>{const a=ease(s*1.2),b=ease(s-.8);g.globalAlpha=a;txt("Digital marketing,",640,300-(1-a)*30,76,"#fff","center",800);g.globalAlpha=b;txt("built to move business.",640,390,76,"#7fb2ff","center",800);g.globalAlpha=1;drawLogo(640,450,300,ease(s-1.8))},
  s=>{txt("What we do",70,150,54,"#fff","left",800);SV.forEach((v,i)=>{const a=ease(s*1.1-.3-i*.5),x=50+(i%4)*300,y=200+Math.floor(i/4)*230+(1-a)*40;g.globalAlpha=a;
    rr(x+20,y,270,200,22);g.fillStyle="rgba(20,40,75,.75)";g.fill();g.strokeStyle="rgba(127,178,255,.5)";g.lineWidth=2;g.stroke();
    txt(v[0],x+44,y+78,48);txt(v[1],x+44,y+126,25);txt(v[2],x+44,y+160,16,"#8fa6c9","left",500)});g.globalAlpha=1},
  s=>{txt("Why Schramm is the right choice",70,150,50,"#fff","left",800);WHY.forEach((w,i)=>{const a=ease((s-.5-i*2.2)*1.6),y=235+i*105;g.globalAlpha=a;
    g.fillStyle="#3669B0";g.beginPath();g.arc(100,y-10,26,0,7);g.fill();g.strokeStyle="#fff";g.lineWidth=5;g.lineCap="round";g.lineJoin="round";g.beginPath();g.moveTo(88,y-10);g.lineTo(97,y);g.lineTo(115,y-24);g.stroke();
    txt(w[0],155+(1-a)*30,y-4,34);txt(w[1],155+(1-a)*30,y+28,20,"#8fa6c9","left",500)});g.globalAlpha=1},
  s=>{const a=ease(s*1.5);g.globalAlpha=a;txt("Let’s build something",640,230-(1-a)*20,66,"#fff","center",800);txt("that moves.",640,310,66,"#7fb2ff","center",800);g.globalAlpha=1;drawLogo(640,350,280,ease(s-.6));
   g.globalAlpha=ease(s-1.2);txt("+91 7304148788  •  info@schrammadlabs.com",640,600,26,"#cfe0fa","center",600);g.globalAlpha=1}];
 const draw=()=>{bg();const i=ST.reduce((k,v,j)=>t>=v?j:k,0);scenes[i](t-ST[i]);
  g.fillStyle="rgba(5,9,20,.75)";rr(60,36,230,42,21);g.fill();txt(`${i+1}/4  ${LB[i]}`,80,64,18,"#fff","left",600);
  $(".vbar i",vp).style.width=t/D*100+"%";$(".vtime",vp).textContent=`0:${String(Math.floor(t)).padStart(2,"0")} / 0:30`};
 const tick=n=>{if(!playing)return;t+=(n-last)/1000;last=n;if(t>=D)t=0;draw();requestAnimationFrame(tick)};
 const btn=$("button",vp),toggle=()=>{playing=!playing;btn.textContent=playing?"❚❚":"▶";btn.setAttribute("aria-label",playing?"Pause video":"Play video");if(playing){last=performance.now();requestAnimationFrame(tick)}};
 btn.onclick=toggle;$(".vbar",vp).onclick=e=>{const r=e.currentTarget.getBoundingClientRect();t=(e.clientX-r.left)/r.width*D;draw()};
 logo.onload=draw;draw();
 new IntersectionObserver(e=>{if(e[0].isIntersecting&&!playing&&t===0&&!reduce)toggle()},{threshold:.6}).observe(vp);
}
});
