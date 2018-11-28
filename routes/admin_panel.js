const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

let Renderer = require('../routes/renderer');

let Product = require('../models/product');
let Transaction = require('../models/transaction');
let User = require('../models/user');
let Promotion = require('../models/promotion');
let Contact = require('../models/contact');

//Panel
router.get('/', ensureAuthenticated, function(req, res) {
  Product.find({}, function(err, products) {
    Transaction.find({}, function(err2, transactions) {
      User.find({}, function(err3, users) {
        Promotion.find({}, function(err4, promotions){
          Contact.find({}, function(err5, contacts){
            Renderer.renderWithObject(req, res, 'admin_panel', {
              products: products,
              transactions: transactions,
              users: users,
              promotions: promotions,
              contacts: contacts
            });
          });
        });
      });
    });
  });
});

//Access control
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.isAdmin) {
      return next();
    } else {
      req.flash('danger', 'Please login as admin account');
      res.redirect('/account/login');
    }
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/account/login');
  }
}

module.exports = router;
