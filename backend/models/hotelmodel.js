const connectDB=require("../config/db");

  async function getUnbookedRooms(hotelId, x, y) {
    console.log(x);
    console.log(y);
    const connection = await connectDB();
    // console.log(startDate)
    // console.log(endDate)
    // const b= await connection.execute('SELECT * FROM bookings')
    // console.log(b);
    // const a= await connection.execute('SELECT * FROM rooms LEFT JOIN bookings ON rooms.room_id = bookings.room_id')
    // console.log(a);
    const [rows] = await connection.execute(
      `SELECT COUNT(r.room_id) AS unbooked_rooms
       FROM rooms r
       LEFT JOIN bookings b ON r.room_id = b.room_id 
           AND (b.start_date <= ? AND b.end_date >= ?)
       WHERE r.hotel_id = ? AND b.booking_id IS NULL`,
      [y, x, hotelId]
    );
    // console.log(rows[0].unbooked_rooms)
    await connection.end();
    return rows[0].unbooked_rooms;
  }
  

async function hotelwithrooms(rows,x,y){
  // console.log(rows);
    const hotelInfo = [];
  
      for (let i = 0; i < rows.length; i++) {
        const hotelId = rows[i].hotel_id;
        const unbookedRooms = await getUnbookedRooms(hotelId, x, y);
        // console.log(`Hotel ID ${hotelId}: ${unbookedRooms} unbooked rooms`);
        hotelInfo.push({
            hotelId: hotelId,
            name: rows[i].name,
            location: rows[i].location,
            price: rows[i].price,
            unbookedRooms: unbookedRooms,
            image_link: rows[i].image_link
          });
      }

      // console.log(hotelInfo);
  
      return hotelInfo;
}

async function gethotelbylocation(location,x,y) {
    const connection = await connectDB();
    const [rows] = await connection.query('SELECT * FROM hotels WHERE location = ?', [location]);
    await connection.end();
    return hotelwithrooms(rows,x,y);
  }

async function gethotelbyname(name,x,y) {
    const connection = await connectDB();
    const [rows] = await connection.query('SELECT * FROM hotels WHERE name = ?', [name]);
    await connection.end();
    return hotelwithrooms(rows,x,y);
  }

  async function gethotelbyprice(pricel, priceh, x, y) {
    const connection = await connectDB();
    try {
        const [rows] = await connection.query('SELECT * FROM hotels WHERE price BETWEEN ? AND ?', [pricel, priceh]);
        const hotelInfo = await hotelwithrooms(rows, x, y); // Properly await the hotelwithrooms function
        return hotelInfo; // Return the hotelInfo
    } catch (error) {
        console.error('Error fetching hotels by price:', error);
        throw error;
    } finally {
        await connection.end();
    }
}

  async function getallhotels(x,y) {
    const connection = await connectDB();
    try {
      const [rows] = await connection.execute('SELECT * FROM hotels');
      return hotelwithrooms(rows,x,y);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      throw error;
    } finally {
      await connection.end();
    }
  }

  async function gethotel(id,x,y){
    const connection =await connectDB();
    try{
      const [rows]=await connection.execute('SELECT * from hotels WHERE hotel_id = ?',[id]);
      await connection.end();
      const a=hotelwithrooms(rows,x,y);
      // console.log(a);
      return a;
    } catch (error) {
      console.error('Error fetching hotels:', error);
      throw error;
    } 
  }
  
  async function addhotel(hotel) {
    const connection = await connectDB();
    const result = await connection.query('INSERT INTO hotels (location, name, price, image_link) VALUES (?, ?, ?, ?)', [hotel.location, hotel.name, hotel.price, hotel.image_link]);
    const hotelId = result[0].insertId;
    for (let i = 1; i <= hotel.rooms; i++) {
        const x = await connection.query('INSERT INTO rooms (hotel_id, room_no) VALUES (?, ?)', [hotelId, i]);
    }
    await connection.end();
    return { id: hotelId, ...hotel };
  }
  
module.exports={
    gethotelbylocation,
    gethotelbyname,
    gethotelbyprice,
    getallhotels,
    addhotel,
    gethotel,
}