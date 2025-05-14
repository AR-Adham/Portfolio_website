// script.js

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
  const prefix = "";
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
    if (e.clientY < window.innerHeight * 0.10) showNav();
  });

  // --- Hamburger toggle (mobile only) ---
  const navLinks = document.querySelector('.nav-links');
  const navBar = document.querySelector('.nav-bar');

  function updateHamburger() {
    const existing = document.querySelector('.hamburger');
    if (window.innerWidth <= 768) {
      // create if missing
      if (!existing) {
        const hamburger = document.createElement('div');
        hamburger.classList.add('hamburger');
        hamburger.innerHTML = '&#9776;'; // ☰
        navBar.insertBefore(hamburger, navLinks);
        hamburger.addEventListener('click', () => {
          navLinks.classList.toggle('active');
        });
      }
    } else {
      // remove on desktop
      if (existing) {
        existing.remove();
        navLinks.classList.remove('active');
      }
    }
  }

  // init and on resize
  updateHamburger();
  window.addEventListener('resize', updateHamburger);
});
