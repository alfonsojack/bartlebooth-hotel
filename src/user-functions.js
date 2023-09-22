const findBookings = (user, bookings) => {
  let userBookings = bookings.filter(booking => {
    return booking['userID'] === user['id']
  })
  return userBookings
}

const calculateSpending = (user, bookings, rooms) => {
  let foundBookings = findBookings(user, bookings);
  let bookingCostList = foundBookings.map(booking => {
    let matchingRoom = rooms.find(room => room['number'] === booking['roomNumber']);
    if (matchingRoom !== undefined) {
      return matchingRoom['costPerNight']
    } else {
      return 0
    }
  });
  let totalBookingCost = bookingCostList.reduce((spending, roomPrice) => {
    return spending + roomPrice
    }, 0);
  return totalBookingCost.toFixed(2)
}

const removeCustomerPrefix = (input) => {
  const userID = input.replace('customer', '');
  return userID;
}

const getUser = (userID, users) => {  
  let gotUser = users.find(user => {return user['id'] == userID});
  return gotUser
}

const handleLogin = (username, password, users) => {
  let userID = removeCustomerPrefix(username);
  let loggedUser = getUser(userID, users); 
  if (password !== 'overlook2021' || loggedUser == undefined) {
    return `Invalid username or password`
  } else {
    return loggedUser
  }
}

export {
  findBookings,
  calculateSpending,
  removeCustomerPrefix, 
  getUser,
  handleLogin
}
