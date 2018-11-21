const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');
const HashMap = require('hashmap');

let Renderer = require('../routes/renderer');

let User = require('../models/user');
let Product = require('../models/product');

//Shopping Cart
router.get('/', loggedIn, function(req, res) {
  let productMap = getProductQuantityMap(req, res);
  let products = [];
  let outdated = [];
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
        if (product.stock < productMap.get("" + product._id)) {
          var errorString = 'You ordered ' + productMap.get("" + product._id) + ' "' + product.name + '", but there is/are only ' + product.stock + ' in the stock, please remove it before proceeding to check out';
          if (!outdated.includes(errorString)) {
            outdated.push(errorString);
          }
        }
        if (j == req.user.shopping_cart.length - 1) {
          if (outdated.length != 0) {
            Renderer.renderWithObject(req, res, 'cart', {
              products: products,
              price: price,
              outdated: outdated
            });
          } else {
            Renderer.renderWithObject(req, res, 'cart', {
              products: products,
              price: price,
            });
          }
        }
        j++;
      });
    }
  } else {
    req.flash('warning', 'Your cart is empty');
    res.redirect('/');
  }
});

router.get('/remove/:id', loggedIn, function(req, res) {
  removeItem(req, res, req.params.id);
});

router.get('/add/:id', loggedIn, function(req, res) {
  var productMap = getProductQuantityMap(req, res);
  Product.findById(req.params.id, function(err, product) {
    if (err || !product) {
      req.flash('danger', 'Product ID not found');
      res.redirect('back');
    } else if (product.stock <= 0) {
      req.flash('danger', 'Sorry! This product is out of order');
      res.redirect('back');
    } else if (productMap.get(req.params.id) >= product.stock) {
      req.flash('danger', 'The order quantity exceed the stock amount, cannot order more of this product');
      res.redirect('back');
    } else {
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
  });
});

function getProductQuantityMap(req, res) {
  let productMap = new HashMap();
  var shopping_cart = req.user.shopping_cart;
  for (var i = 0; i < shopping_cart.length; i++) {
    if (productMap.has(shopping_cart[i])) {
      productMap.set(shopping_cart[i], productMap.get(shopping_cart[i]) + 1);
    } else {
      productMap.set(shopping_cart[i], 1);
    }
  }
  return productMap;
}

//Logged in
function loggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('danger', 'Please login to use shopping cart system');
    res.redirect('/account/login');
  }
}

//This one isn't working yet
function anyProductExceedStock(req, res) {
  var productMap = getProductQuantityMap(req, res);
  var exceedProductsName = [];
  var shopping_cart = req.user.shopping_cart;
  for (var k = 0; k < shopping_cart.length; k++) {
    Product.findById(req.user.shopping_cart[k], function(err, product) {
      if (err) throw err;
      else if (!product) {
        req.flash('danger', ' Product ID ' + req.user.shopping_cart[k] + ' not found. ');
      } else {
        if (productMap.get(product._id) > product.stock) {
          return true;
        }
      }
    })
  }
  return false;
}

function removeItem(req, res, id) {
  Product.findById(id, function(err, product) {
    if (err || !product) {
      req.flash('danger', 'Product ID not found');
      res.redirect('/');
    } else {
      let tempUser = {};
      tempUser.shopping_cart = req.user.shopping_cart;
      tempUser.shopping_cart.splice(tempUser.shopping_cart.indexOf(req.params.id), 1);
      let query = {
        _id: req.user._id
      }
      User.updateOne(query, tempUser, function(err) {
        if (err) {
          req.flash('danger', err);
          res.redirect('/');
        } else {
          // req.flash('success', 'removed 1 item from your cart');
          res.redirect('back');
        }
      })
    }
  });
}

module.exports = router;
