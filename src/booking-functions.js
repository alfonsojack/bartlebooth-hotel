const checkAvailability = (bookings, rooms, date) => {
  let filledBookings = bookings.filter(booking => booking['date'] === date);
  let filledRooms = filledBookings.map(booking => {
    let matchingRoom = rooms.find(room => room['number'] === booking['roomNumber']);
      return matchingRoom
    })
  let availableRooms = rooms.filter(room => !filledRooms.includes(room));
  return availableRooms
}

const filterByRoomType = (availableRooms, type) => {
  let filteredRooms =  availableRooms.filter(room => {return room['roomType'] == type.replaceAll('-', ' ')})
  return filteredRooms
}


export {
  checkAvailability,
  filterByRoomType
}