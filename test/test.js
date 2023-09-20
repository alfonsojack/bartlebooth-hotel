import chai from 'chai';
import { findBookings, calculateSpending, removeCustomerPrefix } from '../src/user-functions';
import { checkAvailability, filterByRoomType, createUniqueID, bookRoom } from '../src/booking-functions';
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

describe('createUniqueID', () => {
  let bookings;

  beforeEach(() => {

    bookings = [
      { id: 'abcdefghijabcdefgh' },
      { id: '9876543210gfedcba' },
    ];
  });

  it('should generate a unique ID', () => {
    const uniqueID = createUniqueID(bookings);
    expect(bookings.some(booking => booking.id === uniqueID)).to.be.false;
  });

  it('should generate a different unique ID each time', () => {
    const uniqueID1 = createUniqueID(bookings);
    const uniqueID2 = createUniqueID(bookings);
    expect(uniqueID1).to.not.equal(uniqueID2);
  });
});

describe('bookRoom', () => {
  let bookings;
  let user;
  let room;

  beforeEach(() => {
    bookings = [
      { id: 'abc123', userID: 'user1', date: '2023-10-01', roomNumber: '101' },
      { id: 'def456', userID: 'user2', date: '2023-10-02', roomNumber: '102' },
    ];

    user = { id: 'user3' };
    room = { number: '103' };
  });

  it('should book a room and add it to the bookings array', () => {
    const initialLength = bookings.length;
    const updatedBookings = bookRoom('2023-10-03', room, bookings, user);

    expect(updatedBookings).to.have.lengthOf(initialLength + 1);
  });

  it('should assign a unique ID to the booking', () => {
    const updatedBookings = bookRoom('2023-10-03', room, bookings, user);
    const newBooking = updatedBookings.find(booking => booking.roomNumber === '103');

    expect(newBooking).to.have.property('id').that.is.a('string').with.lengthOf(17);
  });

  it('should associate the booking with the user', () => {
    const updatedBookings = bookRoom('2023-10-03', room, bookings, user);
    const newBooking = updatedBookings.find(booking => booking.roomNumber === '103');

    expect(newBooking).to.have.property('userID').that.equals(user.id);
  });
});

describe('removeCustomerPrefix', () => {
  let input;

  beforeEach(() => {
    input = 'customer50';
  });

  it('should remove the "customer" prefix from the input', () => {
    const result = removeCustomerPrefix(input);
    expect(result).to.equal('50');
  });

  it('should return the original input if "customer" is not present', () => {
    input = 'user123'; 
    const result = removeCustomerPrefix(input);
    expect(result).to.equal('user123');
  });
});