const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

let Product = require('../models/product');
let User = require('../models/user');

//Add Product Form
router.get('/add', ensureAuthenticated, function(req, res){
  res.render('admin');
});

router.post('/add', ensureAuthenticated, function (req, res) {
  const name        = req.body.name;
  const description = req.body.description;
  const player      = req.body.player;
  const maxPlayer   = req.body.maxPlayer;
  const picture     = req.body.picture;
  const stock       = req.body.stock;
  const price       = req.body.price;
  const category    = req.body.category;
  const admin       = req.user._id;
  const sold        = 0;
  const likes       = [];
  req.checkBody('name','Name is required').notEmpty();
  req.checkBody('description','Description is required').notEmpty();
  req.checkBody('player','Minimum players is required').notEmpty();
  req.checkBody('maxPlayer','Maximum players is required').notEmpty();
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
      maxPlayer:    maxPlayer,
      picture:      picture,
      stock:        stock,
      price:        price,
      category:     category,
      admin:        admin,
      sold:         sold,
      likes:        likes
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

//Load edit form
router.get('/edit/:id', ensureAuthenticated, function (req, res){
  Product.findById(req.params.id, function(err, product){
    if(product.admin != req.user._id){
      req.flash('danger', 'Not authorized');
      res.redirect('/');
    }
    else{
      res.render('edit_product', {
        product:product
      });
    }
  });
});
router.post('/edit/:id', function (req, res){
  const name        = req.body.name;
  const description = req.body.description;
  const player      = req.body.player;
  const maxPlayer   = req.body.maxPlayer;
  const picture     = req.body.picture;
  const stock       = req.body.stock;
  const price       = req.body.price;
  const category    = req.body.category;
  req.checkBody('name','Name is required').notEmpty();
  req.checkBody('description','Description is required').notEmpty();
  req.checkBody('player','Minimum players is required').notEmpty();
  req.checkBody('maxPlayer','Maximum players is required').notEmpty();
  req.checkBody('picture','Picture is required').notEmpty();
  req.checkBody('stock','Stock is required').notEmpty();
  req.checkBody('price','Price is required').notEmpty();
  req.checkBody('category','Category is required').notEmpty();
  let errors = req.validationErrors();
  if(errors){
    res.render('back')
  }
  else{
    let product = {};
    product.name = name;
    product.description = description;
    product.player = player;
    product.maxPlayer = maxPlayer;
    product.picture = picture;
    product.stock = stock;
    product.price = price;
    product.category = category;
    let query = {_id:req.params.id}
    Product.updateOne(query, product, function(err){
      if(err){
        console.log(err)
        return
      }else{
        req.flash('success','Product updated');
        res.redirect('/product/'+req.params.id)
      }
    })
  }
});

//Get product page
router.get('/:id', function (req, res){
  Product.findById(req.params.id, function(err, product){
    if(err){
      req.flash('danger', 'Product ID not found');
      res.redirect('/');
    }
    else{
      User.findById(product.admin, function(err, admin){
        res.render('product_detail', {
          product: product
        });
      });
    }
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
