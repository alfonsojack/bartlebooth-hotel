import { findBookings, calculateSpending, formatDate, removeCustomerPrefix, getUser, handleLogin } from './user-functions'

const loginError = document.querySelector('.login-error')
const mainPage = document.querySelector('.main-page')
const loginBox = document.querySelector('.login-box')
const myBookings = document.querySelector('#my-bookings')
const mySpendingTitle = document.querySelector('#my-spending')
const greeting = document.querySelector('#greeting')
const dashboardNav = document.querySelector('#dashboard-nav')
const booknowNav = document.querySelector('#book-now-nav')
const dashboard = document.querySelector('.dashboard')
const bookNow = document.querySelector('.book-now')
const calendarForm = document.querySelector('.calendar-form')
const availableBookings = document.querySelector('#available-bookings')
const availabilityDisplay = document.querySelector('.availability-display')
const filterList = document.querySelectorAll('.filter-link');
const calendarError = document.querySelector('.calendar-error')
const filterBar = document.querySelector('.filter-style')
const bookingsDisplay = document.querySelector('#bookings-display')

const handleNavigation = (linkId) => {
  if (linkId == 'book-now-nav'){
    calendarForm.style.paddingTop = '0px'
    bookingsDisplay.classList.toggle('hidden', true)
    bookNow.classList.toggle('hidden', false)
    booknowNav.classList.toggle('active', true)
    dashboardNav.classList.toggle('active', false)
    calendarForm.classList.toggle('hidden', false)
    availabilityDisplay.classList.toggle('hidden', true)
    filterBar.classList.toggle('hidden', false)
  } else if (linkId == 'dashboard-nav') {
    bookingsDisplay.classList.toggle('hidden', false)
    bookNow.classList.toggle('hidden', true)
    booknowNav.classList.toggle('active', false)
    dashboardNav.classList.toggle('active', true)
    calendarForm.classList.toggle('hidden', true)
    availabilityDisplay.classList.toggle('hidden', true)
    filterBar.classList.toggle('hidden', true)
  }
}

const displayLoginAttempt = (loggedUser, bookings, rooms) => {
  if (loggedUser === 'Invalid username or password') {
    loginError.classList.toggle('hidden', false);
    loginError.innerText = loggedUser
  } else {
    loginError.classList.toggle('hidden', true);
    loginBox.classList.toggle('hidden', true);
    mainPage.classList.toggle('hidden', false);
    greeting.innerHTML = `<h2 id="greeting"> Welcome back, <span class="name">${loggedUser['name'].split(' ', 1)}</span>.</h2>`
    let userBookings = findBookings(loggedUser, bookings);
    let userSpending = calculateSpending(loggedUser, bookings, rooms);
    displayDashboard(userBookings, userSpending)
  }
}

const displayDashboard = (userBookings, userSpending) => {
  mySpendingTitle.innerText = `$${userSpending}`;
  userBookings.forEach(booking => 
    myBookings.innerHTML += `<article class="bookings-card"><p>${formatDate(booking['date'])}<p><p>Room ${booking['roomNumber']}</p></article>`
    )
}

const displayAvailability = (availableRooms) => {
  calendarForm.style.paddingTop = '300px'
  calendarError.classList.toggle('hidden', true)
  availabilityDisplay.classList.toggle('hidden', false)
  availableBookings.innerHTML = ''
  availableRooms.forEach(room => 
    availableBookings.innerHTML += `<article class="bookings-card" id="available-card"><li>Room Type: ${room['roomType']}</li><li>Bed: ${room['numBeds']} ${room['bedSize']}</li><li>Price: $${room['costPerNight'].toFixed(2)} per night</li><button class="book-now-btn" id="${room['number']}">Book Now</button></article>`)
}

const handleFilterNav = (linkId) => {
  filterList.forEach((link) => {
    link.classList.toggle('active', false)
  })
  const activeFilter = document.querySelector(`#${linkId}`);
  activeFilter.classList.toggle('active', true)
}

const displayCalendarError = () => {
  calendarError.classList.toggle('hidden', false)
}

export {
  displayLoginAttempt,
  displayDashboard,
  handleNavigation,
  displayAvailability,
  handleFilterNav,
  displayCalendarError
}