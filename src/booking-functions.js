const checkAvailability = (bookings, rooms, date) => {
  let filledBookings = bookings.filter(booking => booking['date'] === date);
  let filledRooms = filledBookings.map(booking => {
    let matchingRoom = rooms.find(room => room['number'] === booking['roomNumber']);
      return matchingRoom
    })
  let availableRooms = rooms.filter(room => !filledRooms.includes(room));
  return availableRooms
}

export {
  checkAvailability,
}