const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
//const flash = require('req-flash');

//Bring in User model
let User = require('../models/user');

//Secret register form
router.get('/register/secretAdmin3103', ensureUnauthenticated, function(req, res) {
  res.render('register3103');
});

//Register form
router.get('/register', ensureUnauthenticated, function(req, res) {
  res.render('register');
});

//Register as Admin Process
router.post('/register/secretAdmin3103', function(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username.toLowerCase();
  const password = req.body.password;
  const password2 = req.body.password2;
  const address = req.body.address;
  const secret = req.body.secret;
  const isAdmin = true;
  const history = [];
  const shopping_cart = [];
  const wishlist = [];

  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Confirm Password is not match').equals(password);
  req.checkBody('address', 'Address is required').notEmpty();
  req.checkBody('secret', 'Secret is not correct, register as admin failed').equals("This is our admin secret");

  let errors = req.validationErrors();
  if (errors) {
    res.render('register3103', {
      errors: errors
    });
  } else {
    let query = {
      username: username.toLowerCase()
    };
    User.findOne(query, function(err, user) {
      if (err) throw err;
      if (!user) {
        let query2 = {
          email: email
        };
        User.findOne(query2, function(err2, user2) {
          if (err2) throw err2;
          if (!user2) {
            let newUser = new User({
              name: name,
              email: email,
              username: username,
              password: password,
              address: address,
              isAdmin: isAdmin,
              history: history,
              shopping_cart: shopping_cart,
              wishlist: wishlist
            });
            bcrypt.genSalt(10, function(err, salt) {
              bcrypt.hash(newUser.password, salt, function(err, hash) {
                if (err) {
                  console.log(err);
                }
                newUser.password = hash;
                newUser.save(function(err) {
                  if (err) {
                    console.log(err);
                    return;
                  } else {
                    req.flash('success', 'You are now registered and can be log in with account.');
                    res.redirect('/account/login');
                  }
                })
              });
            });
          } else {
            req.flash('danger', 'Email already exist.');
            res.redirect('/account/register');
          }
        })
      } else {
        req.flash('danger', 'Username already exist.');
        res.redirect('/account/register');
      }
    });
  }
});

//Register Process
router.post('/register', function(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username.toLowerCase();
  const password = req.body.password;
  const password2 = req.body.password2;
  const address = req.body.address;
  const isAdmin = false;
  const history = [];
  const shopping_cart = [];
  const wishlist = [];

  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Confirm Password is not match').equals(password);
  req.checkBody('address', 'Address is required').notEmpty();

  let errors = req.validationErrors();
  if (errors) {
    res.render('register', {
      errors: errors
    });
  } else {
    let query = {
      username: username.toLowerCase()
    };
    User.findOne(query, function(err, user) {
      if (err) throw err;
      if (!user) {
        let query2 = {
          email: email
        };
        User.findOne(query2, function(err2, user2) {
          if (err2) throw err2;
          if (!user2) {
            let newUser = new User({
              name: name,
              email: email,
              username: username,
              password: password,
              address: address,
              isAdmin: isAdmin,
              history: history,
              shopping_cart: shopping_cart,
              wishlist: wishlist
            });
            bcrypt.genSalt(10, function(err, salt) {
              bcrypt.hash(newUser.password, salt, function(err, hash) {
                if (err) {
                  console.log(err);
                }
                newUser.password = hash;
                newUser.save(function(err) {
                  if (err) {
                    console.log(err);
                    return;
                  } else {
                    req.flash('success', 'You are now registered and can be log in with account.');
                    res.redirect('/account/login');
                  }
                })
              });
            });
          } else {
            req.flash('danger', 'Email already exist.');
            res.redirect('/account/register');
          }
        })
      } else {
        req.flash('danger', 'Username already exist.');
        res.redirect('/account/register');
      }
    });
  }
});

//Login Form
router.get('/login', ensureUnauthenticated, function(req, res) {
  res.render('login');
});

//Login Process
router.post('/login', function(req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/account/login',
    failureFlash: true
  })(req, res, next);
});

//Logout
router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/account/login');
});

//Access control
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    if(req.user.isAdmin){
      return next();
    }else{
      req.flash('danger', 'Please login as admin account');
      res.redirect('/account/login');
    }
  }
  else{
    req.flash('danger', 'Please login');
    res.redirect('/account/login');
  }
}

//Access control
function ensureUnauthenticated(req, res, next){
  if(!req.isAuthenticated()){
    return next();
  }
  else{
    req.flash('danger', 'You are already logged in');
    res.redirect('/');
  }
}

module.exports = router;
