const findBookings = (user, bookings) => {
  let userBookings = bookings.filter(booking => {
    return booking['userID'] === user['id']
  })
  let sortedUserBookings = userBookings.sort((a,b) => a['date'].replaceAll('/', '') - b['date'].replaceAll('/', ''))
  return sortedUserBookings
}

function formatDate(inputDate) {

  const parts = inputDate.split('/');

  if (parts.length === 3) {
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[2]);

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const monthName = monthNames[month - 1];

    const formattedDate = `${monthName} ${day}, ${year}`;
    
    return formattedDate;
  } else {
    return 'Invalid date format';
  }
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
  let number =  totalBookingCost.toFixed(2) * 1;
  return number.toLocaleString()
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
  handleLogin,
  formatDate
}
