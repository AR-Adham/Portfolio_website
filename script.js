document.addEventListener('DOMContentLoaded', function() {
  // --- Typing effect ---
  const suffixes = [
    "Mechanical engineering student.",
    "Software developer.",
    "Mechanical designer.",
    "CAD expert.",
    "Overall Fun guy."
  ];
  const typedTextEl = document.getElementById('typed-text');
  let idx = 0, letter = 0, typing = true;

  function typeLoop() {
    const current = suffixes[idx];
    if (typing) {
      typedTextEl.textContent = current.slice(0, ++letter);
      if (letter === current.length) {
        typing = false;
        setTimeout(typeLoop, 1500);
        return;
      }
    } else {
      typedTextEl.textContent = current.slice(0, --letter);
      if (letter === 0) {
        typing = true;
        idx = (idx + 1) % suffixes.length;
      }
    }
    setTimeout(typeLoop, typing ? 100 : 50);
  }
  setTimeout(typeLoop, 500);

  // --- Navbar show/hide logic ---
  const nav = document.querySelector('.nav-bar');
  let hideTimeout;
  function showNav() {
    nav.classList.remove('hidden-nav');
    clearTimeout(hideTimeout);
    if (window.scrollY > 50) {
      hideTimeout = setTimeout(() => {
        nav.classList.add('hidden-nav');
      }, 3000);
    }
  }
  function hideNav() {
    if (window.scrollY > 50) {
      nav.classList.add('hidden-nav');
    }
  }
  showNav();
  window.addEventListener('scroll', () => {
    window.scrollY <= 50 ? showNav() : hideNav();
  });
  document.addEventListener('mousemove', (e) => {
    if (e.clientY < window.innerHeight * 0.1) showNav();
  });
const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
});

<script>
(async function initPosts() {
  const scroller = document.getElementById('post-scroller');
  if (!scroller) return;

  const CATEGORIES = new Set(['mechanical', 'software', 'general']);
  const MANIFEST_URL = 'posts.json'; // adjust if you put it elsewhere

  function formatDate(iso) {
    // Render like Sep 24, 2025
    if (!iso) return '';
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'});
  }

  function createCard(post) {
    const a = document.createElement('a');
    a.href = post.url;
    a.className = 'post-card';
    a.setAttribute('aria-label', post.title);

    const img = document.createElement('img');
    img.className = 'post-cover';
    img.alt = post.title;
    img.loading = 'lazy';
    img.src = post.cover || 'assets/placeholder.jpg'; // fallback image
    a.appendChild(img);

    const body = document.createElement('div');
    body.className = 'post-body';

    const h3 = document.createElement('h3');
    h3.className = 'post-title';
    h3.textContent = post.title;
    body.appendChild(h3);

    if (post.excerpt) {
      const p = document.createElement('p');
      p.className = 'post-excerpt';
      p.textContent = post.excerpt;
      body.appendChild(p);
    }

    const meta = document.createElement('div');
    meta.className = 'post-meta';

    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = post.category;
    meta.appendChild(badge);

    const date = document.createElement('time');
    date.dateTime = post.createdAt || '';
    date.textContent = formatDate(post.createdAt);
    meta.appendChild(date);

    body.appendChild(meta);
    a.appendChild(body);
    return a;
  }

  try {
    // Fetch manifest
    const res = await fetch(MANIFEST_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to load posts.json');
    const allPosts = await res.json();

    // Filter, validate, sort
    const posts = allPosts
      .filter(p => p && CATEGORIES.has((p.category || '').toLowerCase()) && p.url)
      .map(p => ({
        ...p,
        category: (p.category || '').toLowerCase(),
        createdAt: p.createdAt || ''
      }))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Clear skeletons
    scroller.innerHTML = '';

    // Render
    posts.forEach(p => scroller.appendChild(createCard(p)));

    // Hook up arrows
    const wrap = scroller.closest('.post-scroller-wrap');
    const btnPrev = wrap?.querySelector('.scroll-btn.prev');
    const btnNext = wrap?.querySelector('.scroll-btn.next');
    const step = 320; // approx card width + gap

    btnPrev?.addEventListener('click', () => scroller.scrollBy({ left: -step, behavior: 'smooth' }));
    btnNext?.addEventListener('click', () => scroller.scrollBy({ left: step, behavior: 'smooth' }));

  } catch (err) {
    console.error(err);
    // Fallback: minimal inline error state
    scroller.innerHTML = '<div style="opacity:.7">Couldn\\'t load posts. Check posts.json path.</div>';
  }
})();
</script>

