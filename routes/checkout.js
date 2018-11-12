const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

let User = require('../models/user');
let Product = require('../models/product');
let Transaction = require('../models/transaction');

//Login Form
router.get('/', function(req, res) {
  getUserProductList(req, res, 'checkout');
});

router.post('/confirm', function(req, res) {
  if (req.user) {
    let price = 0;
    let j = 0;
    const promotion_check = req.body.promotion_check;
    const promotion_code = req.body.promotion_code.trim();
    const term = req.body.term;
    if (req.user.shopping_cart.length != 0) {
      for (var i = 0; i < req.user.shopping_cart.length; i++) {
        Product.findById(req.user.shopping_cart[i], function(err, product) {
          if (err) throw err;
          else {
            price += product.price;
            if (term === 'on') {
              removeProduct(product._id);
            }
          }
          if (j == req.user.shopping_cart.length - 1) {
            //Finish checkout
            if (term !== 'on') {
              req.flash('danger', 'Please check terms & conditions');
              res.redirect('/checkout');
            } else if (promotion_check !== 'on') {
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
              transaction.save(function(err) {
                if (err) {
                  console.log(err)
                  return
                } else {
                  //Clear shopping cart
                  let tempUser = {};
                  tempUser.shopping_cart = [];
                  let query2 = {
                    _id: req.user._id
                  }
                  User.updateOne(query2, tempUser, function(err) {
                    if (err) {
                      req.flash('danger', err);
                      res.redirect('back');
                    } else {
                      req.flash('success', 'Placed your order into the queue');
                      res.redirect('/');
                    }
                  });
                }
              })
            } else {
              // TODO: Promotion system goes here
              req.flash('danger', 'Promotion code is not available at the moment, please uncheck the promotion checkbox');
              res.redirect('/checkout')
            }
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

function removeProduct(productID) {
  Product.findById(productID, function(err, product) {
    let tempProduct = {};
    tempProduct.stock = product.stock - 1;
    let query = {
      _id: productID
    }
    Product.updateOne(query, tempProduct, function(err) {
      if (err) {
        console.log("error removing 1 " + productID + " from stock");
      } else {
        console.log("customer bought " + productID + " | " + (tempProduct.stock) + " left")
      }
    });
  });
}

module.exports = router;
