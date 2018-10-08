const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//Login Form
router.get('/', function(req, res){
  res.render('wishlist');
});

module.exports = router;
