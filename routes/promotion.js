const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

let Renderer = require('../routes/renderer');

let Promotion = require('../models/promotion');
let User = require('../models/user');

//Add Promotion Form
router.get('/add', ensureAuthenticated, function(req, res) {
  Renderer.render(req, res, 'add_promotion');
});

router.post('/add', ensureAuthenticated, function(req, res) {
  const name = req.body.name;
  const description = req.body.description;
  const type = req.body.type;
  const productID = req.body.productID;
  const getFreeProductID = req.body.getFreeProductID;
  const discountValue = req.body.discountValue;
  const isActive = req.body.isActive;
  const admin = req.user._id;
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('description', 'Description is required').notEmpty();
  req.checkBody('type', 'Type is required').notEmpty();
  req.checkBody('productID', 'Product ID is required').notEmpty();
  req.checkBody('getFreeProductID', 'Get Free Product ID is required').notEmpty();
  req.checkBody('discountValue', 'Discount Value is required').notEmpty();
  let errors = req.validationErrors();
  if (errors) {
    Renderer.render(req, res, '/')
  } else {
    let promotion = new Promotion({
      name: name,
      description: description,
      type: type,
      productID: productID,
      getFreeProductID: getFreeProductID,
      discountValue: discountValue,
      isActive: isActive,
      admin: admin
    });
    promotion.save(function(err) {
      if (err) {
        console.log(err)
        return
      } else {
        req.flash('success', 'Promotion added');
        res.redirect('/')
      }
    })
  }
});

//Load edit form
router.get('/edit/:id', ensureAuthenticated, function(req, res) {
  Promotion.findById(req.params.id, function(err, promotion) {
    if (!req.user.isAdmin) {
      req.flash('danger', 'Not authorized');
      res.redirect('/');
    } else {
      Renderer.renderWithObject(req, res, 'edit_promotion', {
        promotion: promotion
      });
    }
  });
});
router.post('/edit/:id', function(req, res) {
  const isActive = req.body.isActive;
  let errors = req.validationErrors();
  if (errors) {
    Renderer.render(req, res, 'back')
  } else {
    let promotion = {};
    promotion.isActive = isActive;
    let query = {
      _id: req.params.id
    }
    Promotion.updateOne(query, promotion, function(err) {
      if (err) {
        console.log(err)
        return
      } else {
        req.flash('success', 'Promotion updated');
        res.redirect('/product/' + req.params.id)
      }
    })
  }
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