import { findBookings, calculateSpending, removeCustomerPrefix, getUser, handleLogin } from './user-functions'

const loginError = document.querySelector('.login-error')
const mainPage = document.querySelector('.main-page')
const loginBox = document.querySelector('.login-box')
const myBookings = document.querySelector('#my-bookings')
const mySpendingTitle = document.querySelector('#my-spending')
const greeting = document.querySelector('#greeting')


const displayLoginAttempt = (loggedUser, bookings, rooms) => {
  if (loggedUser === 'Invalid username or password') {
    loginError.classList.toggle('hidden', false);
    loginError.innerText = loggedUser
  } else {
    loginError.classList.toggle('hidden', true);
    loginBox.classList.toggle('hidden', true);
    mainPage.classList.toggle('hidden', false);
    greeting.innerText = `Welcome back, ${loggedUser['name'].split(' ', 1)}`
    let userBookings = findBookings(loggedUser, bookings);
    let userSpending = calculateSpending(loggedUser, bookings, rooms);
    displayDashboard(userBookings, userSpending)
  }
}

const displayDashboard = (userBookings, userSpending) => {
  mySpendingTitle.innerText = `$${userSpending}`;
  userBookings.forEach(booking => 
    myBookings.innerHTML += `<article><li>Date: ${booking['date']}</li>Room Number: ${booking['roomNumber']}<li></li></article>`
    )
}

export {
  displayLoginAttempt,
  displayDashboard
}