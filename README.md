# OMR24 Festival Web Application

## Overview

Welcome to the OMR24 Festival Web Application. This project consists of three main components:

1. **OMR24 Festival Home:** The landing page for the festival, featuring general information and navigation.
2. **OMR24 Speakers:** A page listing all the speakers participating in the festival.
3. **OMR24 Speaker Details:** A detailed view for each speaker, showcasing their information and related events.

## Setup

1. Make sure you have `json-server` installed. You can install it globally using npm:

	```bash
	npm install -g json-server
	json-server --watch speakers_events.json

2. Ensure the JSON server is running and accessible at `http://localhost:3000/speaker` for the data fetching to work.
3. Place all images, fonts, and videos in the appropriate directories as referenced in the HTML and CSS files.
4. Open each site in a web browser to view it.

## General Functionalities
1. **Menu Toggle**: Displays the dropdown menu on hover and hides it when the mouse leaves.
2. **Language Selector**: Allows users to switch between English and German, with dynamic flag updates.
3. **Captcha Verification:** Captcha logic simulates verification with visual feedback.
4. **Chat Popup:** Manages the contact form popup, including opening, closing, and showing a thank you message.
5. **Footer and Social Icons:** Disables default actions for footer and social icon links.
6. **Responsive Design:** Menu and language selector adapt for mobile and desktop views.

Below you will find a detailed description of each component.



# OMR Festival Website

This page serves as the central hub for information and navigation related to the OMR24 event, featuring dynamic content and interactive elements to enhance the user experience.

## Features

- **Teaser Video**: Autoplaying video that introduces the OMR24 festival.
- **Festival Overview**: Provides an introduction to the festival, including key information and highlights.
- **Speaker Banner**: Contains a call-to-action button to view all speakers.
- **Highlights Section**: Displays a recap of the previous year's festival with an embedded YouTube video (functionality yet to be implemented).
- **Concert Banner**: Features a prominent live concert announcement with a button to watch an offical music video of the showcased artist.
- **Stages and Formats Slider**: Interactive slider showcasing different stages at the festival.
- **Exhibitor Section**: Information and call-to-action for becoming an exhibitor.
- **Partners Section**: Displays logos of festival partners and exhibitors.
- **Newsletter Signup**: Allows users to subscribe for the latest news and updates about the festival with an anti-robot verification system.
- **Footer**: Includes the site map and social media icons for engagement.

## Files

- **HTML**: `omr_home.html` - The main structure of the homepage.
- **CSS**: `/omr.css` - Styling for the homepage.
- **JavaScript**: `omr_home.js` - Handles dynamic content loading, event handling and UI interactions.

## Functionalities

- **Language Selector**: Allows users to switch between English and German, with dynamic flag updates.




# OMR24 Speakers

This webpage showcases speakers for the OMR24 festival. It includes a dynamic interface to filter and display speaker information fetched from a local JSON file.

## Features

- **Dynamic Speaker Cards:** Displays speaker information dynamically.
- **Filtering Options:** Filter speakers by topics and days.
- **Search Functionality:** Search for speakers by name.
- **Load More:** Load additional speakers with a button click.

## Files

- **HTML:** `omr_speakers.html` - Main structure of the page.
- **CSS:** `/omr.css` - Styling for the page.
- **JavaScript:** `omr_speakers.js` - Handles dynamic content loading, event handling and UI interactions.

## Functionalities

1. **Fetching Speaker Data:** The `fetchSpeakersData` function retrieves and stores speaker data from the API.
2. **Creating Speaker Cards:** The `createSpeakerCard` function generates clickable cards for each speaker.
3. **Initializing Display:** The `initializeSpeakers` function displays the first 12 speakers and shows a "Load More" button if additional speakers exist.
4. **Loading More Speakers:** The `renderMoreSpeakers` function adds the next 12 speakers and hides the "Load More" button if no more speakers are available.
5. **Filtering Speakers:** The `filterSpeakers` function filters speakers based on selected topics and days.
6. **Updating Displayed Speakers:** The `updateDisplayedSpeakers` function refreshes the speaker list according to selected criteria.
7. **Handling Search Input:** The `filterSpeakersBySearch` function updates the speaker display based on the search term.
12. **Initialization:** The `initializeApp` function sets up the app by fetching data and displaying initial content.



# OMR24 Speaker Detail Page

This is the detail page for the OMR24 festival speakers. It dynamically displays information about a specific speaker and their associated events.

## Features

- **Speaker Details:** Displays speaker's photo, name, title, topics and description.
- **Events Listing:** Shows events related to the speaker, which are dynamically fetched and rendered.
- **Event Modal:** Provides detailed information about each event when clicked.

## Files

- **HTML:** `omr_speakers_detail.html` - Main structure of the page.
- **CSS:** `/omr.css` - Styling for the page.
- **JavaScript:** `omr_speakers_detail.js` - Handles dynamic content loading, event handling and UI interactions.

## Functionalities

1. **Fetching Data:** The `fetchSpeakerById` function retrieves speaker data based on the ID in the URL.
2. **Rendering Data:** The `renderSpeakerDetails` function populates the page with speaker and event information.
3. **Event Handling:** Click events trigger modals for event details and show/hide the contact form.



For further customization or support, please contact me at schwartz.miriam@gmail.com


