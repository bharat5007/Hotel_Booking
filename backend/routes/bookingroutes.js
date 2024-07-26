const express = require('express');
const router = express.Router();
const bookRoom = require('../models/bookingsmodel'); // The function defined above

router.post('/', async (req, res) => {
  console.log(req.body);
  const { userId, numberofrooms, hotelId, startdate, enddate} = req.body;

  try {
    const result = await bookRoom(userId, numberofrooms, hotelId, startdate, enddate);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;