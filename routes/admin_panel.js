const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

let Product = require('../models/product');
let Transaction = require('../models/transaction');
let User = require('../models/user');

//Panel
router.get('/', ensureAuthenticated, function(req, res) {
  Product.find({}, function(err, products) {
    Transaction.find({}, function(err2, transactions) {
      User.find({}, function(err3, users) {
        res.render('admin_panel', {
          products: products,
          transactions: transactions,
          users: users
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

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> origin/master
