const cursor = document.querySelector('.cursor');
const cursorLabel = document.querySelector('.cursor-label');
const cards = document.querySelectorAll('.card');
const isMobile = window.matchMedia("(max-width: 768px)").matches;

// 1. MOUSE TRACKING
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

if (!isMobile) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        let easing = 0.2; 
        cursorX += (mouseX - cursorX) * easing;
        cursorY += (mouseY - cursorY) * easing;
        
        if (cursor) {
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
            cursor.style.transform = `translate(-50%, -50%)`;
        }
        if (cursorLabel) {
            cursorLabel.style.left = `${cursorX}px`;
            cursorLabel.style.top = `${cursorY}px`;
        }
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
}

// 2. INTERACTION LABELS
const interactables = document.querySelectorAll('a, .logo, .graphic-trigger, .close-modal, .archive-btn, .card, .gallery-item img, .resume-btn');

interactables.forEach(el => {
    if (!isMobile) {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovering');
            cursorLabel.classList.add('active');
            
            if(el.classList.contains('graphic-trigger')) cursorLabel.innerText = "VIEW_GALLERY";
            else if(el.tagName === 'IMG') cursorLabel.innerText = "ZOOM_VIEW";
            else if(el.classList.contains('resume-btn')) cursorLabel.innerText = "GET_PDF";
            else if(el.classList.contains('card')) cursorLabel.innerText = "WATCH_NOW";
            else cursorLabel.innerText = "CLICK";
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovering');
            cursorLabel.classList.remove('active');
        });
    }
});

// 3. REVEAL & CLOCK
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .card').forEach(el => revealObserver.observe(el));

const updateClock = () => {
    const clockEl = document.getElementById('digitalClock');
    if(clockEl) clockEl.innerText = new Date().toLocaleTimeString('en-GB', { hour12: false });
};
setInterval(updateClock, 1000);
updateClock();

// 4. MODAL
const modal = document.getElementById('designModal');
const trigger = document.getElementById('designTrigger');
const closeBtn = document.querySelector('.close-modal');

if(trigger) trigger.onclick = () => { modal.style.display = 'block'; document.body.style.overflow = 'hidden'; }
if(closeBtn) closeBtn.onclick = () => { modal.style.display = 'none'; document.body.style.overflow = 'auto'; }
window.onclick = (e) => { if (e.target == modal) { modal.style.display = 'none'; document.body.style.overflow = 'auto'; } }
