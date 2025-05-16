document.addEventListener('DOMContentLoaded', function() {
  // Typing effect and nav-show/hide logic omitted for brevity...

  // Hamburger toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
});
