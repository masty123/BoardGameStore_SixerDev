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
  if(req.body.secret === 'This is our admin secret'){
    regis(req, res, true);
  }
  else {
    req.flash('danger', 'You are not one of our admins. Go away!');
    res.redirect('back');
  }
});

//Register Process
router.post('/register', function(req, res) {
  regis(req, res, false);
});

function regis(req, res, adminBoolean){
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username.toLowerCase();
  const password = req.body.password;
  const password2 = req.body.password2;
  const address = req.body.address;
  const address2 = req.body.address2;
  const address3 = req.body.address3;
  const address4 = req.body.address4;
  // const address5 = req.body.address5;
  const address5 = "Thailand";
  const tel_num = req.body.tel_num;
  const isAdmin = adminBoolean;
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
  req.checkBody('address2', 'District is required').notEmpty();
  req.checkBody('address3', 'Province is required').notEmpty();
  req.checkBody('address4', 'Postal Code is required').notEmpty();
  // req.checkBody('address5', 'Country is required').notEmpty();
  req.checkBody('tel_num', 'Telephone number is required').notEmpty();
  let errors = req.validationErrors();
  if (errors) {
    res.render('register', {
      errors: errors
    });
  }
  else {
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
              address2: address2,
              address3: address3,
              address4: address4,
              address5: address5,
              isAdmin: isAdmin,
              history: history,
              shopping_cart: shopping_cart,
              wishlist: wishlist,
              tel_num: tel_num
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
                    req.flash('success', 'You are now registered and can be log in with this account.');
                    res.redirect('/account/login');
                  }
                })
              });
            });
          } else {
            req.flash('danger', 'Email already exist.');
            res.redirect('back');
          }
        })
      } else {
        req.flash('danger', 'Username already exist.');
        res.redirect('back');
      }
    });
  }
}

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

//Edit address
router.get('/edit_address', loggedIn, function(req, res) {
  res.render('edit_address',{
    user: req.user
  });
});
router.post('/edit_address', function (req, res){
  const address  = req.body.address;
  const address2 = req.body.address2;
  const address3 = req.body.address3;
  const address4 = req.body.address4;
  // const address5        = req.body.address5;
  const tel_num  = req.body.tel_num;
  req.checkBody('address', 'Address is required').notEmpty();
  req.checkBody('address2', 'District is required').notEmpty();
  req.checkBody('address3', 'Province is required').notEmpty();
  req.checkBody('address4', 'Postal Code is required').notEmpty();
  // req.checkBody('address5', 'Country is required').notEmpty();
  req.checkBody('tel_num', 'Telephone number is required').notEmpty();
  let errors = req.validationErrors();
  if(errors){
    res.render('back')
  }
  else{
    let user = {};
    user.address = address;
    user.address2 = address2;
    user.address3 = address3;
    user.address4 = address4;
    // user.address5 = address5;
    user.address5 = 'Thailand';
    user.tel_num = tel_num;
    let query = {_id:req.user._id};
    User.updateOne(query, user, function(err){
      if(err){
        console.log(err)
        return
      }else{
        // req.flash('success','Address updated');
        res.redirect('/checkout');
      }
    })
  }
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

//Logged in
function loggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
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
