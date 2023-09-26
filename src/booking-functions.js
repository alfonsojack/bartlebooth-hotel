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

const reformatDate = (date) => {
  let reformattedDate = date.replaceAll('-', '/')
  return reformattedDate
}



const bookRoom = (date, room, bookings, user) => {
  let newBooking = {
    "userID": user['id'],
    "date": date,
    "roomNumber": room * 1
  }
  console.log(newBooking)
  bookings.push(newBooking);
  return newBooking
}


export {
  checkAvailability,
  filterByRoomType,
  bookRoom,
  reformatDate
}