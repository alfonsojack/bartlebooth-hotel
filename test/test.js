import chai from 'chai';
import { findBookings, calculateSpending } from '../src/user-functions';
const expect = chai.expect;


describe('findBookings', () => {
  let user;
  let bookings;

  beforeEach(() => {
    user = { 'id': 1 };
    bookings = [
      { 'id': 1, 'userID': 1, 'date': '2023-09-20' },
      { 'id': 2, 'userID': 2, 'date': '2023-09-21' },
      { 'id': 3, 'userID': 1, 'date': '2023-09-22' },
      { 'id': 4, 'userID': 3, 'date': '2023-09-23' },
    ];
  });

  it('should return bookings for the given user', () => {
    const userBookings = findBookings(user, bookings);
    expect(userBookings).to.deep.equal([
      { 'id': 1, 'userID': 1, 'date': '2023-09-20' },
      { 'id': 3, 'userID': 1, 'date': '2023-09-22' },
    ]);
  });

  it('should return an empty array if no bookings are found for the user', () => {
    user = { 'id': 4 }; 
    const userBookings = findBookings(user, bookings);
    expect(userBookings).to.deep.equal([]);
  });
});

describe('calculateSpending', () => {
  let user;
  let bookings;
  let rooms;

  beforeEach(() => {
    user = { id: 1 };
    bookings = [
      { id: 1, userID: 1, roomNumber: 101 },
      { id: 2, userID: 1, roomNumber: 102 },
    ];
    rooms = [
      { number: 101, costPerNight: 100 },
      { number: 102, costPerNight: 150 },
    ];
  });

  it('should calculate the total spending for a user', () => {
    const totalSpending = calculateSpending(user, bookings, rooms);
    expect(totalSpending).to.equal(250);
  });

  it('should return 0 if the user has no bookings', () => {
    user = { id: 2 };
    const totalSpending = calculateSpending(user, bookings, rooms);
    expect(totalSpending).to.equal(0);
  });

  it('should return 0 if there are no matching rooms for the bookings', () => {
    bookings[0].roomNumber = 103;
    bookings[1].roomNumber = 104;
    const totalSpending = calculateSpending(user, bookings, rooms);
    expect(totalSpending).to.equal(0);
  });
});