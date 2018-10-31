const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

let User = require('../models/user');

//Login Form
router.get('/', function(req, res) {
  res.render('cart', {
    items: req.user.shopping_cart
  });
});

router.post('/add/:id', function(req, res) {
  if (req.user) {
    let tempUser = {};
    tempUser.shopping_cart = req.user.shopping_cart;
    tempUser.shopping_cart.push(req.params.id);
    let query = {
      _id: req.user._id
    }
    User.update(query, tempUser, function(err) {
      if (err) {
        req.flash('danger', err);
        res.redirect('/product/'+req.params.id);
      } else {
        req.flash('success', 'Added 1 item to your cart');
        res.redirect('/product/'+req.params.id);
      }
    })
  }
  else{
    req.flash('danger', 'Please log-in to add items to cart');
    res.redirect('/account/login');
  }
});

module.exports = router;
