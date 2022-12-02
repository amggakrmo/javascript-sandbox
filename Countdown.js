//Header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    })
  })
})

const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    toTop.classList.add("active")
  } else {
    toTop.classList.remove("active")
  }
})

// Countdown
const daysTill = document.getElementById("days");
const hoursTill = document.getElementById("hours");
const minutesTill = document.getElementById("minutes");
const secondsTill = document.getElementById("seconds");

const newDays = document.getElementById("")

function countdown() {
  const newDate = document.getElementById("new-date");
  const newdate1 = document.getElementById("new-date-id");
  var newdate2 = newDate.value;

  const event = newdate2;

  const eventDate = new Date(event);
  const currentDate = new Date();
  const totalSeconds = (eventDate - currentDate) / 1000;

  const days = Math.floor(totalSeconds / 3600 / 24);
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const seconds = Math.floor(totalSeconds) % 60;

  daysTill.innerHTML = days;
  hoursTill.innerHTML = formatTime(hours);
  minutesTill.innerHTML = formatTime(minutes);
  secondsTill.innerHTML = formatTime(seconds);

  const newEventName = document.getElementById("new-event-name");
  const eventName = document.getElementById("event-name");

  eventName.textContent = newEventName.value;
  newdate1.textContent = newdate2;
}


function formatTime(time) {
  return time < 10 ? `0${time}` : time;
};

countdown();

setInterval(countdown, 1000)

const updateExpose = document.querySelector(".update-expose");
const updateContainer = document.querySelector(".update-container");

updateExpose.addEventListener("click", () => {
  updateContainer.classList.toggle("active");
  console.log("Dsadsa")
});

// creating new countdown

const addButton = document.getElementById("add-button")
const countdownContainer = document.querySelector(".big-countdown-container")

addButton.addEventListener("click", addNewCountdown);

function addNewCountdown() {
  console.log("Adsa")
  var addCountdown = document.createElement("div");
  addCountdown.classList.add("big-countdown");

  var addCountdownContents = `
    <div class="container">
            <h1 id="event-name">Event</h1>
            <h2> until: <span id="new-date-id"></span></h2>
            <div class="countdown-container">
                <div class="countdown-days-c">
                    <p class="big-text" id="days">0</p>
                    <span>days</span>
                </div>
                <div class="countdown-days-c">
                    <p class="big-text" id="hours">0</p>
                    <span>hours</span>
                </div>
                <div class="countdown-days-c">
                    <p class="big-text" id="minutes">0</p>
                    <span>minutes</span>
                </div>
                <div class="countdown-days-c">
                    <p class="big-text" id="seconds">0</p>
                    <span>seconds</span>
                </div>
            </div>
            <div class="update-expose">
                <i class="fa-solid fa-caret-up"></i>
            </div>
        </div>
        <div class="update-container">
            <div class="event-update">
                <label for="new-event-name">Event:</label>
                <input type="text" placeholder="Enter event name" id="new-event-name">
                <!-- <input type="button" id="event-name-button" value="update"> -->
            </div>
            <div class="date-update">
                <div class="new-date-container">
                    <input id="new-date" type="date" placeholder="enter new event date">
                    <!-- <input type="button" value="update date" id="new-date-button"> -->
                </div>
            </div>
        </div>`;
  countdownContainer.append(addCountdown)
  addCountdown.innerHTML = addCountdownContents;

  // daysTill.innerHTML = days;
  // hoursTill.innerHTML = formatTime(hours);
  // minutesTill.innerHTML = formatTime(minutes);
  // secondsTill.innerHTML = formatTime(seconds);

  countdown();
}

// calendar
let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date) {
  clicked = date;

  const eventForDay = events.find(e => e.date === clicked);

  if (eventForDay) {
    document.getElementById('eventText').innerText = eventForDay.title;
    deleteEventModal.style.display = 'block';
  } else {
    newEventModal.style.display = 'block';
  }

  backDrop.style.display = 'block';
}

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthDisplay').innerText =
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      const eventForDay = events.find(e => e.date === dayString);

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }

      if (eventForDay) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerText = eventForDay.title;
        daySquare.appendChild(eventDiv);
      }

      daySquare.addEventListener('click', () => openModal(dayString));
    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);
  }
}

function closeModal() {
  eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  clicked = null;
  load();
}

function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove('error');

    events.push({
      date: clicked,
      title: eventTitleInput.value,
    });

    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add('error');
  }
}

function deleteEvent() {
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
}

function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });

  document.getElementById('saveButton').addEventListener('click', saveEvent);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load();


