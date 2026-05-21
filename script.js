/* =====================================================
   JENNY'S PORTFOLIO — Script
   ===================================================== */

/* ── Navbar scroll + active link ── */
const navbar   = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  const mid = window.scrollY + window.innerHeight / 2;
  sections.forEach(sec => {
    const id   = sec.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (!link) return;
    link.classList.toggle('active',
      mid >= sec.offsetTop && mid < sec.offsetTop + sec.offsetHeight
    );
  });
}, { passive: true });

/* ── Hamburger ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', open);
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

/* ── Reveal on scroll ── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── Skill bars animate when card visible ── */
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      skillObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach(c => skillObs.observe(c));

/* ── Project filter ── */
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    projectCards.forEach((card, i) => {
      const show = filter === 'all' || card.dataset.cat === filter;
      if (show) {
        card.classList.remove('hidden');
        card.style.opacity   = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.transition = 'opacity .4s ease, transform .4s ease';
          card.style.opacity    = '1';
          card.style.transform  = 'none';
        }, i * 50);
      } else {
        card.classList.add('hidden');
        card.style.opacity   = '';
        card.style.transform = '';
        card.style.transition = '';
      }
    });
  });
});


/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
  });
});

/* ── Vibe tags: shuffle order for freshness ── */
const vtagWrap = document.querySelector('.vibe-tags');
if (vtagWrap) {
  [...vtagWrap.children]
    .sort(() => Math.random() - .5)
    .forEach(t => vtagWrap.appendChild(t));
}
