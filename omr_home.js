// Captcha verification
document.getElementById('captchaButton').addEventListener('click', function() {
  document.getElementById('captchaIcon').className = 'fa-solid fa-circle-notch loading';
  document.getElementById('captchaText').textContent = 'Verification in progress...';
  document.getElementById('captchaButton').style.display = 'none';
  
  setTimeout(function() {
    document.getElementById('captchaIcon').className = 'fa-solid fa-shield-heart';
    document.getElementById('captchaText').textContent = 'Verification successful!';
  }, 2000);
});


// Chat popup
const openPopupButton = document.getElementById('openPopup');
const popupForm = document.getElementById('popupForm');
const closePopupButton = document.getElementById('closePopup');
const form = document.getElementById('contactForm');
const popupContent = document.querySelector('.popup-content');

openPopupButton.addEventListener('click', () => {
  popupForm.style.display = 'block';
});

closePopupButton.addEventListener('click', () => {
  popupForm.style.display = 'none';
});

// // Handle form submission
popupContent.addEventListener('submit', (e) => {
  e.preventDefault();

  popupForm.innerHTML = `
      <div class="submitted-message">
        <h2>Thank you!</h2>
        <p>Our unicorns are now working their magic and will get back to you soon.</p>
      </div>
    `;

  popupForm.style.backgroundColor = '#ffc107';
  popupContent.style.color = 'white';

  window.addEventListener('click', function (event) {
    if (!event.target.matches('.popupForm')) {
      popupForm.style.display = 'none';
    }
  });
});


// Event listener for burger menu
const menuBars = document.querySelector('#menu3 .fa-bars');
const menuDropdown = document.getElementById('menu3-dropdown');

menuBars.addEventListener('mouseover', function () {
  menuDropdown.style.display = 'flex';
});

menuDropdown.addEventListener('mouseleave', function () {
  menuDropdown.style.display = 'none';
});


// Prevent footer links to work
const footerLinks = document.querySelectorAll('.footer a');
const socialIcons = document.querySelectorAll('.social-icons a');

//  Prevent default action for footer links
footerLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
  });
});

//  Prevent default action for social icons
socialIcons.forEach(icon => {
  icon.addEventListener('click', (e) => {
    e.preventDefault();
  });
});


// Function for Stages Carousel
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const carouselContainer = document.querySelector('.carousel-container');
const items = document.querySelectorAll('.carousel-item');
const indicators = document.querySelectorAll('.nav-indicator');
let currentIndex = 0;

function updateCarousel() {
  carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('nav-active', index === currentIndex);
    indicator.classList.toggle('nav-inactive', index !== currentIndex);
  });
}

function showNextItem() {
  currentIndex = (currentIndex + 1) % items.length;
  updateCarousel();
}

function showPrevItem() {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  updateCarousel();
}

prevBtn.addEventListener('click', showPrevItem);
nextBtn.addEventListener('click', showNextItem);

indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    currentIndex = index;
    updateCarousel();
  });
});

updateCarousel();