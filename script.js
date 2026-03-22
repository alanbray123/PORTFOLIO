const cursor = document.querySelector('.cursor');
const cards = document.querySelectorAll('.card');

// 1. SMOOTH CURSOR
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    let easing = 0.15; 
    cursorX += (mouseX - cursorX) * easing;
    cursorY += (mouseY - cursorY) * easing;
    if (cursor) {
        cursor.style.transform = `translate3d(${cursorX - 15}px, ${cursorY - 15}px, 0)`;
    }
    requestAnimationFrame(animateCursor);
}
animateCursor();

// 2. HOVER DETECTOR
const interactables = document.querySelectorAll('.card, a, .logo');
interactables.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
});

// 3. REVEAL LOGIC
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .card').forEach(el => revealObserver.observe(el));

// 4. CLOCK
const updateClock = () => {
    const clockEl = document.getElementById('digitalClock');
    if(clockEl) {
        clockEl.innerText = new Date().toLocaleTimeString('en-GB', { hour12: false });
    }
};
setInterval(updateClock, 1000);
updateClock();