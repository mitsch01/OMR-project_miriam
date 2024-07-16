// Function to fetch speaker data by ID
async function fetchSpeakerById(id) {
  try {
    let response = await fetch(`http://localhost:3000/speaker/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let speaker = await response.json();
    console.log('Fetched speaker data:', speaker); // Debugging: log the fetched speaker data
    return speaker;
  } catch (error) {
    console.error('Error fetching speaker data:', error);
  }
}

// Function to get query parameters from the URL
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return Object.fromEntries(params.entries());
}

// Function to render the speaker details to be displayed
function renderSpeakerDetails(speaker) {
  document.querySelector("#detailName").textContent = speaker.name;
  document.querySelector("#detailTitle").textContent = speaker.title;
  document.querySelector("#detailDescription").textContent = speaker.description;
  document.querySelector("#detailTopics").textContent = speaker.topics.toUpperCase();
  document.querySelector("#detailPhoto").src = speaker.image;
  document.querySelector("#detailPhoto").alt = speaker.name;
  document.querySelector("#eventTitle").textContent = `${speaker.name} at #OMR24`;
  console.log('Rendering speaker details:', speaker);

  // Fetch events associated with the speaker
  fetchEventsForSpeaker(speaker.event_id.split(',').map(id => id.trim()));
}


// Function to fetch events by their IDs and render
function fetchEventsForSpeaker(eventIds) {
  if (!Array.isArray(eventIds) || eventIds.length === 0) {
    console.error('Invalid event IDs:', eventIds);
    return;
  }

  fetch('http://localhost:3000/events')
    .then(response => response.json())
    .then(events => {
      const speakerEvents = events.filter(event => {
        return eventIds.includes(event.event_id && event.event_id.toString());
      });

      const eventContainer = document.querySelector('.allEvents');
      if (!eventContainer) {
        console.error('Event container not found.');
        return;
      }

      eventContainer.innerHTML = ''; // Clear existing events

      speakerEvents.forEach(event => {
        const eventElement = createEventElement(event);
        eventContainer.appendChild(eventElement);
      });
    })
    .catch(error => console.error('Error fetching events data:', error));
}

// Function to create modal for each event
function createEventElement(event) {
  const eventDiv = document.createElement('div');
  eventDiv.classList.add('singleEvent');
  eventDiv.id = `event${event.event_id}`;

  let languageIconSrc = '';
  switch (event['event_language']) {
    case 'English':
      languageIconSrc = '/images/_english.svg';
      break;
    case 'German':
      languageIconSrc = '/images/_german.svg';
      break;
  }

  eventDiv.innerHTML = `
    <div class="event-details">
      <h3 id="eventTitle">${event.event_title}</h3>
      <div class="event-grid-container">
        <i class="fa-regular fa-calendar"></i><p id="eventDate">${event['event-date']}</p>
        <i class="fa-regular fa-clock"></i><p id="eventTime">${event['event_time']}</p>
        <i class="fa-solid fa-location-dot"></i><p id="eventLocation">${event['event-stage']}</p>
        <img src="${languageIconSrc}" alt="Language: ${event['event_language']}"><p id="eventLanguage">${event['event_language']}</p>
      </div>
    </div>
  `;

  eventDiv.addEventListener('click', () => openModal(event));

  return eventDiv;
}

// Function to open modal with event details
function openModal(event) {
  const modal = document.getElementById('eventModal');
  const modalEventTitle = document.getElementById('modalEventTitle');
  const modalEventDate = document.getElementById('modalEventDate');
  const modalEventTime = document.getElementById('modalEventTime');
  const modalEventLocation = document.getElementById('modalEventLocation');
  const modalEventLanguage = document.getElementById('modalEventLanguage');
  const modalEventDescription = document.getElementById('modalEventDescription');
  const modalEventLanguageFlag = document.getElementById('modalEventLanguageFlag');

  modalEventTitle.textContent = event.event_title;
  modalEventDate.textContent = event['event-date'];
  modalEventTime.textContent = event['event_time'];
  modalEventLocation.textContent = event['event-stage'];
  modalEventLanguage.textContent = event['event_language'];
  modalEventDescription.innerHTML = event['event_description'];

  modalEventLanguageFlag.src = `/images/_${event['event_language'].toLowerCase()}.svg`;
  modalEventLanguageFlag.alt = `Language: ${event['event_language']}`;

  modal.style.display = 'block';

  const closeModal = document.getElementsByClassName('close')[0];
  closeModal.onclick = function () {
    modal.style.display = 'none';
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
}


// Chat popup functionality
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

popupContent.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent actual form submission

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

// Prevent footer links from working
const footerLinks = document.querySelectorAll('.footer a');
const socialIcons = document.querySelectorAll('.social-icons a');

footerLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
  });
});

socialIcons.forEach(icon => {
  icon.addEventListener('click', (e) => {
    e.preventDefault();
  });
});


// Initialize the detail page
async function initializeDetailPage() {
  const params = getQueryParams();
  console.log('URL parameters:', params); // Debugging: log the URL parameters
  if (params.id) {
    const speaker = await fetchSpeakerById(params.id);
    renderSpeakerDetails(speaker);
  } else {
    console.error('No speaker ID found in URL');
  }
}

initializeDetailPage();