import './css/styles.css';
import { fetchData } from './api-calls'
import { findBookings, calculateSpending, removeCustomerPrefix, getUser, handleLogin } from './user-functions'
import { displayDashboard, displayLoginAttempt, handleNavigation } from './dom-updates';



const loginSubmit = document.getElementById("custom-submit")
const navList = document.querySelectorAll('.nav-link');
const submitButton = document.getElementById('submit-button');


let customers;
let bookings;
let rooms;
let loggedUser; 

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
    console.log(linkId);
    handleNavigation(linkId)
  });
});


  // Add a click event listener to the submit button
  submitButton.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get the value of the date input field
    const dateInput = document.querySelector('.calendar');
    const inputValue = dateInput.value;

    // Log the input value to the console
    console.log('Input Value:', inputValue);
  });