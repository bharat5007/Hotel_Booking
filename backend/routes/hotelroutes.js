const express = require('express');
const router = express.Router();
const hotelmodel = require('../models/hotelmodel');

function intersectHotels(hotels1, hotels2) {
  const hotelMap = new Map();
  hotels1.forEach(hotel => {
    hotelMap.set(hotel.hotelId, hotel);
  });

  const intersectedHotels = hotels2.filter(hotel => hotelMap.has(hotel.hotelId));
  return intersectedHotels;
}

router.get('/hotels', async (req, res) => {
  const { location, name, minPrice, maxPrice, startDate, endDate } = req.query;
  
  try {
    let hotels = [];

    if (location) {
      hotels = await hotelmodel.gethotelbylocation(location, startDate, endDate);
    }

    if (name) {
      const filteredByName = await hotelmodel.gethotelbyname(name, startDate, endDate);
      hotels = hotels.length > 0 ? intersectHotels(hotels, filteredByName) : filteredByName;
    }

    if (minPrice && maxPrice) {
      const filteredByPrice = await hotelmodel.gethotelbyprice(minPrice, maxPrice, startDate, endDate);
      hotels = hotels.length > 0 ? intersectHotels(hotels, filteredByPrice) : filteredByPrice;
    }

    if (!location && !name && !(minPrice && maxPrice)) {
      hotels = await hotelmodel.getallhotels(startDate, endDate);
    }

    return res.status(200).send(hotels);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/hotel', async(req,res)=>{
  const { id, startDate, endDate } = req.query;
  const hotel=await hotelmodel.gethotel(id, startDate, endDate);
  // console.log(hotel);
  return res.status(200).send(hotel);
})
  
  router.post('/add', async (req, res) => {
    try {
        const user = req.body;
        
      const result = await hotelmodel.addhotel(user);

      return res.status(200).json({
        _id: result.id,
        name: result.name,
        location: result.location,
        price: result.price,
    })
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  module.exports = router;