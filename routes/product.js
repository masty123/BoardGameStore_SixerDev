const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

let Product = require('../models/product');
let User = require('../models/user');

//Add Product Form
router.get('/add', function(req, res){
  res.render('admin');
});

router.post('/add', ensureAuthenticated, function (req, res) {
  const name        = req.body.name;
  const description = req.body.description;
  const player      = req.body.player;
  const picture     = req.body.picture;
  const stock       = req.body.stock;
  const price       = req.body.price;
  const category    = req.body.category;
  const admin       = req.user._id;

  req.checkBody('name','Name is required').notEmpty();
  req.checkBody('description','Description is required').notEmpty();
  req.checkBody('player','Player is required').notEmpty();
  req.checkBody('picture','Picture is required').notEmpty();
  req.checkBody('stock','Stock is required').notEmpty();
  req.checkBody('price','Price is required').notEmpty();
  req.checkBody('category','Category is required').notEmpty();
  let errors = req.validationErrors();
  if(errors){
    res.render('/')
  }
  else{
    let product = new Product({
      name:         name,
      description:  description,
      player:       player,
      picture:      picture,
      stock:        stock,
      price:        price,
      category:     category,
      admin:        admin
    });
    product.save(function(err){
      if(err){
        console.log(err)
        return
      }else{
        req.flash('success','Product added');
        res.redirect('/')
      }
    })
  }
});

//Get product page
router.get('/:id', function (req, res){
  Product.findById(req.params.id, function(err, product){
    User.findById(product.admin, function(err, admin){
      res.render('product_detail', {
        product:product,
        admin:admin.name
      });
    });
  });
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

module.exports = router;
