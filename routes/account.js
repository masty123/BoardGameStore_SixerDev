const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//Bring in User model
let User = require('../models/user');

//Secret register form
router.get('/register/secretAdmin3103', function(req, res){
  res.render('register3103');
});

//Register form
router.get('/register', function(req, res){
  res.render('register');
});

//Register as Admin Process
router.post('/register/secretAdmin3103', function(req,res){
  const name      = req.body.name;
  const email     = req.body.email;
  const username  = req.body.username.toLowerCase();
  const password  = req.body.password;
  const password2 = req.body.password2;
  const address   = req.body.address;
  const secret   = req.body.secret;
  const isAdmin   = true;

  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Confirm Password is not match').equals(password);
  req.checkBody('address', 'Address is required').notEmpty();
  req.checkBody('secret', 'Secret is required').notEmpty();

  let errors = req.validationErrors();
  if(errors || secret != "This is our admin secret"){
    res.render('register3103',{
      errors:errors
    });
  }
  else{
    let newUser = new User({
      name:     name,
      email:    email,
      username: username,
      password: password,
      address:  address,
      isAdmin:  isAdmin
    });
    bcrypt.genSalt(10, function(err,salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err){
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err){
          if(err){
            console.log(error);
            return;
          }
          else{
            req.flash('success','You are now registered and can be log in with account.');
            res.redirect('/account/login');
          }
        })
      });
    });
  }
});

//Register Process
router.post('/register', function(req,res){
  const name      = req.body.name;
  const email     = req.body.email;
  const username  = req.body.username.toLowerCase();
  const password  = req.body.password;
  const password2 = req.body.password2;
  const address   = req.body.address;
  const isAdmin   = false;

  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Confirm Password is not match').equals(password);
  req.checkBody('address', 'Address is required').notEmpty();

  let errors = req.validationErrors();
  if(errors){
    res.render('register',{
      errors:errors
    });
  }
  else{
    let newUser = new User({
      name:     name,
      email:    email,
      username: username,
      password: password,
      address:  address,
      isAdmin:  isAdmin
    });
    bcrypt.genSalt(10, function(err,salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err){
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err){
          if(err){
            console.log(error);
            return;
          }
          else{
            req.flash('success','You are now registered and can be log in with account.');
            res.redirect('/account/login');
          }
        })
      });
    });
  }
});

//Login Form
router.get('/login', function(req, res){
  res.render('login');
});

//Login Process
router.post('/login', function(req, res, next){
  passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/account/login',
  })(req, res, next);
});

//Logout
router.get('/logout', function(req, res){
  req.logout();
  req.flash('success','You are logged out');
  res.redirect('/account/login');
});

module.exports = router;
