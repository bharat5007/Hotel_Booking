const express = require('express');
const router = express.Router();
const usermodel = require('../models/usermodel');
const bcrypt = require("bcryptjs");
const generateToken=require("../config/generatetokens");

router.post('/login', async (req, res) => {
    const user = req.body;
    try {
      const x = await usermodel.getuserbyemail(user.email);
      if (!x) {
        return res.status(404).json({ error: 'Email id does not not found' });
      }

      const iscorrectpassword = await bcrypt.compare(user.password, x.password);
      if(!iscorrectpassword) return res.status(400).json({msg: "Incorrect Password"});
      return res.status(200).json({
        _id: x.user_id,
        name: x.name,
        gmail: x.email,
        userid: x.id,
        token: generateToken(x._id),
    })

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

  router.post('/signup', async (req, res) => {
    try {
        const user = req.body;
        
        const salt = await bcrypt.genSalt(8);
        user.password = await bcrypt.hash(user.password, salt);
        
      const result = await usermodel.adduser(user);
      if(result===-1) res.status(400).send("User already exists");

      return res.status(200).json({
        _id: result._id,
        name: result.name,
        gmail: result.email,
        userid: result.userid,
        token: generateToken(result._id),
    })
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  module.exports = router;