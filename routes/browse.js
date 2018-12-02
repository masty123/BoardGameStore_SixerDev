const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

let Renderer = require('../routes/renderer');

let Product = require('../models/product');

var MIN_PRODUCT_PRICE = 0;
var MAX_PRODUCT_PRICE = 8000;

//Browser
router.get('/', function(req, res) {
  Product.find({}, function(err, products) {
    Renderer.renderWithObject(req, res, 'browse', {
      title: "Shop All",
      products: products,
      minprice: MIN_PRODUCT_PRICE,
      maxprice: MAX_PRODUCT_PRICE
    });
  });
});

//Browser
router.get('/:category', function(req, res) {
  Product.find({}, function(err, products) {
    Renderer.renderWithObject(req, res, 'browse', {
      title: getTitle(req.params.category),
      products: products,
      category: req.params.category,
      minprice: MIN_PRODUCT_PRICE,
      maxprice: MAX_PRODUCT_PRICE
    });
  });
});

// //Browser
// router.get('/all/:sort', function(req, res) {
//   Product.find({}, function(err, products) {
//     var sortedProducts = sortProducts(products, req.params.sort);
//     Renderer.renderWithObject(req, res, 'browse', {
//       title: "Shop All",
//       products: sortedProducts,
//       category: "all",
//       minprice: MIN_PRODUCT_PRICE,
//       maxprice: MAX_PRODUCT_PRICE
//     });
//   });
// });

//Browser
router.get('/:category/:sort', function(req, res) {
  Product.find({}, function(err, products) {
    var sortedProducts = sortProducts(products, req.params.sort);
    Renderer.renderWithObject(req, res, 'browse', {
      title: getTitle(req.params.category),
      products: sortedProducts,
      category: req.params.category,
      minprice: MIN_PRODUCT_PRICE,
      maxprice: MAX_PRODUCT_PRICE,
      sort: req.params.sort
    });
  });
});

//Filter
router.post('/filter' , function(req, res) {
  const min_price = parseInt(req.body.price_min.substring(1));
  const max_price = parseInt(req.body.price_max.substring(1));
  const sort = req.body.sort;
  const category = req.body.category;
  res.redirect('/browse/'+category+'/'+sort+'/'+min_price+'/'+max_price);
});

//Browser
router.get('/:category/:sort/:minprice/:maxprice', function(req, res) {
  Product.find({}, function(err, products) {
    var sortedProducts = sortProducts(products, req.params.sort);
    Renderer.renderWithObject(req, res, 'browse', {
      title: getTitle(req.params.category),
      products: sortedProducts,
      category: req.params.category,
      minprice: req.params.minprice,
      maxprice: req.params.maxprice,
      sort: req.params.sort
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
    default:
      return products;
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

function getTitle(category) {
  if( category === 'strategy+party+thematic+family+children+dice_bag+dice_set+playmats'){
    return 'Shop All';
  }
  else if( category === 'strategy+party+thematic+family+children' ){
    return 'All Games';
  }
  else if( category === 'dice_bag+dice_set+playmats' ){
    return 'All Accessories'
  }
  else {
    return category;
  }
}

module.exports = router;
