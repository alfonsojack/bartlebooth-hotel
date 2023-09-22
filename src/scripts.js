import './css/styles.css';
import { fetchData } from './api-calls'
import { findBookings, calculateSpending, removeCustomerPrefix, getUser, handleLogin } from './user-functions'
import { displayDashboard, displayLoginAttempt } from './dom-updates';

const loginSubmit = document.getElementById("custom-submit")



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