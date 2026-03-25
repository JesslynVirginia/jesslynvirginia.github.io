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
        sections.forEach(function (sec) {
            if (window.scrollY >= sec.offsetTop - 60) {
                current = sec.dataset.section;
            }
        });
        navLinks.forEach(function (link) {
            link.classList.toggle('active', link.dataset.target === current);
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // Smooth scroll with precise offset
    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.dataset.target;
            const target = document.querySelector('[data-section="' + targetId + '"]');
            if (target) {
                const top = target.getBoundingClientRect().top + window.scrollY - 20;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
            document.getElementById('sidebar').classList.remove('open');
        });
    });


    // ── PORTFOLIO TABS ──
    function switchTab(tabName, btn) {
        // Hide all panels
        document.querySelectorAll('.tab-panel').forEach(function (panel) {
            panel.classList.remove('active');
        });
        // Deactivate all buttons
        document.querySelectorAll('.tab-btn').forEach(function (b) {
            b.classList.remove('active');
        });
        // Show selected panel and activate button
        document.getElementById('tab-' + tabName).classList.add('active');
        btn.classList.add('active');
    }


    // ── SLIDER ──
    var currentSlide = 0;
    var totalSlides = 3;
    var autoSlide;

    function goToSlide(index) {
        document.querySelectorAll('.slide').forEach(function (s, i) {
            s.classList.toggle('active', i === index);
        });
        document.querySelectorAll('.dot').forEach(function (d, i) {
            d.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    function changeSlide(dir) {
        goToSlide((currentSlide + dir + totalSlides) % totalSlides);
        resetAuto();
    }

    function resetAuto() {
        clearInterval(autoSlide);
        autoSlide = setInterval(function () { changeSlide(1); }, 4500);
    }

    autoSlide = setInterval(function () { changeSlide(1); }, 4500);


    // ── AUDIO ──
    var currentAudio = null;
    var currentButton = null;

    function playSong(songId, btn) {
        var audio = document.getElementById(songId);
        if (currentAudio === audio) {
            if (audio.paused) { audio.play(); btn.textContent = '⏸'; }
            else              { audio.pause(); btn.textContent = '▶'; }
        } else {
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                if (currentButton) currentButton.textContent = '▶';
            }
            audio.play();
            btn.textContent = '⏸';
            currentAudio = audio;
            currentButton = btn;
        }
    }


    // ── CONTACT FORM ──
    function handleFormSubmit() {
        var msg = document.getElementById('form-msg');
        msg.style.display = 'block';
        setTimeout(function () { msg.style.display = 'none'; }, 4000);
    }


    // ── MOBILE SIDEBAR ──
    function toggleSidebar() {
        document.getElementById('sidebar').classList.toggle('open');
    }