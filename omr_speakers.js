let speakersData = [];

// Function to fetch speakers' data from API
async function fetchSpeakersData() {
  try {
    let response = await fetch('http://localhost:3000/speaker');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    console.log('Fetched speakers data:', data); // Log entire fetched data array
    speakersData = data; // Store the fetched speakers data globally
    initializeSpeakers(); // Initialize speakers after fetching data
  } catch (error) {
    console.error('Error fetching speakers data:', error);
  }
}


// Function to create a speaker card element
function createSpeakerCard(speaker) {
  // Create the main speaker card element
  const speakerCard = document.createElement('div');
  speakerCard.classList.add('speaker-card');

  // Create the link element
  const speakerLink = document.createElement('a');
  speakerLink.href = `omr_speakers_detail.html?id=${speaker.id}`;

  // Create and append the image element
  const speakerImage = document.createElement('img');
  speakerImage.src = speaker.image;
  speakerImage.alt = speaker.name;
  speakerCard.appendChild(speakerImage);

  // Create and append the name element
  const speakerName = document.createElement('h3');
  speakerName.textContent = speaker.name;
  speakerCard.appendChild(speakerName);

  // Create and append the title element
  const speakerTitle = document.createElement('span');
  speakerTitle.textContent = speaker.title;
  speakerCard.appendChild(speakerTitle);

  // Add click event to the speaker card
  speakerCard.addEventListener('click', () => {
    console.log(`Navigating to: ${speakerLink.href}`); // Debugging: log the navigation URL
    window.location.href = speakerLink.href;
  });

  return speakerCard;
}


// Function to initialize and display the first set of speakers
function initializeSpeakers() {
  const speakersGrid = document.querySelector('.speakers-grid');
  speakersGrid.innerHTML = ''; // Clear previous content

  const initialCount = 12; // Display the first 12 speakers initially

  for (let i = 0; i < initialCount && i < speakersData.length; i++) {
    const speakerCard = createSpeakerCard(speakersData[i]);
    speakersGrid.appendChild(speakerCard);
  }

  if (speakersData.length > initialCount) {
    document.querySelector('.loadbtn').style.display = 'block'; // Show load more button if more speakers available
  }
}


// Function to render more speakers
function renderMoreSpeakers() {
  const speakersGrid = document.querySelector('.speakers-grid');
  const startIndex = speakersGrid.children.length; // Number of currently displayed speakers
  const endIndex = startIndex + 12; // Display next 12 speakers

  for (let i = startIndex; i < endIndex && i < speakersData.length; i++) {
    const speakerCard = createSpeakerCard(speakersData[i]);
    speakersGrid.appendChild(speakerCard);
  }

  if (endIndex >= speakersData.length) {
    document.querySelector('.loadbtn').style.display = 'none'; // Hide load more button if no more speakers
  }
}


// Function to validate speaker's topics
function validateSpeakerTopics(speakerTopics, selectedTopics) {
  let topics = speakerTopics.toLowerCase().split(" | ").map(topic => topic.trim());
  let filteredTopics = topics.filter(topic => selectedTopics.includes(topic));
  return filteredTopics.length > 0;
}


// Function to validate speaker's day
function validateSpeakerDay(speakerDay, selectedDays) {
  let day = speakerDay.toLowerCase();
  return selectedDays.includes(day);
}


// Function to filter speakers based on selected topics and days
function filterSpeakers(selectedTopics, selectedDays) {
  return speakersData.filter(speaker => {
    const speakerTopics = speaker.topics || "";
    const speakerDay = speaker.day || "";

    if (selectedTopics.length > 0 && selectedDays.length > 0) {
      let isTopicValid = validateSpeakerTopics(speakerTopics, selectedTopics);
      let isDayValid = validateSpeakerDay(speakerDay, selectedDays);
      return isTopicValid && isDayValid;
    } else {
      if (selectedTopics.length > 0) {
        let isTopicValid = validateSpeakerTopics(speakerTopics, selectedTopics);
        return isTopicValid;
      } else {
        let isDayValid = validateSpeakerDay(speakerDay, selectedDays);
        return isDayValid;
      }
    }
  });
}


// Function to update displayed speakers
function updateDisplayedSpeakers() {
  const selectedTopics = Array.from(document.querySelectorAll('#topics-dropdown input[type="checkbox"]:checked')).map(option => option.value.toLowerCase());
  const selectedDays = Array.from(document.querySelectorAll('#days-dropdown input[type="checkbox"]:checked')).map(option => option.value.toLowerCase());

  let filteredSpeakers = filterSpeakers(selectedTopics, selectedDays);
  console.log('Filtered speakers:', filteredSpeakers); // Debugging: log filtered speakers
  const speakersGrid = document.querySelector('.speakers-grid');
  speakersGrid.innerHTML = ''; // Clear previous results

  if (filteredSpeakers.length === 0) {
    const noResultsMessage = document.createElement('p');
    noResultsMessage.textContent = 'No speakers found.';
    speakersGrid.appendChild(noResultsMessage);
  } else {
    filteredSpeakers.forEach(speaker => {
      const speakerCard = createSpeakerCard(speaker);
      speakersGrid.appendChild(speakerCard);
    });
  }
}

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


// Event listener setup for topics and days dropdowns
const topicsDropdownInputs = document.querySelectorAll('#topics-dropdown input[type="checkbox"]');
topicsDropdownInputs.forEach(input => {
  input.addEventListener('change', updateDisplayedSpeakers);
});

const daysDropdownInputs = document.querySelectorAll('#days-dropdown input[type="checkbox"]');
daysDropdownInputs.forEach(input => {
  input.addEventListener('change', updateDisplayedSpeakers);
});


// Event listener for search input
const searchInput = document.querySelector('.input-container input');
searchInput.addEventListener('input', function () {
  const searchTerm = this.value.trim();
  console.log(`Search term: ${searchTerm}`); // Debugging: log search term
  if (searchTerm.length > 0) {
    filterSpeakersBySearch(searchTerm);
  } else {
    showSpeakers(speakersData); // Show all speakers if search field is empty
  }
});

// Event listeners for dropdown toggles
const dropdownToggleButtons = document.querySelectorAll('.dropbtn');
dropdownToggleButtons.forEach(button => {
  button.addEventListener('click', function () {
    const dropdownContent = this.nextElementSibling;
    dropdownContent.classList.toggle('show');
  });
});


// Event listener to close dropdowns if clicking outside
window.addEventListener('click', function (event) {
  if (!event.target.matches('.dropbtn')) {
    dropdownToggleButtons.forEach(button => {
      const dropdownContent = button.nextElementSibling;
      if (dropdownContent.classList.contains('show')) {
        dropdownContent.classList.remove('show');
      }
    });
  }
});


// Event listener for load more button
const loadMoreButton = document.querySelector('.loadbtn');
loadMoreButton.addEventListener('click', renderMoreSpeakers);


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


// Initial call to display speakers based on default selections
updateDisplayedSpeakers();

// Initialize the application
async function initializeApp() {
  await fetchSpeakersData();
}

initializeApp();

