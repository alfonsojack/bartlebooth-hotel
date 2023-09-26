import chai from 'chai';
import { findBookings, calculateSpending, removeCustomerPrefix, getUser, handleLogin, formatDate } from '../src/user-functions';
import { checkAvailability, filterByRoomType, bookRoom, reformatDate } from '../src/booking-functions';
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
      { id: 1, userID: 1, roomNumber: 101, date: '2021/03/23' },
      { id: 2, userID: 1, roomNumber: 102, date: '2021/03/22' },
    ];
    rooms = [
      { number: 101, costPerNight: 100.00 },
      { number: 102, costPerNight: 150.00 },
    ];
  });

  it('should calculate the total spending for a user', () => {
    const totalSpending = calculateSpending(user, bookings, rooms);
    expect(totalSpending).to.equal('250');
  });

  it('should return 0.00 if the user has no bookings', () => {
    user = { id: 2 };
    const totalSpending = calculateSpending(user, bookings, rooms);
    expect(totalSpending).to.equal('0');
  });

  it('should return 0 if there are no matching rooms for the bookings', () => {
    bookings[0].roomNumber = 103;
    bookings[1].roomNumber = 104;
    const totalSpending = calculateSpending(user, bookings, rooms);
    expect(totalSpending).to.equal('0');
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


describe('bookRoom function', () => {
  let bookings;
  let user;

  beforeEach(() => {
    bookings = [];
    user = { id: '1' };
  });

  it('should add a new booking to the bookings array', () => {
    const date = '2023/09/25';
    const room = 101;

    const newBooking = bookRoom(date, room, bookings, user);

    expect(bookings.length).to.equal(1);
    expect(bookings[0]).to.equal(newBooking);
  });

  it('should return the newly booked room', () => {
    const date = '2023/09/25';
    const room = 102;

    const newBooking = bookRoom(date, room, bookings, user);

    expect(newBooking['userID']).to.equal(user['id']);
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

describe('getUser', () => {
  let users;

  beforeEach(() => {
    users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ];
  });

  it('should return the user with the specified ID', () => {
    const userID = '2';
    const user = getUser(userID, users);
    expect(user).to.deep.equal({ id: 2, name: 'Bob' });
  });

  it('should return undefined if the user with the specified ID is not found', () => {
    const userID = 4;
    const user = getUser(userID, users);
    expect(user).to.equal(undefined);
  });
});

describe('handleLogin', () => {
  let users;

  beforeEach(() => {
    users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ];
  });

  it('should return the user object when valid username and password are provided', () => {
    const username = 'customer1';
    const password = 'overlook2021';
    const result = handleLogin(username, password, users);
    expect(result).to.deep.equal({ id: 1, name: 'Alice' });
  });

  it('should return "Invalid username or password" when an invalid password is provided', () => {
    const username = 'customer2';
    const password = 'incorrectPassword';
    const result = handleLogin(username, password, users);
    expect(result).to.equal('Invalid username or password');
  });

  it('should return "Invalid username or password" when an invalid username is provided', () => {
    const username = 'nonExistentUser';
    const password = 'overlook2021';
    const result = handleLogin(username, password, users);
    expect(result).to.equal('Invalid username or password');
  });
});


describe('formatDate function', () => {
  let inputDate;

  beforeEach(() => {
    inputDate = '2023/09/23';
  });

  it('should format a valid date correctly', () => {
    const result = formatDate(inputDate);
    expect(result).to.equal('September 23, 2023');
  });

  it('should return "Invalid date format" for an invalid date', () => {
    inputDate = 'invalidDate';
    const result = formatDate(inputDate);
    expect(result).to.equal('Invalid date format');
  });
});

describe('reformatDate function', () => {
  it('should replace hyphens with forward slashes in a date string', () => {
    const inputDate = '2023-09-23';
    const expectedOutput = '2023/09/23';

    const result = reformatDate(inputDate);

    expect(result).to.equal(expectedOutput);
  });

  it('should not change the date string if it contains no hyphens', () => {
    const inputDate = '2023/09/23'; 
    const expectedOutput = '2023/09/23';

    const result = reformatDate(inputDate);

    expect(result).to.equal(expectedOutput);
  });

  it('should handle multiple hyphens in the date string', () => {
    const inputDate = '2023-09-23-12-30';
    const expectedOutput = '2023/09/23/12/30';

    const result = reformatDate(inputDate);

    expect(result).to.equal(expectedOutput);
  });
});