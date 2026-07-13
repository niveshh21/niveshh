/* ============================================================
   NIVESHH — Main JavaScript
   ============================================================ */

// ── PAGE LOADER ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
        initScrollAnimations();
    }, 4000);

});
// ── CUSTOM CURSOR ────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});
(function animFollow() {
  fx += (mx - fx) * 0.1;
  fy += (my - fy) * 0.1;
  follower.style.left = fx + 'px';
  follower.style.top = fy + 'px';
  requestAnimationFrame(animFollow);
})();
if ('ontouchstart' in window) {
  cursor.style.display = 'none';
  follower.style.display = 'none';
}

// ── SCROLL PROGRESS ──────────────────────────────────────────
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  document.getElementById('scroll-bar').style.width = pct + '%';
}, { passive: true });

// ── NAVBAR ───────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Active link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const sp = window.scrollY + 130;
  sections.forEach(s => {
    if (sp >= s.offsetTop && sp < s.offsetTop + s.offsetHeight) {
      document.querySelectorAll('.nav-links a').forEach(a =>
        a.classList.toggle('active', a.getAttribute('href') === '#' + s.id)
      );
    }
  });
}, { passive: true });

// Hamburger
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mob-link').forEach(l =>
  l.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  })
);

// ── SCROLL ANIMATIONS ────────────────────────────────────────
function initScrollAnimations() {
  const els = document.querySelectorAll('.anim');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.dataset.delay || 0);
        setTimeout(() => e.target.classList.add('visible'), delay);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

// ── GALLERY FILTER ───────────────────────────────────────────
const filterBtns = document.querySelectorAll('.gf-btn');
const galleryCards = document.querySelectorAll('.gp-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    galleryCards.forEach(card => {

      const show =
          filter === 'all' ||
          card.dataset.cat === filter;

      if (show) {

          card.style.display = 'block';

          card.style.animation = 'none';
          card.offsetHeight;

          card.style.animation = 'fadeUp .5s ease forwards';

      } else {

          card.style.display = 'none';

      }

    });
  });
});

// ── SMOOTH SCROLL ────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    }
  });
});

// ── HERO SCROLL BEHAVIOUR (desktop/tablet only) ───────────────
// Previously this faded the hero text to fully transparent by the time
// the user had scrolled just ~75% of one viewport height — on most
// laptop screens that meant the text vanished after only 500-650px of
// scroll, well before the hero section had even fully passed. That made
// the hero copy unreadable while still on screen.
// Fix: keep a very subtle parallax drift, but stop fading opacity based
// on scroll position entirely. The hero text now stays fully legible
// for as long as it's in view, and simply scrolls away naturally with
// the rest of the page.
const heroLeft = document.querySelector('.hero-left-inner');
window.addEventListener('scroll', () => {
  if (window.innerWidth <= 900) return; // mobile/stacked layout: skip entirely
  if (heroLeft && window.scrollY < window.innerHeight) {
    heroLeft.style.transform = `translateY(${window.scrollY * 0.08}px)`;
  }
}, { passive: true });

