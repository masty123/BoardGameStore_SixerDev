const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

let Renderer = require('../routes/renderer');

let Product = require('../models/product');

//Browser
router.get('/', function(req, res) {
  Product.find({}, function(err, products) {
    Renderer.renderWithObject(req, res, 'browse', {
      title: "Shop All",
      products: products,
    });
  });
});

//Browser
router.get('/:category', function(req, res) {
  Product.find({}, function(err, products) {
    Renderer.renderWithObject(req, res, 'browse', {
      title: req.params.category,
      products: products,
      category: req.params.category
    });
  });
});

//Browser
router.get('/all/:sort', function(req, res) {
  Product.find({}, function(err, products) {
    // TODO: Sort first
    var sortedProducts = sortProducts(products, req.params.sort);
    Renderer.renderWithObject(req, res, 'browse', {
      title: "Shop All",
      products: sortedProducts,
      category: "all"
    });
  });
});

//Browser
router.get('/:category/:sort', function(req, res) {
  Product.find({}, function(err, products) {
    // TODO: Sort first
    var sortedProducts = sortProducts(products, req.params.sort);
    Renderer.renderWithObject(req, res, 'browse', {
      title: req.params.category,
      products: sortedProducts,
      category: req.params.category
    });
  });
});

function sortProducts(products, sorting) {
  switch (sorting) {
    case "name_a_z":
      return products.sort(sortObjectBy("name"));
      break;
    case "name_z_a":
      return products.sort(sortObjectBy("-name"));
      break;
    case "price_max":
      return products.sort(sortObjectBy("-price"));
      break;
    case "price_min":
      return products.sort(sortObjectBy("price"));
      break;
  }
}

function sortObjectBy(property) {
    property = property.toString();
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

module.exports = router;
