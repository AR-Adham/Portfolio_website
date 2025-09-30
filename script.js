// ---------- Typing effect ----------
document.addEventListener('DOMContentLoaded', function () {
  const suffixes = [
    "Mechanical engineering student.",
    "Software developer.",
    "Mechanical designer.",
    "CAD expert.",
    "Overall Fun guy."
  ];
  const typedTextEl = document.getElementById('typed-text');
  if (typedTextEl) {
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
  }

  // ---------- Navbar show/hide ----------
  const nav = document.querySelector('.nav-bar');
  if (nav) {
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
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
      });
    }
  }
});

// ---------- Posts loader (single source of truth) ----------
document.addEventListener('DOMContentLoaded', () => {
  const scroller = document.getElementById('post-scroller');
  if (!scroller) return;

  const CATEGORIES = new Set(['mechanical','software','general']);

  // Resolve posts.json relative to current page and cache-bust
  const manifestUrl = new URL('posts.json', window.location.href);
  manifestUrl.searchParams.set('v', Date.now().toString());

  function formatDate(iso) {
    if (!iso) return '';
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function createCard(post) {
    const a = document.createElement('a');
    a.href = post.url;
    a.className = 'post-card';
    a.setAttribute('aria-label', post.title || 'Post');

    const img = document.createElement('img');
    img.className = 'post-cover';
    img.alt = post.title || '';
    img.loading = 'lazy';
    img.src = post.cover || 'assets/placeholder.jpg';
    // Optional: fallback if cover missing
    img.onerror = () => { img.src = 'assets/placeholder.jpg'; };
    a.appendChild(img);

    const body = document.createElement('div');
    body.className = 'post-body';

    const h3 = document.createElement('h3');
    h3.className = 'post-title';
    h3.textContent = post.title || 'Untitled';
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
    badge.textContent = post.category || '';
    meta.appendChild(badge);

    const time = document.createElement('time');
    time.dateTime = post.createdAt || '';
    time.textContent = formatDate(post.createdAt);
    meta.appendChild(time);

    body.appendChild(meta);
    a.appendChild(body);
    return a;
  }

  async function loadPosts() {
    try {
      const res = await fetch(manifestUrl.href, { cache: 'no-store' });
      if (!res.ok) throw new Error(`Failed to load posts.json (${res.status})`);
      const json = await res.json();
      if (!Array.isArray(json)) throw new Error('posts.json must be an array');

      const posts = json
        .filter(p => p && CATEGORIES.has(String(p.category || '').toLowerCase()) && p.url)
        .map(p => ({
          title: p.title || '',
          excerpt: p.excerpt || '',
          url: p.url,
          cover: p.cover || '',
          category: String(p.category || '').toLowerCase(),
          createdAt: p.createdAt || ''
        }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      // Clear skeletons
      scroller.innerHTML = '';

      // Render
      posts.forEach(p => scroller.appendChild(createCard(p)));

      // Buttons
      const wrap = scroller.closest('.post-scroller-wrap');
      const btnPrev = wrap?.querySelector('.scroll-btn.prev');
      const btnNext = wrap?.querySelector('.scroll-btn.next');
      const step = 320; // ≈ card width + gap

      btnPrev?.addEventListener('click', () => scroller.scrollBy({ left: -step, behavior: 'smooth' }));
      btnNext?.addEventListener('click', () => scroller.scrollBy({ left: step, behavior: 'smooth' }));

      // Debug helper
      window.__postsDebug = () => ({ manifestUrl: manifestUrl.href, count: posts.length, posts });

    } catch (err) {
      console.error('[posts] ', err);
      scroller.innerHTML = '<div style="opacity:.7;padding:1rem">Couldn’t load posts. Check <code>posts.json</code> path & format.</div>';
    }
  }

  loadPosts();
});
