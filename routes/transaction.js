const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const HashMap = require('hashmap');

let Renderer = require('../routes/renderer');

let Transaction = require('../models/transaction');
let Product = require('../models/product');

//Transaction
router.get('/', function(req, res){
  res.redirect('/admin_panel');
});

//Deliver and finish transaction
router.post('/deliver/:id', function(req,res){
  let transaction = {};
  transaction.isDelivered = true;
  let query = {
    _id: req.params.id
  }
  Transaction.updateOne(query, transaction, function(err) {
    if (err) {
      console.log(err)
      return
    } else {
      req.flash('success', 'Transaction delivered');
      res.redirect('/admin_panel');
    }
  });
});

//Cancel transaction
router.post('/cancel/:id', function(req,res){
  let temp_transaction = {};
  temp_transaction.isCancelled = true;
  let query = {
    _id: req.params.id
  }
  Transaction.findOneAndUpdate(query, temp_transaction, function(err, transaction) {
    if (err) {
      console.log(err)
      return
    } else {
      req.flash('warning', 'Transaction cancelled');
      res.redirect('back');
      var removedMap = getProductQuantityMap(transaction);
      addProductsBack(removedMap);
    }
  });
});

function addProductsBack(productMap){
  productMap.forEach(function(value, key){
    Product.findById(key, function(err, product) {
      let tempProduct = {};
      tempProduct.stock = product.stock + value;
      let query = {
        _id: key
      }
      Product.updateOne(query, tempProduct, function(err) {
        if (err) {
          console.log("Error adding " + value + key + " back to the stock");
        } else {
          // console.log("customer bought " + key + " | " + tempProduct.stock + " left");
        }
      });
    });
  });
}

function getProductQuantityMap(transaction){
  let productMap = new HashMap();
  var items = transaction.productID;
  for (var i = 0; i < items.length; i++) {
    if (productMap.has(items[i])) {
      productMap.set(items[i], productMap.get(items[i]) + 1);
    } else {
      productMap.set(items[i], 1);
    }
  }
  return productMap;
}

module.exports = router;
