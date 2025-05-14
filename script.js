document.addEventListener('DOMContentLoaded', function() {
  // --- Typing effect ---
  const suffixes = [
    "mechanical engineering student.",
    "software developer.",
    "mechanical designer.",
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
    // only auto‑hide if scrolled down past 50px
    if (window.scrollY > 50) {
      hideTimeout = setTimeout(() => {
        nav.classList.add('hidden-nav');
      }, 3000);
    }
  }

  function hideNav() {
    // only hide if scrolled past 50px
    if (window.scrollY > 50) {
      nav.classList.add('hidden-nav');
    }
  }

  // Initially show navbar
  showNav();

  // On scroll: show if at top, else hide after delay
  window.addEventListener('scroll', () => {
    if (window.scrollY <= 50) {
      showNav();
    } else {
      hideNav();
    }
  });

  // On mouse move: if near top 10% of viewport, show
  document.addEventListener('mousemove', (e) => {
    const threshold = window.innerHeight * 0.10;
    if (e.clientY < threshold) {
      showNav();
    }
  });
});

// Add the following JavaScript code to toggle navigation links on mobile

document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelector('.nav-links');
  const hamburger = document.createElement('div');
  hamburger.classList.add('hamburger');
  hamburger.innerHTML = '&#9776;'; // Hamburger icon (three lines)
  
  // Add the hamburger icon to the navigation bar
  const navBar = document.querySelector('.nav-bar');
  navBar.insertBefore(hamburger, navLinks);

  // Toggle the visibility of the nav links when the hamburger is clicked
  hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('active');
  });
});

// Add the following CSS for the hamburger icon and toggling
/* Hamburger menu styling */
.hamburger {
  font-size: 30px;
  display: none; /* Initially hidden */
  cursor: pointer;
}

/* Show hamburger on mobile */
@media screen and (max-width: 768px) {
  .hamburger {
    display: block; /* Show hamburger icon on mobile */
  }

  .nav-links.active {
    display: flex; /* Show the links when hamburger is clicked */
    flex-direction: column;
    align-items: center;
  }
}
