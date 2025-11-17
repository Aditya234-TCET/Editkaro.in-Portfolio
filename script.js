// ---------- FILTER BUTTONS ----------
const filterBtns = document.querySelectorAll('.filter-btn');
const videos = document.querySelectorAll('.video-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        const category = btn.getAttribute('data-category');

        videos.forEach(video => {
            if(category === 'all' || video.classList.contains(category)){
                video.style.display = 'block';
            } else {
                video.style.display = 'none';
            }
        });
    });
});

// ---------- SCROLL FADE-IN ----------
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold:0, rootMargin:"0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll){
    entries.forEach(entry => {
        if(!entry.isIntersecting) return;
        entry.target.classList.add('show');
        appearOnScroll.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => { appearOnScroll.observe(fader); });

// ---------- PARTICLE BACKGROUND ----------
let canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.style.position = 'fixed';
canvas.style.top='0';
canvas.style.left='0';
canvas.style.width='100%';
canvas.style.height='100%';
canvas.style.zIndex='-10';
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleDensity = 120;
let particleSpeed = 1;
let particles = [];
function initParticles(){
    particles = [];
    for(let i=0;i<particleDensity;i++){
        particles.push({
            x:Math.random()*canvas.width,
            y:Math.random()*canvas.height,
            r:Math.random()*2+1,
            dx:(Math.random()-0.5)*particleSpeed,
            dy:(Math.random()-0.5)*particleSpeed
        });
    }
}
initParticles();

function animateParticles(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle='rgba(255,255,255,0.7)';
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if(p.x>canvas.width) p.x=0;
        if(p.x<0) p.x=canvas.width;
        if(p.y>canvas.height) p.y=0;
        if(p.y<0) p.y=canvas.height;
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ---------- PARTICLE CONTROLS ----------
const densitySlider = document.getElementById('particleDensity');
const speedSlider = document.getElementById('particleSpeed');

densitySlider.addEventListener('input', e=>{ particleDensity = e.target.value; initParticles(); });
speedSlider.addEventListener('input', e=>{ particleSpeed = e.target.value; initParticles(); });

window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// ---------- HIGHLIGHT NAVBAR LINK ON SCROLL ----------
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("#navbar .nav-links a");

window.addEventListener("scroll", () => {
    let currentSection = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; 
        if(scrollY >= sectionTop){
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if(link.getAttribute("href") === `#${currentSection}`){
            link.classList.add("active");
        }
    });
});

// ---------- HAMBURGER MENU ----------
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
});

// Close menu when a link is clicked (mobile)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
    });
});
// ---------- NAVBAR SHRINK ON SCROLL ----------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if(window.scrollY > 50){
        navbar.classList.add('shrink');
    } else {
        navbar.classList.remove('shrink');
    }
});
// ---------- SCROLL PROGRESS BAR ----------
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = `${scrollPercent}%`;
});

