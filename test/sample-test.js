import chai from 'chai';
import { findBookings } from '../src/user-functions';
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