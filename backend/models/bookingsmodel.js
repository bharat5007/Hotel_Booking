const mysql = require('mysql2/promise');
const connectDB = require('../config/db'); // Your DB connection function

async function bookRooms(userId, numberofrooms, hotelId, startdate, enddate) {
  const connection = await connectDB();

  try {
    await connection.beginTransaction();
    // console.log(userId);
    // console.log(numberofrooms);
    // console.log(hotelId);
    // console.log(startdate);
    // console.log(enddate);

    // Fetch and lock the required number of available rooms
    const [availableRooms] = await connection.execute(
      `SELECT r.room_id
       FROM rooms r
       LEFT JOIN bookings b ON r.room_id = b.room_id 
           AND (b.start_date <= ? AND b.end_date >= ?)
       WHERE r.hotel_id = ? AND b.booking_id IS NULL
       LIMIT ? FOR UPDATE`,
      [enddate, startdate, hotelId, numberofrooms]
    );

    console.log(availableRooms)

    if (availableRooms.length < numberofrooms) {
      throw new Error('Not enough available rooms for the given date range');
    }

    // Proceed with the booking
    for (const room of availableRooms) {
      // console.log(room);
      await connection.execute(
        'INSERT INTO bookings (start_date, user_id, room_id, end_date) VALUES (?, ?, ?, ?)',
        [startdate, userId, room.room_id, enddate]
      );
    }

    await connection.commit();
    console.log('Rooms booked successfully');
    return { success: true, message: 'Rooms booked successfully' };
  } catch (error) {
    await connection.rollback();
    console.error('Error booking rooms:', error);
    return { success: false, message: error.message };
  } finally {
    await connection.end();
  }
}

module.exports = bookRooms;
