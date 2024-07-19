// Function for Stages Slider
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const sliderContainer = document.querySelector('.slider-container');
const items = document.querySelectorAll('.slider-item');
const itemCount = items.length;
let currentIndex = 0;

function updateSlider() {
  const itemWidth = items[0].clientWidth;
  sliderContainer.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

  // Show/Hide buttons based on the current index
  if (currentIndex === 0) {
    prevBtn.style.display = 'none';
  } else {
    prevBtn.style.display = 'block';
  }

  if (currentIndex === itemCount - 1) {
    nextBtn.style.display = 'none';
  } else {
    nextBtn.style.display = 'block';
  }

  // Ensure buttons are hidden when all slides are visible
  const totalWidth = itemWidth * itemCount;
  const visibleWidth = sliderContainer.parentElement.clientWidth;
  if (visibleWidth >= totalWidth) {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
  }
}

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + itemCount) % itemCount;
  updateSlider();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % itemCount;
  updateSlider();
});

// Update slider on window resize
window.addEventListener('resize', updateSlider);

// Initialize the slider
updateSlider();


// Captcha verification
document.getElementById('captchaButton').addEventListener('click', function () {
  document.getElementById('captchaIcon').className = 'fa-solid fa-circle-notch loading';
  document.getElementById('captchaText').textContent = 'Verification in progress...';
  document.getElementById('captchaButton').style.display = 'none';

  setTimeout(function () {
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


// Event listener for language selector
const selectedLanguageButton = document.getElementById('selected-language');
const currentFlagImage = document.getElementById('current-flag');
const languageOptions = document.getElementById('language-options');

languageOptions.addEventListener('click', function(event) {
  if (event.target.closest('button')) {
    const selectedButton = event.target.closest('button');
    const newFlag = selectedButton.getAttribute('data-flag');
    
    currentFlagImage.src = newFlag;
  }
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


// Prevent subscribe button and footer links to work
const subscribeBtn = document.querySelectorAll('.subscribe-button');
const footerLinks = document.querySelectorAll('.footer a');
const socialIcons = document.querySelectorAll('.social-icons a');

// // Prevent default action for newsletter submit button
subscribeBtn.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
  });
});

// // Prevent default action for footer links
footerLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
  });
});

// // Prevent default action for social icons
socialIcons.forEach(icon => {
  icon.addEventListener('click', (e) => {
    e.preventDefault();
  });
});
