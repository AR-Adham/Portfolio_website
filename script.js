document.addEventListener('DOMContentLoaded', function() {
  const nav = document.querySelector('.nav-bar');
  let hideTimeout;

  function showNav() {
    nav.classList.remove('hidden-nav');
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      nav.classList.add('hidden-nav');
    }, 5000);
  }

  function hideNav() {
    nav.classList.add('hidden-nav');
  }

  // Initially show nav
  showNav();

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      hideNav();
    } else {
      showNav();
    }
  });

  document.addEventListener('mousemove', (e) => {
    if (e.clientY < 10) {
      showNav();
    }
  });
});
