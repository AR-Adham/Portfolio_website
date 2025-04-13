document.addEventListener('DOMContentLoaded', function() {
  // --- nav-bar show/hide logic (unchanged) ---
  const nav = document.querySelector('.nav-bar');
  let hideTimeout;
  function showNav() {
    nav.classList.remove('hidden-nav');
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      nav.classList.add('hidden-nav');
    }, 3500);
  }
  function hideNav() {
    nav.classList.add('hidden-nav');
  }
  showNav();
  window.addEventListener('scroll', () => {
    window.scrollY > 50 ? hideNav() : showNav();
  });
  document.addEventListener('mousemove', (e) => {
    if (e.clientY < 10) showNav();
  });

  // --- typing effect ---
  const suffixes = [
    "mechanical engineering student.",
    "software developer.",
    "mechanical designer.",
    "CAD expert.",
    "overall fun guy."
  ];
  const typedTextEl = document.getElementById('typed-text');
  const prefix = "I am a ";
  let idx = 0, letter = 0, typing = true;

  function typeLoop() {
    const current = suffixes[idx];
    if (typing) {
      typedTextEl.textContent = prefix + current.slice(0, ++letter);
      if (letter === current.length) {
        typing = false;
        setTimeout(typeLoop, 1500);
        return;
      }
    } else {
      typedTextEl.textContent = prefix + current.slice(0, --letter);
      if (letter === 0) {
        typing = true;
        idx = (idx + 1) % suffixes.length;
      }
    }
    setTimeout(typeLoop, typing ? 100 : 50);
  }

  setTimeout(typeLoop, 500);
});
