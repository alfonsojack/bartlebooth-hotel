const fetchData = (type, link, fn) => {
  return fetch(link)
    .then(response => response.json())
    .then(data => {
      return fn(data[type]);
    })
    .catch(error => {
       console.error(`An error occurred: ${error}`);
    })
};

const updateBookings = (booking) => {
  console.log(booking)
  const promise = fetch("http://localhost:3001/api/v1/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "userID": booking['userID'],
      "date": booking['date'],
      "roomNumber": booking['roomNumber']
    }),
  })
    .then((response) => response.json())
    .catch((err) => console.error(`You got an ${err}`));
  return promise;
};

export {
  fetchData,
  updateBookings
}