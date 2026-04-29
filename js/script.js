/* ── Custom Cursor ── */
let mx=window.innerWidth/2,my=window.innerHeight/2,rx=mx,ry=my;
const c1=document.getElementById('c1'),c2=document.getElementById('c2');
document.addEventListener('mousemove',e=>{
  mx=e.clientX;my=e.clientY;
  c1.style.left=mx+'px';c1.style.top=my+'px';
});
(function lag(){
  rx+=(mx-rx)*.13;ry+=(my-ry)*.13;
  c2.style.left=rx+'px';c2.style.top=ry+'px';
  requestAnimationFrame(lag);
})();

/* ── Theme Toggle ── */
const html=document.documentElement;
const toggleBtn=document.getElementById('themeToggle');
const themeIcon=document.getElementById('themeIcon');
const themeLabel=document.getElementById('themeLabel');

toggleBtn.addEventListener('click',()=>{
  const isDark=html.dataset.theme==='dark';
  html.dataset.theme=isDark?'light':'dark';
  themeIcon.textContent=isDark?'☀️':'🌙';
  themeLabel.textContent=isDark?'Light':'Dark';
});

/* ── Typing Effect ── */
const phrases=['Data Analyst','Power BI Developer','SQL Specialist','Python Automator','BI Storyteller'];
let pi=0,ci=0,del=false,t='';
const typedEl=document.getElementById('typed');
function type(){
  const word=phrases[pi];
  del?(t=word.slice(0,--ci)):(t=word.slice(0,++ci));
  typedEl.textContent=t;
  if(!del&&ci===word.length){del=true;setTimeout(type,1800);return;}
  if(del&&ci===0){del=false;pi=(pi+1)%phrases.length;}
  setTimeout(type,del?38:72);
}
type();

/* ── Scroll Reveal ── */
const revObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('revealed')});
},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>revObs.observe(el));

/* ── Skill Bars ── */
const fills=document.querySelectorAll('.sk-fill');
let animated=false;
const barObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting&&!animated){
      animated=true;
      fills.forEach(bar=>{
        const w=bar.dataset.width;
        bar.style.width='0';
        requestAnimationFrame(()=>{bar.style.width=w;});
      });
    }
  });
},{threshold:.2});
const sk=document.getElementById('skills');
if(sk)barObs.observe(sk);

/* ── Number Counter ── */
function countUp(el,target){
  let cur=0;const step=Math.ceil(target/40);
  const interval=setInterval(()=>{
    cur+=step;if(cur>=target){cur=target;clearInterval(interval);}
    el.textContent=cur+(target>=20?'+':'+');
  },40);
}
const counterObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('[data-count]').forEach(el=>{
        countUp(el,parseInt(el.dataset.count));
      });
      counterObs.unobserve(e.target);
    }
  });
},{threshold:.3});
const heroSection=document.querySelector('.hero');
if(heroSection)counterObs.observe(heroSection);

/* ── Active Nav on Scroll ── */
const sections=document.querySelectorAll('section[id]');
const navLinks=document.querySelectorAll('.nl a');
const scrollObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      navLinks.forEach(a=>a.classList.remove('active'));
      const active=document.querySelector(`.nl a[href="#${e.target.id}"]`);
      if(active)active.classList.add('active');
    }
  });
},{threshold:.4});
sections.forEach(s=>scrollObs.observe(s));

/* ── Floating Particles ── */
function spawnParticle(){
  const p=document.createElement('div');
  p.className='particle';
  const size=Math.random()*3+1.5;
  const colors=['rgba(167,139,250,0.7)','rgba(34,211,238,0.6)','rgba(124,58,237,0.5)'];
  const color=colors[Math.floor(Math.random()*colors.length)];
  p.style.cssText=`
    width:${size}px;height:${size}px;
    left:${Math.random()*100}vw;
    bottom:-20px;
    opacity:0;
    background:${color};
    animation-duration:${Math.random()*14+8}s;
    animation-delay:${Math.random()*5}s;
  `;
  document.body.appendChild(p);
  setTimeout(()=>p.remove(),(Math.random()*14+8)*1000+5000);
}
setInterval(spawnParticle,1200);
for(let i=0;i<6;i++)setTimeout(spawnParticle,i*300);

/* ── Hire Me scroll ── */
document.querySelector('.hire-btn').addEventListener('click',()=>{
  document.getElementById('contact').scrollIntoView({behavior:'smooth'});
});
