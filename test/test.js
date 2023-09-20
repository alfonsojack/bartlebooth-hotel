import chai from 'chai';
import { findBookings, calculateSpending } from '../src/user-functions';
import { checkAvailability, filterByRoomType } from '../src/booking-functions';
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

describe('checkAvailability', () => {
  let bookings;
  let rooms;
  let date;

  beforeEach(() => {
    bookings = [
      { id: 1, roomNumber: 101, date: '2023/09/20' },
      { id: 2, roomNumber: 102, date: '2023/09/20' },
      { id: 3, roomNumber: 103, date: '2023/09/21' },
    ];
    rooms = [
      { number: 101, type: 'Standard' },
      { number: 102, type: 'Deluxe' },
      { number: 103, type: 'Suite' },
      { number: 104, type: 'Standard' },
    ];
    date = '2023/09/20'; 
  });

  it('should return available rooms for the given date', () => {
    const availableRooms = checkAvailability(bookings, rooms, date);
    expect(availableRooms).to.deep.equal([
      { number: 103, type: 'Suite' },
      { number: 104, type: 'Standard' },
    ]);
  });

  it('should return an empty array if no rooms are available for the given date', () => {
    bookings = [
      { id: 1, roomNumber: 101, date: '2023/09/20' },
      { id: 2, roomNumber: 102, date: '2023/09/20' },
      { id: 3, roomNumber: 103, date: '2023/09/20' },
      { id: 4, roomNumber: 104, date: '2023/09/20' }
    ];
    date = '2023/09/20'; 
    const availableRooms = checkAvailability(bookings, rooms, date);
    expect(availableRooms).to.deep.equal([]);
  });
});

describe('filterByRoomType', () => {
  let availableRooms;

  beforeEach(() => {
    availableRooms = [
      { number: 101, roomType: 'standard' },
      { number: 102, roomType: 'deluxe' },
      { number: 103, roomType: 'suite' },
      { number: 104, roomType: 'standard suite' },
    ];
  });

  it('should return rooms of the specified type', () => {
    const filteredRooms = filterByRoomType(availableRooms, 'deluxe');
    expect(filteredRooms).to.deep.equal([
      { number: 102, roomType: 'deluxe' },
    ]);
  });

  it('should handle room type with hyphen', () => {
    const filteredRooms = filterByRoomType(availableRooms, 'standard-suite');
    expect(filteredRooms).to.deep.equal([
      { number: 104, roomType: 'standard suite' },
    ]);
  });

  it('should return an empty array if no rooms match the specified type', () => {
    const filteredRooms = filterByRoomType(availableRooms, 'non-existent-type');
    expect(filteredRooms).to.deep.equal([]);
  });
});