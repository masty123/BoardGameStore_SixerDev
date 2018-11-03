const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

let User = require('../models/user');
let Product = require('../models/product');

//Login Form
router.get('/', function(req, res) {
  if(req.user){
    let products = [];
    let price = 0;
    let j = 0;
    if(req.user.shopping_cart.length != 0){
      for (var i = 0 ; i < req.user.shopping_cart.length ; i++) {
          Product.findById(req.user.shopping_cart[i], function(err, product) {
            if (err) throw err;
            else {
              products.push(product);
              price += product.price;
            }
            if(j == req.user.shopping_cart.length - 1){
              res.render('checkout', {
                  products: products,
                  price: price
              });
            }
            j++;
          });
      }
    }
    else {
      req.flash('warning', 'Your cart is empty');
      res.redirect('/');
    }
  }
  else{
    req.flash('danger', 'Please log-in to use cart system');
    res.redirect('/account/login');
  }
});

router.post('/finish', function(req, res) {
  if(req.user){
    let products = [];
    let price = 0;
    let j = 0;
    if(req.user.shopping_cart.length != 0){
      for (var i = 0 ; i < req.user.shopping_cart.length ; i++) {
          Product.findById(req.user.shopping_cart[i], function(err, product) {
            if (err) throw err;
            else {
              products.push(product);
              price += product.price;
            }
            if(j == req.user.shopping_cart.length - 1){
              // res.render('checkout', {
              //     products: products,
              //     price: price
              // });
            }
            j++;
          });
      }
    }
    else {
      req.flash('warning', 'Your cart is empty');
      res.redirect('/');
    }
  }
  else{
    req.flash('danger', 'Please log-in to use cart system');
    res.redirect('/account/login');
  }
});

module.exports = router;
