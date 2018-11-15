const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

let Product = require('../models/product');

//Browser
router.get('/', function(req, res){
  Product.find({}, function(err, products){
    res.render('browse',{
      title: "Shop All",
      products: products
    });
  });
});

//Browser
router.get('/:category', function(req, res){
  var query = {
    category: { $regex : new RegExp(req.params.category, "i") }
  }
  Product.find(query, function(err, products){
    res.render('browse',{
      title: req.params.category,
      products: products
    });
  });
});

//Browser
router.get('/:category/:sort', function(req, res){
  var query = {
    category: { $regex : new RegExp(req.params.category, "i") }
  }
  Product.find(query, function(err, products){
    // TODO: Sort first
    res.render('browse',{
      title: req.params.category,
      products: products
    });
  });
});

module.exports = router;
