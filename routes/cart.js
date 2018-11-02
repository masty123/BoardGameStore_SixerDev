const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');

let User = require('../models/user');
let Product = require('../models/product');

//Login Form
router.get('/', function(req, res) {
  if(req.user){
    let products = [];
    let price = 0;
    let j = 0;
    for (var i = 0 ; i < req.user.shopping_cart.length ; i++) {
        Product.findById(req.user.shopping_cart[i], function(err, product) {
          if (err) throw err;
          if (!product) {
            req.flash('warning', 'Your cart is empty');
            res.redirect('/');
          }
          else {
            products.push(product);
            price += product.price;
          }
          if(j == req.user.shopping_cart.length - 1){
            res.render('cart', {
                products: products,
                price: price
            });
          }
          j++;
        });
    }
  }
  else{
    req.flash('danger', 'Please log-in to use cart system');
    res.redirect('/account/login');
  }
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
