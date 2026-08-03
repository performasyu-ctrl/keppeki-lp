/* ヘッダー：ファーストビューを抜けたら背景を付ける */
const header = document.getElementById('site-header');
const hero = document.querySelector('.hero');

function updateHeader() {
  if (!hero || !header) return;
  header.classList.toggle('header--solid', hero.getBoundingClientRect().bottom <= 80);
}
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

/* ハンバーガーメニュー */
const menuBtn = document.getElementById('menu-btn');
const gnav = document.getElementById('global-nav');

function closeNav() {
  if (!menuBtn || !gnav) return;
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-label', 'メニューを開く');
  gnav.classList.remove('is-open');
}

if (menuBtn && gnav) {
  menuBtn.addEventListener('click', () => {
    const open = menuBtn.getAttribute('aria-expanded') === 'true';
    if (open) {
      closeNav();
    } else {
      menuBtn.setAttribute('aria-expanded', 'true');
      menuBtn.setAttribute('aria-label', 'メニューを閉じる');
      gnav.classList.add('is-open');
      header.classList.add('header--solid');
    }
  });
  gnav.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeNav));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeNav(); });
}

/* スクロールに合わせてセクションをフェードイン */
const targets = document.querySelectorAll(
  '.compare__card, .ba, .case-item, .rcard, .guarantee, .price, .step, .faq-item, .contact__side, .form'
);

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${(i % 6) * 60}ms`;
    io.observe(el);
  });
}
