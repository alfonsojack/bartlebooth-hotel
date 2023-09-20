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

const createUniqueID = (bookings) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomID = '';

  for (let i = 0; i < 17; i++) {
    randomID += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  if (bookings.some(booking => booking['id'] == randomID)) {
    return createUniqueID(bookings);
  }

  return randomID;
}


const bookRoom = (date, room, bookings, user) => {
  let newBooking = {
    "id": createUniqueID(bookings),
    "userID": user['id'],
    "date": date,
    "roomNumber": room['number']
  }

  bookings.push(newBooking);
  return bookings
}


export {
  checkAvailability,
  filterByRoomType,
  createUniqueID,
  bookRoom
}