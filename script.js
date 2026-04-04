// ── SPLASH ──
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('splash').classList.add('hide');
    }, 2200);
});

// ── ACTIVE NAV ON SCROLL ──
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('[data-section]');

function updateActiveNav() {
    let current = 'home';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 80) {
            current = sec.dataset.section;
        }
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.target === current);
    });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

// Klik nav → smooth scroll ke section
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.dataset.target;
        const target = document.querySelector(`[data-section="${targetId}"]`);
        if (target) {
            const top = target.getBoundingClientRect().top + window.scrollY - 20;
            window.scrollTo({ top, behavior: 'smooth' });
        }
        document.getElementById('sidebar').classList.remove('open');
    });
});

// ── SLIDER ──
var currentSlide = 0, totalSlides = 3, autoSlide;

function goToSlide(index) {
    document.querySelectorAll('.slide').forEach((s, i) => s.classList.toggle('active', i === index));
    document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === index));
    currentSlide = index;
}
function changeSlide(dir) { goToSlide((currentSlide + dir + totalSlides) % totalSlides); resetAuto(); }
function resetAuto() { clearInterval(autoSlide); autoSlide = setInterval(() => changeSlide(1), 4500); }
autoSlide = setInterval(() => changeSlide(1), 4500);

// ── AUDIO ──
var currentAudio = null, currentButton = null;
function playSong(songId, btn) {
    const audio = document.getElementById(songId);
    if (currentAudio === audio) {
        if (audio.paused) { audio.play(); btn.textContent = '⏸'; }
        else              { audio.pause(); btn.textContent = '▶'; }
    } else {
        if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; if (currentButton) currentButton.textContent = '▶'; }
        audio.play(); btn.textContent = '⏸'; currentAudio = audio; currentButton = btn;
    }
}

// ── CONTACT FORM ──
function handleFormSubmit() {
    const msg = document.getElementById('form-msg');
    msg.style.display = 'block';
    setTimeout(() => { msg.style.display = 'none'; }, 4000);
}

// ── MOBILE SIDEBAR ──
function toggleSidebar() { document.getElementById('sidebar').classList.toggle('open'); }