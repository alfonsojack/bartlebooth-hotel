const findBookings = (user, bookings) => {
  let userBookings = bookings.filter(booking => {
    return booking['userID'] === user['id']
  })
  return userBookings
}


export {
  findBookings
}
