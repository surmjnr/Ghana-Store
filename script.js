// Add scroll effect to navbar
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const menuIcon = document.querySelector('.menu-icon');
const navList = document.querySelector('nav ul');

menuIcon.addEventListener('click', () => {
  navList.classList.toggle('active');
}); 