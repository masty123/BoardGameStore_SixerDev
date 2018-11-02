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
    if(req.user.shopping_cart.length != 0){
      for (var i = 0 ; i < req.user.shopping_cart.length ; i++) {
          Product.findById(req.user.shopping_cart[i], function(err, product) {
            if (err) throw err;
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

router.get('/remove/:id', function(req, res) {
  Product.findById(req.params.id, function(err, product){
    if(err){
      req.flash('danger', 'Product ID not found');
      res.redirect('/');
    }
    else if (req.user) {
      let tempUser = {};
      tempUser.shopping_cart = req.user.shopping_cart;
      tempUser.shopping_cart.splice( tempUser.shopping_cart.indexOf(req.params.id), 1 );
      let query = {
        _id: req.user._id
      }
      User.updateOne(query, tempUser, function(err) {
        if (err) {
          req.flash('danger', err);
          res.redirect('/');
        } else {
          // req.flash('success', 'removed 1 item from your cart');
          res.redirect('/cart/');
        }
      })
    }
    else{
      req.flash('danger', 'Please log-in to use cart system');
      res.redirect('/account/login');
    }
  });
});

router.get('/add/:id', function(req, res) {
  Product.findById(req.params.id, function(err, product){
    if(err){
      req.flash('danger', 'Product ID not found');
      res.redirect('back');
    }
    else if (product.stock <= 0){
      req.flash('danger', 'Sorry! This product is out of order');
      res.redirect('back');
    }
    else if (req.user) {
      let tempUser = {};
      tempUser.shopping_cart = req.user.shopping_cart;
      tempUser.shopping_cart.push(req.params.id);
      let query = {
        _id: req.user._id
      }
      User.updateOne(query, tempUser, function(err) {
        if (err) {
          req.flash('danger', err);
          res.redirect('back');
        } else {
          req.flash('success', 'Added 1 item to your cart');
          res.redirect('back');
        }
      });
    }
    else{
      req.flash('danger', 'Please log-in to add items to cart');
      res.redirect('/account/login');
    }
  });
});

module.exports = router;
