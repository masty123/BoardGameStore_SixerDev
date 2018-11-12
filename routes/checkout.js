const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const HashMap = require('hashmap');

let User = require('../models/user');
let Product = require('../models/product');
let Transaction = require('../models/transaction');

//Login Form
router.get('/', function(req, res) {
  getUserProductList(req, res, 'checkout');
});

router.post('/confirm', loggedIn, function(req, res) {
    let productMap = new HashMap();
    var shopping_cart = req.user.shopping_cart;
    var promotion_check = req.body.promotion_check;
    var promotion_code = req.body.promotion_code.trim();
    var term = req.body.term;
    if (term !== 'on') {
      req.flash('danger', 'Please check terms & conditions');
      res.redirect('/checkout');
    }
    else{
      for (var i = 0; i < shopping_cart.length; i++) {
        if (productMap.has(shopping_cart[i])) {
          productMap.set(shopping_cart[i], productMap.get(shopping_cart[i]) + 1);
        } else {
          productMap.set(shopping_cart[i], 1);
        }
      }
      let price = 0;
      let j = 0;
      if (shopping_cart.length != 0) {
        for (var k = 0; k < shopping_cart.length; k++) {
          Product.findById(shopping_cart[k], function(err, product) {
            if (err) throw err;
            else {
              price += product.price;
            }
            if (j >= req.user.shopping_cart.length - 1) {
              //Finish checkout
              if(promotion_check !== 'on'){
                //No promotion, just place an order
                let transaction = new Transaction({
                  date_ordered: Date.now(),
                  userID: req.user._id,
                  productID: req.user.shopping_cart,
                  calculatedPrice: price,
                  deliveryAddress: req.user.address + " " + req.user.address2 + " " + req.user.address3 + " " + req.user.address4 + " " + req.user.address5,
                  tel_num: req.user.tel_num,
                  isDelivered: false,
                  isCancelled: false,
                });
                placeOrder(req, res, transaction, productMap);
              }
              else {
                // TODO: Promotion goes here
                req.flash('danger', 'Promotion code is not available at the moment, please uncheck the promotion checkbox');
                res.redirect('/checkout');
              }
            }
            j++;
          })
        }
      }
      else {
        req.flash('warning', 'Your cart is empty');
        res.redirect('/');
      }
    }
});

function getUserProductList(req, res, render_layout) {
  if (req.user) {
    let products = [];
    let price = 0;
    let j = 0;
    if (req.user.shopping_cart.length != 0) {
      for (var i = 0; i < req.user.shopping_cart.length; i++) {
        Product.findById(req.user.shopping_cart[i], function(err, product) {
          if (err) throw err;
          else {
            products.push(product);
            price += product.price;
          }
          if (j == req.user.shopping_cart.length - 1) {
            res.render(render_layout, {
              products: products,
              price: price
            });
          }
          j++;
        });
      }
    } else {
      req.flash('warning', 'Your cart is empty');
      res.redirect('/');
    }
  } else {
    req.flash('danger', 'Please log-in to use cart system');
    res.redirect('/account/login');
  }
}

function placeOrder(req, res, transaction, productMap){
  transaction.save(function(err) {
    if (err) {
      req.flash('danger', err);
      res.redirect('back');
    } else {
      //Clear shopping cart
      let tempUser = {};
      tempUser.shopping_cart = [];
      let query = {
        _id: req.user._id
      }
      User.updateOne(query, tempUser, function(err) {
        if (err) {
          req.flash('danger', err);
          res.redirect('back');
        } else {
          removeProducts(req, res, productMap);
          req.flash('success', 'Placed your order into the queue');
          res.redirect('/');
        }
      });
    }
  })
}

function removeProducts(req, res, productMap){
  productMap.forEach(function(value, key){
    Product.findById(key, function(err, product) {
      let tempProduct = {};
      tempProduct.stock = product.stock - value;
      let query = {
        _id: key
      }
      Product.updateOne(query, tempProduct, function(err) {
        if (err) {
          console.log("error removing " + value + key + " from stock");
        } else {
          console.log("customer bought " + key + " | " + tempProduct.stock + " left");
        }
      });
    });
  });
}

//Logged in
function loggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/account/login');
  }
}

module.exports = router;
