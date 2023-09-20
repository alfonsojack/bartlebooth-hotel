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
  return totalBookingCost
}

const removeCustomerPrefix = (input) => {
  const userID = input.replace('customer', '');
  return userID;
}

export {
  findBookings,
  calculateSpending,
  removeCustomerPrefix
}
