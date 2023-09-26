import './css/styles.css';
import { fetchData, updateBookings } from './api-calls'
import { handleLogin } from './user-functions'
import { checkAvailability, filterByRoomType, bookRoom, reformatDate } from './booking-functions';
import { resetFilterBar, displayLoginAttempt, handleNavigation, displayAvailability, handleFilterNav, displayCalendarError } from './dom-updates';
import dayjs from 'dayjs';


const loginSubmit = document.getElementById("custom-submit")
const navList = document.querySelectorAll('.nav-link');
const submitButton = document.getElementById('submit-button');
const filterList = document.querySelectorAll('.filter-link');
const calendar = document.querySelector('.calendar')

let customers;
let bookings;
let rooms;
let loggedUser; 
let selectedDate;
let availableRooms

const setCustomer = (data) => {
  customers = data;
  return customers
}

const setBookings = (data) => {
  bookings = data;
  return bookings
}

const setRooms = (data) => {
  rooms = data;
  return rooms
}

window.addEventListener('load', function() {
  calendar.min = dayjs().format('YYYY-MM-DD');
  fetchData('bookings', 'http://localhost:3001/api/v1/bookings', setBookings)
  fetchData('rooms', 'http://localhost:3001/api/v1/rooms', setRooms)
  fetchData('customers', 'http://localhost:3001/api/v1/customers', setCustomer)
})

loginSubmit.addEventListener("click", function(event) {
  event.preventDefault();
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  loggedUser = handleLogin(username, password, customers);
  displayLoginAttempt(loggedUser, bookings, rooms);
})

navList.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const linkId = link.getAttribute("id");
    handleNavigation(linkId)
  });
});

filterList.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const linkId = link.getAttribute("id");
    handleFilterNav(linkId);
    if (linkId == 'all') {
      displayAvailability(availableRooms)
      const bookNowBtn = document.querySelectorAll('.book-now-btn')
      bookNowBtn.forEach((link) => {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          const roomId = link.getAttribute("id")
          let newBooking = bookRoom(selectedDate, roomId, bookings, loggedUser);
          updateBookings(newBooking)
          handleNavigation('dashboard-nav')
          displayLoginAttempt(loggedUser, bookings, rooms);    
        }
        )
      }
      )
    } else {
      let filteredRooms = filterByRoomType(availableRooms, linkId);
      displayAvailability(filteredRooms)
      const bookNowBtn = document.querySelectorAll('.book-now-btn')
      bookNowBtn.forEach((link) => {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          const roomId = link.getAttribute("id")
          let newBooking = bookRoom(selectedDate, roomId, bookings, loggedUser);
          updateBookings(newBooking)
          handleNavigation('dashboard-nav')
          displayLoginAttempt(loggedUser, bookings, rooms);    
        }
        )
      }
      )
    
    }
  });
});

submitButton.addEventListener('click', function (event) {
  event.preventDefault();
  const dateInput = document.querySelector('.calendar');
  const inputValue = dateInput.value;
  selectedDate = reformatDate(inputValue);
  if (selectedDate == ''){
    displayCalendarError()
  } else {
    resetFilterBar();
    availableRooms = checkAvailability(bookings, rooms, selectedDate);
    displayAvailability(availableRooms)
    const bookNowBtn = document.querySelectorAll('.book-now-btn')
      bookNowBtn.forEach((link) => {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          const roomId = link.getAttribute("id")
          let newBooking = bookRoom(selectedDate, roomId, bookings, loggedUser);
          updateBookings(newBooking)
          handleNavigation('dashboard-nav')
          displayLoginAttempt(loggedUser, bookings, rooms);    
        }
        )
      }
      )
  }
});