// ── MODAL ────────────────────────────────────────────────────
const modalData = {
 wedding: {
    title: 'Wedding Sherwani',
    tag: 'Top Mover',

    desc: 'This premium ivory sherwani features rich all-over thread and zari embroidery, giving it a royal and elegant look. The embroidered high-neck collar, detailed front panel and matching waist belt add to its premium finish.',

    desc2: 'Paired with a matching embroidered dupatta, this sherwani is crafted from premium fabric with excellent finishing. It is ideal for luxury wedding collections and can also be customized for bulk manufacturing.',

    features: [
        'Premium ivory wedding sherwani',
        'Rich all-over thread & zari embroidery',
        'Embroidered high-neck collar',
        'Matching embroidered waist belt',
        'Curved front panel with detailed border work',
        'Matching embroidered dupatta',
        'Premium fabric & fine finishing',
        'Customization available for bulk orders'
    ]
},
 indo: {
    title: 'Indo-Western',
    tag: 'New Line',

    desc: 'This premium black Indo-Western set features a beautifully embroidered designer jacket paired with a solid black kurta and matching trousers. The detailed thread embroidery, artistic motifs, and elegant border work give it a rich and modern royal look.',

    desc2: 'The embroidered jacket is complemented by a high-neck collar, stylish front opening, and fine finishing throughout. Made from premium fabric with excellent craftsmanship, this Indo-Western set is perfect for festive occasions, receptions, and luxury ethnic collections. Customization is available for bulk manufacturing.',

    features: [
        'Premium black Indo-Western set',
        'Designer embroidered jacket',
        'Rich thread embroidery & artistic motifs',
        'High-neck collar with elegant finishing',
        'Matching black kurta & trousers',
        'Premium fabric & fine craftsmanship',
        'Ideal for festive & reception wear',
        'Customization available for bulk orders'
    ]
},
  kurtaSet: {
    title: 'Kurta Set',
    tag: 'Premium Collection',

    desc: 'This premium purple kurta set features elegant thread embroidery that gives it a rich and stylish look. The detailed embroidery on the sleeves, border, and front creates a perfect balance of traditional design and modern elegance.',

    desc2: 'The kurta is designed with a stylish high-neck collar, fine front placket, and premium fabric for a comfortable fit. Paired with matching trousers, this kurta set is ideal for festive occasions, family functions, and ethnic wear collections. Customization is available for bulk manufacturing.',

    features: [
        'Premium purple kurta set',
        'Elegant thread embroidery',
        'Designer embroidered sleeves',
        'High-neck collar with stylish placket',
        'Detailed embroidered border',
        'Matching trousers included',
        'Premium fabric & fine finishing',
        'Customization available for bulk orders'
    ]
},
 kurtaDupatta: {
    title: 'Kurta Dupatta Set',
    tag: 'Premium Collection',

    desc: 'This premium beige kurta dupatta set features beautiful mirror work and thread embroidery that gives it a rich and elegant look. The detailed embroidery on the neckline, sleeves, borders, and matching dupatta creates a complete traditional outfit.',

    desc2: 'The kurta is designed with a stylish high-neck collar, elegant front detailing, and premium fabric for a comfortable fit. Paired with matching trousers and an embroidered dupatta, this set is perfect for festive occasions, weddings, and luxury ethnic wear collections. Customization is available for bulk manufacturing.',

    features: [
        'Premium beige kurta dupatta set',
        'Rich mirror work & thread embroidery',
        'Elegant high-neck collar',
        'Designer embroidered sleeves',
        'Matching embroidered dupatta',
        'Matching trousers included',
        'Premium fabric & fine finishing',
        'Customization available for bulk orders'
    ]
},
kurtaJacket: {
    title: 'Kurta Jacket Set',
    tag: 'Premium Collection',

    desc: 'This premium mustard kurta jacket set features elegant mirror work and thread embroidery that gives it a rich and stylish look. The embroidered jacket, matching kurta, and coordinated trousers create a complete traditional outfit with a modern touch.',

    desc2: 'The set includes a designer open-front jacket with detailed embroidered borders, a matching kurta with a stylish deep-neck design, and straight-fit trousers. Made from premium fabric with fine finishing, it is perfect for festive occasions, weddings, and luxury ethnic wear collections. Customization is available for bulk manufacturing.',

    features: [
        'Premium mustard kurta jacket set',
        'Rich mirror work & thread embroidery',
        'Designer open-front embroidered jacket',
        'Stylish deep-neck kurta design',
        'Matching straight-fit trousers',
        'Premium fabric & fine finishing',
        'Ideal for festive & wedding wear',
        'Customization available for bulk orders'
    ]
},
  premium: {
    title: 'Premium Groom Set — Complete', tag: 'Flagship Line',
    desc: 'Our most detailed manufacture: sherwani, mojdi, safa and jewellery as one coordinated set, built for premium-tier wholesale catalogues.',
    desc2: 'Full fabric and design customization, with a sample set produced and approved before the bulk run begins.',
    features: ['Sherwani + mojdi + safa + jewellery, fully coordinated', 'Premium fabric options: Katan silk, Banarasi brocade', 'Full design & embroidery customization', 'Sample set approval before bulk production', 'Single fabric lot across the full order', 'Slab pricing above standard thresholds']
  }
};

function openModal(key) {
  const d = modalData[key];
  if (!d) return;
  const feats = d.features.map(f => `<div class="mf-item">${f}</div>`).join('');
  const waText = encodeURIComponent(`Hi, I'm a wholesaler/distributor interested in the ${d.title}. Please share MOQ and rate.`);
  document.getElementById('modal-content').innerHTML = `
    <h2>${d.title}</h2>
    <span class="mtag">${d.tag}</span>
    <p>${d.desc}</p>
    <p>${d.desc2}</p>
    <div class="modal-feats">${feats}</div>
    <div class="modal-cta">
      <a href="https://wa.me/917303171409?text=${waText}" target="_blank" class="btn-royal" style="display:inline-flex;align-items:center;gap:.5rem;">
        <svg viewBox="0 0 24 24" fill="currentColor" width="15"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.013 22l4.965-1.398A9.942 9.942 0 0 0 12 22c5.522 0 10-4.477 10-10S17.522 2 12 2zm0 18a7.95 7.95 0 0 1-4.079-1.124l-.293-.174-3.046.858.822-3.02-.19-.31A7.965 7.965 0 0 1 4 12c0-4.41 3.589-8 8-8s8 3.59 8 8-3.589 8-8 8z"/></svg>
        Get Rate on WhatsApp
      </a>
    </div>`;
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ── CONTACT FORM ─────────────────────────────────────────────
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = this.querySelectorAll('input[type="text"]')[1] ? this.querySelectorAll('input[type="text"]')[1].value : '';
  const company = this.querySelector('input[type="text"]').value;
  const phone = this.querySelector('input[type="tel"]').value;
  const businessType = this.querySelector('select') ? this.querySelector('select').value : '';
  const qty = this.querySelectorAll('input[type="text"]')[2] ? this.querySelectorAll('input[type="text"]')[2].value : '';
  const msg = this.querySelector('textarea').value;
 const waText = encodeURIComponent(
`NEW TRADE ENQUIRY - NIVESHH WEBSITE

Contact Person: ${name}

Company Name: ${company}

Phone Number: ${phone}

Business Type: ${businessType || 'Not specified'}

Expected Order Quantity: ${qty || 'Not specified'}

Requirement Details:${msg || 'Not specified'}


Submitted through the Niveshh website.`
);
  this.innerHTML = `<div class="form-success">
    <div class="si">✦</div>
    <h3>Thank You, ${name || 'there'}!</h3>
    <p>Your enquiry has been received. Our team will get back to you shortly.</p>
  </div>`;
  setTimeout(() => window.open(`https://wa.me/917303171409?text=${waText}`, '_blank'), 600);
});