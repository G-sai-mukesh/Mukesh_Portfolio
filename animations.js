/* =========================================
   3D Animations — Portfolio
   ========================================= */

// ── Card 3D Tilt + Glare ────────────────────────────────────────────
function initCardTilt() {
  const cards = document.querySelectorAll(
    '.project-card, .skill-card, .cert-card, .edu-card, .stat-card'
  );
  cards.forEach(card => {
    const glare = document.createElement('div');
    glare.className = 'card-glare';
    card.style.position = card.style.position || 'relative';
    card.appendChild(glare);

    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const cx = r.width / 2, cy = r.height / 2;
      const rotX = ((y - cy) / cy) * -9;
      const rotY = ((x - cx) / cx) * 9;
      card.style.transition = 'transform 0.08s linear, box-shadow 0.08s linear';
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`;
      card.style.boxShadow = `${-rotY * 2}px ${rotX * 2}px 30px rgba(139,92,246,0.22), 0 0 20px rgba(34,211,238,0.08)`;
      glare.style.opacity = '1';
      glare.style.background = `radial-gradient(circle at ${(x/r.width)*100}% ${(y/r.height)*100}%, rgba(255,255,255,0.1) 0%, transparent 60%)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.55s cubic-bezier(0.23,1,0.32,1), box-shadow 0.55s ease';
      card.style.transform = '';
      card.style.boxShadow = '';
      glare.style.opacity = '0';
    });
  });
}

// ── Hero 3D Parallax ────────────────────────────────────────────────
function initHeroParallax() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const layers = [
    { el: hero.querySelector('.hero-eyebrow'), depth: 0.015 },
    { el: hero.querySelector('.hero-name'),    depth: 0.030 },
    { el: hero.querySelector('.hero-role'),    depth: 0.018 },
    { el: hero.querySelector('.hero-desc'),    depth: 0.010 },
    { el: hero.querySelector('.hero-cta'),     depth: 0.008 },
  ];
  hero.addEventListener('mousemove', e => {
    const r = hero.getBoundingClientRect();
    const dx = e.clientX - r.left - r.width / 2;
    const dy = e.clientY - r.top  - r.height / 2;
    layers.forEach(({ el, depth }) => {
      if (!el) return;
      el.style.transform = `translate3d(${dx*depth*2}px,${dy*depth*1.2}px,0) rotateX(${dy*depth*0.8}deg) rotateY(${-dx*depth*0.8}deg)`;
    });
  });
  hero.addEventListener('mouseleave', () => {
    layers.forEach(({ el }) => {
      if (!el) return;
      el.style.transition = 'transform 0.8s cubic-bezier(0.23,1,0.32,1)';
      el.style.transform = '';
      setTimeout(() => { el.style.transition = 'transform 0.08s linear'; }, 800);
    });
  });
}

// ── Magnetic Buttons ────────────────────────────────────────────────
function initMagneticButtons() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width  / 2) * 0.25;
      const dy = (e.clientY - r.top  - r.height / 2) * 0.25;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform 0.45s cubic-bezier(0.23,1,0.32,1)';
      btn.style.transform = '';
      setTimeout(() => { btn.style.transition = ''; }, 450);
    });
  });
}

// ── Video Poster Click-to-Play ───────────────────────────────────────
window.playPreviewVideo = function () {
  const poster = document.getElementById('vidPoster');
  const video  = document.getElementById('previewVideo');
  if (!poster || !video) return;
  poster.classList.add('hidden');
  video.play();
};

// ── Roadmap Scroll Progress ─────────────────────────────────────────
function initRoadmapProgress() {
  const progress = document.getElementById('rmProgress');
  const roadmap  = document.querySelector('.roadmap');
  if (!progress || !roadmap) return;

  const nodes = roadmap.querySelectorAll('.rm-node');
  const cards = roadmap.querySelectorAll('.rm-card');

  const update = () => {
    const rect = roadmap.getBoundingClientRect();
    const vh   = window.innerHeight;
    const scrolled = Math.max(0, vh * 0.68 - rect.top);
    const pct = Math.min(100, (scrolled / rect.height) * 100);
    progress.style.height = pct + '%';

    // Activate nodes + cards as they pass 72% of viewport
    nodes.forEach((node, i) => {
      if (node.getBoundingClientRect().top < vh * 0.78) {
        node.classList.add('rm-active');
        if (cards[i]) cards[i].classList.add('rm-active');
      }
    });
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

// ── Stat Counter Animation ───────────────────────────────────────────
function initStatCounters() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const numEl = e.target.querySelector('.stat-num');
      if (!numEl || numEl.dataset.counted) return;
      numEl.dataset.counted = '1';

      const raw    = numEl.textContent.trim();
      const target = parseFloat(raw);
      const suffix = raw.replace(/[\d.]/g, '');
      const isFloat = raw.includes('.');
      const dur    = 1600;
      const start  = performance.now();

      const tick = now => {
        const t = Math.min(1, (now - start) / dur);
        const ease = 1 - Math.pow(1 - t, 3);
        numEl.textContent = (isFloat ? (ease * target).toFixed(1) : Math.floor(ease * target)) + suffix;
        if (t < 1) requestAnimationFrame(tick);
        else numEl.classList.add('counted');
      };
      requestAnimationFrame(tick);
      io.unobserve(e.target);
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('.stat-card').forEach(c => io.observe(c));
}

// ── Section-specific stagger indices ────────────────────────────────
function initSectionStagger() {
  const sets = [
    { sel: '.skill-card',    prop: '--sk-i'   },
    { sel: '.project-card',  prop: '--pr-i'   },
    { sel: '.edu-card',      prop: '--edu-i'  },
    { sel: '.cert-card',     prop: '--cert-i' },
    { sel: '.contact-link',  prop: '--cl-i'   },
  ];
  sets.forEach(({ sel, prop }) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.style.setProperty(prop, i);
    });
  });
}

// ── Init ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initCardTilt();
  initHeroParallax();
  initMagneticButtons();
  initRoadmapProgress();
  initStatCounters();
  initSectionStagger();
});
