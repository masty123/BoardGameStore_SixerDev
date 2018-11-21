const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

let Renderer = require('../routes/renderer');

//Wishlist
router.get('/', function(req, res){
  Renderer.render(req, res, 'wishlist');
});

module.exports = router;
