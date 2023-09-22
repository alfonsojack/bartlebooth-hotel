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
const nav = document.querySelector('nav')

const handleNavigation = (linkId) => {
  if (linkId == 'book-now-nav'){
    dashboard.classList.toggle('hidden', true)
    bookNow.classList.toggle('hidden', false)
    booknowNav.classList.toggle('active', true)
    dashboardNav.classList.toggle('active', false)
  } else if (linkId == 'dashboard-nav') {
    dashboard.classList.toggle('hidden', false)
    bookNow.classList.toggle('hidden', true)
    booknowNav.classList.toggle('active', false)
    dashboardNav.classList.toggle('active', true)
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
    myBookings.innerHTML += `<article class="bookings-card"><li>Date: ${formatDate(booking['date'])}</li><li>Room Number: ${booking['roomNumber']}</li></article>`
    )
}

export {
  displayLoginAttempt,
  displayDashboard,
  handleNavigation
}