const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

let User = require('../models/user');
let Contact = require('../models/contact');

router.get('/', function(req, res){
  res.redirect('/');
});

//Render about page
router.get('/about', function(req, res){
  res.render('about');
});

//Contact page
router.get('/contact', function(req, res){
  if(req.user){
    res.render('contact',{
      user: req.user
    });
  }
  else {
    res.render('contact');
  }
});
router.post('/contact', loggedIn, function(req,res){
  const name = req.user.name;
  const email = req.user.email;
  const subject = req.body.subject;
  const message = req.body.message;
  req.checkBody('subject', 'Subject is required').notEmpty();
  req.checkBody('message', 'Message is required').notEmpty();
  let errors = req.validationErrors();
  if (errors) {
    req.flash('danger', errors);
    res.redirect('/page/contact');
  } else {
    let contact = new Contact({
      name: name,
      email: email,
      subject: subject,
      message: message
    });
    contact.save(function(err) {
      if (err) {
        console.log(err)
        return
      } else {
        req.flash('success', 'Message sent');
        res.redirect('/')
      }
    })
  }
});

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

module.exports = router;
